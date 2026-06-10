import type { APIRoute } from "astro"
import { getCards, getGuides } from "$utils/content"
import { renderOgImage } from "$utils/og"
import { defaultDescription, getMetaDescription, siteName } from "$utils/seo"
import { isSupportedLocale, type SupportedLocale } from "$utils/i18n"

export const prerender = false

const bungieAssetUrl = (path: string) => new URL(path, "https://www.bungie.net")

const getPathParts = (path?: string) =>
	(path || "index")
		.replace(/\.png$/, "")
		.split("/")
		.filter(Boolean)

const getLastCardId = (parts: string[]) => {
	const lastPart = parts.at(-1)
	return lastPart && /^\d+$/.test(lastPart) ? lastPart : undefined
}

const getQueryText = (request: Request) => {
	const url = new URL(request.url)
	return {
		title: url.searchParams.get("title") || undefined,
		description: url.searchParams.get("description") || undefined,
	}
}

const getGenericOgData = async (
	locale: SupportedLocale,
	parts: string[],
	request: Request,
) => {
	const { title, description } = getQueryText(request)
	const path = parts.join("/")

	if (title || description) {
		return {
			title: title || siteName,
			subtitle: description || defaultDescription,
			eyebrow: "Destiny Archive",
		}
	}

	if (path === "all") {
		return {
			title: "The Grimoire Archive · Destiny Grimoire Cards",
			subtitle: "Browse the complete Destiny Grimoire archive.",
			eyebrow: "Grimoire",
		}
	}

	if (path === "tracker") {
		return {
			title: "Destiny 1 Tracker · The Grimoire Archive",
			subtitle:
				"Track dead ghosts, calcified fragments, SIVA clusters, and hidden bonuses.",
			eyebrow: "Tracker",
		}
	}

	if (parts[0] === "tracker" && parts[1]) {
		const guide = (await getGuides(locale)).types.find(
			(guide) => guide.slug === parts[1],
		)
		return {
			title: guide
				? `${guide.name} · Destiny 1 Tracker · The Grimoire Archive`
				: "Destiny 1 Tracker · The Grimoire Archive",
			subtitle: "Destiny Grimoire Tracker",
			eyebrow: "Tracker",
		}
	}

	if (path === "about") {
		return {
			title: `About ${siteName}`,
			subtitle: defaultDescription,
			eyebrow: "About",
		}
	}

	return {
		title: "The Grimoire Archive · Destiny Grimoire Cards",
		subtitle: defaultDescription,
		eyebrow: "Destiny Archive",
	}
}

export const GET: APIRoute = async ({ params, request }) => {
	const localeParam = params.locale
	if (!isSupportedLocale(localeParam)) {
		return new Response("Not found", { status: 404 })
	}

	const parts = getPathParts(params.path)
	const cards = await getCards(localeParam)
	const cardId = getLastCardId(parts)
	const card = cardId ? cards[cardId] : undefined

	const image = await renderOgImage(
		card
			? {
					title: card.cardName,
					subtitle: getMetaDescription(
						card.cardIntro || card.cardDescription || "",
					),
					eyebrow: "Destiny Grimoire Card",
					cardArtUrl: String(
						bungieAssetUrl(card.highResolution.image.sheetPath),
					),
				}
			: await getGenericOgData(localeParam, parts, request),
	)

	return new Response(new Uint8Array(image), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	})
}
