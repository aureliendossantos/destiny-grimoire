# Guardian Compendium

This website allows to browse lore entries from the game _Destiny_ (2014, Bungie). Users can login with their PlayStation/Xbox username to see their own Grimoire Card collection and track their progress for various secret items. The website might later be expanded with _Destiny 2_ lore entries.

## Contributing

This is a very young project built with Astro and hosted with Vercel. Feel free to submit issues or contribute on the design, features, translations...

## Translating

The website is available in every language supported by the game in order to display the lore in the correct language. However, if a UI string isn't available, it will fallback to English. For now, everything that can be translated is located in `i18n.ts`, but we'll need a cleaner solution to facilitate contributions.

## Working with the Destiny API

### Getting Destiny 1 Definitions (Grimoire, Grimoire Cards...)

The Destiny 1 API does not seem to be officially documented, but you can find some info online. Basically:

1. Get an API key from Bungie then query the manifest (or from this website at `/d1manifest`).
2. Download one of the `.content` files in your preferred language.
3. Rename it to `.zip` and extract it.
4. You'll get a real, bigger `.content` file. It's an SQLite database you can explore by using this: https://inloop.github.io/sqlite-viewer/
5. Use this tool or another one to get a CSV/JSON of the desired definition.

You could automate this process, but these definitions probably won't change anyway. I store the D1 JSONs on this repo for simplicity and to be able to fix translation errors.

### Getting Destiny 2 Definitions

This is way easier and officially documented by Bungie. Simply query the manifest at the `/Destiny2/Manifest/` endpoint and you'll get links to localized definitions in JSON.

## Website Design

### Fonts usage

The original branding guide for Destiny ([archive](https://web.archive.org/web/20180625110519/https://www.bungie.net/en/AboutUs#!page=styleguide)), which is still more or less true for Destiny 2, indicates Neue Haas Grotesk for headlines and sub-headers, Adobe Garamond for body text, and Cromwell HPLHS for accent text. Futura is forbidden for anything else than the Destiny logo.

Not too bothered about fitting exactly into these guidelines, as I'm trying to add a personal touch to enhance readability, I'm using free alternatives: EB Garamond, which is usually my Garamond of choice, and Inter.

I love how Bungie uses Cromwell HPLHS for their in-game maps, and I use it for the main heading. The font is easy to find on various websites but tbh I'm not sure about the license.

## Todo

-[] legal info
-[] meta descriptions
-[] mini login form on the left of tracker guides
-[] mark as read (will be useful when we have D2 books)
-[] Update to Astro 5 & move translation strings in separate YAML files.
-[] ios disable zoom, or bigger mini login form
-[] back to grimoire link : anchor to the card we come from?
-[] "see more cards" button in grimoire (responsive)
-[] investigate the strange paths during build, and the weirds hints appearing during build and locally (not always the same though)

### Known issues

-[] searching for "Alpha Lupi" prints nothing, not even the error message, even though it should display several cards
-[] should he.encode before processing in isolateSentenceWithTerm, because in french, special chars like `«` count as too many chars. i.e. search `cayde` in french. related: we can't search for `éliksni`

## Astro Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
