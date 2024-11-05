import type { z } from "astro:content"
import type { sizeSchema } from "$content/config"

export interface UserGrimoire {
	score: number
	cardCollection: Array<UserCard>
	cardToHide: any // empty on the accounts I tested
	bonuses: Array<UserBonus>
}

export interface UserCard {
	cardId: number
	score: number
	points: number
	statisticCollection?: Array<{
		statNumber: number
		value: number
		displayValue: string
		rankCollection: Array<{
			rank: number
			points: number
		}>
	}>
}

export interface UserBonus {
	bonusDescription: string
	bonusName: string
	bonusRank: {
		rank: number
		statId: number
	}
	cardId: number
	cardName: string
	smallImage: z.infer<typeof sizeSchema>
	statName: string
	threshold: number
	value: number
}
