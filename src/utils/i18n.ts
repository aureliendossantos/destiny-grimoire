export type SupportedLocale = "de" | "en" | "es" | "fr" | "it" | "ja" | "pt-br"

const supportedLocales: SupportedLocale[] = [
	"de",
	"en",
	"es",
	"fr",
	"it",
	"ja",
	"pt-br",
]
export const defaultLanguage: SupportedLocale = "en"

export const localeParams: (SupportedLocale | undefined)[] = [
	undefined,
	"fr",
	"pt-br",
	"de",
	"es",
	"it",
	"ja",
] // undefined is root, the default language
export const localeNames = {
	en: "English",
	fr: "Français",
	"pt-br": "Português",
	de: "Deutsch",
	es: "Español",
	it: "Italiano",
	ja: "日本語",
}

export const localePaths = localeParams.map((localePath) => {
	const locale = checkLocale(localePath)
	return {
		params: { locale: localePath },
		props: { t: useTranslations(locale), locale },
	}
})

/**
 * Check if the given string is an available language in the website routes. Used to type the value returned by Astro.currentLocale.
 */
export function checkLocale(lang?: string) {
	lang ??= defaultLanguage
	if (!supportedLocales.includes(lang as SupportedLocale))
		lang = defaultLanguage
	return lang as SupportedLocale
}

export type Translator = ReturnType<typeof useTranslations>
export function useTranslations(locale: SupportedLocale) {
	return function t(key: keyof (typeof translations)["en"]) {
		// @ts-ignore
		return translations[locale][key] || translations["en"][key]
	}
}

const card = {
	en: {
		"rarity-1": "Common card",
		"rarity-2": "Legendary card",
		"rarity-3": "Exotic card",
		"rarity-1-short": "Common",
		"rarity-2-short": "Legendary",
		"rarity-3-short": "Exotic",
		"not-found": "Not in collection",
		stats: "Stats",
		private: "Private",
		"unlocked-by": "Unlocked by reaching",
		rank: "rank",
		of: "of",
		Video: "Video",
	},
	fr: {
		"rarity-1": "Carte commune",
		"rarity-2": "Carte légendaire",
		"rarity-3": "Carte exotique",
		"rarity-1-short": "Commune",
		"rarity-2-short": "Légendaire",
		"rarity-3-short": "Exotique",
		"not-found": "Non débloquée",
		stats: "Statistiques",
		private: "Privé",
		"unlocked-by": "Débloqué en atteignant le",
		rank: "rang",
		of: "de",
		Video: "Vidéo",
	},
}

const headerFooter = {
	en: {
		"global-data": "Displaying global data. May contain spoilers.",
		"browse-yours": "Browse your own collection",
		logout: "Logout",
		"back-to-grimoire": "Back to Grimoire",
		"switch-to-your-collection": "Switch to your collection",
		"data-from": "Data from",
		"collection-of": "",
		Books: "Books",
		Grimoire: "Grimoire",
		Tracker: "Tracker",
		Search: "Search…",
	},
	fr: {
		"global-data":
			"Affichage des données globales. Peut contenir des spoilers.",
		"browse-yours": "Explorez votre propre collection",
		logout: "Déconnexion",
		"back-to-grimoire": "Retour au Grimoire",
		"switch-to-your-collection": "Passer à votre collection",
		"data-from": "Tiré de la",
		"collection-of": "collection de",
		Books: "Livres",
		Grimoire: "Grimoire",
		Tracker: "Progression",
		Search: "Rechercher…",
	},
}

