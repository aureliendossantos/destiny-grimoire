import { extname, join } from "node:path"
import type { APIRoute, GetStaticPaths } from "astro"
import { getCards, getGuides } from "$utils/content"
import { localeParams, type SupportedLocale } from "$utils/i18n"
import { renderOgImage } from "$utils/og"
import { defaultDescription, getMetaDescription, siteName } from "$utils/seo"

type OgImageData = Parameters<typeof renderOgImage>[0]

type StaticOgImage = {
	path: string
	image: OgImageData
}

const localCardArtPath = (cardId: string | number, sourcePath: string) =>
	join(
		process.cwd(),
		"src",
		"images",
		"cards",
		"high-resolution",
		`${cardId}${extname(sourcePath) || ".jpg"}`,
	)

const getGenericOgImages = async (
	locale: SupportedLocale,
): Promise<StaticOgImage[]> => {
	const guides = await getGuides(locale)

	return [
		{
			path: "index",
			image: {
				title: "The Grimoire Archive",
				subtitle: defaultDescription,
				eyebrow: "Destiny Archive",
			},
		},
		{
			path: "all",
			image: {
				title: "Destiny Grimoire Cards",
				subtitle: "Browse the complete Destiny Grimoire archive.",
				eyebrow: "Grimoire",
			},
		},
		{
			path: "search",
			image: {
				title: "Search the Grimoire Archive",
				subtitle: "Find Destiny Grimoire cards by keyword.",
				eyebrow: "Search",
			},
		},
		{
			path: "tracker",
			image: {
				title: "Destiny 1 Tracker",
				subtitle:
					"Track dead ghosts, calcified fragments, SIVA clusters, and hidden bonuses.",
				eyebrow: "Tracker",
			},
		},
		...guides.types.map((guide) => ({
			path: `tracker/${guide.slug}`,
			image: {
				title: guide.name,
				subtitle: "Destiny Grimoire Tracker",
				eyebrow: "Tracker",
			},
		})),
		{
			path: "about",
			image: {
				title: `About ${siteName}`,
				subtitle: defaultDescription,
				eyebrow: "About",
			},
		},
		{
			path: "books",
			image: {
				title: "Destiny 2 Books",
				subtitle: "A developing archive of Destiny lore books.",
				eyebrow: "Books",
			},
		},
	]
}

const getCardOgImages = async (
	locale: SupportedLocale,
): Promise<StaticOgImage[]> => {
	const cards = await getCards(locale)

	return Object.values(cards).map((card) => ({
		path: String(card.cardId),
		image: {
			title: card.cardName,
			subtitle: getMetaDescription(
				card.cardIntro || card.cardDescription || "",
			),
			eyebrow: "Destiny Grimoire Card",
			cardArtPath: localCardArtPath(
				card.cardId,
				card.highResolution.image.sheetPath,
			),
		},
	}))
}

export const getStaticPaths: GetStaticPaths = async () => {
	const pathsByLocale = await Promise.all(
		localeParams.map(async (locale) => {
			const images = [
				...(await getGenericOgImages(locale)),
				...(await getCardOgImages(locale)),
			]

			return images.map(({ path, image }) => ({
				params: { locale, path },
				props: image,
			}))
		}),
	)

	return pathsByLocale.flat()
}

export const GET: APIRoute = async ({ props }) => {
	const image = await renderOgImage(props as OgImageData)

	return new Response(new Uint8Array(image), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	})
}
