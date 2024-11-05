import { defineCollection, z } from "astro:content"

export const sizeSchema = z.object({
	x: z.number(),
	y: z.number(),
	height: z.number(),
	width: z.number(),
})

export const imageSchema = z.object({
	image: z.object({
		rect: sizeSchema,
		sheetPath: z.string(),
		sheetSize: sizeSchema,
	}),
	smallImage: z.object({
		rect: sizeSchema,
		sheetPath: z.string(),
		sheetSize: sizeSchema,
	}),
})

export const cardSchema = z.object({
	cardId: z.number(),
	cardName: z.string(),
	cardIntro: z.string().optional(),
	cardIntroAttribution: z.string().optional(),
	cardDescription: z.string().optional(),
	unlockHowToText: z.string().optional(),
	cardLabel: z.string().optional(),
	rarity: z.literal(1).or(z.literal(2)).or(z.literal(3)),
	unlockFlagHash: z.number(),
	points: z.number(),
	normalResolution: imageSchema,
	highResolution: imageSchema,
	statisticCollection: z
		.array(
			z.object({
				statNumber: z.number(),
				cardId: z.number(),
				statName: z.string(),
				accumulatorHash: z.number(),
				rankCollection: z
					.array(
						z.object({
							rank: z.number(),
							threshold: z.number(),
							unlockFlagHash: z.number(),
							points: z.number(),
						})
					)
					.optional(),
			})
		)
		.optional(),
})

// The following schemas define the shape of the frontmatter or entry data in each
// collection. Each key of `collections` matches a directory name in `src/content`.
export const collections = {
	grimoire: defineCollection({
		type: "data",
		schema: z.object({
			themeCollection: z.array(
				z.object({
					themeId: z.string(),
					themeName: z.string(),
					normalResolution: imageSchema,
					highResolution: imageSchema,
					pageCollection: z.array(
						z.object({
							pageId: z.string(),
							pageName: z.string(),
							normalResolution: imageSchema,
							highResolution: imageSchema,
							cardBriefs: z.array(
								z.object({
									cardId: z.number(),
									points: z.number(),
									totalPoints: z.number(),
								})
							),
						})
					),
				})
			),
		}),
	}),
	cards: defineCollection({
		type: "data",
		schema: z.record(z.string(), cardSchema),
	}),
}
