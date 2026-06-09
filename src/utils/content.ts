import {
	getEntry,
	type CollectionEntry,
	type DataEntryMap,
} from "astro:content"
import type { SupportedLocale } from "./i18n"

type EntryFor<
	Collection extends keyof DataEntryMap,
	EntryId extends keyof DataEntryMap[Collection] | (string & {}),
> = EntryId extends keyof DataEntryMap[Collection]
	? DataEntryMap[Collection][EntryId]
	: CollectionEntry<Collection>

const getEntryOrThrow = async <
	Collection extends keyof DataEntryMap,
	EntryId extends keyof DataEntryMap[Collection] | (string & {}),
>(
	collection: Collection,
	id: EntryId,
): Promise<EntryFor<Collection, EntryId>> => {
	const entry = await getEntry(collection, id)
	if (!entry)
		throw new Error(
			`Entry not found for collection ${collection} and id ${String(id)}`,
		)
	return entry as EntryFor<Collection, EntryId>
}

const themesOrder = [
	"Allies",
	"Places",
	"Enemies",
	"Guardian",
	"Inventory",
	"Activities",
]

export const getThemes = async (locale: SupportedLocale) =>
	(await getEntryOrThrow("grimoire", locale)).data.themeCollection.sort(
		(a, b) =>
			themesOrder.indexOf(a.themeId) - themesOrder.indexOf(b.themeId),
	)

export const getCards = async (locale: SupportedLocale) =>
	(await getEntryOrThrow("cards", locale)).data

/**
 * Only english (default) and french guides for now
 */
export const getGuides = async (locale: SupportedLocale) =>
	(await getEntryOrThrow("guides", locale == "fr" ? "fr" : "en")).data
