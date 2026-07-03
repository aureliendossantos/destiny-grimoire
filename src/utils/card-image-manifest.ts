/**
 * The SSR user pages ("/user/…") show the exact same card images as their
 * static equivalents ("/all" and "/[card]"). Rendering them with the `<Image>`
 * component on an on-demand route makes each `<img>` point at the runtime
 * `/_image` endpoint, which always cache-misses on Vercel.
 *
 * To avoid that, a prerendered endpoint (`/card-images.json`) optimizes every
 * card image at build time — reusing the already-generated `/_astro/…` assets —
 * and exposes their static paths as a manifest. The SSR pages fetch that
 * manifest and render plain `<img>` tags pointing at the CDN-cached files.
 */

/** Preview thumbnails in the grimoire grid ("/all", CardPreview). */
export const CARD_PREVIEW_WIDTH = 320
/** Hero image on a single card page ("/[card]", CardPage). */
export const CARD_PAGE_WIDTH = 560
/** Prev/next thumbnails on a single card page (CardNavLink), sized by height. */
export const CARD_NAV_HEIGHT = 128

export interface OptimizedImage {
	src: string
	width: number
	height: number
}

export interface CardImageEntry {
	preview: OptimizedImage
	page: OptimizedImage
	nav: OptimizedImage
}

export type CardImageManifest = Record<string, CardImageEntry>

const manifestByOrigin = new Map<string, Promise<CardImageManifest>>()

/**
 * Fetches the prerendered card image manifest, memoized per origin so warm SSR
 * invocations only pay for a single (CDN cache-hit) request.
 */
export const fetchCardImageManifest = (
	origin: string,
): Promise<CardImageManifest> => {
	let cached = manifestByOrigin.get(origin)
	if (!cached) {
		cached = fetch(new URL("/card-images.json", origin))
			.then((response) => {
				if (!response.ok)
					throw new Error(
						`Failed to fetch card image manifest: ${response.status}`,
					)
				return response.json() as Promise<CardImageManifest>
			})
			.catch((error) => {
				// Allow a retry on the next request instead of caching the failure.
				manifestByOrigin.delete(origin)
				throw error
			})
		manifestByOrigin.set(origin, cached)
	}
	return cached
}
