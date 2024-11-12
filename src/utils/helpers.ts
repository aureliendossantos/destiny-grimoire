import he from "he"
import { getEntry } from "astro:content"
import type { UserGrimoire } from "./types"
import { checkLocale, type SupportedLocale } from "./i18n"

const host = "https://www.bungie.net/d1/Platform/Destiny/"
const d2host = "https://www.bungie.net/Platform"
export async function bungieQuery(path: string, d2 = false) {
	try {
		const response = await fetch((d2 ? d2host : host) + path, {
			headers: { "X-API-Key": import.meta.env.API_KEY },
		})
		const data = await response.json()
		if (import.meta.env.PROD)
			console.log("bungieQuery path:", path, "result:", data)
		return data.Response
	} catch (error) {
		console.error("Error in bungieQuery:", error)
		throw error
	}
}

export const getBungieJson = async (path: string) =>
	await (
		await fetch("https://www.bungie.net/" + path, {
			headers: { "X-API-Key": import.meta.env.API_KEY },
		})
	).json()

export const getMembershipId = async (
	membershipType: 1 | 2,
	displayName: string,
) => {
	const id = await bungieQuery(
		`${membershipType}/Stats/GetMembershipIdByDisplayName/${displayName}/`,
	)
	if (id == 0) return null
	return id
}

export const getUserGrimoire = async (
	membershipType: 1 | 2,
	membershipId: string,
) =>
	(await bungieQuery(`Vanguard/Grimoire/${membershipType}/${membershipId}/`))
		.data as UserGrimoire

export const getUserSummary = async (
	membershipType: 1 | 2,
	membershipId: string,
) =>
	(await bungieQuery(`${membershipType}/Account/${membershipId}/Summary/`))
		.data

export function cardImageStyle(image: any, bonus = false) {
	const spriteWidth = bonus ? 145 : 323
	const spriteHeight = bonus ? 145 : 419
	const sheetCols = image.sheetSize.width / spriteWidth
	const sheetRows = image.sheetSize.height / spriteHeight
	if (
		Math.floor(sheetCols) != sheetCols ||
		Math.floor(sheetRows) != sheetRows
	)
		throw new Error(
			`cols and rows must be a whole number. ${sheetCols}x${sheetRows} // ${image.sheetSize.width}x${image.sheetSize.height} // ${image.sheetPath}`,
		)
	const col = image.rect.x / spriteWidth
	const row = image.rect.y / spriteHeight
	return {
		width: `${sheetCols * 100}%`,
		height: `${sheetRows * 100}%`,
		top: `-${row * 100}%`,
		left: `-${col * 100}%`,
		// override tailwind rule
		maxWidth: "none",
	}
}

export const membershipTypeToPath = (membershipType: 1 | 2) =>
	membershipType == 1 ? "xbox" : "psn"

interface Cookie {
	membershipType: 1 | 2
	membershipId: string
	username: string
}

export const validateCookie = (cookie: any) =>
	cookie &&
	(cookie.membershipType === 1 || cookie.membershipType === 2) &&
	typeof cookie.membershipId == "string" &&
	typeof cookie.username == "string"
		? (cookie as Cookie)
		: null

const themesOrder = [
	"Allies",
	"Places",
	"Enemies",
	"Guardian",
	"Inventory",
	"Activities",
]

export const getThemes = async (locale: SupportedLocale) =>
	(await getEntry("grimoire", locale)).data.themeCollection.sort(
		(a, b) =>
			themesOrder.indexOf(a.themeId) - themesOrder.indexOf(b.themeId),
	)

export const getCards = async (locale: SupportedLocale) =>
	(await getEntry("cards", locale)).data

/**
 * Only english (default) and french guides for now
 */
export const getGuides = async (locale: SupportedLocale) =>
	(await getEntry("guides", locale == "fr" ? "fr" : "en")).data

// returns {platform?: string, username?: string, rest?: string} when given "/{psn/xbox}/{username}/rest" or "/rest"
export const deconstructUrl = (url: string) => {
	const parts = url.split("/")
	if (parts[0] != "") throw new Error("url must start with '/': " + url)
	if (parts.length < 4) return { rest: url }
	if (parts[1] != "user" || (parts[2] != "psn" && parts[2] != "xbox"))
		return { rest: url }
	return {
		platform: parts[2],
		username: parts[3],
		rest: parts.slice(4).join("/"),
	}
}

export const parseParamsWithUser = (p: Record<string, string | undefined>) => {
	const locale = checkLocale(p.locale)
	const platform = p.platform as "psn" | "xbox"
	const username = p.username as string
	const cardId = p.card
	const guideSlug = p.guide
	return { locale, platform, username, cardId, guideSlug }
}

/**
 * Regex to match capital words and style them with small caps.
 * Decoding HTML entities with he library to detect accents in the Grimoire, like in SAVATHÛN (SAVATH&#219;N)
 */
export const addAbbrs = (str: string) =>
	he
		.decode(str)
		.replace(
			/\b(?<!<abbr>)(?=[A-ZÀŸŸÉÈÊËÙÛÜÇ]+)[A-Z0-9-ÀŸŸÉÈÊËÙÛÜÇ'.\s]{3,}(?:\.[A-Z0-9-ÀŸŸÉÈÊËÙÛÜÇ'.]+)*\b/g,
			"<abbr>$&</abbr>",
		)
