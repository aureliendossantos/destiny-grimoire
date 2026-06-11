import type { ImageMetadata } from "astro"

const cardImages = import.meta.glob<ImageMetadata>(
	"/src/images/cards/high-resolution/*.{jpg,jpeg,png,webp}",
	{
		eager: true,
		import: "default",
	},
)

const getExtension = (path: string) => {
	const match = path.match(/\.[^.]+$/)
	return match?.[0] || ".jpg"
}

export const getCardImage = (
	cardId: string | number,
	sourcePath?: string,
): ImageMetadata => {
	const extension = sourcePath ? getExtension(sourcePath) : ".jpg"
	const image =
		cardImages[`/src/images/cards/high-resolution/${cardId}${extension}`]

	if (!image) {
		throw new Error(`Missing downloaded card image for card ${cardId}`)
	}

	return image
}
