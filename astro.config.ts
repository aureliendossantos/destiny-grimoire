import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
	output: "static",
	adapter: vercel({ webAnalytics: { enabled: true } }),
	site: "https://grimoire.aureliendossantos.com",
	integrations: [
		sitemap({
			filter: (page) => {
				const pathname = new URL(page).pathname
				return !/^\/(?:(?:de|es|fr|it|ja|pt-br)\/)?d1manifest\/?$/.test(
					pathname,
				)
			},
		}),
	],
	i18n: {
		defaultLocale: "en",
		locales: ["de", "en", "es", "fr", "it", "ja", "pt-br"],
		fallback: {
			de: "en",
			es: "en",
			fr: "en",
			it: "en",
			ja: "en",
			"pt-br": "en",
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
})
