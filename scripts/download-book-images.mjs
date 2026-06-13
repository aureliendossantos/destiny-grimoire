import { access, mkdir, writeFile } from "node:fs/promises"
import { extname, join } from "node:path"

const root = process.cwd()
const imagesDir = join(root, "src", "images", "books")
const bungieBaseUrl = "https://www.bungie.net"
const locales = ["en", "fr", "pt-br", "de", "es", "it", "ja"]
const loreRootPresentationNodeHash = 4077680549

const getJson = async (path) => {
	const response = await fetch(new URL(path, bungieBaseUrl), {
		headers: process.env.API_KEY
			? { "X-API-Key": process.env.API_KEY }
			: {},
	})

	if (!response.ok) {
		throw new Error(`Failed to fetch ${path}: ${response.status}`)
	}

	return await response.json()
}

const getPresentationNodeChildren = (node) =>
	node.children?.presentationNodes ?? []

const getBookCoverPath = (node) =>
	node.displayProperties?.iconSequences?.[1]?.frames?.[0] ||
	node.displayProperties?.iconSequences?.[0]?.frames?.[0] ||
	node.displayProperties?.highResIcon ||
	node.displayProperties?.icon ||
	node.rootViewIcon ||
	node.originalIcon

const getBookImages = async () => {
	const manifest = await getJson("/Platform/Destiny2/Manifest/")
	const images = new Map()

	for (const locale of locales) {
		const componentPath =
			manifest.Response.jsonWorldComponentContentPaths[locale]
				.DestinyPresentationNodeDefinition
		const presentationNodes = await getJson(componentPath)
		const rootNode = presentationNodes[loreRootPresentationNodeHash]
		if (!rootNode) continue

		for (const groupChild of getPresentationNodeChildren(rootNode)) {
			const groupNode = presentationNodes[groupChild.presentationNodeHash]
			if (!groupNode) continue

			for (const bookChild of getPresentationNodeChildren(groupNode)) {
				const bookNode =
					presentationNodes[bookChild.presentationNodeHash]
				if (!bookNode) continue

				const sourcePath = getBookCoverPath(bookNode)
				if (!sourcePath) continue

				images.set(String(bookNode.hash), sourcePath)
			}
		}
	}

	return [...images.entries()].sort(([a], [b]) => Number(a) - Number(b))
}

const downloadImage = async (bookHash, sourcePath) => {
	const extension = extname(sourcePath) || ".jpg"
	const targetPath = join(imagesDir, `${bookHash}${extension}`)
	try {
		await access(targetPath)
		return { targetPath, skipped: true }
	} catch {
		// Missing locally; download below.
	}

	const url = new URL(sourcePath, bungieBaseUrl)
	const response = await fetch(url)

	if (!response.ok) {
		throw new Error(`Failed to download ${url}: ${response.status}`)
	}

	await writeFile(targetPath, Buffer.from(await response.arrayBuffer()))
	return { targetPath, skipped: false }
}

await mkdir(imagesDir, { recursive: true })

const images = await getBookImages()
let downloaded = 0
let skipped = 0

for (const [bookHash, sourcePath] of images) {
	const result = await downloadImage(bookHash, sourcePath)
	if (result.skipped) skipped += 1
	else downloaded += 1

	const processed = downloaded + skipped
	if (processed % 25 === 0 || processed === images.length) {
		console.log(
			`Processed ${processed}/${images.length} book images (${downloaded} downloaded, ${skipped} skipped)`,
		)
	}
}
