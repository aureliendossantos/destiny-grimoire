import type { ImageMetadata } from "astro"

const bookImages = import.meta.glob<ImageMetadata>(
	"/src/images/books/*.{jpg,jpeg,png,webp}",
	{
		eager: true,
		import: "default",
	},
)

const getExtension = (path: string) => {
	const match = path.match(/\.[^.]+$/)
	return match?.[0] || ".jpg"
}

export const getBookImage = (
	bookHash: string | number,
	sourcePath?: string,
): ImageMetadata => {
	const extension = sourcePath ? getExtension(sourcePath) : ".jpg"
	const image = bookImages[`/src/images/books/${bookHash}${extension}`]

	if (!image) {
		throw new Error(`Missing downloaded book image for book ${bookHash}`)
	}

	return image
}
