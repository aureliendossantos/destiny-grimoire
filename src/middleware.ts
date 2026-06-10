import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware(async (context, next) => {
	const pathname = context.url.pathname

	if (pathname === "/en" || pathname.startsWith("/en/")) {
		const redirectUrl = new URL(context.url)
		redirectUrl.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/"
		return context.redirect(redirectUrl.toString(), 308)
	}

	return next()
})
