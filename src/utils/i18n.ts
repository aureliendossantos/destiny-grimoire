export type SupportedLocale = "de" | "en" | "es" | "fr" | "it" | "ja" | "pt-br"

export const supportedLocales: SupportedLocale[] = [
	"de",
	"en",
	"es",
	"fr",
	"it",
	"ja",
	"pt-br",
]
export const defaultLanguage: SupportedLocale = "en"

export const localeParams: SupportedLocale[] = [
	"en",
	"fr",
	"pt-br",
	"de",
	"es",
	"it",
	"ja",
]
export const localizedRouteParams: (SupportedLocale | undefined)[] = [
	undefined,
	"fr",
	"pt-br",
	"de",
	"es",
	"it",
	"ja",
]
export const prefixedRouteParams: SupportedLocale[] =
	localizedRouteParams.filter((locale): locale is SupportedLocale => !!locale)
export const localeNames = {
	en: "English",
	fr: "Français",
	"pt-br": "Português",
	de: "Deutsch",
	es: "Español",
	it: "Italiano",
	ja: "日本語",
}

export const getLocalizedRouteParams = (locale?: SupportedLocale) => ({
	locale,
})

export const localePaths = localizedRouteParams.map((localePath) => {
	const locale = checkLocale(localePath)
	return {
		params: getLocalizedRouteParams(localePath),
		props: { t: useTranslations(locale), locale },
	}
})

/**
 * Check if the given string is an available language in the website routes.
 */
export function isSupportedLocale(lang?: string): lang is SupportedLocale {
	return supportedLocales.includes(lang as SupportedLocale)
}

export function checkLocale(lang?: string) {
	return isSupportedLocale(lang) ? lang : defaultLanguage
}

export function getRouteLocale(lang?: string) {
	if (lang == undefined) return defaultLanguage
	if (lang.includes("/")) return undefined
	return isSupportedLocale(lang) ? lang : undefined
}

export function getLocaleFromPathname(pathname: string) {
	return isSupportedLocale(pathname.split("/")[1])
		? (pathname.split("/")[1] as SupportedLocale)
		: undefined
}

export function stripLocaleFromPathname(pathname: string) {
	const parts = pathname.split("/")
	if (isSupportedLocale(parts[1])) {
		const rest = `/${parts.slice(2).join("/")}`
		return rest === "/" ? "/" : rest.replace(/\/$/, "")
	}
	return pathname || "/"
}

export function getLocalizedPath(locale: SupportedLocale, path = "/") {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`
	if (locale === defaultLanguage) return normalizedPath
	return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`
}

