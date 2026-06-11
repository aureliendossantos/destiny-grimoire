import { extname, join } from "node:path"
import type { APIRoute } from "astro"
import { getCards, getGuides } from "$utils/content"
import { localeParams, type SupportedLocale } from "$utils/i18n"
import { renderOgImage } from "$utils/og"
import { defaultDescription, getMetaDescription, siteName } from "$utils/seo"

type OgImageData = Parameters<typeof renderOgImage>[0]

export const prerender = false

const localCardArtPath = (cardId: string | number, sourcePath: string) =>
	join(
		process.cwd(),
		"src",
		"images",
		"cards",
		"high-resolution",
		`${cardId}${extname(sourcePath) || ".jpg"}`,
	)

const getGenericOgImage = async (
	locale: SupportedLocale,
	path: string,
): Promise<OgImageData | undefined> => {
	const guides = await getGuides(locale)

	const images: Record<string, OgImageData> = {
		index: {
			title: "The Grimoire Archive",
			subtitle: defaultDescription,
			eyebrow: "Destiny Archive",
		},
		all: {
			title: "Destiny Grimoire Cards",
			subtitle: "Browse the complete Destiny Grimoire archive.",
			eyebrow: "Grimoire",
		},
		search: {
			title: "Search the Grimoire Archive",
			subtitle: "Find Destiny Grimoire cards by keyword.",
			eyebrow: "Search",
		},
		tracker: {
			title: "Destiny 1 Tracker",
			subtitle:
				"Track dead ghosts, calcified fragments, SIVA clusters, and hidden bonuses.",
			eyebrow: "Tracker",
		},
		about: {
			title: `About ${siteName}`,
			subtitle: defaultDescription,
			eyebrow: "About",
		},
		books: {
			title: "Destiny 2 Books",
			subtitle: "A developing archive of Destiny lore books.",
			eyebrow: "Books",
		},
	}

	for (const guide of guides.types) {
		images[`tracker/${guide.slug}`] = {
			title: guide.name,
			subtitle: "Destiny Grimoire Tracker",
			eyebrow: "Tracker",
		}
	}

	return images[path]
}

const getCardOgImage = async (
	locale: SupportedLocale,
	path: string,
): Promise<OgImageData | undefined> => {
	const cards = await getCards(locale)
	const card = Object.values(cards).find((card) => String(card.cardId) === path)

	if (!card) return undefined

	return {
		title: card.cardName,
		subtitle: getMetaDescription(card.cardIntro || card.cardDescription || ""),
		eyebrow: "Destiny Grimoire Card",
		cardArtPath: localCardArtPath(
			card.cardId,
			card.highResolution.image.sheetPath,
		),
	}
}

const getOgImage = async (
	locale: SupportedLocale,
	path: string,
): Promise<OgImageData | undefined> => {
	if (/^\d+$/.test(path)) return getCardOgImage(locale, path)
	return getGenericOgImage(locale, path)
}

export const GET: APIRoute = async ({ params }) => {
	const locale = params.locale
	const path = params.path || "index"

	if (!localeParams.includes(locale as SupportedLocale))
		return new Response(null, { status: 404 })

	const image = await getOgImage(locale as SupportedLocale, path)
	if (!image) return new Response(null, { status: 404 })

	return await renderOgImage(image)
}
