# PSF UI/UX Design Specification

Pakistan Strategic Forum | forumstrategic.com

| Item | Value |
| --- | --- |
| Document | UI/UX Design Specification, screen-by-screen, element-by-element |
| Version | 1.0 Draft |
| Date | 17 Oct 2026 |
| Prepared by | Sadiq, Project Management Lead |
| Audience | Design team (Claude Design / Figma), PSF leadership for sign-off |
| Companion files | `PSF-FRD-User-Flows.md` (functional requirements, content model, design system source) · `PSF-Flow-Diagrams-and-ERD.md` (flow diagrams, ERD) |
| Status | For design build. This is the binding layout reference for every screen. |

---

## 0. How to use this document

1. **This document is a layer on top of the FRD, not a replacement for it.** The FRD (`PSF-FRD-User-Flows.md`) already defines *what* is on each page: content blocks, data sources, CMS vs. database fields, business rules (its Sections 7–12). This document defines *exactly where it sits and how it looks*: grid columns, spacing, component variants, states, and visual hierarchy, screen by screen, so a designer can build the frame directly without inferring anything. Every screen entry below carries an **FRD ref** pointing back to its source section: read that section first for field lists and business rules; read this document for layout.
2. **Nothing here introduces new functionality.** Every element listed is already in the FRD. Where this document adds something the FRD doesn't explicitly list, it is a pure presentation/UX element (an empty state illustration treatment, a hover affordance, a loading skeleton, a micro-interaction), never a new feature, field, or workflow step. These additions are marked **[UX ADD]** so they're easy to spot and can be removed without touching scope.
3. **Build order:** Section 1 (brand foundation) first; it is binding for every screen. Then build screens in the order they appear (Public → Auth → Portal → Admin). Modals and drawers are consolidated in Section 7 rather than repeated under every screen that opens one.
4. **Desktop-first.** Every screen in this document is specified for desktop (1440px canvas, 1280px content width, per Section 1.4). Mobile is **out of scope for this document**; Section 8 flags, page by page, which ones will get a mobile pass later and which never will (Admin). Do not infer mobile behaviour from this document.
5. **Grid notation.** Every zone is described as `cols X–Y of 12` against the 1280px container (24px gutters) from FRD Section 3.5. Full-bleed sections (background extends to the viewport edge, content still sits in the 1280px container) are marked **full-bleed**.
6. **Component references.** Where a zone uses a component defined in FRD Section 3.7 (Button, Card, Table, Modal, etc.), this document names the component and variant rather than re-describing it: e.g. "Button / Primary / Default height" means FRD 3.7's Button component, Primary variant, 40px height.
7. **Scope discipline.** Design must not add any element, CTA, badge, or interaction that is not in the FRD's requirement set for that screen, except the explicit [UX ADD] items in this document. If a design idea would need a new field, workflow, or permission, it belongs in a change request to the FRD, not quietly added to a Figma frame.
8. **"Must not look AI-generated."** Section 1.5 below is binding on every single screen without exception, including Admin. Before a frame is called "done," check it against that list.

---

## 1. Brand foundation (binding on every screen)

### 1.1 Logo

The PSF emblem (crest) is the single source of brand color. The exact brand green was sampled directly from the supplied logo file (`PSF_Logo_BG.png`), not approximated; this supersedes the FRD's placeholder green scale (FRD 3.3, flagged `[CONFIRM]`, open item O1).

| Logo element | Sampled hex | Where it may be used |
| --- | --- | --- |
| Wreath, ring, crest base (green) | **`#04411F`** | This is `--green-700`, the primary brand color across the whole UI (Section 1.2) |
| Eagle, inner ring, Urdu script (gold) | `#D9A52B` | **Logo lockup only.** Never a UI color, see the Open Item below |
| Anchor, stars, crescent, outlines (black) | `#000000` | **Logo lockup only.** Not used as a UI ink color (the UI uses `--ink-900` `#14171A`, which is softer than true black) |

**⚠ Open item carried to Section 9 (Open items):** the FRD's decision log (D4) states "no yellow" anywhere in the UI. The actual crest is built around a gold eagle on a green ring; gold is clearly part of PSF's visual identity, not an accident. This document keeps D4 as written (gold/yellow appears **only** inside the fixed logo lockup (header, footer, email header, share-card watermark, favicon) and never as a UI color: no gold buttons, badges, chips, chart series, or accents). **PSF should confirm this reading is correct** before the first screens are built, since it's the one place this document's gold-usage rule is stricter than what the logo itself visually suggests.

The logo is used as a fixed lockup (never recolored, never re-drawn, never simplified into a flat icon) in: header (emblem + wordmark), footer (white-contrast version, FRD 6.5 already specifies a white version is needed), favicon (emblem only, FRD 18 Logo row), email header (Appendix B templates), and the dynamic share-card watermark (FRD 6.7).

### 1.2 Color tokens, final (replaces FRD 3.3's placeholder scale)

The scale below keeps the exact same token names, roles, and shape as FRD 3.3, so every FRD cross-reference to a `--green-*` token still resolves correctly, only the hex values change, anchored on the real logo green.

**Brand green (final, logo-derived)**

| Token | Hex | Contrast vs. white | Use |
| --- | --- | --- | --- |
| `--green-900` | `#022C15` | 15.3:1 | Footer background, deep overlays |
| `--green-800` | `#03361A` | 13.6:1 | Primary button pressed, active nav underline |
| `--green-700` | **`#04411F`** | **11.8:1** | **Primary brand** (= logo green, exact): buttons, links, active states, logo lockup green |
| `--green-600` | `#0D6634` | 7.1:1 | Primary button hover |
| `--green-500` | `#198348` | 4.8:1 | Focus rings, globe coverage points, chart series 1 (meets AA for large text/UI only, never body text) |
| `--green-200` | `#BBD3C5` | — | Selected rows, chip borders |
| `--green-100` | `#DCE5E0` | — | Peer-reviewed badge background, success toasts |
| `--green-50` | `#F2F5F3` | — | Hover background for list rows |

All other FRD 3.3 tokens are unchanged and remain binding as written: surfaces and ink (`--paper`, `--ivory-50/100/200`, `--line`, `--ink-900/700/500/400`), semantic colors (`--danger-*`, `--warning-*`, `--info-*`), and the status-chip table. `--success-700` now equals the new `--green-600` (`#0D6634`), not the old placeholder.

**Contrast rule FR-DS-01 (FRD 3.3) still applies: body text 4.5:1, large text/UI 3:1 minimum. `--green-500` passes only for large text, focus rings, and chart marks, never for body-size links or paragraph text; use `--green-700` for those.**

### 1.3 Typography

FRD 3.4 and decision D21 already lock in the pairing a serious defence/security publication needs, and nothing in this document changes it: **Source Serif 4** for editorial content (headlines, article/report/research body, pull quotes) and **Inter** for interface chrome (navigation, labels, forms, tables, dashboards, data). This pairing *is* the "military think tank" register PSF asked for, a serif built for sustained reading gives the institutional, FT/SIPRI/IISS weight the brief calls for; Inter keeps dense admin and data screens legible at small sizes with proper tabular numerals. No new typeface is introduced. The full type scale, weights, and usage rules are FRD 3.4, use them as written; this document doesn't repeat the scale table, only flags per-screen which tokens apply (Section 2 onward).

One addition specific to the "think tank" register, consistent with FRD 3.2's existing rules: **never substitute a geometric/grotesque sans (Inter included) for the serif on anything a reader is meant to read as editorial content** (a Research abstract, an Article standfirst, a pull quote) even where space is tight. Reach for truncation or a smaller serif size first.

### 1.4 Layout, grid, spacing

Unchanged from FRD 3.5, binding as written. For quick reference while building:

- Container: 1280px content width (1440px for full-bleed section backgrounds).
- Grid: 12 columns, 24px gutters desktop.
- Breakpoint this document is built for: `xl` 1280 / canvas **1440px** (Figma frame width for every screen in this document, unless noted).
- Spacing scale (px): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
- Radii: 2px buttons/inputs/chips, 4px cards/modals/dropdowns, 0 for images inside cards, 50% avatars only.
- Section vertical rhythm: 80px between major home-page sections.

### 1.5 "Must not look AI-generated", binding on every screen (FRD 3.2, restated for designers)

| Never | Always instead |
| --- | --- |
| Gradient backgrounds, gradient text, mesh blobs | Flat ivory/white surfaces; dark scrim only over hero photos |
| Glassmorphism, frosted panels, glow shadows | 1px hairline borders; one subtle dropdown shadow (Level 2/3, FRD 3.5) |
| Fully rounded pill buttons/cards | 2px button/input radius, 4px card radius |
| Emoji, sparkle/robot/magic icons | One line-icon family only, Lucide, 1.5px stroke |
| Generic 3D illustration, stock soldiers/flags/metallic-weapon hero art | Credited real photography, archival images, data-derived graphics, typographic no-image cards |
| Centred hero + big tagline + two buttons | Editorial lead-story layout with real, dated content |
| Heavy shadow on every card in a grid | Ruled lists, mixed card sizes, editorial grid |
| Filler stats ("10x faster") | Real counts from the database, or hide the section |
| Animated counters everywhere, parallax | Static numbers; one subtle fade-in per section, max |
| Dark mode as default | Light theme only (v1) |

This list is the first thing to check a frame against before calling it done, including every Admin table screen, which is the area most tempted to default into a generic SaaS-dashboard look. Admin should still read as **the same institution** as the public site: ivory/white surfaces, serif for page titles, hairlines not shadows, green-700 as the only accent.

---

## 2. Screen inventory and numbering

This document mirrors the FRD's own screen count exactly, nothing added, nothing dropped:

| Area | Screens | FRD ref |
| --- | --- | --- |
| Public templates | 31 | FRD §7 (+ §8 for Global Watch) |
| Auth screens | 12 | FRD §9 |
| Portal screens | 18 | FRD §10–11 |
| Admin screens | 34 | FRD §12 |
| Modals/drawers | 40+ | FRD Appendix C |
| **Total named screens** | **95**, plus 40+ modal/drawer layers | |

Each screen entry below follows the same shape:

> **[n.n] Screen name**: `route`
>
> **FRD ref:** §x.x · **Purpose:** one line · **Canvas:** 1440px
>
> **Zone table:** top-to-bottom, left-to-right, Zone | Grid (cols) | Elements | Component refs | Notes/states
>
> **Mobile:** flag only (full detail in Section 8)



## 3. Public pages (31 templates)

Utility bar, header, footer, cookie banner and search overlay (FRD §6) are **global**, built once as shared components, not repeated per screen. Their layout:

> **Global: Utility bar**, full-bleed, `--ivory-100`, 36px height, 1280px content row split left (date + Global Watch count link) / right (A−/A/A+, social icons, Advertise link). Hidden on mobile (Section 8).
>
> **Global: Header**, full-bleed, `--paper`, 72px height (60px sticky after 120px scroll, wordmark hidden, emblem only). 1280px content row, 3 zones: Left (logo lockup, cols 1–2) · Centre (primary nav, cols 3–9, 6 items per FRD 4.1) · Right (search icon, auth state per FRD 6.2, cols 10–12). Bottom hairline `--line` 1px.
>
> **Global: Mega menu (Topics)**, full-bleed dropdown panel, 1280px, white, Level 2 elevation, 3 columns (Topics list cols 1–3 / Subtopics cols 4–8 / Featured item cols 9–12), bottom strip full-width.
>
> **Global: Footer**, full-bleed, `--green-900` (now `#022C15`), white 85%-opacity text. Top row (logo + mission + button) full width; 5 link columns cols 1–12 split evenly (≈2.4 cols each, collapses responsibly at narrower widths, not a mobile concern here); social row; bottom bar.
>
> **Global: Cookie banner**, fixed bottom bar, full-bleed, `--ink-900` or `--paper` with top hairline (pick one, consistent with Section 1.5, no dark glass), 3 buttons equal weight right-aligned, copy left-aligned.
>
> **Global: Search overlay**, full-bleed panel directly under header, white, Level 2 elevation, input full width of 1280px container, results below in up to 6 grouped columns-as-rows.

Every public page below sits below this header/utility bar and above the footer. Container is 1280px unless marked full-bleed.

---

### 3.1 Home `/`

**FRD ref:** §7.1 (H1–H14) · **Purpose:** prove PSF is current, broad, credible within one screen · **Canvas:** 1440px, full page height ≈ 7,200–8,000px depending on CMS toggles

| Zone | Grid | Elements | Component refs | Notes / states |
| --- | --- | --- | --- | --- |
| H1 Hero | Full-bleed bg, content cols 1–12, 640px height | Lead story (cols 1–8: cover image bg + scrim, label, `display` headline max 3 lines, standfirst 2 lines, byline row, "Read the analysis" button, image credit bottom-right) + Newsroom ticker panel (cols 9–12, white bg, "Newsroom" title + live dot + "View all", vertical list of 5 visible items, up/down arrows) | Button/Secondary (white outline) · Content label · Avatar 24 | Scrim: `--green-900` 0→82% bottom 60%, per FRD 6.6. Ticker auto-scrolls one item/5s, pauses on hover/focus. Empty ticker: hide panel, lead story expands to full 12 cols |
| H2 Topic quick access | Full-bleed bg `--ivory-50`, 4-col strip, cols 1–12 split into up to 6 tiles | Per tile: icon (24px), name (`h4` serif), count, 4 subtopic chip links | Tag chip | Max 6 tiles (admin-ordered + flagged). Fewer than 6 tiles still fill the row evenly, never left-aligned with a gap |
| H3 Top stories | Cols 1–12, section label + 2px ink rule above | 1 large card (cols 1–6) + 3 standard cards (cols 7–8, 9–10, 11–12) | Content card / Lead · Content card / Standard | Source: `home_top_stories` slot, 4 positions |
| H4 Ad, leaderboard | Full-bleed bg `--ivory-100` strip, centred 970×250 creative, cols 1–12 | Ad slot component, "Advertisement" label | Ad slot | Collapses to zero height when empty, no gap |
| H5 Latest coverage | Cols 1–12 | Left (cols 1–8): 2×2 grid, Content card/Standard × 4 · Right (cols 9–12): "Just published" ruled list × 8 rows + "View all latest" button | Content card/Standard · Content card/Compact (ruled) | |
| H6 PSF Coverage (globe) | Full-bleed bg `--ivory-50`, cols 1–12 | Left (cols 1–7): compact globe canvas, 420px height · Right (cols 8–12): heading, sub, stats row (3 KPI tiles), "Top locations" list × 5, "Open Global Watch" button | KPI tile · Button/Primary | Globe is `dynamic(ssr:false)`; static fallback image shows until WebGL loads (FRD 8.5). [UX ADD] skeleton shimmer on the stats row while loading |
| H7 Topic desks (repeating) | Cols 1–12 per desk, 80px gap between desks | Header row (Topic name `h2`, 1-line description, subtopic chips, "All [Topic]" link) + alternating **Layout A** (Lead card cols 1–6 + 4 horizontal cards cols 7–12) / **Layout B** (ruled list cols 1–4 + featured + 2 standard cols 5–12) | Content card/Lead, Horizontal, Standard | One block per active Topic flagged "show on home," alternating A/B per FRD 7.1. Topics <3 published items auto-hidden, no empty desk ever renders |
| H8 Reports | Cols 1–12 | Left (cols 1–7): wide featured report card (portrait thumb + exec summary excerpt + 2 buttons) · Right (cols 8–12): 2 compact report cards stacked · Below: category chip row + "All reports" link | Content card/Report | |
| H9 Research and academia | Cols 1–12 | 3 Research cards (cols 1–4, 5–8, 9–12) + right panel band below (`--ivory-100`, full-bleed): "Publish your research" 4-step row + stats (conditional on ≥5 papers) + 2 buttons | Content card/Research | Peer-reviewed badge on every card |
| H10 Ad, sponsor carousel | Full-bleed, up to 5 slides 1200×300, dots + arrows, cols 1–12 | Ad slot (carousel variant) | | Auto-advance 6s, pause on hover |
| H11 Most read | Cols 1–12 | Numbered list 1–5, large serif numerals `--green-700`, title + label per row | | No read counts shown publicly (FRD O6), ranking only |
| H12 Videos | Cols 1–12 | 4 thumbnails (16:9) in a row, cols 1–3/4–6/7–9/10–12, duration badge, title, date + "All videos" link | | Click opens lightbox modal (Section 7) |
| H13 PSF on social | Cols 1–12 | Left (cols 1–6): X timeline embed · Right (cols 7–12): Instagram 6-post grid | | Consent-gated placeholder card shown until Social media cookies accepted (FRD 6.6) |
| H14 Write for PSF band | Full-bleed `--green-900`, cols 1–12 | 2 columns (cols 1–6 / 7–12), each: heading, 2-line copy, button | Button/Secondary (white outline on dark) | |

**[UX ADD]** Each section gets a single 12px fade-up reveal on first scroll into view, per FRD 3.8 motion rules, never more than once per section, disabled under reduced motion.

**Mobile:** planned (Section 8).

---

### 3.2 Newsroom `/newsroom`

**FRD ref:** §7.2 · **Purpose:** chronological fast news stream · **Canvas:** 1440px

| Zone | Grid | Elements | Component refs | Notes |
| --- | --- | --- | --- | --- |
| Header | Cols 1–12 | Title "Newsroom" (`h1` serif), sub, "last updated" meta | | |
| Filters bar | Cols 1–12, hairline below | Region / Country / Topic selects, date-range preset pills, "Breaking only" toggle | Select, Switch | Filters reflected in URL |
| Pinned | Cols 1–8 | Up to 3 pinned posts, pin icon, same row style as stream but distinguished by a thin `--green-500` left rule | | |
| Stream | Cols 1–8 | Grouped by date heading ("Today," "Yesterday," `14 Oct 2026`); each post row: time, region›country›city, topic chip, Breaking label, `h4` headline, rich-text summary, optional 96px thumbnail right, source link, share icon | Content label, Tag chip | "Load more" pagination, 20/page |
| Sidebar | Cols 9–12, sticky | Mini globe or "Most active regions" list card, ad slot `newsroom_sidebar` | Ad slot | |