export function htmlLang(locale: SupportedLocale) {
	return locale == "pt-br" ? "pt-BR" : locale
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
		"card-illustration-alt": "Card illustration",
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
		Bonus: "Bonus",
		Video: "Video",
		Guide: "Guide",
		"points-short": "pts",
	},
	fr: {
		"card-illustration-alt": "Illustration de carte",
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
		Bonus: "Bonus",
		Video: "Vidéo",
		Guide: "Guide",
		"points-short": "pts",
	},
	de: {
		"card-illustration-alt": "Kartenillustration",
		"rarity-1": "Gewöhnliche Karte",
		"rarity-2": "Legendäre Karte",
		"rarity-3": "Exotische Karte",
		"rarity-1-short": "Gewöhnlich",
		"rarity-2-short": "Legendär",
		"rarity-3-short": "Exotisch",
		"not-found": "Nicht in der Sammlung",
		stats: "Statistiken",
		private: "Privat",
		"unlocked-by": "Freigeschaltet durch Erreichen von",
		rank: "Rang",
		of: "von",
		Bonus: "Bonus",
		Video: "Video",
		Guide: "Guide",
		"points-short": "Pkt.",
	},
	es: {
		"card-illustration-alt": "Ilustración de carta",
		"rarity-1": "Carta común",
		"rarity-2": "Carta legendaria",
		"rarity-3": "Carta excepcional",
		"rarity-1-short": "Común",
		"rarity-2-short": "Legendaria",
		"rarity-3-short": "Excepcional",
		"not-found": "No está en la colección",
		stats: "Estadísticas",
		private: "Privado",
		"unlocked-by": "Se desbloquea al alcanzar",
		rank: "rango",
		of: "de",
		Bonus: "Bonificación",
		Video: "Vídeo",
		Guide: "Guía",
		"points-short": "pts.",
	},
	it: {
		"card-illustration-alt": "Illustrazione della carta",
		"rarity-1": "Carta comune",
		"rarity-2": "Carta leggendaria",
		"rarity-3": "Carta esotica",
		"rarity-1-short": "Comune",
		"rarity-2-short": "Leggendaria",
		"rarity-3-short": "Esotica",
		"not-found": "Non nella collezione",
		stats: "Statistiche",
		private: "Privato",
		"unlocked-by": "Sbloccato raggiungendo",
		rank: "grado",
		of: "di",
		Bonus: "Bonus",
		Video: "Video",
		Guide: "Guida",
		"points-short": "pt",
	},
	"pt-br": {
		"card-illustration-alt": "Ilustração da carta",
		"rarity-1": "Carta comum",
		"rarity-2": "Carta lendária",
		"rarity-3": "Carta exótica",
		"rarity-1-short": "Comum",
		"rarity-2-short": "Lendária",
		"rarity-3-short": "Exótica",
		"not-found": "Fora da coleção",
		stats: "Estatísticas",
		private: "Privado",
		"unlocked-by": "Desbloqueado ao alcançar",
		rank: "nível",
		of: "de",
		Bonus: "Bônus",
		Video: "Vídeo",
		Guide: "Guia",
		"points-short": "pts.",
	},
	ja: {
		"card-illustration-alt": "カード画像",
		"rarity-1": "コモンカード",
		"rarity-2": "レジェンダリーカード",
		"rarity-3": "エキゾチックカード",
		"rarity-1-short": "コモン",
		"rarity-2-short": "レジェンダリー",
		"rarity-3-short": "エキゾチック",
		"not-found": "コレクション未所持",
		stats: "ステータス",
		private: "非公開",
		"unlocked-by": "到達でアンロック:",
		rank: "ランク",
		of: "の",
		Bonus: "ボーナス",
		Video: "動画",
		Guide: "ガイド",
		"points-short": "pt",
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
		About: "About this website",
		Search: "Search…",
		Home: "Home",
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
		Home: "Accueil",
	},
	de: {
		"global-data":
			"Globale Daten werden angezeigt. Kann Spoiler enthalten.",
		"browse-yours": "Eigene Sammlung ansehen",
		logout: "Abmelden",
		"back-to-grimoire": "Zurück zum Grimoire",
		"switch-to-your-collection": "Zu deiner Sammlung wechseln",
		"data-from": "Daten aus der",
		"collection-of": "Sammlung von",
		Books: "Bücher",
		Grimoire: "Grimoire",
		Tracker: "Tracker",
		Search: "Suchen…",
		Home: "Start",
	},
	es: {
		"global-data": "Mostrando datos globales. Puede contener spoilers.",
		"browse-yours": "Explora tu propia colección",
		logout: "Cerrar sesión",
		"back-to-grimoire": "Volver al Grimorio",
		"switch-to-your-collection": "Cambiar a tu colección",
		"data-from": "Datos de la",
		"collection-of": "colección de",
		Books: "Libros",
		Grimoire: "Grimorio",
		Tracker: "Rastreador",
		Search: "Buscar…",
		Home: "Inicio",
	},
	it: {
		"global-data":
			"Visualizzazione dei dati globali. Può contenere spoiler.",
		"browse-yours": "Esplora la tua collezione",
		logout: "Esci",
		"back-to-grimoire": "Torna al Grimorio",
		"switch-to-your-collection": "Passa alla tua collezione",
		"data-from": "Dati dalla",
		"collection-of": "collezione di",
		Books: "Libri",
		Grimoire: "Grimorio",
		Tracker: "Tracker",
		Search: "Cerca…",
		Home: "Home",
	},
	"pt-br": {
		"global-data": "Exibindo dados globais. Pode conter spoilers.",
		"browse-yours": "Explore sua própria coleção",
		logout: "Sair",
		"back-to-grimoire": "Voltar ao Grimório",
		"switch-to-your-collection": "Mudar para sua coleção",
		"data-from": "Dados da",
		"collection-of": "coleção de",
		Books: "Livros",
		Grimoire: "Grimório",
		Tracker: "Rastreador",
		Search: "Buscar…",
		Home: "Início",
	},
	ja: {
		"global-data":
			"全体データを表示しています。ネタバレを含む場合があります。",
		"browse-yours": "自分のコレクションを見る",
		logout: "ログアウト",
		"back-to-grimoire": "グリモアに戻る",
		"switch-to-your-collection": "自分のコレクションに切り替え",
		"data-from": "データ元: ",
		"collection-of": "コレクション: ",
		Books: "書物",
		Grimoire: "グリモア",
		Tracker: "トラッカー",
		Search: "検索…",
		Home: "ホーム",
	},
}

