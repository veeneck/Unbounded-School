
# Agents.md — Unbounded School

Static HTML/CSS/JS site for a family homeschool portfolio and local co-op interest page.

**Live site is source of truth:** https://unbounded.school  
When the user says they pushed/changed something live, pull the live page before editing local files.

---

## Stack & layout

- Pure static site: HTML + shared `styles.css` + small page scripts
- No build step, no framework
- Design system: warm paper background (`--bg` `#ede4d7`, sampled from `subtlebg.jpg`), near-black brown (`--brown` `#24150e`) for nav/home buttons, green accent, Fraunces (headings) + Source Sans 3 (body). Content pages show `subtlebg.jpg` at the top and `subtlebgend.jpg` at the bottom (`body::before` / `::after`), each fading into solid `--bg`. Photos are `background-size: 100% auto` (full width, native aspect, cropped — not stretched). `--paper-fade` is `min(56.25vw, 42%)` (portrait: `min(100vw, 42%)`) so the two bands never overlap on short pages. Extra bottom space (`--bg-end-space`) keeps content off the end flourish. A centered `.page-end-logo` (links to `/index.html`) sits in that space above the swirl. Homepage uses `wallpaper.jpg` instead.
- Shared chrome: sticky top nav (logo → home, Schedule, Guides dropdown, Students dropdown), section heads with icon + optional right-side dashboard links
- Max content width ~1056px (`.page`)

### Top-level pages

| Path | Role |
|------|------|
| `index.html` | Homepage: full-viewport hero, large logo, tagline, bubble links (no site nav) |
| `schedule.html` | Daily schedule + year structure + tools. **Theme experiment:** newspaper / Hogwarts-parchment look scoped to `body.page-schedule` in `styles.css`. Refine here before rolling site-wide. |
| `404.html` | Custom Netlify 404 (`body.page-404`). Root-absolute asset/hrefs so it works from any missing path. |
| `coop.html` | Co-op homepage (`/coop`): Stay Informed white band + Calendar module. Newspaper look via `body.page-coop`. Calendar uses the same sticky kicker bar as transcripts (`.grade-sticky`, no grade switcher). Form is `coop/mailinglist.html`. |
| `guides/` | Instruction guides (dropdown in top nav + homepage bubble) |
| `styles.css` | Global styles |
| `subtlebg.jpg` | Aged-paper texture at the **top** of content pages (fades down to `--bg`). Portrait: `subtlebgmobile.jpg` |
| `subtlebgend.jpg` | Flourish texture at the **bottom** of content pages (fades up to `--bg`). Portrait: `subtlebgendmobile.jpg` |
| `wallpaper.jpg` | Homepage full-viewport background |
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
hero/                     # Full hero images for writing & project pages
thumbnails/               # Smaller JPEGs for transcripts cards (hero/, books/, projects/, art/)
testing/                  # MAP RIT PNGs + map-chart.js. Chooser index.html. Practice quizzes in math/, reading/, language/, science/ (each index.html + items.js)
writing/4thgrade/         # Writing entry HTML pages
writing/5thgrade/         # 5th-grade writing (olden.html, …)
projects/4thgrade/        # Project HTML + media (video, photos)
projects/5thgrade/        # 5th-grade projects (summersale.html, monart2026.html, spelling.html tests log)
science/5thgrade/         # One folder per kit (warmbright/, …)
reportcards/              # fall-2025, winter-2025, spring-2026
juliet/
transcripts.html          # Same newspaper transcripts shell as Scarlett; content still “coming soon”
testing/                  # 1st-grade sample quizzes: math/, reading/ (same engine as Scarlett)

Each student has their own `transcripts.html`. Do not put transcripts at site root.

**MAP practice quizzes (local, noindex).** Shared engine `students/quiz.js`. Scarlett: `students/scarlett/testing/` chooser plus `math/`, `reading/`, `language/`, `science/` (20 items each, 4th recap into 5th plus stretch). Juliet: `students/juliet/testing/math/` and `reading/` (10 items, 1st grade). Each subject folder is `index.html` + `items.js`. One question at a time; Next locked until answered; results with checks and score. Not in the main nav.


---

## Conventions

### Paths & links
- Logo / school name always link to `/index.html`
- Prefer including `.html` in internal hrefs when editing
- Live may use pretty URLs without `.html`; local files are `.html`

