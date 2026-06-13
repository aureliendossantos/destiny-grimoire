import { bungieQuery, getBungieJson } from "$utils/helpers"
import type { SupportedLocale } from "$utils/i18n"
import type { Lore, PresentationNode, RecordDef } from "$utils/types"

export const loreRootPresentationNodeHash = 4077680549

export interface LoreBookRecord {
	record: RecordDef
	lore: Lore
}

export interface LoreBook {
	node: PresentationNode
	coverPath?: string
	records: LoreBookRecord[]
}

export interface LoreBookGroup {
	node: PresentationNode
	books: LoreBook[]
}

export interface LoreBookManifest {
	groups: LoreBookGroup[]
	books: LoreBook[]
}

const bookManifestCache = new Map<SupportedLocale, Promise<LoreBookManifest>>()

const getPresentationNodeChildren = (node: PresentationNode) =>
	node.children?.presentationNodes ?? []

const getRecordChildren = (node: PresentationNode) =>
	node.children?.records ?? []

export const getBookCoverPath = (node: PresentationNode) =>
	node.displayProperties.iconSequences?.[1]?.frames?.[0] ||
	node.displayProperties.iconSequences?.[0]?.frames?.[0] ||
	node.displayProperties.highResIcon ||
	node.displayProperties.icon ||
	node.rootViewIcon ||
	node.originalIcon

const getLoreBookManifestUncached = async (
	locale: SupportedLocale,
): Promise<LoreBookManifest> => {
	const manifest = await bungieQuery("/Destiny2/Manifest/", true)
	const paths = manifest.jsonWorldComponentContentPaths[locale]

	const [presentationNodes, records, lores] = (await Promise.all([
		getBungieJson(paths.DestinyPresentationNodeDefinition),
		getBungieJson(paths.DestinyRecordDefinition),
		getBungieJson(paths.DestinyLoreDefinition),
	])) as [
		Record<string, PresentationNode>,
		Record<string, RecordDef>,
		Record<string, Lore>,
	]

	const root = presentationNodes[loreRootPresentationNodeHash]
	if (!root)
		throw new Error("Destiny 2 lore root presentation node not found")

	const groups = getPresentationNodeChildren(root)
		.map((groupChild) => presentationNodes[groupChild.presentationNodeHash])
		.filter((group): group is PresentationNode => !!group)
		.map((group) => {
			const books = getPresentationNodeChildren(group)
				.map(
					(bookChild) =>
						presentationNodes[bookChild.presentationNodeHash],
				)
				.filter((book): book is PresentationNode => !!book)
				.map((book) => {
					const bookRecords = getRecordChildren(book)
						.map((recordChild) => records[recordChild.recordHash])
						.filter((record): record is RecordDef => {
							return (
								!!record?.loreHash && !!lores[record.loreHash]
							)
						})
						.map((record) => ({
							record,
							lore: lores[record.loreHash],
						}))

					return {
						node: book,
						coverPath: getBookCoverPath(book),
						records: bookRecords,
					}
				})
				.filter((book) => book.records.length > 0)

			return { node: group, books }
		})
		.filter((group) => group.books.length > 0)

	return {
		groups,
		books: groups.flatMap((group) => group.books),
	}
}

export const getLoreBookManifest = (locale: SupportedLocale) => {
	const cached = bookManifestCache.get(locale)
	if (cached) return cached

	const manifest = getLoreBookManifestUncached(locale)
	bookManifestCache.set(locale, manifest)
	return manifest
}