**Newsroom post detail `/newsroom/[id]-[slug]`:** single column cols 3–10 (narrower than article, it's a short post): headline, time/location/topic row, summary, optional image, source link, share bar, "More from the Newsroom" (5 cards cols 3–10 as 1-col list), "Related coverage" (3 cards).

**Mobile:** planned.

---

### 3.3 Topics hub `/topics`

**FRD ref:** §7.3 · **Canvas:** 1440px

| Zone | Grid | Elements | Notes |
| --- | --- | --- | --- |
| Hero | Full-bleed bg image + scrim, cols 1–12, 320px | Title "Topics" (`display`), intro paragraph | |
| Topic sections (repeating) | Cols 1–12, hairline divider between | Topic name (`h2`) + description cols 1–6, hero thumbnail cols 7–12; below: Subtopic tile grid (4 per row: icon, name, count, 1-line desc); "Go to [Topic]" button; 3 latest items row (cols 1–4/5–8/9–12) | One block per active Topic |
| Coverage stats (optional) | Cols 2–11, centred | Horizontal bar chart, items per Topic | House chart style (FRD 3.9); CMS-toggle, hidden if off |

**Mobile:** planned.

---

### 3.4 Topic page `/topics/[topic]`

**FRD ref:** §7.4 · **Canvas:** 1440px

| Zone | Grid | Elements | Notes |
| --- | --- | --- | --- |
| Hero | Full-bleed image + scrim, cols 1–12, 280px | Breadcrumb, Topic name `display`, base description (≤280 chars), item count | |
| Subtopic CTAs | Cols 1–12 | Row of subtopic tile/buttons with icons, one per Subtopic | Horizontal scroll if it overflows, never wraps awkwardly |
| Featured | Cols 1–12 | `topic_featured` slot, one Lead card | Fallback: latest in Topic |
| Ad | Full-bleed `topic_banner`, cols 1–12 | 970×90 | |
| Latest + filters | Left (cols 1–8): filter bar (Subtopic, Content type, Content label, Date range, Country) + sort control, then card grid 3-up (12/page), numbered pagination below · Right (cols 9–12, sticky ≥1280px): "Most read in Topic" (5), coverage map thumbnail (static) | | |

**Mobile:** planned.

---

### 3.5 Subtopic page `/topics/[topic]/[subtopic]`

**FRD ref:** §7.5 · Same layout as 3.4 with: subtopic icon in hero, breadcrumb 3 levels, sibling subtopic chip row (current highlighted, cols 1–12 below hero), `subtopic_featured` slot, listing restricted to Subtopic.

**Mobile:** planned.

---

### 3.6 Article page `/articles/[slug]`

**FRD ref:** §7.6 · **Canvas:** 1440px, long-form

| Zone | Grid | Elements | Notes |
| --- | --- | --- | --- |
| Breadcrumb | Cols 3–10 | Home / Topic / Subtopic | |
| Header | Cols 3–10 | Content label + topic/subtopic links, H1, standfirst, byline row (avatars 32px, names, badge if Expert), date/time, "Updated" note if edited, read time, location chip | |
| Sticky vertical share rail | Fixed, left of cols 3–10 at ≥1280px, outside the 720px column | Icon buttons: X, Facebook, WhatsApp, LinkedIn, Telegram, Email, Copy link | [UX ADD] rail fades in after header scrolls past |
| Cover image | Cols 3–10, full column width 16:9 | Caption + credit below | |
| Body | Cols 3–10, **max 720px measure** (centred within the column, not full 8-col width) | `body-long` serif text, H2–H4, lists, blockquotes, pull quotes, in-body images (captioned), full-width infographics (break out to cols 1–12 for these only), galleries, tables, embeds, key-takeaways box, callouts, footnotes | 720px is the FRD's stated max; the 8-col span is the outer frame, text itself stays centred and narrower |
| In-article ad | Cols 3–10, after 4th paragraph | `article_inline` 728×90 | Never in first 3 paragraphs or within 2 of an image |
| Sources/notes | Cols 3–10 | Numbered footnote list | |
| Corrections note | Cols 3–10, top and/or bottom | Boxed note, `--warning-50` bg | Only if corrections exist |
| Author box(es) | Cols 3–10 | Avatar 48px, name, designation/institution, short bio, link | One per author |
| Tags | Cols 3–10 | Tag chips | |
| Report an error | Cols 3–10 | Text link | Prefills `/corrections?item=` |
| Related | Cols 3–10 | "Related coverage" 3-card row + "More from [Author]" 3-card row | |
| Sidebar | Cols 11–12 or just outside 10, sticky, ≥1280px | `article_sidebar` ad 300×600, "Most read" (5) | |
| Archive banner | Cols 3–10, top | For migrated items only | |

**Mobile:** planned.

---

### 3.7 Reports hub `/reports`

**FRD ref:** §7.7 · **Canvas:** 1440px

| Zone | Grid | Elements |
| --- | --- | --- |
| Hero | Full-bleed image, cols 1–12, 280px | Title, intro, image |
| Featured report | Cols 1–12 | `reports_hub_featured` slot: large card, portrait cover + report number + exec summary + key-finding count + 2 buttons |
| Categories | Cols 1–12 | Tiles per Report Category: name, description, count, icon: grid 4/row |
| Latest reports | Cols 1–12 | Filter bar (Report Category, Topic, Year, Country) + card grid 3-up (12/page) |
| Ad | Full-bleed `reports_banner` | 970×250 |

**Report category page `/reports/category/[category]`:** hero (category image/name/description) + `report_category_featured` + filtered listing, same grid as Topic page.

**Mobile:** planned.

---

### 3.8 Report page `/reports/[slug]`

**FRD ref:** §7.8 · Same base as Article page (3.6) plus:

| Addition | Grid | Detail |
| --- | --- | --- |
| Report meta strip | Cols 3–10, top | Report number, category, pages, date, PDF size, Inter `meta` row |
| Download row | Cols 3–10 | "Download PDF" (Button/Primary) + "Cite this report" (Button/Tertiary, opens Citation modal, Section 7) |
| Executive summary | Cols 3–10 | `--ivory-100` boxed panel, top of body |
| Key findings | Cols 3–10 | Numbered box, 3–7 items |
| Table of contents | Cols 11–12, sticky | Auto-generated from H2/H3, collapsible on narrower widths |
| Figures | Cols 3–10 | "Figure N" caption convention, source line under each |

**Mobile:** planned.

---

### 3.9 Research hub `/research`

**FRD ref:** §7.9 · **Canvas:** 1440px

| Zone | Grid | Elements |
| --- | --- | --- |
| Hero | Full-bleed, cols 1–12, 280px | Title "PSF Research", sub, ISSN (when set), 2 buttons |
| Latest research | Cols 1–12 | `research_hub_featured` (1 lead) + 6 Research cards, 3/row |
| Categories | Cols 1–12 | Tiles per Research Category |
| How to publish | Cols 1–12 | 5-step horizontal process strip |
| Our standards | Cols 1–12 | 4-point list |
| Review stats | Cols 1–12 | 3 KPI tiles (conditional, ≥5 decisions) |
| Call for papers | Cols 1–12 | Optional CMS block |
| CTA band | Full-bleed `--green-900`, cols 1–12 | "Ready to submit?" + Sign up / Sign in buttons |

**Research category page** and **All research `/research/papers`:** filtered listing, same grid pattern as Topic page (filter bar left/top + card grid).

**How peer review works `/research/peer-review`:** policy-template layout, see 3.17.

**Submit a paper `/research/submit`:** cols 3–10, requirements list + 2 buttons.

**Mobile:** planned.

---

### 3.10 Research paper page `/research/[slug]`

**FRD ref:** §7.10 · Same long-form base as Article (3.6) with these differences: no ads anywhere on this template; header adds Peer-reviewed badge, paper type, authors-with-institution row (ORCID icon links), received/accepted/published dates, DOI/volume/issue/ISSN line; body includes numbered sections/figures, references list, declarations block, supplementary files list, licence statement, peer-review statement box. All cols 3–10 same as Article.

**Mobile:** planned.

---

### 3.11 Global Watch `/global-watch`

**FRD ref:** §8 · Full spec in Section 4 of this document (separate section, it's the most structurally distinct public page).

---

### 3.12 Author page `/authors/[username]`

**FRD ref:** §7.12 · **Canvas:** 1440px

| Zone | Grid | Elements |
| --- | --- | --- |
| Header | Cols 1–12 | Avatar 160px (cols 1–2), name/designation/institution/badges/bio/expertise chips/links (cols 3–12) |
| Stats | Cols 1–12 | Published counts by type, inline row |
| Work | Cols 1–12 | Tabs (All/Articles/Reports/Research) + card grid 3-up, 12/page |

**Mobile:** planned.

---

### 3.13 Search `/search`

**FRD ref:** §7.13 · **Canvas:** 1440px

| Zone | Grid | Elements |
| --- | --- | --- |
| Header | Cols 1–12 | Query input, result count |
| Facets | Cols 1–3, sticky | Content type, Topic, Subtopic, Content label, Author, Country, Date range |
| Results | Cols 4–12 | Sort control top-right; result rows (label, title w/ highlighted terms, snippet, author, date, type icon) |

Empty state: centred, cols 4–12, one line + 2 links. `noindex`.

**Mobile:** planned.

---

### 3.14 Videos `/videos`

**FRD ref:** §7.14 · **Canvas:** 1440px

| Zone | Grid | Elements |
| --- | --- | --- |
| Hero | Full-bleed, cols 1–12 | "Videos", sub, Subscribe button |
| Featured | Cols 1–12 | Large player (pinned video) |
| Playlists | Cols 1–12 | Tabs from YouTube playlists |
| Grid | Cols 1–12 | 16:9 thumbnails, 4/row, duration/title/date/views, 12/page, Load more |

**Mobile:** planned.

---

### 3.15 Where We Are `/where-we-are`

**FRD ref:** §7.15 · **Canvas:** 1440px

| Zone | Grid | Elements |
| --- | --- | --- |
| Hero | Full-bleed, cols 1–12 | "Where we are", sub |
| Channel grid | Cols 1–12 | Large cards, 2/row: platform icon, name, handle, description, optional follower count, Follow button |
| Note | Cols 1–12 | Impersonation note line |

**Mobile:** planned.

---

### 3.16 About PSF `/about`

**FRD ref:** §7.16 · **Canvas:** 1440px, no team/staff listing (decided)

| Zone | Grid | Elements |
| --- | --- | --- |
| Hero | Full-bleed image, cols 1–12, 360px | Title, mission statement `display` |
| Who we are | Cols 1–7 text / cols 8–12 image | 2 paragraphs |
| What we do | Cols 1–12 | 4 columns (Analysis/Research/Newsroom/Global Watch), icon + 2 lines each |
| Our desks | Cols 1–12 | Data-driven list of active Topics w/ descriptions |
| By the numbers | Cols 1–12 | 4 KPI tiles (hidden below CMS threshold) |
| Our journey | Cols 3–10 | Vertical timeline, year/title/2 lines/optional image per milestone |
| How we work | Cols 1–12 | Editorial standards summary + 3 links |
| Independence and funding | Cols 3–10 | Statement block |
| Work with us | Cols 1–12 | 3 cards |

**Mobile:** planned.

---

### 3.17 Policy-template pages, Editorial Policy, Corrections, Contributor Agreement, Privacy, Cookies, Disclaimer, Copyright, Terms

**FRD ref:** §7.17, §7.19, §7.23 · **Canvas:** 1440px, **one shared template**, 8 instances

| Zone | Grid | Elements |
| --- | --- | --- |
| Header | Cols 3–10 | Title, "Last updated" date |
| Body | Cols 3–10, sticky TOC cols 11–12 | Rich-text body auto-generating a table of contents from headings |
| Footer | Cols 3–10 | "Questions? Contact" line |

**Page-specific additions inside the same template:**
- **Corrections `/corrections`** (§7.18): adds a form block (cols 3–10, fields per FRD table) below the policy text, then a paginated "Corrections log" list.
- **Cookies**: adds a live cookie table (name/purpose/category/duration) + "Change cookie settings" button, both cols 3–10.
- **Copyright**: adds a takedown-request form, cols 3–10.

**Mobile:** planned.

---

### 3.18 Publish With Us `/publish-with-us`

**FRD ref:** §7.20 · **Canvas:** 1440px

| Zone | Grid | Elements |
| --- | --- | --- |
| Hero | Full-bleed, cols 1–12 | Title + sub |
| Two tracks | Cols 1–6 / 7–12 | 2 cards: Articles & reports / Research, each with who/formats/length/turnaround + Apply button |
| What we look for | Cols 3–10 | Bullet list |
| Formats/lengths | Cols 3–10 | Table |
| Process | Cols 1–12 | Steps per track, 2 rows |
| FAQs | Cols 3–10 | Accordion |
| CTA | Cols 1–12 | 2 buttons |

**Mobile:** planned.

---

### 3.19 Contact Us `/contact`

**FRD ref:** §7.21 · **Canvas:** 1440px, no address/phone shown

| Zone | Grid | Elements |
| --- | --- | --- |
| Hero | Full-bleed, cols 1–12 | Title |
| How we can help | Cols 1–12 | Routing guide, 6 short cards |
| Form | Cols 3–10 | Fields per FRD table, Turnstile |
| Response note | Cols 3–10 | 1 line |

**Mobile:** planned.

---

### 3.20 Advertise With Us `/advertise`

**FRD ref:** §7.22 · **Canvas:** 1440px, distinct, sales-oriented

| Zone | Grid | Elements |
| --- | --- | --- |
| Hero | Full-bleed image, cols 1–12, 360px | Title, sub, primary button (scroll-to-form), image |
| Audience in numbers | Cols 1–12 | KPI row (toggle: live/manual) |
| Who reads PSF | Cols 1–12 | 4 audience cards |
| Placements | Cols 1–12 | Visual cards per ad slot (mockup thumbnail, dimensions, page location), grid 4/row |
| Formats/policies | Cols 3–10 | Accepted formats + editorial-independence statement |
| Process | Cols 1–12 | 4-step strip |
| Enquiry form | Cols 3–10 | Fields per FRD table |
| FAQ | Cols 3–10 | Accordion |

**Mobile:** planned.

---

### 3.21–3.23 404 / 410 / 500 / Maintenance

**FRD ref:** §6.9 · **Canvas:** 1440px, shared minimal template (header + footer still present, no breadcrumb)

| Zone | Grid | Elements |
| --- | --- | --- |
| Center block | Cols 4–9, vertically centred in available space | Icon-free message heading, 1-line copy, search field (404 only), 3 quick links |

Maintenance: same template, admin-editable message, `/admin` and `/sign-in` remain reachable (not shown on this page itself).

**Mobile:** planned (error pages are simple enough to reflow without a separate pass, but confirm later).

---

### 3.24 ID card verification `/verify/[token]`

**FRD ref:** §7.24 · **Canvas:** 1440px, **no header nav, no footer links, no analytics**, minimal standalone template

| Zone | Grid | Elements |
| --- | --- | --- |
| Center card | Cols 5–8, centred vertically | PSF logo (small), status icon (green check / red cross), heading, message, Card ID, Designation (Active only), "Verified on [date]" |

Three states only: Active / Inactive / Unknown token: exact copy in FRD Appendix A.15. `noindex, nofollow`.

**Mobile:** not applicable in the usual sense (it's scanned from a phone camera), treat as a single responsive template now rather than deferring; it's simple enough not to need a separate mobile pass.

---

This covers all 31 public templates named in FRD §4.4 (Home, Topics hub, Topic, Subtopic, Article, Reports hub, Report category, Report, Research hub, Research category, All research, Research paper, Peer review, Submit a paper, Newsroom, Newsroom post, Global Watch, Author, Search, Videos, Where We Are, About, Editorial Policy, Corrections, Contributor Agreement, Publish With Us, Contact, Advertise, Privacy, Cookies, Disclaimer, Copyright, Terms, Verify, 404, 410, 500, Maintenance, legal pages share template 3.17, error pages share template 3.21–3.23).



## 4. Global Watch `/global-watch`

**FRD ref:** §8.4 (page), §8.1–8.3 and §8.5 (data/behaviour rules, read these for what drives the visuals) · **Purpose:** map-first page showing everywhere PSF has reported · **Canvas:** 1440px

This is the most structurally distinct public template, so it gets its own section rather than sitting inside Section 3's table format.

| Zone | Grid | Elements | Component refs | Notes / states |
| --- | --- | --- | --- | --- |
| Header strip | Full-bleed `--ivory-50`, cols 1–12, 120px | Title "Global Watch" (`h1`), sub, live stats row (4 items: locations covered, items in range, most-covered country, last update time PKT) | | |
| Globe stage | Cols 1–12, 70vh height | Left filter panel (cols 1–3, collapsible) + Globe canvas (cols 4–12 when panel open, 1–12 when collapsed) | | Globe is `dynamic(ssr:false)`; static nightly-rendered fallback image until WebGL loads (FRD 8.5 FR-GLB-07) |
| Filter panel | Cols 1–3 | Content-type checkboxes (4), Topic/Subtopic select, Date-range preset pills (7d/30d/90d-default/12m/All/Custom), Region select, Country search (flies globe to country), Layer toggles (PSF Coverage / Status layer / Country borders), Reset link | Checkbox, Select, Switch | Collapses to an icon rail; [UX ADD] collapse chevron top-right of panel |
| Controls (on globe) | Overlaid, bottom-right of globe canvas | Zoom in/out, reset view, pause/play rotation, "View as list" toggle, fullscreen | Ghost icon buttons | View as list = the accessible table alternative (FRD FR-GLB-08), not a separate route |
| Hover tooltip | Overlaid, follows cursor | City, country, flag, counts by type, latest headline + date | | |
| Location drawer | Right drawer, 480px, overlays globe on selection | Header (city/country/region, counts, status badge), tabs (All/Articles/Reports/Research/Newsroom), item card list (compact), "Load more" (10 at a time), footer (See all coverage in [Country], share link) | Drawer, Content card/Compact | On mobile this becomes a bottom sheet (Section 8), not relevant to this desktop spec beyond the flag |
| Legend | Cols 1–12, below globe, 1 line | Point sizes, recency colors, status colors, disclaimer link | | |
| Borders disclaimer | Cols 1–12, small text | Always visible under the globe | | Verbatim text: FRD Appendix A.17 |
| Region-wise coverage | Cols 1–12 | Region tabs (All, South Asia, Middle East, Central Asia, East Asia, Southeast Asia, Europe, Africa, Americas, Oceania); within a tab: country chip row, then card grid 3-up filtered by panel filters, 12/page | | |
| Most covered | Cols 1–6 | Ranked list, top 10 countries, horizontal bars (house chart style) | | |
| Recent activity feed | Cols 7–12 | Timeline, last 10 published items with location | | |
| Ad | Full-bleed `global_watch_banner`, cols 1–12 | 970×250 | | |

**Globe visual style (binding, FRD 8.5 FR-GLB-13):** land `--ivory-200`, ocean `--paper` with a very light `--ivory-50` graticule, country borders `#C9C2B0` 0.5px (Pakistan border slightly stronger), no satellite imagery, no glow/atmosphere effect; this is the single most important screen for the "must not look AI-generated" rule, since a glowing rotating globe is exactly the generic-AI-demo look PSF explicitly wants to avoid. Keep it flat, cartographic, and quiet.

**Point states (FRD 8.2):** size scales on item count (4 steps: 1 / 2–5 / 6–20 / 21+); color shows recency: `--danger-700` pulse ring only for Breaking newsroom items in the last 48h, otherwise `--green-700` (≤7 days), `--green-500` (8–30 days), `--green-200` (31+ days).

**Compact home version (FRD §7.1 H6):** same visual style at 420px height, no filter panel, no controls overlay beyond rotation pause-on-hover; this is a preview, not the full instrument. Clicking a point on the home globe navigates straight to `/global-watch?loc=[id]`.

**Mobile:** planned, globe becomes 60vh full width, filters move to a bottom sheet, drawer becomes a bottom sheet (per FRD 8.4; full mobile layout is a separate future doc per Section 8 of this document).



## 5. Auth and onboarding (12 screens)

All auth screens share one template shell: centred card, cols 4–9 (narrower than content pages; these are focused, single-task screens), `--ivory-50` page background, no utility bar, header reduced to logo-only (links to `/`), no footer link columns (just copyright line). `noindex` on every screen in this section (FRD §2.2).

| Zone (shared shell) | Grid | Elements |
| --- | --- | --- |
| Logo | Cols 4–9, centred, top | Emblem + wordmark, links to `/` |
| Card | Cols 4–9, white, 1px border, 4px radius, 48px padding | Screen-specific content (below) |
| Footer line | Cols 4–9, centred | © copyright only |

### 5.1 Sign in `/sign-in`

**FRD ref:** §9.2 · Card contents: H1 "Sign in", Email field, Password field (show/hide), "Keep me signed in" checkbox, Button/Primary "Sign in" full card width, "Forgot password?" link, divider, "New to PSF? Write for PSF" link. Turnstile widget appears below the button only after 2 failed attempts, [UX ADD] reserve its 65px height in the layout from the start so the card doesn't jump when it appears.

### 5.2 Two-factor challenge `/two-factor`

**FRD ref:** §9.12 · Card: H1 "Enter your code", 6-digit input (TOTP) or "Use a backup code instead" link toggling to a single text field, Button/Primary "Verify", "Back to sign in" link.

### 5.3 Join chooser `/join`

**FRD ref:** §9.3 · Wider card variant, cols 3–10: H1 "Write for PSF", 2 large option cards side by side (cols 3–6 / 7–10 within the card), each with heading/copy/button; footer note about Approvers/Experts being invite-only; "Already have an account? Sign in" link.

### 5.4 Article Writer signup (step 1) `/join/article`

**FRD ref:** §9.4 · Stepper header (4 steps: Account / Verify email / About you / Submitted) above the card. Form fields in order: First name, Last name, Email, Password, Confirm password, Areas of expertise (multi-select), Institution/University, Designation, Profile picture upload, Agreements checkbox, Turnstile, Button/Primary "Continue" full width.

### 5.5 Research Writer signup (step 1) `/join/research`

**FRD ref:** §9.4 · Identical layout and fields to 5.4 (step 1 is shared between both tracks per FRD, only the stepper's downstream steps differ).

### 5.6 Email verification (OTP), shared by both tracks

**FRD ref:** §9.5 · Card: heading "Check your email," masked email line, 6 separate digit boxes (auto-advance, paste-friendly), "Resend code" (disabled countdown until 60s), "Use a different email" link.

### 5.7 Article Writer signup, step 2

**FRD ref:** §9.7 · Stepper at step 3. Read-only summary strip (name, email + verified badge) at top of card. Fields: "Tell us about yourself and your writing" textarea, "Link to a previous publication" (repeatable, +Add another), Writing sample upload, Social/professional profile URL. Buttons: "Back" (Tertiary) / "Submit application" (Primary), side by side at card bottom.

### 5.8 Research Writer signup, step 2

**FRD ref:** §9.6 · Same shell as 5.7. Fields: Institution/University (locked if set in step 1), Designation (locked), Department/Faculty, Programme/Degree, Graduation status (radio), Graduation year (conditional), Registration number (conditional), ID card upload (optional, with the private-storage helper note), ORCID, up to 3 profile URLs, Research interests textarea, "Why register with PSF" textarea, Previous publications textarea. Longer form, card scrolls, buttons pinned at the bottom.

### 5.9 Application submitted, confirmation

**FRD ref:** §9.8 · Full-page confirmation (not the standard card shell, wider breathing room, cols 4–9 centred content, no stepper): green check icon, H1 "Application submitted!", personalised copy, 2 buttons ("Back to home" Tertiary / "View application status" Primary).

### 5.10 Set password (invite acceptance) `/set-password?token=`

**FRD ref:** §9.10 · Card: name + email (read-only) + role shown at top, Password field, Confirm password field, agreement checkbox, Button/Primary "Set password and continue". If the role requires 2FA, this flows straight into a second in-card step (QR code + manual key + verify field + backup-codes list with download/copy, "I've saved these" confirm checkbox) before redirecting to Sign in.

### 5.11 Forgot password `/forgot-password`

**FRD ref:** §9.11 · Card: H1 "Reset your password", Email field, Turnstile, Button/Primary "Send reset link", "Back to sign in" link. Always shows the same neutral confirmation message regardless of whether the email exists.

### 5.12 Reset password `/reset-password?token=`

**FRD ref:** §9.11 · Card: H1 "Choose a new password", New password field, Confirm field, Button/Primary "Reset password".

**Expired/invalid link and lockout states** (not separate routes, just states of 5.1/5.10/5.11): same card shell, icon-free message + "Request a new link" or resend action, keep copy exactly as FRD specifies (§9.2 status table, §9.10 step 7).

**Mobile:** planned for the whole Auth area, single-column card shell already reflows naturally, but confirm spacing later.



## 6. Contributor + Approver portal (18 screens)

### Shared shell (every `/portal/*` screen)

**FRD ref:** §10.1 · Background `--ivory-50`, content panels white with hairline borders.

| Zone | Grid | Elements |
| --- | --- | --- |
| Sidebar | Fixed left, 240px (collapsible to 64px icon rail) | Logo (small), nav items shown per permission (Overview, My Articles, My Reports, My Research, Reviews, Notifications, Profile, Account), bottom: "View site" / "Admin" (if permitted) / Sign out |
| Top bar | Full width of remaining canvas (1440 − 240 = 1200px), 64px height | Page title left; right: primary action split-button ("Write article" / "Write report" / "Submit research" per permission), notification bell, avatar menu |
| Content area | Remaining canvas, 1280px max inner width with padding | Screen-specific content below |

### 6.1 Overview `/portal`

**FRD ref:** §10.2 · Content cols (within the 1200px portal canvas): full width.

| Block | Layout | Elements |
| --- | --- | --- |
| Welcome | Full width, 1 row | "Welcome back, [name]" + role badges; first-login banner (3-item checklist) replaces this row for new users |
| KPI tiles | 5-up row | Published / In review / Drafts / Changes requested-Rejected / Total reads, + Reads-last-30-days with delta |
| Reads chart | 2/3 width, left | Line chart, daily reads, 30/90-day toggle |
| Top content | 1/3 width, right | Table, top 5 by reads |
| Status board | Full width | Mini-kanban counts (research stages); Approvers/Research Writers only |
| Action needed | 1/2 width, left | List: changes requested, revision requests, review assignments, co-author invites |
| Recent activity | 1/2 width, right | Last 10 events list |
| Geography | Full width | "Where your readers are", top 5 countries bar list |

### 6.2 My Articles (`/portal/articles` (and identical My Reports) `/portal/reports`)

**FRD ref:** §10.3 · Full-width table page.

| Zone | Elements |
| --- | --- |
| Tabs | All / Live / In review / Drafts / Changes requested / Rejected / Scheduled, with counts |
| Filter row | Topic, Subtopic, Status, Date range selects + title search |
| Table | Columns: Title, Topic/Subtopic, Status (chip), Last updated, Published, Reads, Actions (overflow menu) | Table component (FRD 3.7), sticky header, row hover `--green-50`, pagination 25/50/100 |
| Empty states | Per-tab copy (FRD §10.3) + single action button, centred in the table area |

**My Reports is the identical screen** at `/portal/reports`, same table, same columns, same empty-state pattern. No separate spec needed.

### 6.3 Article editor `/portal/articles/new` and `/[id]/edit`

**FRD ref:** §10.4 · **Canvas:** 1440px (full-bleed editor, sidebar collapses to icon rail by default here to maximise writing space, [UX ADD], not a functional change).

| Zone | Grid | Elements |
| --- | --- | --- |
| Sticky top bar | Full width | Autosave status text, "Preview" / "Save draft" / "Submit for review" buttons right-aligned |
| Main column | Left, 760px | Title (large serif input), Standfirst, Body (full rich-text editor + toolbar per FRD 3.7/10.4), Key takeaways (repeatable list), Sources and references (repeatable) |
| Settings sidebar | Right, 360px, independently scrolling, collapsible panels | Classification (label/topic/subtopic/tags), Location (region›country›city cascade + up to 4 more), Images (card + cover upload w/ crop, captions, credit, alt text), Authors (co-author search), SEO (title/description/slug/share-image override + live share preview), Declarations (checkboxes + note to editors) |

**Editor toolbar:** full row above the body text area, paragraph/H2-H4, Bold/Italic/Underline/Strike, Link, lists, blockquote, pull quote, callout, footnote, rule, table, image, infographic, gallery, embed, undo/redo, clear formatting. Exact inventory: FRD 10.4.

**Submission flow modal (Preview, full-screen):** separate layer, see Section 7 (Modals).

### 6.4 Article view (admin/author read view) `/portal/articles/[id]`

**FRD ref:** §10.3/10.4 (view is the published-style render used for preview and for the author's own "View on site" / in-review read) · Same visual template as the public Article page (3.6), displayed inside the portal's content area at cols matching 1200px canvas rather than full 1440px public width, minor width difference only, same component.

### 6.5 Report editor `/portal/reports/new` and `/[id]/edit`

**FRD ref:** §10.5 · Same shell as 6.3 with field differences: Report Category select (replaces free Topic-only classification emphasis), Executive summary (simple rich text), Key findings (repeatable, 3–7), Full report PDF upload (triggers cover-thumbnail auto-extract if no cover uploaded), Report cover (portrait) upload, Number of pages (auto, read-only), Body (minimum 1,500 words, same toolbar as article).

### 6.6 Report view `/portal/reports/[id]`

Same as 6.4, rendered with the Report page template (3.8) instead of Article.

### 6.7 Research submission (step 1 (Paper details) `/portal/research/new`

**FRD ref:** §10.6 · **Canvas:** 1440px, 3-step progress stepper above the content (Paper details / Manuscript / Files and declarations), single column cols 3–10 within the 1200px portal canvas (narrower than the article editor; this is a structured form, not free-flow writing).

| Elements (in order) |
| --- |
| Title, Running title, Paper type, Research Category, Topic/Subtopic, Locations (cascade + up to 4), Abstract, Keywords, "Your details" read-only display block, Co-authors (repeatable group, max 8), Corresponding author radio, Funding statement, Conflict of interest, Ethics statement, Data availability, Previously presented |

### 6.8 Research submission, step 2 (Manuscript)

**FRD ref:** §10.6 · Same single-column shell: Full text (numbered-heading editor), References (structured textarea + style select), Figures/tables auto-list.

### 6.9 Research submission, step 3 (Files and declarations)

**FRD ref:** §10.6 · Same shell: Anonymised manuscript PDF upload (with the metadata-author warning), Title page PDF (optional, hidden from approvers), Supplementary files (multi, up to 5), Card image, Cover image, SEO fields, Declarations (checkbox group), Suggested/excluded reviewers, Cover letter to editor. Final action "Review and submit" opens the full preview (Section 7 modals).

### 6.10 Research view (author's own) `/portal/research/[id]`

**FRD ref:** §10.7 · Single column cols 3–10: Status timeline (vertical, stage dates), Decision letters (reviewer identities shown only as "Reviewer 1/2"), Versions list (v1, v2… with download), Action buttons (Revise and resubmit / Withdraw) shown conditionally by status.

### 6.11 My Research `/portal/research`

**FRD ref:** §10.7 · Same table shell as 6.2 (My Articles) with tabs: All / Drafts / Submitted / Under review / Revisions requested / Awaiting final approval / Published / Rejected.

### 6.12 Reviews queue (Approver) `/portal/reviews`

**FRD ref:** §11.1 · Same table shell as 6.2. Tabs: Invitations / To review / Re-submitted / Completed: Approved / Completed: Revisions requested / Completed: Rejected / All. Columns: Paper title (anonymised), Reference ID, Paper type, Topic, Round, Assigned, Due (chip for due-soon/overdue), Status, Action (Accept/Decline or Review button).

### 6.13 Review workspace `/portal/reviews/[assignmentId]`

**FRD ref:** §11.3 · **Canvas:** 1440px, split screen, sidebar collapsed to icon rail.

| Zone | Grid | Elements |
| --- | --- | --- |
| Left (paper) | Cols 1–7 (of the 1200px content area, i.e. ~60%) | Tabs: Paper (rendered anonymised text) / PDF (viewer + thumbnails) / Files / Previous round (diff view, Round 2+). Highlight-to-comment interaction anchors inline comments to passages |
| Right (review form) | Cols 8–12 (~40%), independently scrolling | Recommendation radio (4 options), 5 scored criteria (1–5 each), Comments to author (rich text), Confidential comments to editor, Attach annotated file, Save draft / Submit review buttons |

### 6.14 Notifications `/portal/notifications`

**FRD ref:** §10.9 · Full-width list: filter row (All/Unread/Submissions/Reviews/Account) + "Mark all as read", list rows with unread highlighting (left `--green-500` bar + bold), each linking to its source screen. Separate "Notification preferences" panel (per-category email toggles) at the bottom of the same page or as a distinct tab, FRD doesn't separate it into its own route, keep it on this screen.

### 6.15 Profile `/portal/profile`

**FRD ref:** §10.10 · Two-column form: left (cols 1–7, within content area) fields (profile picture, name, public display name, username, designation/institution/department, short bio, expertise, links, show-public-profile toggle); right (cols 8–12) live preview card of the public author page.

### 6.16 Account `/portal/account`

**FRD ref:** §10.11 · Full-width, stacked panels: Change email (OTP flow), Change password, 2FA (setup/backup codes), Active sessions (list with "Sign out" per row + "Sign out of all others"), Notification preferences (if not placed on 6.14), "Download my data" button, "Request account deletion" button (destructive, Tertiary/Destructive style).

### 6.17 Apply for another role `/portal/apply-role`

**FRD ref:** §10.12 · Opens the relevant step-2 form (6.7's Research fields or 5.7's Article fields) with profile data prefilled, inside the portal shell rather than the auth shell (user is already signed in), single column cols 3–10.

### 6.18 Submission success screen (shared)

**FRD ref:** §10.4 (step 4) / §10.6 (research equivalent) · Centred confirmation panel within the portal content area (not full-page like 5.9; this one stays inside the sidebar shell since the user continues working): check icon, "Your [article/report] has been submitted," summary card (title/topic/time/reference ID), "What happens next" copy, 2 buttons ("Go to My Articles" / "Write another").

**Mobile:** planned for all contributor-facing screens (6.1, 6.2, 6.4, 6.6, 6.10–6.12, 6.14–6.18). **Not planned for the dense editors** (6.3, 6.5, 6.7–6.9) and **review workspace** (6.13) in the first mobile pass, flag these for a later decision since split-screen/rich-text editing on a phone is a genuinely separate design problem, not a simple reflow; call this out explicitly rather than assuming.



## 7. Admin dashboard

**FRD ref:** §12 · This section documents every screen named in FRD §12, grouped by sidebar module in the same order as FRD 12.1. The FRD's count of "34 screens" rolls several pre-filtered table views (e.g. Article Writers / Research Writers / Approvers are all the same Users table with a different filter chip) into one layout each here; every *distinct layout* is specified below; no content, filter, column, or action from FRD §12 is omitted.

### Shared shell (every `/admin/*` screen)

| Zone | Grid | Elements |
| --- | --- | --- |
| Sidebar | Fixed left, 264px (collapsible) | Grouped nav per FRD 12.1 structure, badge counts on items needing action |
| Top bar | Remaining canvas, 64px | Global admin search (centre-left, expandable), "Create" quick menu (right), notification bell, avatar menu |
| Content area | Remaining canvas, 1280px max inner width | Screen-specific |

**Shared listing-table pattern** (used by Users, Applications, Articles, Reports, Research, Ads campaigns, Inbox, ID cards, reference this instead of re-deriving it per screen):

| Zone | Elements |
| --- | --- |
| Header row | Page title + primary action button (e.g. "Create user") right-aligned |
| Toolbar | Search input, Filters button (opens filter drawer), active-filter chips row, saved-views dropdown, column-chooser icon, CSV export icon (permission-gated) |
| Table | Table component (FRD 3.7): sticky header, sortable columns, row checkbox, row hover `--green-50`, overflow menu (⋯) at row end, pagination 25/50/100 |
| Bulk action bar | Appears above the table, replacing the toolbar, when ≥1 row checked | Context-specific bulk actions + "Clear selection" |

### 7.1 Overview `/admin`

**FRD ref:** §12.2

| Block | Layout | Elements |
| --- | --- | --- |
| Action centre | Card grid, 4/row | One card per item in FRD's action-centre list (pending applications, articles/reports/research pending, overdue reviews, unread inbox, expired featured slots, ending campaigns, globe entries past review), each: count, label, link |
| Traffic KPIs | 4-up row | Visitors, Page views, Reads, Avg. time on page, each with delta badge |
| Visitors chart | 2/3 width, left | Line chart, 30 days, 2 series |
| Hourly heatmap | 1/3 width, right | Hour × day-of-week grid, 4 weeks |
| Geography | Full width | Top-10 table (countries, cities) + small world choropleth, side by side |
| Content KPIs | 4-up row | Published this month by type, total live, active contributors, approval rate |
| Top content | 1/2 width, left | Table, top 10 by reads (7d) |
| Recent submissions | 1/2 width, right | List, latest 10 across types |
| Live now | Full width | "Visitors in last 5 min" count + top-5 current pages list |

Date-range selector top-right of the whole page, default Today / Last 30 days.

### 7.2 Analytics `/admin/analytics`

**FRD ref:** §12.3 · Tabs: Audience / Content / Acquisition / Geography / Contributors / Engagement, one screen, tab content swaps below a shared global filter bar (date range, compare toggle, content type, Topic, country, device). Each tab: a mix of KPI rows, charts (house style, FRD 3.9), and tables per the FRD 12.3 metrics table, lay out as KPI row → primary chart (2/3 + 1/3 secondary chart or table) → supporting tables full width. Every chart/table has a CSV/PNG export icon top-right (permission-gated).

**Visitor detail / IP log** (sub-view, `users.view_ip`): same listing-table pattern, time, IP (masked after 90 days), country, city, device, browser, landing page, pages viewed, referrer.

### 7.3 Users

**FRD ref:** §12.4

- **7.3.1 All users listing**, `/admin/users` (+ the pre-filtered sidebar views: Pending applications → 7.4, Article Writers, Research Writers, Approvers, Experts, Staff and admins, Invited, Deactivated, Banned, Permanently rejected, **all the same listing-table pattern**, filter pre-applied, with role-specific extra columns layered on per FRD's table for each view, e.g. Approvers gets "Assigned reviews / avg. turnaround," Banned gets "Banned date / reason").
- **7.3.2 User detail**, `/admin/users/[id]` · Two-column: left (cols 1–8) Header block (avatar, name, email, roles, status, actions) → Profile fields → Application (if applicable, full read-only submission) → Submissions table (tabs All/Articles/Reports/Research) → Reviews (Approvers) → Activity (last 50 entries); right (cols 9–12, sticky) Counters card → Security panel (2FA, sessions, failed sign-ins) → Admin notes thread.
- **7.3.3 Create user**, `/admin/users/new` · 3-step stepper (Role → Details → Review and invite), single column cols 3–10 within content area, fields per FRD's role-conditional table (12.4.4).

### 7.4 Applications

**FRD ref:** §12.5

- **7.4.1 Applications listing**, `/admin/applications` · Listing-table pattern, default sort oldest-pending-first.
- **7.4.2 Application review**, `/admin/applications/[id]` · Read-only, single column cols 2–11: Header → Step 1 data → Step 2 data (incl. secure ID viewer) → Submission context (IP/geo/device + flags) → History (previous attempts) → Duplicate check; **Decision panel sticky at the bottom of the viewport**, 3 buttons (Approve / Reject with comments / Reject permanently), each opening its own confirmation dialog (Section 8).

### 7.5 Roles and permissions `/admin/roles`

**FRD ref:** §12.6

| Screen | Layout |
| --- | --- |
| Roles listing | Listing-table pattern: Role name, description, type (System/Custom), users count, last edited |
| Role editor | Two-column: left (cols 1–8) name/description/color + permission checklist grouped exactly as FRD 5.3's table, "Select all" per group, search; right (cols 9–12) live plain-English capability summary |

### 7.6 Articles (and identical Reports)

**FRD ref:** §12.7

- **Listing**, `/admin/articles` (and `/admin/reports`) · Listing-table pattern with the exact filter/column set from FRD 12.7's table, plus a hover-card on the title column showing full title/standfirst/image.
- **Review page**, `/admin/articles/[id]` · Two-column: left (cols 1–8) rendered preview with desktop/mobile toggle, switches to the full editor in place when "Edit" is clicked; right (cols 9–12) Metadata panel → Submission panel → Author snapshot → Checks (word count, missing alt text, broken links) → History (versions, comments thread). **Decision bar sticky at bottom**: Approve and publish now / Approve and schedule / Request changes / Reject.
- **Report review page** differs only in the metadata panel (report number, PDF replace with versioning, executive summary/key findings fields), same two-column layout.

### 7.7 Research papers `/admin/research`

**FRD ref:** §12.8

- **Listing**, exact columns from FRD 12.8's table (incl. per-approver status chips).
- **Research item page**, `/admin/research/[id]` · This is the most complex admin screen: two-column, left (cols 1–7) Manuscript panel (rendered text / anonymised PDF viewer / title page / supplementary files / version diffs, as tabs) + Metadata panel below it; right (cols 8–12) a **vertically stacked set of panels that change visibility by status**: Screening checklist+actions (status Submitted) → Assign approvers → Review tracker (per-approver rows) → Editor decision → Final approval (status Awaiting final approval) → Communications log → History. Only the panel matching the paper's current status is expanded; earlier/later ones are shown collapsed as a stage tracker. [UX ADD] this progressive-disclosure pattern keeps the screen from showing 6 full panels at once, it's a presentation choice, not a scope change.

### 7.8 Newsroom `/admin/newsroom`

**FRD ref:** §12.9 · Listing-table pattern (simple columns: time, headline, location, topic, status, breaking, pinned, author, clicks). Clicking a row or "New post" opens the **edit modal** (Large, 880px, see Section 8), not a separate route.

### 7.9 Featured and Top Stories `/admin/featured`

**FRD ref:** §12.10

- **Slots overview**, `/admin/featured` · Card grid grouped by page (Home, Topics, Reports, Research, Mega menu); each card: slot name, positions, current item thumbnail(s), state badge, next-scheduled preview, "Manage" link.
- **Slot timeline (Manage)**, per-position horizontal Gantt-style timeline (current/upcoming/past 30 days), click a bar to edit. The "Add placement" stepper is a modal (Section 8), not a screen.

### 7.10 Taxonomy `/admin/taxonomy/*`

**FRD ref:** §12.11 · Four sibling screens, same shell (tree/list + detail panel):

| Screen | Layout |
| --- | --- |
| Topics | Tree view, drag-and-drop ordering, cols 1–12; inline counts, status toggles, "Show in nav/home" flags per row; create/edit opens a right drawer (name, slug, description, hero image, icon, flags, inline Subtopics repeater) |
| Report categories | Flat list (optional sub-level), same drawer pattern, fields per FRD (name, slug, description, hero, icon, order, active) |
| Research categories | Same pattern, one level |
| Tags | Simple listing-table (usage count), rename/merge/delete actions inline |

### 7.11 Global Watch admin `/admin/global-watch`

**FRD ref:** §12.12 · Three stacked panels, full width: Status layer entries (listing-table: country/region, status, note, start, review-by) with create/edit modal → Globe settings (form panel: default range, layer defaults, rotation speed, home globe toggle, disclaimer text) → Coverage health (list: items without coordinates, top locations, migrated items missing location).

### 7.12 Ad management

**FRD ref:** §12.13

- **Campaign listing**, `/admin/ads/campaigns` · Listing-table pattern, columns per FRD table.
- **Create/edit campaign**, `/admin/ads/campaigns/new` · Single-column form (cols 2–11): campaign fields at top (brand, number, name, description, contact, linked enquiry), then a **Placements repeater** below; each placement row shows slot/window/creative thumbnails/status with its own edit/duplicate/remove, "+ Add placement" opens the 4-step placement modal (Section 8).
- **Campaign analytics**, `/admin/ads/campaigns/[id]/analytics` · Header (campaign identity + countdown) → KPI row (6 tiles) → Chart (full width, daily impressions/clicks) → 3 tables side by side where space allows (By placement / By device / By country) → By hour chart → "Download results" (PDF/CSV) buttons.
- **Slot calendar**, `/admin/ads/calendar` · Month/week toggle, rows = slots, horizontal bars = placements (colour-coded per campaign), filter by page.

### 7.13 Inbox `/admin/inbox`

**FRD ref:** §12.14 · Two-pane: left (cols 1–4) listing-table pattern collapsed into a compact message list (tabs All/Contact/Corrections/Advertise/Copyright); right (cols 5–12) detail view of the selected message (all submitted fields, attachments, IP/geo, internal notes, status/assign controls, reply composer, linked-item actions).

### 7.14 ID cards `/admin/id-cards`

**FRD ref:** §12.15 · Listing-table pattern (Card ID, Designation, Status, Verification URL + copy, QR download, scans, last scanned). "Create card" opens a modal (Section 8) that immediately shows the generated URL + QR for copy/download.

### 7.15 CMS `/admin/cms/*`

**FRD ref:** §12.16

- **Pages list**: `/admin/cms/pages` · Listing-table pattern (every public page, status, last edited).
- **Page editor**, `/admin/cms/pages/[key]` · Two-column: left (cols 1–7) the page's sections listed in template order, each with typed fields (text/rich text/image/link/repeatable/toggle), optional sections collapsible; right (cols 8–12, sticky) live preview with desktop/tablet/mobile toggle. Top bar: Draft status, Preview / Publish / Discard draft, History dropdown.
- **Navigation / Footer / Social links / Media library / Global settings**, four sibling settings-style screens (tabs within `/admin/cms`, not separate top-level routes): Navigation (editable About-dropdown items + utility-bar links list), Footer (mission line, column titles, link repeaters, copyright template), Social links (table: platform/URL/handle/description/toggles/order), Media library (grid/list toggle, filters, detail drawer per asset), Global settings (form: logo uploads, favicon, default share image, site name/tagline, contact emails per source, X handle, maintenance message, disclaimer text, home-section toggles).

### 7.16 Activity logs `/admin/activity-logs`

**FRD ref:** §12.17 · Listing-table pattern (Super Admin only), columns exactly per FRD table (Log ID, date/time, actor, action, target, URL, IP/location, device, result), expandable row for the metadata diff. Heavy filter drawer (date, actor, role, action-type group, target type, result, IP, country).

### 7.17 Settings `/admin/settings`

**FRD ref:** §12.18 · Tabs: General / Email templates / Integrations / Security / Data retention / Maintenance / Cookie policy version, one screen, left-side tab rail (cols 1–2) + form panel (cols 3–12) per tab. Email templates tab is itself a mini listing (template key/subject) → detail editor (subject/body with variable chips/preview/send-test).

### 7.18 Admin account `/admin/account`

**FRD ref:** §12.19 · Same layout as Portal Account (6.16) plus a "My saved views" panel listing the admin's saved table filter presets.

**Mobile:** not applicable; Admin is explicitly excluded from the future mobile pass per the user's own scope note. Every screen in this section stays desktop-only.



## 8. Modals, drawers and dialogs (consolidated, FRD Appendix C)

Four reusable patterns (FRD 3.7); every modal below is one of these, not a bespoke frame:

| Pattern | Width | Use |
| --- | --- | --- |
| **Standard modal** | 560px | Short forms, confirmations with one field |
| **Large modal** | 880px | Multi-field forms, steppers (shown one step at a time inside the 880px frame) |
| **Full-screen modal** | Full viewport | Content preview (article/report/research preview, device toggle) |
| **Right drawer** | 480px | Quick view, detail panels layered over a list or the globe (desktop width; becomes a bottom sheet on mobile, out of scope here) |

All: focus trap, Esc closes (except destructive confirms: Cancel only), backdrop `rgba(20,23,26,0.48)`, Level 3 elevation. Destructive confirmations additionally require typing the target's email or a fixed confirmation word (FRD 3.7).

Every modal/drawer in FRD Appendix C, mapped to its pattern, trigger, and the screen it belongs to:

| # | Modal / drawer | Pattern | Trigger / opens from | Content (brief) |
| --- | --- | --- | --- | --- |
| 1 | Search overlay | Full-bleed panel (not a modal, see FRD 6.4) | Header search icon | Input + grouped instant results |
| 2 | Mega menu / dropdowns | Panel (not a modal) | Header nav hover/click | Per FRD 6.2 |
| 3 | Mobile navigation drawer | Out of scope (mobile) | — |, |
| 4 | Cookie settings | Standard | Consent banner "Settings" / footer "Cookie settings" | 4 category toggles, descriptions |
| 5 | Video lightbox | Full-screen | Home/Videos page thumbnail click | Player, title, description, "Watch on YouTube," share |
| 6 | Citation modal | Standard | Report/Research page "Cite this" | Format tabs (APA/Chicago/Harvard/BibTeX/RIS), copy buttons |
| 7 | Globe location drawer | Right drawer | Global Watch point/list-row click | Per Section 4 of this doc |
| 8 | Globe filters (mobile) | Out of scope (mobile) | — |, |
| 9 | Image cropper | Standard | Any image upload field | Crop box locked to field's ratio, zoom, rotate |
| 10 | Editor dialogs (link/image/table/embed/footnote) | Standard | Rich-text toolbar buttons | Per-field forms, FRD 10.4 |
| 11 | Submission preview (full screen) | Full-screen | Article/Report/Research editor "Submit for review" | Rendered as-published, desktop/mobile toggle, share-card preview, "Back to editing" / "Confirm and submit" |
| 12 | Missing fields panel | Standard (inline panel, not overlay) | Submit attempt with validation errors | List of fields with "Go to field" links |
| 13 | Withdraw submission confirm | Standard | Portal My Articles/Research row action | Confirmation copy + Confirm/Cancel |
| 14 | Request update on live item | Standard | Portal live-item "Request update" | What to change, reason, optional attachment |
| 15 | Accept/decline review invitation | Standard | Approver Reviews queue | Conflict-of-interest checkbox (accept) or reason select + text (decline) |
| 16 | Submit review confirm | Standard | Review workspace "Submit review" | Summary of recommendation + confirm |
| 17 | 2FA setup and backup codes | Standard (multi-step within) | Account page, or forced post-invite | QR, manual key, verify field, 10 backup codes |
| 18 | Change email (OTP) | Standard | Account page | New email + password → OTP step |
| 19 | Edit roles | Standard | Admin Users row action | Role checkboxes + effective-permission summary |
| 20 | Deactivate/reactivate | Standard | Admin Users row action | Reason select (deactivate) / optional note (reactivate) |
| 21 | Ban (type-to-confirm) | Standard, destructive | Admin Users row action | Impact summary, reason select, type-email-to-confirm |
| 22 | Application decision (approve / reject with comment / reject permanently) | Standard (3 variants) | Application review decision panel | Per FRD 12.5 table |
| 23 | ID document viewer | Standard/Large (image-focused) | Application review | Secure zoom/rotate viewer, no download unless permitted |
| 24 | Role editor delete/reassign | Standard | Admin Roles | Reassign-users picker or block message |
| 25 | Approve and schedule picker | Standard | Admin Article/Report/Research review | Date+time (PKT) picker |
| 26 | Request changes / reject comment | Standard | Admin content review | Required comment textarea |
| 27 | Unpublish/delete confirm | Standard | Admin content row action | Reason (unpublish) / standard confirm (delete) |
| 28 | Add correction | Standard | Admin live-item action | Correction text, date, position (top/bottom) |
| 29 | Assign approvers | Large | Admin Research item, Screening stage | Approver search w/ expertise match + load/turnaround, 1–2 picks, due date, message |
| 30 | Editor decision / final approval / retraction | Standard (3 variants) | Admin Research item | Decision-specific fields per FRD 12.8 |
| 31 | Newsroom post create/edit | Large | Admin Newsroom listing | Full field set, FRD 12.9 table |
| 32 | Add featured placement (stepper) | Large | Admin Featured, or any content row's "Feature" action | 6-step: Page → Category → Section/position → Content → Start/end → Review |
| 33 | Topic/subtopic/category create-edit, merge | Large (create/edit) / Standard (merge) | Admin Taxonomy | Per FRD 12.11 field tables |
| 34 | Status layer entry | Standard | Admin Global Watch | Country/region, status, note, start, review-by |
| 35 | Add/edit ad placement (stepper) | Large | Admin Ads, campaign "+ Add placement" | 4-step: Slot → Dates → Creatives → Confirm |
| 36 | Pause/archive campaign | Standard | Admin Ads campaign row action | Confirm + optional note |
| 37 | Inbox reply composer | Standard | Admin Inbox detail panel | Rich-text reply, sends + logs thread |
| 38 | Create ID card (+ copy URL + QR) | Standard | Admin ID cards | Card ID + Designation fields → generated URL/QR with copy/download |
| 39 | Activate/deactivate card | Standard | Admin ID cards row action | Confirm + optional reason |
| 40 | CMS publish/discard/restore revision | Standard | Admin CMS page editor | Confirm (publish/discard) or version picker (restore) |
| 41 | Media details/replace | Standard | Admin CMS media library | Dimensions/size/alt text/credit/usage, replace file control |
| 42 | Activity log row details | Standard (inline expand, not overlay) | Admin Activity logs row | Before/after diff, reason/comment |
| 43 | Create user stepper | Large | Admin Users "Create user" | 3-step: Role → Details → Review and invite |

**Mobile:** modal/drawer behaviour on mobile (drawers → bottom sheets, full-screen stays full-screen, Standard/Large narrow to near-full-width) is part of the future mobile doc, out of scope here except where noted above as explicitly excluded.



## 9. Mobile scope: flag only (no mobile layout in this document)

Per direction: this document specifies **desktop only**. The table below flags, page by page, whether a mobile version is planned for later, so nothing is assumed either way. Full mobile layouts (stacking order, what collapses, touch targets, bottom sheets) are a **separate future document**, out of scope here.

**Public pages (31), all planned**, including Home, Newsroom (+ post), Topics hub, Topic, Subtopic, Article, Reports hub (+ category, + Report), Research hub (+ category, + paper), Global Watch, Author, Search, Videos, Where We Are, About, all 8 policy-template pages, Publish With Us, Contact, Advertise, 404/410/500/Maintenance. One exception: **ID card verification** is being treated as a single responsive template now rather than deferred (Section 3.24); it's simple enough not to need a separate pass, and it's opened from a phone camera in practice.

**Auth (12), all planned.** The centred-card shell reflows naturally; confirm spacing in the mobile pass.

**Portal (18), planned, with one carve-out:**

| Screen | Mobile |
| --- | --- |
| Overview, My Articles/Reports/Research, Article/Report/Research view, Reviews queue, Notifications, Profile, Account, Apply for role, Submission success | Planned |
| Article editor, Report editor, Research submission (3 steps), Review workspace | **Flagged for a later decision**, rich-text editing and split-screen review are a separate design problem on a phone, not a simple reflow. Don't assume either outcome yet. |

**Admin (34), not applicable, all of it.** Per the user's own scope note, Super Admin/Admin is excluded from the mobile pass entirely. No admin screen in Section 7 gets a mobile version.

**Modals/drawers (Section 8), follows their host screen.** A modal on a page flagged "planned" gets a mobile treatment (drawers become bottom sheets, Large/Standard modals narrow); a modal that only appears in Admin stays desktop-only.

---

## 10. Figma / Claude Design handoff checklist

Before a screen in this document is considered built:

- [ ] Frame is 1440px canvas, 1280px content container, 24px gutters (Section 1.4)
- [ ] Every color used is a token from Section 1.2 or FRD 3.3, no ad-hoc hex values
- [ ] Headlines/editorial body use Source Serif 4; interface chrome uses Inter (Section 1.3), no third typeface introduced anywhere
- [ ] Every component instance is linked to the Section/FRD 3.7 component library, not a one-off redraw
- [ ] Checked against the "must not look AI-generated" list (Section 1.5): gradients, glass, pill shapes, emoji icons, stock hero art, filler stats all absent
- [ ] Every zone in this document's table for that screen is present in the frame, nothing silently dropped, nothing silently added beyond the marked [UX ADD] items
- [ ] States covered per the screen's notes column: empty, loading/skeleton, error, and the relevant status variants (per FRD's state machines, §13)
- [ ] No gold/yellow used as a UI color anywhere outside the fixed logo lockup (Section 1.1)

---

## 11. Open items (new, raised by this document)

| # | Item | What this document assumes | Needs PSF confirmation? |
| --- | --- | --- | --- |
| D1 | Logo green locked to the sampled hex `#04411F`, full scale regenerated (Section 1.2) | Resolves FRD open item O1 | Confirm the sampled value matches PSF's official brand guideline hex, if one exists separately from the logo file itself |
| D2 | Gold (`#D9A52B`) from the crest stays inside the fixed logo lockup only, never a UI color, per FRD decision D4 ("no yellow") | Current reading: D4 stands as written despite the logo's prominent gold | **Yes, flag this explicitly.** This is the one place this document reads the brand more strictly than the logo itself visually suggests. Worth a quick PSF sign-off before screens are built, since reversing it later touches every screen that would get a gold accent |
| D3 | White-background logo lockup (header, body) uses the file as supplied; footer needs a white/light version of the full crest for the dark `--green-900` background | FRD 6.5 already flags this requirement (O2, "Logo files (SVG, white version)") | Still open from the FRD; the supplied file is a flattened PNG on a light background; a true vector white-knockout version is needed before footer/dark-surface builds |

All other open items (research licence, ISSN, email addresses, content thresholds, etc.) remain as listed in FRD §30 and are unaffected by this document.

---

## 12. Scope reminder (closing)

Everything in this document describes screens, elements, and states that already exist in the FRD's requirements. Where this document adds layout detail the FRD doesn't spell out (grid spans, spacing, which component variant) that's presentation, not new scope. The handful of **[UX ADD]** items (Section 3.1's scroll reveal, the article share-rail fade-in, the research item page's progressive-disclosure panels, the admin editor's collapsed sidebar) are the only places this document goes slightly beyond a literal FRD reading, and each is called out specifically so it can be dropped without touching anything else. If a question comes up during design that would require a new field, a new workflow step, or a new permission, that's a change to the FRD, not a design decision, raise it rather than resolving it in Figma.



