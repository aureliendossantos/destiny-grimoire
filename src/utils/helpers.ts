const host = "https://www.bungie.net/d1/Platform/Destiny/"
export async function bungieQuery(path: string) {
	try {
		const response = await fetch(host + path, {
			headers: { "X-API-Key": import.meta.env.API_KEY },
		})
		const data = await response.json()
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
) =>
	await bungieQuery(
		`${membershipType}/Stats/GetMembershipIdByDisplayName/${displayName}/`
	)

export const getUserGrimoire = async (
	membershipType: 1 | 2,
	membershipId: string
) =>
	(await bungieQuery(`Vanguard/Grimoire/${membershipType}/${membershipId}/`))
		.data

export const getUserSummary = async (
	membershipType: 1 | 2,
	membershipId: string
) =>
	(await bungieQuery(`${membershipType}/Account/${membershipId}/Summary/`)).data

export function cardImageStyle(image: any, small?: boolean) {
	return {
		background:
			"url(https://www.bungie.net" +
			image.sheetPath +
			") -" +
			(small ? image.rect.x / 2 : image.rect.x) +
			"px -" +
			(small ? image.rect.y / 2 : image.rect.y) +
			"px",
		backgroundSize:
			(small ? image.sheetSize.width / 2 : image.sheetSize.width) +
			"px " +
			(small ? image.sheetSize.height / 2 : image.sheetSize.height) +
			"px",
	}
}
