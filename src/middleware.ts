import { defineMiddleware } from "astro:middleware"
import { stripLocaleFromPathname } from "$utils/i18n"

const USER_ROUTE_PATTERN =
	/^\/user\/(?:psn|xbox)\/[^/]+(?:\/([^/?#]+(?:\/[^/?#]+)*))?\/?$/

function getUserRouteCdnMaxAge(pathname: string) {
	const match = USER_ROUTE_PATTERN.exec(stripLocaleFromPathname(pathname))
	if (!match) return null

	const rest = match[1]?.replace(/\/$/, "") ?? ""
	if (rest === "tracker") return 86400
	if (rest === "fireteam" || rest.startsWith("tracker/")) return 60

	return 900
}

function setUserCacheHeaders(response: Response, cdnMaxAge: number) {
	response.headers.set("Cache-Control", "public, max-age=60")
	response.headers.set("CDN-Cache-Control", `public, max-age=${cdnMaxAge}`)
	response.headers.set(
		"Vercel-CDN-Cache-Control",
		`public, max-age=${cdnMaxAge}, stale-while-revalidate=86400`,
	)
}

export const onRequest = defineMiddleware(async (context, next) => {
	const pathname = context.url.pathname

	if (pathname === "/en" || pathname.startsWith("/en/")) {
		const redirectUrl = new URL(context.url)
		redirectUrl.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/"
		return context.redirect(redirectUrl.toString(), 308)
	}

	const response = await next()
	const cdnMaxAge = getUserRouteCdnMaxAge(pathname)
	if (
		cdnMaxAge != null &&
		(context.request.method === "GET" ||
			context.request.method === "HEAD") &&
		response.status === 200 &&
		!response.headers.has("set-cookie")
	) {
		setUserCacheHeaders(response, cdnMaxAge)
	}

	return response
})
