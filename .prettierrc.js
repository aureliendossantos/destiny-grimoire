/** @type {import("@types/prettier").Options} */
export default {
	useTabs: true,
	tabWidth: 4,
	semi: false,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	astroAllowShorthand: true,
	tailwindStylesheet: "./src/styles/tailwind.css",
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
}
