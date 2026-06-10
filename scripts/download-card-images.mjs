import { access, mkdir, readFile, writeFile } from "node:fs/promises"
import { extname, join } from "node:path"

const root = process.cwd()
const cardsDir = join(root, "src", "content", "cards")
const imagesDir = join(root, "src", "images", "cards", "high-resolution")
const bungieBaseUrl = "https://www.bungie.net"

const loadCards = async (locale) =>
	JSON.parse(await readFile(join(cardsDir, `${locale}.json`), "utf8"))

const getCardImages = async () => {
	const cardsByLocale = await Promise.all(
		["en", "fr", "pt-br", "de", "es", "it", "ja"].map(loadCards),
	)
	const images = new Map()

	for (const cards of cardsByLocale) {
		for (const card of Object.values(cards)) {
			const sourcePath = card.highResolution?.image?.sheetPath
			if (!sourcePath) continue
			images.set(String(card.cardId), sourcePath)
		}
	}

	return [...images.entries()].sort(([a], [b]) => Number(a) - Number(b))
}

const downloadImage = async (cardId, sourcePath) => {
	const extension = extname(sourcePath) || ".jpg"
	const targetPath = join(imagesDir, `${cardId}${extension}`)
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

const images = await getCardImages()
let downloaded = 0
let skipped = 0

for (const [cardId, sourcePath] of images) {
	const result = await downloadImage(cardId, sourcePath)
	if (result.skipped) skipped += 1
	else downloaded += 1

	const processed = downloaded + skipped
	if (processed % 50 === 0 || processed === images.length) {
		console.log(
			`Processed ${processed}/${images.length} card images (${downloaded} downloaded, ${skipped} skipped)`,
		)
	}
}
