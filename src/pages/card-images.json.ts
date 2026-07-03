import type { APIRoute } from "astro"
import { getImage } from "astro:assets"
import { getCardImage } from "$utils/card-images"
import { getCards } from "$utils/content"
import {
	CARD_NAV_HEIGHT,
	CARD_PAGE_WIDTH,
	CARD_PREVIEW_WIDTH,
	type CardImageManifest,
	type OptimizedImage,
} from "$utils/card-image-manifest"

// Prerendered so `getImage()` emits static `/_astro/…` assets at build time
// (deduped with the ones the static "/all" and "/[card]" pages already produce)
// and returns their static paths, rather than the on-demand `/_image` endpoint.
export const prerender = true

export const GET: APIRoute = async () => {
	// Card images are not localized, so any locale yields the same set.
	const cards = await getCards("en")
	const manifest: CardImageManifest = {}

	await Promise.all(
		Object.values(cards).map(async (card) => {
			const source = getCardImage(
				card.cardId,
				card.highResolution.image.sheetPath,
			)
			const resolveByWidth = async (
				width: number,
			): Promise<OptimizedImage> => {
				const optimized = await getImage({ src: source, width })
				return {
					src: optimized.src,
					width,
					height: Math.round((width * source.height) / source.width),
				}
			}
			const resolveByHeight = async (
				height: number,
			): Promise<OptimizedImage> => {
				const optimized = await getImage({ src: source, height })
				return {
					src: optimized.src,
					width: Math.round((height * source.width) / source.height),
					height,
				}
			}
			const [preview, page, nav] = await Promise.all([
				resolveByWidth(CARD_PREVIEW_WIDTH),
				resolveByWidth(CARD_PAGE_WIDTH),
				resolveByHeight(CARD_NAV_HEIGHT),
			])
			manifest[card.cardId] = { preview, page, nav }
		}),
	)

	return new Response(JSON.stringify(manifest), {
		headers: { "Content-Type": "application/json" },
	})
}