### Nav
- Standard nav: logo, Schedule, Guides → Grok & Quill / Quarterly Coin / Travel Crier / Info Quest / Bakers Guild / Housewright, Students → Scarlett / Juliet
- **Do not** put Co-op in the main nav
- **Experiment (easy revert):** site-wide `.site-nav` uses the newspaper index look (dark brown bar, boxed labels, double rule). School name is hidden; links are centered. On landscape, the inverted logo sits left in the bar and scrolls away with it. Revert the “Site nav” block in `styles.css` if it doesn’t stick.
- Homepage (`page-home`) has no nav bar; newspaper-index labels (Schedule, Co-op, Guides dropdown). `wallpaper.jpg` fills the viewport (`background-size: cover`). Logo, title, and menu sit directly on the wallpaper.

### Guides (`guides/`)
- Each guide: header + hero image → Contents TOC (Adventure Back Then pattern) → titled sections
- TOC links use the section **title only** (no “Step 1: …” prefix). The `<ol>` already numbers them
- Mini tags above each heading (not “Step 1”): `Setup` (first), `Task` (do this). Later: `Watch` (video), `Questions` (quiz). Classes: `.guide-tag` + `.guide-tag-setup` / `-task` / `-watch` / `-questions`
- Voice: short, friendly, readable for a ~10-year-old. Same facts, less lecture
- Copyable instruction boxes: `.guide-copy` + Copy button (`.guide-copy-btn[data-copy]`)
- Shared styles in `styles.css`: `.book-toc`, `.book-chapter`, `.guide-tag`, `.guide-copy`, `.guide-tips`. Newspaper look via `body.page-guide` (same masthead/ink frames as schedule and writing).
- **Report cards** (`students/scarlett/reportcards/`): `body.page-report`. Gazette masthead, boxed term tabs (Fall/Winter/Spring), full-width grades table, two-column achievements/growth, MAP tests table with GPA / attendance / days missed at the bottom. Same ink frames as schedule.
- **404:** `404.html` at site root. Lost & Found masthead, dashed notice, boxed Home/Schedule/Scarlett/Guides links.
- Files: `guides/grok-and-quill.html`, `guides/quarterly-coin.html`, `guides/travel-crier.html`, `guides/info-quest.html`, `guides/bakers-guild.html`, `guides/housewright.html`
- Heroes: `guides/hero/` — `grokquill.jpg`, `quarterlycoin.jpg`, `travelcrier.jpg`, `infoquest.jpg`, `bakersguild.jpg`, `housewright.jpg`
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

**Travel Crier / Info Quest** — quest shells (hero + Setup “Get Ready” only so far). Travel = maps/places you go. Info = hunt for true answers. Fill like Quarterly Coin when content is ready.

**Bakers Guild** — kitchen quest with a parent (rough draft 2026-08-28). Five sections:

