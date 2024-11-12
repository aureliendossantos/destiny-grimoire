import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: vercel({ webAnalytics: { enabled: true } }),
	site: "https://grimoire.aureliendossantos.com",
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
	integrations: [
		tailwind({
			nesting: true,
		}),
	],
	experimental: {
		serverIslands: true,
	},
})
