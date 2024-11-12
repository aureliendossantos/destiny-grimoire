import type { z } from "astro:content"
import type { imageSchema } from "$content/config"

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
	smallImage: z.infer<typeof imageSchema>["smallImage"]
	statName: string
	threshold: number
	value: number
}

// Destiny 2 types

export interface PresentationNode {
	displayProperties: DisplayProperties
	originalIcon: string
	// Some presentation nodes are meant to be explicitly shown on the "root" or "entry" screens for the feature to which they are related. You should use this icon when showing them on such a view, if you have a similar "entry point" view in your UI. If you don't have a UI, then I guess it doesn't matter either way does it?
	rootViewIcon: string
	nodeType: number
	// Primarily for Guardian Ranks, this property if the contents of this node are tied to the current season.
	isSeasonal: boolean
	// Indicates whether this presentation node's state is determined on a per-character or on an account-wide basis.
	scope: number
	objectiveHash: number
	completionRecordHash: number
	children: PresentationNodeChildrenBlock
	displayStyle: number
	screenStyle: number
	requirements: any
	disableChildSubscreenNavigation: boolean
	maxCategoryRecordScore: number
	presentationNodeType: number
	traitIds: Array<string>
	traitHashes: Array<number>
	parentNodeHashes: Array<number>
	hash: number
	index: number
	redacted: boolean
}

interface PresentationNodeChildrenBlock {
	presentationNodes: Array<{
		presentationNodeHash: number
		nodeDisplayPriority: number
	}>
	collectibles: Array<any>
	records: Array<{ recordHash: number; nodeDisplayPriority: number }>
	metrics: Array<any>
	craftables: Array<any>
}

export interface RecordDef {
	displayProperties: DisplayProperties
	scope: number
	loreHash: number
	recordTypeName: string
	hash: number
	index: number
	redacted: boolean
}

export interface Lore {
	displayProperties: DisplayProperties
	subtitle: string
	hash: number
	index: number
	redacted: boolean
	presentationNodeType: number
	parentNodeHashes: Array<number>
}

interface DisplayProperties {
	description: string
	name: string
	icon: string
	iconSequences: Array<any>
	highResIcon: string
	hasIcon: boolean
}
