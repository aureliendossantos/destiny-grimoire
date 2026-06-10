import { readFile } from "node:fs/promises"
import satori from "satori"
import sharp from "sharp"
import {
	cleanDescription,
	ogImageHeight,
	ogImageWidth,
	siteName,
} from "$utils/seo"

type ElementChild = ElementNode | string | number | false | null | undefined

type ElementNode = {
	type: string
	props: {
		style?: Record<string, string | number>
		src?: string
		children?: ElementChild | ElementChild[]
	}
}

type OgImageInput = {
	title: string
	subtitle: string
	eyebrow?: string
	cardArtUrl?: string
}

const colors = {
	background: "#f8fafc",
	panel: "#f1f5f9",
	panelDark: "#e2e8f0",
	border: "#cbd5e1",
	borderDark: "#64748b",
	text: "#0f172a",
	muted: "#475569",
	faint: "#e2e8f0",
}

const interFontData = readFile(
	new URL(
		"../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff",
		import.meta.url,
	),
)
const ebGaramondFontData = readFile(
	new URL(
		"../../node_modules/@fontsource/eb-garamond/files/eb-garamond-latin-400-normal.woff",
		import.meta.url,
	),
)
const notoSerifJpFontData = readFile(
	new URL(
		"../../node_modules/@fontsource/noto-serif-jp/files/noto-serif-jp-japanese-400-normal.woff",
		import.meta.url,
	),
)

const containsCjk = (value: string) =>
	/[\u3040-\u30ff\u3400-\u9fff]/u.test(value)

const h = (
	type: string,
	props: ElementNode["props"] = {},
	...children: ElementChild[]
): ElementNode => ({
	type,
	props: {
		...props,
		children: children.length === 1 ? children[0] : children,
	},
})

const upper = (value: string) => value.toLocaleUpperCase("en")

const getImageDataUri = async (url: string) => {
	const response = await fetch(url)
	if (!response.ok) return undefined

	const contentType = response.headers.get("content-type") || "image/jpeg"
	const image = Buffer.from(await response.arrayBuffer())

	return `data:${contentType};base64,${image.toString("base64")}`
}

const cardArt = (src: string) =>
	h(
		"div",
		{
			style: {
				display: "flex",
				width: 392,
				height: 510,
				boxShadow: "0 18px 34px rgba(23, 32, 51, 0.18)",
			},
		},
		h("img", {
			src,
			style: {
				display: "flex",
				width: 392,
				height: 510,
				objectFit: "cover",
			},
		}),
	)

const archiveMotif = () =>
	h(
		"div",
		{
			style: {
				display: "flex",
				position: "relative",
				width: 360,
				height: 430,
			},
		},
		h("div", {
			style: {
				display: "flex",
				position: "absolute",
				left: 30,
				top: 20,
				width: 275,
				height: 350,
				backgroundColor: colors.panelDark,
				border: `1px solid ${colors.border}`,
				transform: "rotate(-4deg)",
			},
		}),
		h("div", {
			style: {
				display: "flex",
				position: "absolute",
				left: 52,
				top: 44,
				width: 285,
				height: 360,
				backgroundColor: colors.panel,
				border: `1px solid ${colors.borderDark}`,
				boxShadow: "0 18px 34px rgba(23, 32, 51, 0.12)",
			},
		}),
		h("div", {
			style: {
				display: "flex",
				position: "absolute",
				left: 82,
				top: 96,
				width: 225,
				height: 1,
				backgroundColor: colors.border,
			},
		}),
		h("div", {
			style: {
				display: "flex",
				position: "absolute",
				left: 82,
				top: 146,
				width: 170,
				height: 1,
				backgroundColor: colors.faint,
			},
		}),
		h("div", {
			style: {
				display: "flex",
				position: "absolute",
				left: 82,
				top: 196,
				width: 205,
				height: 1,
				backgroundColor: colors.faint,
			},
		}),
		h("div", {
			style: {
				display: "flex",
				position: "absolute",
				left: 82,
				top: 246,
				width: 150,
				height: 1,
				backgroundColor: colors.faint,
			},
		}),
	)

const template = (input: OgImageInput, cardArtDataUri?: string) =>
	h(
		"div",
		{
			style: {
				display: "flex",
				position: "relative",
				width: ogImageWidth,
				height: ogImageHeight,
				padding: 54,
				backgroundColor: colors.background,
				color: colors.text,
				fontFamily: containsCjk(`${input.title} ${input.subtitle}`)
					? "Noto Serif JP"
					: "EB Garamond",
			},
		},
		h(
			"div",
			{
				style: {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: 62,
					width: "100%",
					height: "100%",
				},
			},
			cardArtDataUri ? cardArt(cardArtDataUri) : archiveMotif(),
			h(
				"div",
				{
					style: {
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						width: 610,
						height: 470,
					},
				},
				h(
					"div",
					{
						style: {
							display: "flex",
							color: colors.muted,
							fontSize: 26,
							letterSpacing: 3,
							marginBottom: 24,
						},
					},
					upper(input.eyebrow || siteName),
				),
				h(
					"div",
					{
						style: {
							display: "flex",
							color: colors.text,
							fontFamily: containsCjk(input.title)
								? "Noto Serif JP"
								: "Inter",
							fontSize: 78,
							fontWeight: 700,
							lineHeight: 0.95,
							marginBottom: 28,
							maxHeight: 220,
							overflow: "hidden",
						},
					},
					cleanDescription(input.title),
				),
				h("div", {
					style: {
						display: "flex",
						width: 92,
						height: 1,
						backgroundColor: colors.borderDark,
						marginBottom: 30,
					},
				}),
				h(
					"div",
					{
						style: {
							display: "flex",
							color: colors.muted,
							fontSize: 33,
							lineHeight: 1.18,
							maxHeight: 118,
							overflow: "hidden",
						},
					},
					cleanDescription(input.subtitle),
				),
				h(
					"div",
					{
						style: {
							display: "flex",
							color: colors.muted,
							fontSize: 23,
							letterSpacing: 2,
							marginTop: 42,
						},
					},
					upper(siteName),
				),
			),
		),
	)

export const renderOgImage = async (input: OgImageInput) => {
	const [interFont, ebGaramondFont, notoSerifJpFont, cardArtDataUri] =
		await Promise.all([
			interFontData,
			ebGaramondFontData,
			notoSerifJpFontData,
			input.cardArtUrl ? getImageDataUri(input.cardArtUrl) : undefined,
		])
	const svg = await satori(template(input, cardArtDataUri), {
		width: ogImageWidth,
		height: ogImageHeight,
		fonts: [
			{
				name: "Inter",
				data: interFont,
				weight: 700,
				style: "normal",
			},
			{
				name: "EB Garamond",
				data: ebGaramondFont,
				weight: 400,
				style: "normal",
			},
			{
				name: "Noto Serif JP",
				data: notoSerifJpFont,
				weight: 400,
				style: "normal",
			},
		],
	})

	return await sharp(Buffer.from(svg)).png().toBuffer()
}
