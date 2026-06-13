# Agent Notes

This project is **The Grimoire Archive**, an Astro site for browsing and tracking Destiny 1 Grimoire cards and in the future, other Destiny 1 & 2 content. Frontend work should preserve the feeling of a useful archive: literary, restrained, readable, and directly navigable.

## Visual Direction

- Aim for "bookish archive", not game UI or marketing site.
- Prefer pale slate and paper-like neutrals, dark slate text, thin borders, and
  quiet shadows. Avoid loud gradients, neon colors, glassmorphism, and decorative
  blobs.
- Typography is part of the identity:
    - EB Garamond serif for lore and long reading.
    - Inter sans for controls and utility text.
    - Cromwell (`font-accent`) or EB Garamond small-caps (`font-smcp`) for section headings and labels.
- Use imagery when it helps navigation or card recognition, especially original card art. Keep it inspectable and avoid dark overlays that obscure content.
- The UI may be opinionated, but it should stay professional and obvious.

## Product Philosophy

- Be spoiler-aware for Grimoire Cards. Default public browsing can show structure, counts, and navigation without unnecessarily exposing every hidden card.
- Keep the site scalable beyond "tracker": names, navigation, and page structure should also work for cards, guides, books, translations, and future lore.
- Prefer archive/library language over app-dashboard language when both are equally clear.

## Frontend Practices

- Keep cards, grids, and navigation dense but readable. Do not nest cards inside cards.
- Highlight the active section in navigation and use semantic attributes such as `aria-current` where appropriate.

## SEO And Metadata

- Treat card pages as primary indexable content.
- Keep user-specific, login/logout, and search-result pages out of the index unless there is a deliberate reason to expose them.

## Implementation

- You may use `rg` to inspect the codebase.
- Do not revert user changes.
- Keep edits scoped. This site benefits more from careful polish than broad redesigns.