const home = {
	en: {
		"What are Grimoire Cards": "What are Grimoire Cards?",
		description:
			"Grimoire Cards contain story elements, poems, and other secrets about the <i>Destiny</i> universe. They can be unlocked in-game by participating in various activities or discovering hidden objects and were once accessible on Bungie's official website. However, with the release of <i>Destiny 2</i>, this section was removed from the site. Although the cards can still be unlocked and confer benefits in the first game, they are no longer officially available online. Using Bungie's <abbr>API</abbr>, still accessible, this site restores those lost features with enhanced readability.",
		"browse-your-grimoire": "Browse your Grimoire",
		"see-all-cards": "See all cards",
		spoilers: "Spoilers",
		"show-unobtained-cards": "Show unobtained cards",
		"dashboard-grimoire-title": "Grimoire Cards",
		"dashboard-grimoire-subtitle": "Browse the Destiny 1 archive",
		"dashboard-tracker-title": "Tracker",
		"dashboard-tracker-subtitle": "Hidden items and guides",
		"dashboard-about-title": "About",
		"about-title": "About",
		"about-summary":
			"Privacy, credits, and context for The Grimoire Archive.",
		"open-source-title": "About me",
		"open-source-body":
			'<p>This website is open source on <a href="https://github.com/aureliendossantos/destiny-grimoire" target="_blank">GitHub</a> and contributions are welcome. I intend to keep the website up for the long term. If it ever goes down, you can always download the source code, which includes archived Grimoire data.</p><p>If you feel like supporting my work, you can wishlist my own game, <a href="https://store.steampowered.com/app/4202020/Koimori" target="_blank" rel="noopener noreferrer">Koimori</a>, on Steam. Thanks!</p><p>I am also available for web & game dev work, feel free to get my contact info on GitHub.</p>',
		"privacy-title": "Privacy",
		"privacy-body":
			"<p>The site stores a <code>userLocale</code> cookie when you change language, so future visits can keep the selected locale.</p><p>When you log in with a Destiny username, the site stores a <code>grimoireLogin</code> cookie containing your platform, Bungie membership ID, username, and small display details for your banner. This keeps you logged in and lets the grimoire show your collection.</p><p>The show unobtained cards preference is stored locally in a cookie and only controls how your collection is displayed on this site.</p><p>Vercel Analytics is enabled to understand aggregate page traffic and site performance.</p><p>Username lookups are sent to the Bungie API to find the matching Destiny 1 membership and load public grimoire collection data. The site does not ask for your Bungie password or OAuth access.</p>",
		"credits-title": "Bungie credits",
		"credits-body":
			"<p>Destiny, Grimoire text, card images, and related game data belong to Bungie.</p><p>The Grimoire Archive restores access to lost functionality with data available from Bungie's public API, some of which are archived to ensure long-term availability.</p>",
		card: "card",
		cards: "cards",
		points: "points",
		username: "Username",
		login: "Login",
		"no-account": "No account required. Use your Destiny 1 username.",
		"switch-user": "Switch user",
		"grimoire-cards": "Grimoire Cards",
	},
	fr: {
		"What are Grimoire Cards": "Que sont les cartes de Grimoire ?",
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
		"grimoire-cards": "Cartes de Grimoire",
		"open-source-title": "À propos de moi",
		"open-source-body":
			'<p>Ce site est open source sur <a href="https://github.com/aureliendossantos/destiny-grimoire" target="_blank">GitHub</a> et les contributions sont les bienvenues. J’ai l’intention de le maintenir en ligne sur le long terme. S’il venait à disparaître, vous pourrez toujours télécharger le code source, qui inclut les données archivées du Grimoire.</p><p>Si vous souhaitez soutenir mon travail, vous pouvez ajouter mon propre jeu, <a href="https://store.steampowered.com/app/4202020/Koimori" target="_blank" rel="noopener noreferrer">Koimori</a>, à votre liste de souhaits sur Steam. Merci !</p><p>Je suis aussi disponible pour des missions de développement web &amp; jeu vidéo ; vous pouvez trouver mes coordonnées sur GitHub.</p>',
		"credits-title": "Crédits Bungie",
		"credits-body":
			"<p>Destiny, les textes du Grimoire, les images des cartes et les données de jeu associées appartiennent à Bungie.</p><p>The Grimoire Archive restaure l’accès à des fonctionnalités disparues grâce aux données disponibles dans l’API publique de Bungie, dont une partie est archivée afin d’assurer leur disponibilité à long terme.</p>",
	},
	de: {
		"What are Grimoire Cards": "Was sind Grimoire-Karten?",
		description:
			"Grimoire-Karten enthalten Story-Elemente, Gedichte und andere Geheimnisse über das <i>Destiny</i>-Universum. Sie werden im Spiel freigeschaltet durch die Teilnahme an Aktivitäten oder das Finden versteckter Objekte und wurden einst auf der Website von Bungie konsultiert. Allerdings wurde dieser Abschnitt der offiziellen Website bei der Veröffentlichung von <i>Destiny 2</i> entfernt, obwohl die Karten immer noch freigeschaltet und Effekte im ersten Spiel verleihen können. Dank Bungies <abbr>API</abbr>, die immer noch zugänglich ist, stellt diese Website die verlorenen Funktionen mit verbesserter Lesbarkeit wieder her.",
		"browse-your-grimoire": "Durchsuche dein Grimoire",
		"see-all-cards": "Alle Karten anzeigen",
		spoilers: "Spoiler",
		card: "Karte",
		cards: "Karten",
		points: "Punkte",
		username: "Benutzername",
		login: "Anmelden",
		"switch-user": "Benutzer wechseln",
		"grimoire-cards": "Grimoire-Karten",
		"open-source-title": "Über mich",
		"open-source-body":
			'<p>Diese Website ist auf <a href="https://github.com/aureliendossantos/destiny-grimoire" target="_blank">GitHub</a> quelloffen, und Beiträge sind willkommen. Ich möchte die Website langfristig online halten. Falls sie irgendwann nicht mehr erreichbar sein sollte, kannst du jederzeit den Quellcode herunterladen; er enthält archivierte Grimoire-Daten.</p><p>Wenn du meine Arbeit unterstützen möchtest, kannst du mein eigenes Spiel <a href="https://store.steampowered.com/app/4202020/Koimori" target="_blank" rel="noopener noreferrer">Koimori</a> auf Steam auf deine Wunschliste setzen. Danke!</p><p>Ich bin außerdem für Web- und Game-Development-Arbeiten verfügbar; meine Kontaktdaten findest du auf GitHub.</p>',
		"credits-title": "Bungie-Credits",
		"credits-body":
			"<p>Destiny, Grimoire-Texte, Kartenbilder und zugehörige Spieldaten gehören Bungie.</p><p>The Grimoire Archive stellt verlorene Funktionen mithilfe von Daten wieder her, die über Bungies öffentliche API verfügbar sind. Einige davon werden archiviert, um ihre langfristige Verfügbarkeit zu sichern.</p>",
	},
	es: {
		"What are Grimoire Cards": "¿Qué son las cartas del Grimorio?",
		description:
			"Las cartas del Grimorio contienen elementos de la historia, poemas y otros secretos sobre el universo de <i>Destiny</i>. Se desbloquean en el juego participando en actividades o encontrando objetos ocultos, y una vez se consultaban en el sitio web de Bungie. Sin embargo, esta sección del sitio web oficial fue eliminada al lanzamiento de <i>Destiny 2</i>, aunque las cartas todavía pueden desbloquearse y conferir efectos en el primer juego. Gracias a la <abbr>API</abbr> de Bungie, aún accesible, este sitio restaura las funciones perdidas con una legibilidad mejorada.",
		"browse-your-grimoire": "Consulta tu Grimorio",
		"see-all-cards": "Ver todas las cartas",
		spoilers: "Spoilers",
		card: "carta",
		cards: "cartas",
		points: "puntos",
		username: "Nombre de usuario",
		login: "Iniciar sesión",
		"switch-user": "Cambiar de usuario",
		"grimoire-cards": "Cartas del Grimorio",
		"open-source-title": "Sobre mí",
		"open-source-body":
			'<p>Este sitio web es de código abierto en <a href="https://github.com/aureliendossantos/destiny-grimoire" target="_blank">GitHub</a> y las contribuciones son bienvenidas. Mi intención es mantenerlo disponible a largo plazo. Si algún día deja de estar en línea, siempre podrás descargar el código fuente, que incluye datos archivados del Grimorio.</p><p>Si quieres apoyar mi trabajo, puedes añadir mi propio juego, <a href="https://store.steampowered.com/app/4202020/Koimori" target="_blank" rel="noopener noreferrer">Koimori</a>, a tu lista de deseados en Steam. ¡Gracias!</p><p>También estoy disponible para trabajos de desarrollo web y de videojuegos; puedes encontrar mi información de contacto en GitHub.</p>',
		"credits-title": "Créditos de Bungie",
		"credits-body":
			"<p>Destiny, los textos del Grimorio, las imágenes de las cartas y los datos de juego relacionados pertenecen a Bungie.</p><p>The Grimoire Archive restaura el acceso a funcionalidades perdidas con datos disponibles en la API pública de Bungie, algunos de los cuales se archivan para garantizar su disponibilidad a largo plazo.</p>",
	},
	it: {
		"What are Grimoire Cards": "Cosa sono le carte del Grimorio?",
		description:
			"Le carte del Grimorio contengono elementi della storia, poesie e altri segreti sull'universo di <i>Destiny</i>. Vengono sbloccate nel gioco partecipando ad attività o trovando oggetti nascosti, e una volta venivano consultate sul sito web di Bungie. Tuttavia, questa sezione del sito web ufficiale è stata rimossa al rilascio di <i>Destiny 2</i>, anche se le carte possono ancora essere sbloccate e conferire effetti nel primo gioco. Grazie all'<abbr>API</abbr> di Bungie, ancora accessibile, questo sito ripristina le funzionalità perse con una leggibilità migliorata.",
		"browse-your-grimoire": "Consulta il tuo Grimorio",
		"see-all-cards": "Vedi tutte le carte",
		spoilers: "Spoiler",
		card: "carta",
		cards: "carte",
		points: "punti",
		username: "Nome utente",
		login: "Accedi",
		"switch-user": "Cambia utente",
		"grimoire-cards": "Carte del Grimorio",
		"open-source-title": "Chi sono",
		"open-source-body":
			'<p>Questo sito è open source su <a href="https://github.com/aureliendossantos/destiny-grimoire" target="_blank">GitHub</a> e i contributi sono benvenuti. Intendo mantenerlo online a lungo termine. Se un giorno non fosse più disponibile, potrai sempre scaricare il codice sorgente, che include i dati archiviati del Grimorio.</p><p>Se vuoi sostenere il mio lavoro, puoi aggiungere alla lista dei desideri il mio gioco, <a href="https://store.steampowered.com/app/4202020/Koimori" target="_blank" rel="noopener noreferrer">Koimori</a>, su Steam. Grazie!</p><p>Sono anche disponibile per lavori di sviluppo web e videogiochi; puoi trovare le mie informazioni di contatto su GitHub.</p>',
		"credits-title": "Crediti Bungie",
		"credits-body":
			"<p>Destiny, i testi del Grimorio, le immagini delle carte e i dati di gioco correlati appartengono a Bungie.</p><p>The Grimoire Archive ripristina l’accesso a funzionalità perdute usando dati disponibili dall’API pubblica di Bungie, alcuni dei quali sono archiviati per garantirne la disponibilità a lungo termine.</p>",
	},
	"pt-br": {
		"What are Grimoire Cards": "O que são as cartas do Grimório?",
		description:
			"As cartas do Grimório contêm elementos da história, poemas e outros segredos sobre o universo de <i>Destiny</i>. Elas são desbloqueadas no jogo participando de atividades ou encontrando objetos escondidos, e eram consultadas no site da Bungie. No entanto, esta seção do site oficial foi removida com o lançamento de <i>Destiny 2</i>, embora as cartas ainda possam ser desbloqueadas e conferir efeitos no primeiro jogo. Graças à <abbr>API</abbr> da Bungie, ainda acessível, este site restaura as funcionalidades perdidas com uma legibilidade melhorada.",
		"browse-your-grimoire": "Consulte seu Grimório",
		"see-all-cards": "Ver todas as cartas",
		spoilers: "Spoilers",
		card: "carta",
		cards: "cartas",
		points: "pontos",
		username: "Nome de usuário",
		login: "Entrar",
		"switch-user": "Trocar usuário",
		"grimoire-cards": "Cartas do Grimório",
		"open-source-title": "Sobre mim",
		"open-source-body":
			'<p>Este site é open source no <a href="https://github.com/aureliendossantos/destiny-grimoire" target="_blank">GitHub</a> e contribuições são bem-vindas. Pretendo manter o site no ar a longo prazo. Se um dia ele sair do ar, você sempre poderá baixar o código-fonte, que inclui dados arquivados do Grimório.</p><p>Se quiser apoiar meu trabalho, você pode adicionar meu próprio jogo, <a href="https://store.steampowered.com/app/4202020/Koimori" target="_blank" rel="noopener noreferrer">Koimori</a>, à sua lista de desejos no Steam. Obrigado!</p><p>Também estou disponível para trabalhos de desenvolvimento web e de jogos; minhas informações de contato estão no GitHub.</p>',
		"credits-title": "Créditos da Bungie",
		"credits-body":
			"<p>Destiny, os textos do Grimório, as imagens das cartas e os dados de jogo relacionados pertencem à Bungie.</p><p>The Grimoire Archive restaura o acesso a funcionalidades perdidas com dados disponíveis na API pública da Bungie, alguns dos quais são arquivados para garantir disponibilidade a longo prazo.</p>",
	},
	ja: {
		"What are Grimoire Cards": "グリモアカードとは？",
		description:
			"グリモアカードには、<i>Destiny</i>の世界に関するストーリー要素、詩、その他の秘密が含まれています。これらは、ゲーム内で活動に参加したり、隠しオブジェクトを見つけたりすることでアンロックされ、かつてはBungieのウェブサイトで参照されていました。ただし、この公式ウェブサイトのセクションは<i>Destiny 2</i>のリリース時に削除されましたが、カードは引き続きアンロックされ、最初のゲームで効果をもたらすことができます。Bungieの<abbr>API</abbr>のおかげで、引き続きアクセス可能なこのサイトは、失われた機能を改善された読みやすさで復元します。",
		"browse-your-grimoire": "自分のグリモアを見る",
		"see-all-cards": "すべてのカードを見る",
		spoilers: "ネタバレ",
		card: "カード",
		cards: "カード",
		points: "ポイント",
		username: "ユーザー名",
		login: "ログイン",
		"switch-user": "ユーザーを切り替え",
		"grimoire-cards": "グリモアカード",
		"open-source-title": "作者について",
		"open-source-body":
			'<p>このウェブサイトは<a href="https://github.com/aureliendossantos/destiny-grimoire" target="_blank">GitHub</a>でオープンソースとして公開されており、コントリビューションを歓迎しています。サイトは長期的に公開し続けるつもりです。もし将来サイトが利用できなくなっても、アーカイブ済みのグリモアデータを含むソースコードはいつでもダウンロードできます。</p><p>私の活動を支援したい場合は、Steamで私自身のゲーム<a href="https://store.steampowered.com/app/4202020/Koimori" target="_blank" rel="noopener noreferrer">Koimori</a>をウィッシュリストに追加していただけると助かります。ありがとうございます！</p><p>Webおよびゲーム開発の仕事も受け付けています。連絡先はGitHubで確認できます。</p>',
		"credits-title": "Bungieのクレジット",
		"credits-body":
			"<p>Destiny、グリモアのテキスト、カード画像、および関連するゲームデータはBungieに帰属します。</p><p>The Grimoire Archiveは、Bungieの公開APIから取得できるデータを使って失われた機能へのアクセスを復元しています。その一部は長期的な利用可能性を確保するためにアーカイブされています。</p>",
	},
}

