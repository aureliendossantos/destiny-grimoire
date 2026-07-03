import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import cloudflare from "@astrojs/cloudflare"
import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
	output: "static",
	adapter: cloudflare(),
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
		routing: "manual",
	},
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			exclude: ["takumi-js"],
		},
	},
})
