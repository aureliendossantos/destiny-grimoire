import { getCollection } from "astro:content"
import type { UserGrimoire } from "./types"

const host = "https://www.bungie.net/d1/Platform/Destiny/"
export async function bungieQuery(path: string) {
	try {
		const response = await fetch(host + path, {
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

export const getMembershipId = async (
	membershipType: 1 | 2,
	displayName: string
) => {
	const id = await bungieQuery(
		`${membershipType}/Stats/GetMembershipIdByDisplayName/${displayName}/`
	)
	if (id == 0) return null
	return id
}

export const getUserGrimoire = async (
	membershipType: 1 | 2,
	membershipId: string
) =>
	(await bungieQuery(`Vanguard/Grimoire/${membershipType}/${membershipId}/`))
		.data as UserGrimoire

export const getUserSummary = async (
	membershipType: 1 | 2,
	membershipId: string
) =>
	(await bungieQuery(`${membershipType}/Account/${membershipId}/Summary/`)).data

export function cardImageStyle(image: any) {
	const cardWidth = 323
	const cardHeight = 419
	const sheetCols = image.sheetSize.width / cardWidth
	const sheetRows = image.sheetSize.height / cardHeight
	if (Math.floor(sheetCols) != sheetCols || Math.floor(sheetRows) != sheetRows)
		throw new Error(
			`cols and rows must be a whole number. ${sheetCols}x${sheetRows} // ${image.sheetSize.width}x${image.sheetSize.height} // ${image.sheetPath}`
		)
	const col = image.rect.x / cardWidth
	const row = image.rect.y / cardHeight
	return {
		width: `${sheetCols * 100}%`,
		height: `${sheetRows * 100}%`,
		top: `-${row * 100}%`,
		left: `-${col * 100}%`,
		// override tailwind rule
		maxWidth: "none",
	}
}

export function rarityText(rarity: 1 | 2 | 3) {
	switch (rarity) {
		case 1:
			return "commune"
		case 2:
			return "légendaire"
		case 3:
			return "exotique"
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

export const themes = (
	await getCollection("grimoire")
)[0].data.themeCollection.sort(
	(a, b) => themesOrder.indexOf(a.themeId) - themesOrder.indexOf(b.themeId)
)

export const cards = (await getCollection("cards"))[0].data

// returns {platform?: string, username?: string, rest?: string} when given "/{psn/xbox}/{username}/rest" or "/rest"
export const deconstructUrl = (url: string) => {
	const parts = url.split("/")
	if (parts[0] != "") throw new Error("url must start with '/': " + url)
	if (parts.length < 3) return { rest: url }
	if (parts[1] != "psn" && parts[1] != "xbox") return { rest: url }
	return {
		platform: parts[1],
		username: parts[2],
		rest: parts.slice(3).join("/"),
	}
}