const grimoire = {
	en: {
		"g-Login": "Login",
		"g-to see yours": "to see your own collection.",
		"g-Collection of": "Collection of",
	},
	fr: {
		"g-Login": "Connectez-vous",
		"g-to see yours": "pour voir votre propre collection.",
		"g-Collection of": "Collection de",
	},
	de: {
		"g-Login": "Anmelden",
		"g-to see yours": "um deine eigene Sammlung zu sehen.",
		"g-Collection of": "Sammlung von",
	},
	es: {
		"g-Login": "Inicia sesión",
		"g-to see yours": "para ver tu propia colección.",
		"g-Collection of": "Colección de",
	},
	it: {
		"g-Login": "Accedi",
		"g-to see yours": "per vedere la tua collezione.",
		"g-Collection of": "Collezione di",
	},
	"pt-br": {
		"g-Login": "Entre",
		"g-to see yours": "para ver sua própria coleção.",
		"g-Collection of": "Coleção de",
	},
	ja: {
		"g-Login": "ログイン",
		"g-to see yours": "して自分のコレクションを見る。",
		"g-Collection of": "コレクション:",
	},
}

const tracker = {
	en: {
		"t-places": "places",
		"Bonus tracker": "Bonus tracker",
		"Must be logged in": "You must be logged in to see this page.",
		"See also": "See also",
		"Grimoire bonuses of": "Grimoire bonuses of",
		"active bonuses": "active bonuses",
		"in progress": "in progress",
	},
	fr: {
		"t-places": "lieux",
		"Bonus tracker": "Progression des bonus",
		"Must be logged in":
			"Vous devez être connecté pour accéder à cette page.",
		"See also": "Voir aussi",
		"Grimoire bonuses of": "Bonus du Grimoire de",
		"active bonuses": "bonus actifs",
		"in progress": "en progression",
	},
	de: {
		"t-places": "Orte",
		"Bonus tracker": "Bonus-Tracker",
		"Must be logged in":
			"Du musst angemeldet sein, um diese Seite zu sehen.",
		"See also": "Siehe auch",
		"Grimoire bonuses of": "Grimoire-Boni von",
		"active bonuses": "aktive Boni",
		"in progress": "in Arbeit",
	},
	es: {
		"t-places": "lugares",
		"Bonus tracker": "Rastreador de bonificaciones",
		"Must be logged in": "Debes iniciar sesión para ver esta página.",
		"See also": "Ver también",
		"Grimoire bonuses of": "Bonificaciones del Grimorio de",
		"active bonuses": "bonificaciones activas",
		"in progress": "en progreso",
	},
	it: {
		"t-places": "luoghi",
		"Bonus tracker": "Tracker dei bonus",
		"Must be logged in":
			"Devi effettuare l'accesso per vedere questa pagina.",
		"See also": "Vedi anche",
		"Grimoire bonuses of": "Bonus del Grimorio di",
		"active bonuses": "bonus attivi",
		"in progress": "in corso",
	},
	"pt-br": {
		"t-places": "locais",
		"Bonus tracker": "Rastreador de bônus",
		"Must be logged in": "Você precisa entrar para ver esta página.",
		"See also": "Veja também",
		"Grimoire bonuses of": "Bônus do Grimório de",
		"active bonuses": "bônus ativos",
		"in progress": "em progresso",
	},
	ja: {
		"t-places": "か所",
		"Bonus tracker": "ボーナストラッカー",
		"Must be logged in": "このページを見るにはログインが必要です。",
		"See also": "関連項目",
		"Grimoire bonuses of": "グリモアボーナス:",
		"active bonuses": "有効なボーナス",
		"in progress": "進行中",
	},
}

