import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
				serif: ['"EB Garamond"', ...defaultTheme.fontFamily.serif],
			},
			aspectRatio: {
				card: "0.78 / 1",
			},
		},
	},
	plugins: [],
} satisfies Config
