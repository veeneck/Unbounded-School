
# Agents.md — Unbounded School

Static HTML/CSS/JS site for a family homeschool portfolio and local co-op interest page.

**Live site is source of truth:** https://unbounded.school  
When the user says they pushed/changed something live, pull the live page before editing local files.

---

## Stack & layout

- Pure static site: HTML + shared `styles.css` + small page scripts
- No build step, no framework
- Design system: warm paper background, green accent, Fraunces (headings) + Source Sans 3 (body)
- Shared chrome: sticky top nav (logo → home, Schedule, Guides dropdown, Students dropdown), section heads with icon + optional right-side dashboard links
- Max content width ~1056px (`.page`)

### Top-level pages

| Path | Role |
|------|------|
| `index.html` | Homepage: full-viewport hero, large logo, tagline, bubble links (no site nav) |
| `schedule.html` | Daily schedule + year structure + tools |
| `coop.html` | Local Colwich/Andale homeschool mailing list + Wufoo embed |
| `guides/` | Instruction guides (dropdown in top nav + homepage bubble) |
| `styles.css` | Global styles |
| `Wufoo.css` | External theme for Wufoo forms (linked in Wufoo theme editor) |
| `map/` | Simplemaps world map (`mapdata.js`, `worldmap.js`) used on transcripts |
| `unbounded-logo.svg` / `.png` | Brand assets |
| `apple-touch-icon.png`, `favicon-32x32.png`, `icons/`, `site.webmanifest` | Home Screen / Mac Dock / PWA icons (school logo) |

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
projects/5thgrade/        # 5th-grade projects (summersale.html, …)
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
- Standard nav: logo, Schedule, Guides → Grok & Quill / Quarterly Coin / Travel Crier / Info Quest / Bakers Guild, Students → Scarlett / Juliet
- **Do not** put Co-op in the main nav
- Homepage (`page-home`) has no nav bar; bubbles: Schedule, Co-op, Guides (dropdown)

### Guides (`guides/`)
- Each guide: header + hero image → Contents TOC (Adventure Back Then pattern) → titled sections
- TOC links use the section **title only** (no “Step 1: …” prefix). The `<ol>` already numbers them
- Mini tags above each heading (not “Step 1”): `Setup` (first), `Task` (do this). Later: `Watch` (video), `Questions` (quiz). Classes: `.guide-tag` + `.guide-tag-setup` / `-task` / `-watch` / `-questions`
- Voice: short, friendly, readable for a ~10-year-old. Same facts, less lecture
- Copyable instruction boxes: `.guide-copy` + Copy button (`.guide-copy-btn[data-copy]`)
- Shared styles in `styles.css`: `.book-toc`, `.book-chapter`, `.guide-tag`, `.guide-copy`, `.guide-tips`
- Files: `guides/grok-and-quill.html`, `guides/quarterly-coin.html`, `guides/travel-crier.html`, `guides/info-quest.html`, `guides/bakers-guild.html`
- Heroes: `guides/hero/` — `grokquill.jpg`, `quarterlycoin.jpg`, `travelcrier.jpg`, `infoquest.jpg`, `bakersguild.jpg`
- Watch placeholders: `.guide-video` (“Video coming soon”) until a real video is dropped in
- Quiz/discussion: same white `.guide-tips` cards as the Grok & Quill writing tips, under a `Questions` tag — talk with a parent, not a scored test

**Grok & Quill** — writing coach cycle (5th grade). Six sections:

1. Setup — Create a Teacher with Grok: grok.com → Projects → Canvas → Project instructions → paste the writing-cycle prompt → ask Grok if it understands the five days
2. Task — Writing By Hand: pick a topic with a parent, write ~1–2 pages. Five tips: read out loud; smell/sound/feeling; exact words; show what happened; mix sentence length. Then one parent revision (not a rewrite)
3. Task — Type It Up: type the paper draft as written (tiny spelling/periods ok; no new scenes). Save as topic + date
4. Task — First Feedback from Grok: same project (not a new chat). Prompt: “I’m ready for my first round of feedback. I’ll paste my writing below.” Grok already knows (from project instructions) to give spelling/grammar, 1 harder ~15-min fix, up to 3 easy ones. Read notes; don’t edit yet
5. Task — Revise and Get a Grade: do that list (skip notes that don’t sound like the author). Prompt: “I’m ready for my grade. I’ll paste my writing below.” Fair 0–100% vs 5th-grade peers. Write the score next to the title
6. Task — Post to Your Blog: parent helps publish the finished piece on Unbounded School writing pages. Same Grok project for the next piece

