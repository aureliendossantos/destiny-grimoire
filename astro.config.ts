import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: vercel(),
	site: "https://grimoire.aureliendossantos.com",
	integrations: [
		tailwind({
			nesting: true,
		}),
	],
})
