
# Agents.md — Unbounded School

Static HTML/CSS/JS site for a family homeschool portfolio and local co-op interest page.

**Live site is source of truth:** https://unbounded.school  
When the user says they pushed/changed something live, pull the live page before editing local files.

---

## Stack & layout

- Pure static site: HTML + shared `styles.css` + small page scripts
- No build step, no framework
- Design system: warm paper background, green accent, Fraunces (headings) + Source Sans 3 (body)
- Shared chrome: sticky top nav (logo → home, Schedule, Students dropdown), section heads with icon + optional right-side dashboard links
- Max content width ~1056px (`.page`)

### Top-level pages

| Path | Role |
|------|------|
| `index.html` | Homepage: full-viewport hero, large logo, tagline, bubble links (no site nav) |
| `schedule.html` | Daily schedule + year structure + tools |
| `coop.html` | Local Colwich/Andale homeschool mailing list + Wufoo embed |
| `styles.css` | Global styles |
| `Wufoo.css` | External theme for Wufoo forms (linked in Wufoo theme editor) |
| `map/` | Simplemaps world map (`mapdata.js`, `worldmap.js`) used on transcripts |
| `unbounded-logo.svg` / `.png` | Brand assets |

### Students

students/
scarlett/
transcripts.html          # Main portfolio (per-student; not site-root)
art/                      # Art images (MonArt grid, etc.)
books/                    # Book cover images
hero/                     # Hero/thumbnail images for writing & projects
testing/                  # MAP RIT chart images
writing/4thgrade/         # Writing entry HTML pages
projects/4thgrade/        # Project HTML + media (video, photos)
reportcards/              # fall-2025, winter-2025, spring-2026
juliet/
transcripts.html          # Placeholder “coming soon”

Each student has their own `transcripts.html`. Do not put transcripts at site root.

---

## Conventions

### Paths & links
- Logo / school name always link to `/index.html`
- Prefer including `.html` in internal hrefs when editing
- Live may use pretty URLs without `.html`; local files are `.html`

### Nav
- Standard nav: logo, Schedule, Students → Scarlett / Juliet
- **Do not** put Co-op in the main nav
- Homepage (`page-home`) has no nav bar

### When editing
1. Match existing patterns on the same page
2. After user deploys manual changes, pull live and overwrite local if asked
3. List files touched in the reply
4. Keep mobile in mind

---

## Transcripts (`students/scarlett/transcripts.html`)

Sections: Testing → Math → Reading & Writing → Projects → Science/SS  
(Travel + map stay outside grade panels.)

- Grade switchers shared; `?grade=5th` / `?grade=4th` selects all sections
- Progress cards with bars + 100% checkmarks
- Lexia: score circles (accuracy grades, not % complete) — 16–18 on 4th, 19–21 on 5th
- Project cards: thumbnail + title + category
- Empty 5th content: “Nothing here yet, check back!”

---

## Other pages
- **Co-op:** numbered steps + Wufoo embed; theme via `Wufoo.css`
- **Homepage:** large logo, tagline “A different take on education.”, bubble links
- **Analytics:** Fathom `FXWFKUXE` on every HTML page

---

## Quick task map

| Task | File |
|------|------|
| Progress / books / projects UI | `students/scarlett/transcripts.html` |
| Look & components | `styles.css` |
| Co-op / form | `coop.html` |
| Schedule | `schedule.html` |
| Report cards | `students/scarlett/reportcards/*.html` |
| Map pins | `map/mapdata.js` |