const home = {
	en: {
		description:
			"Grimoire cards contain story elements, poems, and other secrets about the <i>Destiny</i> universe. They are unlocked in-game by participating in activities or finding hidden objects, and were once consulted on Bungie's website. However, this section of the official website was removed upon the release of <i>Destiny 2</i>, although the cards can still be unlocked and confer effects in the first game. Thanks to Bungie's <abbr>API</abbr>, still accessible, this site restores the lost features with improved readability.",
		"browse-your-grimoire": "Browse your Grimoire",
		"see-all-cards": "See all cards",
		spoilers: "Spoilers",
		card: "card",
		cards: "cards",
		points: "points",
		username: "Username",
		login: "Login",
		"switch-user": "Switch user",
		"no-account": "No account on Destiny?",
	},
	fr: {
		description:
			"Les cartes de Grimoire recèlent des éléments d'histoire, des poèmes et d'autres secrets à propos de l'univers de <i>Destiny</i>. Elles se débloquent dans le jeu en participant à des activités ou en trouvant des objets cachés, et se consultaient autrefois le site de Bungie. Cependant, cette section du site officiel a été supprimée à la sortie de <i>Destiny 2</i>, bien que les cartes puissent encore être débloquées et conférer des effets dans le premier jeu. Grâce à l'<abbr>API</abbr> de Bungie, toujours accessible, ce site restaure les fonctionnalités perdues avec un confort de lecture amélioré.",
		"browse-your-grimoire": "Consultez votre Grimoire",
		"see-all-cards": "Voir toutes les cartes",
		spoilers: "Spoilers",
		card: "carte",
		cards: "cartes",
		points: "points",
		username: "Pseudo",
		login: "Se connecter",
		"switch-user": "Changer d'utilisateur",
		"no-account": "Pas de compte sur Destiny ?",
	},
	de: {
		description:
			"Grimoire-Karten enthalten Story-Elemente, Gedichte und andere Geheimnisse über das <i>Destiny</i>-Universum. Sie werden im Spiel freigeschaltet durch die Teilnahme an Aktivitäten oder das Finden versteckter Objekte und wurden einst auf der Website von Bungie konsultiert. Allerdings wurde dieser Abschnitt der offiziellen Website bei der Veröffentlichung von <i>Destiny 2</i> entfernt, obwohl die Karten immer noch freigeschaltet und Effekte im ersten Spiel verleihen können. Dank Bungies <abbr>API</abbr>, die immer noch zugänglich ist, stellt diese Website die verlorenen Funktionen mit verbesserter Lesbarkeit wieder her.",
	},
	es: {
		description:
			"Las cartas del Grimorio contienen elementos de la historia, poemas y otros secretos sobre el universo de <i>Destiny</i>. Se desbloquean en el juego participando en actividades o encontrando objetos ocultos, y una vez se consultaban en el sitio web de Bungie. Sin embargo, esta sección del sitio web oficial fue eliminada al lanzamiento de <i>Destiny 2</i>, aunque las cartas todavía pueden desbloquearse y conferir efectos en el primer juego. Gracias a la <abbr>API</abbr> de Bungie, aún accesible, este sitio restaura las funciones perdidas con una legibilidad mejorada.",
	},
	it: {
		description:
			"Le carte del Grimorio contengono elementi della storia, poesie e altri segreti sull'universo di <i>Destiny</i>. Vengono sbloccate nel gioco partecipando ad attività o trovando oggetti nascosti, e una volta venivano consultate sul sito web di Bungie. Tuttavia, questa sezione del sito web ufficiale è stata rimossa al rilascio di <i>Destiny 2</i>, anche se le carte possono ancora essere sbloccate e conferire effetti nel primo gioco. Grazie all'<abbr>API</abbr> di Bungie, ancora accessibile, questo sito ripristina le funzionalità perse con una leggibilità migliorata.",
	},
	"pt-br": {
		description:
			"As cartas do Grimório contêm elementos da história, poemas e outros segredos sobre o universo de <i>Destiny</i>. Elas são desbloqueadas no jogo participando de atividades ou encontrando objetos escondidos, e eram consultadas no site da Bungie. No entanto, esta seção do site oficial foi removida com o lançamento de <i>Destiny 2</i>, embora as cartas ainda possam ser desbloqueadas e conferir efeitos no primeiro jogo. Graças à <abbr>API</abbr> da Bungie, ainda acessível, este site restaura as funcionalidades perdidas com uma legibilidade melhorada.",
	},
	ja: {
		description:
			"グリモアカードには、<i>Destiny</i>の世界に関するストーリー要素、詩、その他の秘密が含まれています。これらは、ゲーム内で活動に参加したり、隠しオブジェクトを見つけたりすることでアンロックされ、かつてはBungieのウェブサイトで参照されていました。ただし、この公式ウェブサイトのセクションは<i>Destiny 2</i>のリリース時に削除されましたが、カードは引き続きアンロックされ、最初のゲームで効果をもたらすことができます。Bungieの<abbr>API</abbr>のおかげで、引き続きアクセス可能なこのサイトは、失われた機能を改善された読みやすさで復元します。",
	},
}

const tracker = {
	en: {
		"Bonus tracker": "Bonus tracker",
		"Must be logged in": "You must be logged in to see this page.",
	},
	fr: {
		"Bonus tracker": "Progression des bonus",
		"Must be logged in":
			"Vous devez être connecté pour accéder à cette page.",
	},
}

const translations = {
	en: { ...card.en, ...headerFooter.en, ...tracker.en, ...home.en },
	fr: { ...card.fr, ...headerFooter.fr, ...tracker.fr, ...home.fr },
	de: { ...home.de },
	es: { ...home.es },
	it: { ...home.it },
	"pt-br": { ...home["pt-br"] },
	ja: { ...home.ja },
}
