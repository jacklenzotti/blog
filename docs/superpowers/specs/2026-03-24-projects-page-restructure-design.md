# Projects Page Restructure

## Summary

Restructure the blog's `/projects` page to reflect released games, move Hank/Hank Dash to Open Source, and add a teaser card. Game detail pages on the blog are removed in favor of linking to zottware.com. Hank/Hank Dash detail pages are also removed since cards now link to GitHub. OSS cards enhanced with example assets and social links. Zottware link added to navbar and footer.

## Changes

### 1. Projects Page (`/app/projects/page.tsx`)

#### Section 1 — Games

Replace the current "Featured Projects" section with a "Games" section.

**Callout banner** below the section header — a subtle bordered/muted paragraph:
- Text: "Two mobile games. One month. Built with AI agents." (or similar)
- Followed by a link to zottware.com

**3-card grid** (change to `md:grid-cols-3`):

| Card | Title | Description | Link | Image | Tags |
|------|-------|-------------|------|-------|------|
| 1 | ChessMatch | Chess strategy meets match-3 puzzling. 100 hand-designed levels. | `https://zottware.com/chessmatch` (external) | `chessmatch/feature.jpg` (existing) | iOS, Android, Steam |
| 2 | RhythmMatch | Beat-synced match-3 with synthwave vibes. | `https://zottware.com/rhythmmatch` (external) | `rhythmmatch/feature.png` (existing) | iOS, Android |
| 3 | Up Next | ??? | No link (non-clickable) | `crabs.png` (new) | Coming Soon |

Note: descriptions and tags are intentionally updated from current values ("A colorful chess puzzle game" / "A neon rhythm puzzle game" / "Coming Soon" tags removed, "Steam" added for ChessMatch).

The "Up Next" card: reduced opacity (~70%), no hover effect, no cursor pointer. Visually signals teaser.

#### Section 2 — Open Source

Add Hank and Hank Dash to the existing Open Source section. Remove them from Featured.

**5-item grid** (order: Hank, Hank Dash, ReelDeal, just-google-it, picasso):

| Card | Title | Description | Link | Tags | Extras |
|------|-------|-------------|------|------|--------|
| Hank | Hank | Autonomous AI coding agent for GitHub issues | `https://github.com/jacklenzotti/hank` (external) | CLI, Open Source | — |
| Hank Dash | Hank Dash | Real-time monitoring dashboard for Hank agents | `https://github.com/jacklenzotti/hank-dash` (external) | Web App, Open Source | — |
| ReelDeal | ReelDeal | (existing description) | (existing link) | Open Source, [YouTube](https://www.youtube.com/@zottware), [TikTok](https://www.tiktok.com/@zottwaregames) | Clickable tag links |
| just-google-it | just-google-it | (existing description) | (existing link) | (existing) | — |
| picasso | picasso | (existing description) | (existing link) | (existing) | Row of 3-4 example ChessMatch achievement icons as preview thumbnails |

#### Section 3 — GitHub Repositories

Unchanged.

### 2. ProjectCard Component (`/app/components/ProjectCard.tsx`)

Three enhancements:

**a) Optional href:** When no href is provided, render a `<div>` wrapper instead of `<Link>`/`<a>`, with no hover effect and no cursor pointer.

**b) Clickable tags:** Extend `tags` to support objects `{ label: string, href: string }` alongside plain strings. When a tag has an href, render it as an `<a>` link that opens in a new tab. Clicking a tag link should not navigate the parent card link (stopPropagation).

**c) Preview images:** Add an optional `previews` prop (array of image src strings). When present, render a row of small thumbnails (e.g. 8x8 or 10x10) below the description, before the tags.

### 3. Delete Detail Pages

Remove these files entirely:
- `/app/chessmatch/page.tsx`
- `/app/rhythmmatch/page.tsx`
- `/app/hank/page.tsx`
- `/app/hank-dash/page.tsx`

Keep the public assets (`/public/chessmatch/`, `/public/rhythmmatch/`) since the feature images are still used by the project cards on the projects page.

### 4. Add Assets

- Copy `/Users/jack/Desktop/crabs.png` to `public/crabs.png`
- Copy 3-4 ChessMatch achievement icons to `public/picasso-examples/` (e.g. ACH_COMBO_5.png, ACH_PERFECT_10.png, ACH_STARS_100.png, ACH_INFINITE_LOOP.png)

### 5. Update Home Page (`/app/page.tsx`)

The home page has a "Featured" subsection (lines ~148-173) with internal links to deleted pages. Update all three:
- `href="/chessmatch"` (line ~157) -> `https://zottware.com/chessmatch` (external)
- `href="/hank"` (line ~163) -> `https://github.com/jacklenzotti/hank` (external)
- `href="/hank-dash"` (line ~169) -> `https://github.com/jacklenzotti/hank-dash` (external)

### 6. Update Navbar (`/app/components/Navbar.tsx`)

Add a "Zottware" external link to the nav. Render as `<a>` with `target="_blank"` instead of `<Link>`, placed after "Contact" or as a visually distinct item.

### 7. Update Footer (`/app/components/Footer.tsx`)

Current state: has a ChessMatch link (line 38) pointing to `/chessmatch`, and links to `/hank` and `/hank-dash` (lines 39-40). No RhythmMatch link exists.

Actions:
- Update ChessMatch link to `https://zottware.com/chessmatch` (external)
- Update Hank link to `https://github.com/jacklenzotti/hank` (external)
- Update Hank Dash link to `https://github.com/jacklenzotti/hank-dash` (external)
- Add Zottware link (`https://zottware.com`, external)

### 8. Update Metadata

Remove metadata exports from deleted pages. Ensure no broken internal references anywhere.

## Out of Scope

- No changes to the zottware site
- No new detail pages on the blog for games
- GitHub Repositories section unchanged
