import type { ImageMetadata } from "astro"
import { hashTransform, propsToFilename } from "astro/assets"

const staticImageServiceEntrypoint = "@astrojs/cloudflare/image-service-workerd"
const defaultHashProps = [
	"src",
	"width",
	"height",
	"format",
	"quality",
	"fit",
	"position",
	"background",
]

type StaticImageOptions = {
	src: ImageMetadata
	width?: number
	height?: number
	alt: string
	loading?: "eager" | "lazy"
	decoding?: "async" | "auto" | "sync"
}

export const getStaticImage = ({
	src,
	width,
	height,
	alt,
	loading = "lazy",
	decoding = "async",
}: StaticImageOptions) => {
	if (height && !width) {
		width = Math.round(height * (src.width / src.height))
	} else if (width && !height) {
		height = Math.round(width / (src.width / src.height))
	} else if (!width && !height) {
		width = src.width
		height = src.height
	}

	const transform = {
		src,
		width,
		height,
		format: src.format === "svg" ? "svg" : "webp",
	}
	const hash = hashTransform(
		transform,
		staticImageServiceEntrypoint,
		defaultHashProps,
	)

	return {
		src: propsToFilename(src.src, transform, hash),
		attributes: {
			alt,
			loading,
			decoding,
			width,
			height,
		},
	}
}