Do not put the full Day 1–5 project-instruction text in new prompts — it already lives in the project. Keep those two short copy boxes.

**Quarterly Coin** — once-a-quarter look at Scarlett’s real finances (budgeting + investing). Numbers app spreadsheet (parent knows where it lives). Nine sections:

1. Setup — Open the Spreadsheet: Numbers app → find Quarterly Coin sheet → confirm it opens. Real money, not play money
2–7. Watch — What Is Income / Debt / a Loan / a Bond / a Stock / a Dividend. Short kid-facing blurb + video placeholder
8. Task — Update the Spreadsheet with this quarter’s real numbers (with a parent; no guessing)
9. Questions — Talk It Over: 10 discussion questions (investment income source; bond vs stock; income; debt vs loan; interest; why buy a stock; bond tradeoff; dividend; spend/save/earn this quarter; $100 extra)

**Travel Crier / Info Quest / Bakers Guild** — quest shells (hero + Setup “Get Ready” only so far). Travel = maps/places you go. Info = hunt for true answers. Bakers = kitchen/recipes with a parent. Fill like Quarterly Coin when content is ready.

### When editing
1. Match existing patterns on the same page
2. After user deploys manual changes, pull live and overwrite local if asked
3. List files touched in the reply
4. Keep mobile in mind

---

## Transcripts (`students/scarlett/transcripts.html`)

Sections: Testing → Math → Reading & Writing → Projects → Science/SS  
(Travel + map stay outside grade panels.)

- One page-level grade switcher sits under Testing/report cards (`.grade-sticky#grade-sticky`). It sticks to the top as a header while you scroll Math → Travel. **No per-section 4th/5th switchers.**
- Testing + report cards sit in a **full-width white band** (`.transcripts-lead`). Report cards: custom `.dash-drop` pill beside Homeschool Boss (same `.dash-link` style). Label **Report Cards**; click opens Spring/Winter/Fall. Score tabs / dash links tan so they don’t disappear on white
- Grade bar is the **subheader of the paper section below**: full viewport width, larger kicker (`Scarlett · 4th Grade` / `5th Grade`). Inner row stays the ~1056px column. `?grade=` still selects all `.grade-panel`s
- Testing score tabs (Math/Reading/Language/Science/All) sit **under** the graph in `.score-stage`, same width as the chart, equal-width buttons (graph controls). Separate from the 4th/5th grade bar.
- Motion: only progress bars fill from the left as their card scrolls into view (`.js-motion` + `.is-in`). No fade-ins. Off if `prefers-reduced-motion`. Re-observe after grade switch.
- Progress cards with bars + 100% checkmarks
- Project cards: thumbnail + title + category
- Empty 5th writing still “Nothing here yet, check back!”
- 5th projects: first card is **Summer Sale** (`projects/5thgrade/summersale.html`) — featured like Adventure Back Then. Hero `summersalehero.jpg`. Body photos: `.writing-inline` (money, text wraps) and `.writing-figure` (full-width: yardsign, chalk). Replace placeholder copy with Scarlett’s words.

**Lexia Core5 circles** (`.lexia-circle`) — 16–18 on 4th, 19–21 on 5th:
- The **number inside** the circle is an **accuracy grade**, never lesson % complete. Leave `—` until a test score exists
- **Fill** (green, from the bottom) = lessons done on that level. Set `--lexia-pct` on the circle, e.g. `style="--lexia-pct:21%"`, and class `is-progress`
- Finished levels: class `is-done`, full green gradient, accuracy % in the text (e.g. 95%)
- Not started: class `is-todo`, dashed empty circle, `—`
- Caption: “Accuracy grades, not % complete · fill = lessons done”

**Current 5th (Aug 2026):** Khan Academy Math 32%. Lexia 19 in progress at 21% fill, 20–21 not started. Books Read includes Magic Tree House Books 1–4 (flat cover `books/treehouse4.jpg`, title without “boxed set”).

---

## Other pages
- **Co-op:** numbered steps + Wufoo embed; theme via `Wufoo.css`
- **Homepage:** large logo, tagline “A different take on education.”, bubble links (Schedule, Co-op, Guides)
- **Analytics:** Fathom `FXWFKUXE` on every HTML page

---

## Quick task map

| Task | File |
|------|------|
| Progress / books / projects UI | `students/scarlett/transcripts.html` |
| Look & components | `styles.css` |
| Co-op / form | `coop.html` |
| Schedule | `schedule.html` |
| Guides | `guides/*.html` |
| Report cards | `students/scarlett/reportcards/*.html` |
| Map pins | `map/mapdata.js` |
