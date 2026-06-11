import { readFile } from "node:fs/promises"
import { extname } from "node:path"
import { ImageResponse } from "@vercel/og"
import ebGaramondFontUrl from "@fontsource/eb-garamond/files/eb-garamond-latin-400-normal.woff?url"
import interFontUrl from "@fontsource/inter/files/inter-latin-700-normal.woff?url"
import notoSerifJpFontUrl from "@fontsource/noto-serif-jp/files/noto-serif-jp-japanese-400-normal.woff?url"
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
	cardArtPath?: string
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

const fontDataCache = new Map<string, Promise<ArrayBuffer>>()

const getAssetData = (assetUrl: string, origin: string | URL) => {
	const url = new URL(assetUrl, origin).toString()
	const cached = fontDataCache.get(url)
	if (cached) return cached

	const data = fetch(url).then(async (response) => {
		if (!response.ok)
			throw new Error(`Unable to load OG font asset: ${url}`)

		return response.arrayBuffer()
	})

	fontDataCache.set(url, data)
	return data
}

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

const imageDataUriCache = new Map<string, Promise<string | undefined>>()

const imageContentTypes: Record<string, string> = {
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".webp": "image/webp",
}

const fetchImageDataUri = async (url: string) => {
	const response = await fetch(url)
	if (!response.ok) return undefined

	const contentType = response.headers.get("content-type") || "image/jpeg"
	const image = Buffer.from(await response.arrayBuffer())

	return `data:${contentType};base64,${image.toString("base64")}`
}

const readImageDataUri = async (path: string) => {
	const contentType =
		imageContentTypes[extname(path).toLocaleLowerCase("en")] || "image/jpeg"
	const image = await readFile(path)

	return `data:${contentType};base64,${image.toString("base64")}`
}

const getImageDataUri = async (url: string) => {
	const cached = imageDataUriCache.get(url)
	if (cached) return cached

	const dataUri = fetchImageDataUri(url)
	imageDataUriCache.set(url, dataUri)
	return dataUri
}

const getLocalImageDataUri = async (path: string) => {
	const cached = imageDataUriCache.get(path)
	if (cached) return cached

	const dataUri = readImageDataUri(path)
	imageDataUriCache.set(path, dataUri)
	return dataUri
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

export const renderOgImage = async (
	input: OgImageInput,
	origin: string | URL,
) => {
	const [interFont, ebGaramondFont, notoSerifJpFont, cardArtDataUri] =
		await Promise.all([
			getAssetData(interFontUrl, origin),
			getAssetData(ebGaramondFontUrl, origin),
			getAssetData(notoSerifJpFontUrl, origin),
			input.cardArtPath
				? getLocalImageDataUri(input.cardArtPath)
				: input.cardArtUrl
					? getImageDataUri(input.cardArtUrl)
					: undefined,
		])

	return new ImageResponse(template(input, cardArtDataUri) as never, {
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
		headers: {
			"Cache-Control":
				"public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
		},
	})
}