1. Setup — Find a Recipe: ask a parent, ask Grok, or search [Cookie and Kate](https://cookieandkate.com/). Write down every ingredient. Copy box: Grok prompt for 2–3 doable baking ideas. Then show the recipe to Mom and ask about healthy ingredient swaps
2. Task — Check the Kitchen: cross off what you have; leftover items become the shopping list
3. Task — Go to the Store: check prices/products on Target or Walmart (or ask Grok for an estimate/tips); buy the list; write down the total amount spent
4. Task — Bake: follow the recipe with a parent
5. Task — Share and Enjoy: take a pic of what you made, send that photo along with the recipe to a parent, eat it

**Housewright** — how this house actually works (hunt, then be ready for questions). Five sections:

1. Setup — Get Ready: 20 items, five per section. Use Grok, Google, the library, or people you know. Figure out what each does, where it is, and be ready to answer questions
2. Task — Electrical: GFCI TEST/RESET; dead plug (GFCI vs breaker); tamper-resistant outlet; breaker panel; meter / power entry
3. Task — Plumbing: P-trap; house entry / main shutoff; water at the street; water softener; RO + fridge filters
4. Task — HVAC: supply into rooms; stale-air return; fresh outdoor air; machines that heat/cool; basement Lunos vs bath fans
5. Task — Low Voltage / AV: Lutron smart switches; UniFi router; basement ceiling speakers; attic antenna; internet from yard into the house

Each item is a numbered card: topic title on top, hunt hint underneath (`.guide-tips.hw-items`, one column).


### When editing
1. Match existing patterns on the same page
2. After user deploys manual changes, pull live and overwrite local if asked
3. List files touched in the reply
4. Keep mobile in mind

---

## Transcripts

Newspaper look is **locked** (`body.page-transcripts`): script masthead, ink section heads, parchment cards, boxed 4th/5th and score tabs, brown sticky grade bar, `subtlebg.jpg` at the grade bar and again (fade reversed) just above Travel. Same chrome for Scarlett and Juliet.

### Scarlett (`students/scarlett/transcripts.html`)

Sections: Testing → Math → Reading → Writing → Projects → Science/SS  
Travel & Field Trips is **not grade-specific**: footer band (`.transcripts-travel`), like Testing. Pills and the world map stay in the ~1056px column. The page footer sits in that same band.

- One page-level grade switcher sits under Testing/report cards (`.grade-sticky#grade-sticky`). It sticks to the top as a header while you scroll Math → Travel. **No per-section 4th/5th switchers.**
- Testing + report cards sit in a **full-width white band** (`.transcripts-lead`). Report cards: custom `.dash-drop` pill beside Homeschool Boss (same `.dash-link` style). Label **Report Cards**; click opens Spring/Winter/Fall. Score tabs / dash links tan so they don’t disappear on white
- Grade bar is the **subheader of the paper section below**: full viewport width, larger kicker (`Scarlett · 4th Grade` / `5th Grade`). Inner row stays the ~1056px column. `?grade=` still selects all `.grade-panel`s. Clicking 4th/5th scrolls back to Math (`#grade-start`), just under the sticky bar. No scroll on first load from the URL.
- Paper texture: `subtlebg.jpg` at the grade-sticky (fades down to `--bg`). Same file again just above Travel, faded the other way (strongest at the travel edge). No `subtlebgend` swirl on transcripts. `--transcripts-travel-top` is the travel band’s document Y. JS sets `--paper-fade` to the smaller of the natural band and 42% of the paper span so short transcripts (Juliet, etc.) don’t overlap.
- Testing score tabs (Math/Reading/Language/Science/All) sit **under** the graph in `.score-stage`, same width as the chart, equal-width buttons (graph controls). Separate from the 4th/5th grade bar.
- Motion: progress bars fill from the left as their card scrolls into view (`.js-motion` + `.is-in`). 4th/5th grade switch: outgoing slides + fades out, a short pause, then the new grade slides + fades in (direction matches the tab). One live SVG RIT chart (`.map-rit`, `testing/map-chart.js`, 2020 NWEA bands) morphs in place for Math/Reading/Language/Science (waves, points, labels). Switching to All still slides to the scores table. Old PNGs remain in `testing/` unused. No animation on first load from `?grade=`. Off if `prefers-reduced-motion`. Re-observe after the incoming panel lands.
- Progress cards with bars + 100% checkmarks.

**Spelling tests (locked, 2026-08-28).** One page: `students/scarlett/projects/5thgrade/spelling.html` (writing/project shell, badge Project, title Spelling Tests). Not a transcripts project card, not a new item type, not a report-card subsection, not an in-place drawer. The 5th **180 Days Spelling** pill is the only entry: text link “Spelling tests”. No intro paragraph for now (revisit later). Each test is a square Grok & Quill `.guide-copy` box (same ink/brown treatment as `page-guide`: square corners, 3px brown left rule, offset shadow). Bar: short date (`Aug 28`) as `.guide-copy-label`, score on the right as a **bold letter**, en dash, percent not bold (`A – 100%`). Only the letter is colored: green (`is-ab strong`, `--accent`) for A or B, yellow (`is-cd strong`, `#a16207`) for C or D, red (`is-f strong`, `#b91c1c`) for F. The en dash and percent stay ink. Letters: 90+ A, 80–89 B, 70–79 C, 60–69 D, below 60 F, unless Ryan names one. Words in the box, two columns (one under 700px). Oldest first; later tests append below. Do not restyle. First test is in (Aug 28, A – 100%, 20 words).
- Project / writing / book cards on transcripts use **`thumbnails/`** (resized JPEGs). Full `hero/`, `books/`, and project photos stay on the individual pages.
- Writing is its own section after Reading. 4th-grade pieces use compact `.writing-grid` cards (same as project cards, smaller) with hero thumbs from `hero/`. 5th writing starts with **Olden** (`writing/5thgrade/olden.html`) — trip to Olden, Norway. Copy and hero `hero/olden.jpg` are in; card thumb is `thumbnails/hero/olden.jpg`.
- 5th projects: first card is **Summer Sale** (`projects/5thgrade/summersale.html`) — featured like Adventure Back Then. **MonArt** links to `projects/5thgrade/monart2026.html` (gallery coming soon). **Soccer** is a sports card (photo `thumbnails/projects/soccer5th.jpg`; full `projects/5thgrade/soccer.jpg`). Hero `summersalehero.jpg`. Body photos: `.writing-inline` (money, text wraps) and `.writing-figure` (full-width: yardsign, chalk). Scarlett’s copy is in; they raised $520 for Melissa.
- 5th **Science Experiments** are project-style cards under Science/SS. Line under the title is the **field** (Chemistry, Physics, …) on the card and kit page subtitle. First kit: **Warm and Bright** (`science/5thgrade/warmbright/index.html`) — Science Unlocked, field **Chemistry**. Each kit lives in its own folder under `science/5thgrade/`. Kit page: hero `warmbrighthero.jpg` + intro + Experiments TOC + subsections (`.kit-experiment`). `.kit-media` is a wrapping mosaic that always fills a rectangle (3 across, leftover row grows — 5 items is 3 small + 2 larger; 4 items is 2×2). 2-col under 700px. Movies sit as stills (`.kit-clip` + poster JPEG + play overlay) and swap in `<video>` on click. Experiment 1: `warmbright1A.jpg`, `warmbright1D.jpg`, `warmbirght1C.jpg` (typo in filename), `warmbright1B.MOV` / `warmbright1B.jpg`, `warmbright1E.mov` / `warmbright1E.jpg`. Experiment 2: `warmbright2A.jpg`, `warmbright2B.jpg`, `warmbright2C.jpg`. Experiments 3–4 are title + desc only until photos land. Old URL `science/5thgrade/warmandbright.html` redirects. Transcripts card uses `thumbnails/science/warmbrighthero.jpg`.

**Lexia Core5 circles** (`.lexia-circle`) — 16–18 on 4th, 19–21 on 5th:
- The **number inside** the circle is an **accuracy grade**, never lesson % complete. Leave `—` until a test score exists
- **Fill** (green, from the bottom) = lessons done on that level. Set `--lexia-pct` on the circle, e.g. `style="--lexia-pct:21%"`, and class `is-progress`
- Finished levels: class `is-done`, full green gradient, accuracy % in the text (e.g. 95%)
- Not started: class `is-todo`, dashed empty circle, `—`
- Caption: “Accuracy grades, not % complete · fill = lessons done”

**Current 5th (Aug 2026):** Khan Academy Math 50%. Lexia leave as-is until Friday pull. Harry Potter and the Sorcerer’s Stone at p.165/249 (~66%). Books Read includes Magic Tree House Books 1–4 (flat cover `books/treehouse4.jpg`, title without “boxed set”). Warm and Bright experiments 1–3 have photos.

### Juliet (`students/juliet/transcripts.html`)

Same lead band, sticky kicker, paper section, travel footer, and paper-texture JS. No 4th/5th switcher, testing, or map yet. Body copy is still the “Coming soon” card until her work is added.

---

## Other pages
- **Co-op homepage** (`coop.html`): header, Stay Informed (mailing list → `coop/mailinglist.html`, subscribe to calendar → `coop/calendar.ics`), then a calendar module in the Colwich HSO events layout (month labels, date-on-top cards, 2-across). Calendar runs Sep–May: 2nd Friday is PE in the park, last Friday is a field trip (example sites: Trader Joe’s, recycling plant, nursery, cookie place, KSN, post office, water plant, airport fire/police, Maize police). Subtext: sample dates and example ideas; actual trips would be discussed. Kombucha owner is on the idea list but not on this sample year. Top bar stays but has **no links**. Do not put Co-op in the main nav.
- **Co-op mailing list** (`coop/mailinglist.html`): numbered steps + Wufoo embed, same as the old co-op page. Form chrome via `Wufoo.css` (ink/brown, square corners — update after deploy so Wufoo’s custom CSS URL picks it up)
- **Homepage:** `wallpaper.jpg` fills the screen; logo/menu sit on the wallpaper; tagline “A different take on education.”, bubble links (Schedule, Co-op, Guides)
- **Analytics:** Fathom `FXWFKUXE` on every HTML page

---

## Quick task map

| Task | File |
|------|------|
| Progress / books / projects UI | `students/scarlett/transcripts.html` |
| 5th spelling tests | `students/scarlett/projects/5thgrade/spelling.html` |
| Look & components | `styles.css` |
| Co-op homepage | `coop.html` |
| Co-op mailing list | `coop/mailinglist.html` |
| Schedule | `schedule.html` |
| Guides | `guides/*.html` |
| Report cards | `students/scarlett/reportcards/*.html` |
| Map pins | `map/mapdata.js` |