const search = {
	en: {
		"s-Search results": "Search results",
		"s-No results": "No results for search",
		"s-Empty search": "Empty search",
		"s-Empty search help": "Enter a keyword to search the Grimoire.",
	},
	fr: {
		"s-Search results": "Résultats de recherche",
		"s-No results": "Aucun résultat pour la recherche",
		"s-Empty search": "Recherche vide",
		"s-Empty search help":
			"Saisissez un mot-clé pour rechercher dans le Grimoire.",
	},
	de: {
		"s-Search results": "Suchergebnisse",
		"s-No results": "Keine Ergebnisse für die Suche",
		"s-Empty search": "Leere Suche",
		"s-Empty search help":
			"Gib ein Stichwort ein, um das Grimoire zu durchsuchen.",
	},
	es: {
		"s-Search results": "Resultados de búsqueda",
		"s-No results": "No hay resultados para la búsqueda",
		"s-Empty search": "Búsqueda vacía",
		"s-Empty search help":
			"Introduce una palabra clave para buscar en el Grimorio.",
	},
	it: {
		"s-Search results": "Risultati di ricerca",
		"s-No results": "Nessun risultato per la ricerca",
		"s-Empty search": "Ricerca vuota",
		"s-Empty search help":
			"Inserisci una parola chiave per cercare nel Grimorio.",
	},
	"pt-br": {
		"s-Search results": "Resultados da busca",
		"s-No results": "Nenhum resultado para a busca",
		"s-Empty search": "Busca vazia",
		"s-Empty search help":
			"Digite uma palavra-chave para buscar no Grimório.",
	},
	ja: {
		"s-Search results": "検索結果",
		"s-No results": "検索結果がありません",
		"s-Empty search": "検索語が空です",
		"s-Empty search help":
			"グリモアを検索するキーワードを入力してください。",
	},
}

const translations = {
	en: {
		...card.en,
		...headerFooter.en,
		...grimoire.en,
		...tracker.en,
		...search.en,
		...home.en,
	},
	fr: {
		...card.fr,
		...headerFooter.fr,
		...grimoire.fr,
		...tracker.fr,
		...search.fr,
		...home.fr,
	},
	de: {
		...card.de,
		...headerFooter.de,
		...grimoire.de,
		...tracker.de,
		...search.de,
		...home.de,
	},
	es: {
		...card.es,
		...headerFooter.es,
		...grimoire.es,
		...tracker.es,
		...search.es,
		...home.es,
	},
	it: {
		...card.it,
		...headerFooter.it,
		...grimoire.it,
		...tracker.it,
		...search.it,
		...home.it,
	},
	"pt-br": {
		...card["pt-br"],
		...headerFooter["pt-br"],
		...grimoire["pt-br"],
		...tracker["pt-br"],
		...search["pt-br"],
		...home["pt-br"],
	},
	ja: {
		...card.ja,
		...headerFooter.ja,
		...grimoire.ja,
		...tracker.ja,
		...search.ja,
		...home.ja,
	},
}
