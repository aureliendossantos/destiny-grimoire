const cardIdPattern = /^\d+$/

const normalizePathname = (pathname: string) => {
	const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
	return normalized.replace(/\/$/, "") || "/"
}

export const getStaticOgImagePath = (pathnameWithoutLocale: string) => {
	const pathname = normalizePathname(pathnameWithoutLocale)
	const parts = pathname.split("/").filter(Boolean)

	if (parts.length === 0) return "index"

	if (parts[0] === "user") {
		const userRouteParts = parts.slice(3)
		const firstUserRoutePart = userRouteParts[0]

		if (!firstUserRoutePart || firstUserRoutePart === "fireteam")
			return "all"

		if (cardIdPattern.test(firstUserRoutePart)) return firstUserRoutePart

		if (firstUserRoutePart === "tracker") {
			const guideSlug = userRouteParts[1]
			if (guideSlug && guideSlug !== "bonuses")
				return `tracker/${guideSlug}`
			return "tracker"
		}

		return "all"
	}

	if (cardIdPattern.test(parts[0])) return parts[0]

	if (parts[0] === "books") {
		const bookPageId = parts[1]
		return bookPageId ? `books/${bookPageId}` : "books"
	}

	if (parts[0] === "tracker") {
		return parts[1] ? `tracker/${parts[1]}` : "tracker"
	}

	if (["about", "all", "search"].includes(parts[0])) return parts[0]

	return "index"
}
