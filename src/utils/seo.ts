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

type StructuredDataValue =
	| string
	| number
	| boolean
	| null
	| StructuredDataValue[]
	| { [key: string]: StructuredDataValue }

export type StructuredData = {
	"@context"?: "https://schema.org"
	"@type": string
	[key: string]: StructuredDataValue | undefined
}

type BreadcrumbItem = {
	name: string
	url: string | URL
}

const withContext = (data: StructuredData): StructuredData => ({
	"@context": "https://schema.org",
	...data,
})

export const getWebSiteStructuredData = (
	siteUrl: string | URL,
	searchUrl: string | URL,
): StructuredData =>
	withContext({
		"@type": "WebSite",
		name: siteName,
		url: String(siteUrl),
		potentialAction: {
			"@type": "SearchAction",
			target: `${String(searchUrl)}?term={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	})

export const getCollectionPageStructuredData = ({
	name,
	description,
	url,
}: {
	name: string
	description: string
	url: string | URL
}): StructuredData =>
	withContext({
		"@type": "CollectionPage",
		name,
		description: getMetaDescription(description),
		url: String(url),
	})

export const getBreadcrumbListStructuredData = (
	items: BreadcrumbItem[],
): StructuredData =>
	withContext({
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: String(item.url),
		})),
	})
