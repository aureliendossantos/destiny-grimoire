import type { APIRoute } from "astro"

export const GET: APIRoute = ({ site }) => {
	const origin = site?.origin ?? "https://grimoire.aureliendossantos.com"
	const sitemapUrl = new URL("/sitemap-index.xml", origin)

	return new Response(
		[`User-agent: *`, `Allow: /`, `Sitemap: ${sitemapUrl.href}`].join(
			"\n",
		) + "\n",
		{
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		},
	)
}
