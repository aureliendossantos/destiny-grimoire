import he from "he"

export const siteName = "The Grimoire Archive"
export const defaultDescription =
	"Browse Destiny Grimoire Cards, lore, collection progress, and hidden bonus trackers."
export const ogImageWidth = 1200
export const ogImageHeight = 630

const maxDescriptionLength = 300

export const cleanDescription = (description: string) => {
	const cleaned = he
		.decode(description)
		.replace(/<br\s*\/?>/gi, " ")
		.replace(/<[^>]*>/g, "")
		.replace(/\s+/g, " ")
		.trim()

	if (cleaned.length <= maxDescriptionLength) return cleaned

	return `${cleaned.slice(0, maxDescriptionLength - 3).trimEnd()}...`
}

export const getMetaDescription = (description: string) =>
	cleanDescription(description) || defaultDescription
