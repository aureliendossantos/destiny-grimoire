import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			sans: [
				["Inter var", ...defaultTheme.fontFamily.sans],
				{ fontFeatureSettings: "normal" },
			],
			serif: ['"EB Garamond"', ...defaultTheme.fontFamily.serif],
			smcp: [
				['"EB Garamond"', ...defaultTheme.fontFamily.serif],
				{ fontFeatureSettings: '"c2sc", "smcp"' },
			],
			accent: ["Cromwell", ...defaultTheme.fontFamily.serif],
		},
		extend: {
			aspectRatio: {
				card: "323 / 419",
			},
		},
	},
	plugins: [],
} satisfies Config
