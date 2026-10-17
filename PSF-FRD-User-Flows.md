# PSF Website & Portal: Functional Requirements and User Flow Specification

Pakistan Strategic Forum | forumstrategic.com

| Item | Value |
| --- | --- |
| Document | Functional Requirements Document (FRD), User Flows, Design Foundations |
| Version | 1.0 Draft |
| Date | 16 Oct 2026 |
| Prepared by | Sadiq, Project Management Lead |
| Audience | Development team (vibe-coded build), design team (Claude Design / Figma), PSF leadership |
| Companion files | `PSF-Flow-Diagrams-and-ERD.md` (Mermaid user flows and database ERD) |
| Status | For review. Items marked **[CONFIRM]** need a PSF decision or real content before build sign-off |

---

## Contents

- [0. How to use this document](#0-how-to-use-this-document)
- [1. Product overview](#1-product-overview)
- [2. Technical architecture](#2-technical-architecture)
- [3. Design system](#3-design-system)
- [4. Information architecture](#4-information-architecture)
- [5. Roles and permissions (RBAC)](#5-roles-and-permissions-rbac)
- [6. Global components (public site)](#6-global-components-public-site)
- [7. Public pages](#7-public-pages)
- [8. Global Watch and the PSF Coverage globe](#8-global-watch-and-the-psf-coverage-globe)
- [9. Authentication and onboarding](#9-authentication-and-onboarding)
- [10. Contributor portal (Article Writers, Research Writers, Experts, Approvers as authors)](#10-contributor-portal-article-writers-research-writers-experts-approvers-as-authors)
- [11. Approver portal](#11-approver-portal)
- [12. Admin dashboard](#12-admin-dashboard)
- [13. State machines](#13-state-machines)
- [14. Featured and Top Stories slots](#14-featured-and-top-stories-slots)
- [15. Ad slot registry](#15-ad-slot-registry)
- [16. Taxonomy and locations](#16-taxonomy-and-locations)
- [17. Read counts, visitor analytics and tracking](#17-read-counts-visitor-analytics-and-tracking)
- [18. Upload rules (every upload field shows these hints)](#18-upload-rules-every-upload-field-shows-these-hints)
- [19. Notifications and emails](#19-notifications-and-emails)
- [20. Search](#20-search)
- [21. Activity log catalogue](#21-activity-log-catalogue)
- [22. SEO, sharing and discoverability](#22-seo-sharing-and-discoverability)
- [23. Security and privacy](#23-security-and-privacy)
- [24. Performance and reliability](#24-performance-and-reliability)
- [25. Integrations](#25-integrations)
- [26. Archive migration (2020 to 2024 content)](#26-archive-migration-2020-to-2024-content)
- [27. Build order and milestones (suggested)](#27-build-order-and-milestones-suggested)
- [28. Data model summary](#28-data-model-summary)
- [29. API surface (indicative)](#29-api-surface-indicative)
- [30. Open items to confirm](#30-open-items-to-confirm)
- [Appendix A. Draft static content (CMS seed copy)](#appendix-a-draft-static-content-cms-seed-copy)
- [Appendix B. Email templates (draft copy)](#appendix-b-email-templates-draft-copy)
- [Appendix C. Modal, drawer and dialog inventory](#appendix-c-modal-drawer-and-dialog-inventory)
- [Appendix D. Launch checklist](#appendix-d-launch-checklist)
- [Appendix E. Brief traceability (every requirement from the PSF brief)](#appendix-e-brief-traceability-every-requirement-from-the-psf-brief)

---

## 0. How to use this document

1. **Single source of truth.** This document defines every page, modal, form, field, state, rule and permission for the public website, the contributor portal, the approver portal and the admin dashboard. If something is not in here, it is not in scope for v1.
2. **For developers.** Each module lists routes, data, validation, states, permissions and edge cases. Section numbers are stable references (for example "FR 9.4.3"). Build module by module in the order given in Section 27.
3. **For designers.** Section 3 (Design System) and Section 6 (Global Components) are binding. Each page in Sections 7 to 13 lists its sections top to bottom; design them in that order.
4. **Requirement IDs.** Rules written as `FR-XXX-nn` are testable acceptance requirements.
5. **Conventions.**
   - All times are stored in UTC and displayed in **Pakistan Standard Time (PKT, Asia/Karachi, UTC+05:00)**, formatted `16 Oct 2026, 14:30 PKT`.
   - "Admin" means any user holding a role with the relevant permission. "Super Admin" means the system role with every permission.
   - "Content item" means an Article, Report, Research Paper or Newsroom Post.
   - Spelling is British English throughout (defence, organisation, programme).
   - **[CONFIRM]** = needs PSF input. **[PLACEHOLDER]** = draft content to be replaced.

---

## 1. Product overview

### 1.1 What PSF is

Pakistan Strategic Forum (PSF) is a **defence and military think tank** publishing reporting, analysis, reports and peer-reviewed research on defence, national security, geopolitics, national affairs and military history. The new platform positions PSF as an institution with a newsroom attached: credible, evidence-led and structured.

### 1.2 Platform components

| Component | Who uses it | Purpose |
| --- | --- | --- |
| Public website | Visitors (no login) | Read articles, reports, research, newsroom, Global Watch globe, videos; contact PSF; apply to write |
| Contributor portal | Article Writers, Research Writers, Experts, Approvers (for their own writing) | Apply, write, submit, track and revise content |
| Approver portal | Approvers (professors, senior analysts) | Peer-review research papers |
| Admin dashboard | Super Admin and custom admin roles | Moderate users and content, manage taxonomy, featured placements, newsroom, ads, CMS, ID cards, analytics, activity logs |
| ID card verification | Anyone scanning a PSF staff ID QR code | Confirm a card is genuine and active |

### 1.3 Goals

1. Restart and sustain publishing with a clear editorial workflow.
2. Give PSF institutional credibility through peer-reviewed research, named authors and transparent policies.
3. Make PSF's coverage spatially visible through the Global Watch globe.
4. Give PSF full control of the site without developers: CMS, taxonomy, featured placements, ads and roles.
5. Capture trustworthy analytics, including reader geography and per-item read counts.

### 1.4 In scope for v1

Everything in this document. Highlights: public site (24 page templates), two-track contributor signup with OTP, invite-based accounts for approvers, experts and staff, dynamic RBAC, article, report and research workflows (research double-blind peer review), newsroom, featured and top stories scheduling, ad campaign management with analytics and PDF export, CMS for all public pages, contact, corrections and advertising inboxes, activity logs, analytics, ID card verification, archive migration, rich link previews for sharing.

### 1.5 Out of scope for v1

| Item | Note |
| --- | --- |
| Urdu or any second language | Decided: English only, no i18n structure |
| Reader accounts, bookmarks, comments, newsletter | Decided: not in v1. Share buttons only |
| Online ad payments | Decided: ad bookings are internal only |
| Paid membership or gated content | Not requested |
| Native mobile apps | Responsive web only |
| Automated plagiarism detection | Integration hook reserved (Section 25.4) |
| Public team directory | Decided: no team on About. Author byline pages are in scope |

### 1.6 Decisions log (from discovery, 16 Oct 2026)

| # | Topic | Decision |
| --- | --- | --- |
| D1 | Deliverable format | Markdown master spec plus Word version; separate diagrams file |
| D2 | Diagrams | User flow diagrams per role plus database ERD |
| D3 | Stack | Next.js (front end and API), Vercel, PostgreSQL + Prisma, Auth.js, Cloudflare R2 behind CDN, Resend email |
| D4 | Colours | White and ivory base, logo green as the single accent, near-black text. No yellow |
| D5 | Language | English only, permanently. No i18n layer |
| D6 | Reader role | None. Accounts exist only for contributors, approvers, experts and staff |
| D7 | Multiple roles per user | Yes. RBAC lets a user hold several roles; admins can create any role |
| D8 | Who submits Reports | Experts, Article Writers, Approvers, Research Writers (admin approves) |
| D9 | Research review | Admin assigns 1 or 2 approvers, double-blind, then admin final approval |
| D10 | Author pages | Public byline profile per author. No team directory |
| D11 | Engagement | Share buttons with rich preview cards (image, title, PSF branding). No comments, bookmarks or newsletter |
| D12 | Location data | Standard dataset only: Region > Country > City with coordinates |
| D13 | Archive | Migrate 2020 to 2024 articles with original dates, authors and 301 redirects |
| D14 | Research outputs | PDF download, citation block, DOI field, ISSN for the research series |
| D15 | Videos | YouTube Data API auto-pull, admin can pin or hide |
| D16 | Homepage social | Live X and Instagram embeds (consent-gated, lazy-loaded) |
| D17 | Read counts and IP | 1 read per IP per item per 24 h; raw IP kept 90 days then anonymised; consent banner with Reject |
| D18 | Ads | Internal bookings only, no payments |
| D19 | Notifications | Email plus in-app bell |
| D20 | ID card page | Card ID, designation and status only; unguessable URL; noindex |
| D21 | Fonts | Source Serif 4 (editorial) and Inter (interface) |
| D22 | Static copy | Draft placeholder copy included (Appendix A), marked for PSF and legal review |
| D23 | CMS behaviour | Draft, preview, publish, with version history and rollback |
| D24 | Brand green | Placeholder token from the current site, to be replaced with the exact logo hex **[CONFIRM]** |

### 1.7 Glossary

| Term | Meaning |
| --- | --- |
| Topic | Top-level subject category (Defence, Geopolitics, National Affairs, History, plus any created later) |
| Subtopic | Second-level category under a Topic (for example Defence > Air) |
| Report Category | Section-specific taxonomy for Reports (dynamic) |
| Research Category | Section-specific taxonomy for Research (dynamic) |
| Content label | Editorial format label shown on cards (Analysis, Explainer, Opinion, and so on) |
| Location | Region > Country > City attached to a content item; drives the globe |
| PSF Coverage | The globe layer that plots every published item at its location |
| Global Watch | The public page dedicated to the globe and region-wise coverage |
| Newsroom | Short, fast news posts written by admins; feed the home ticker and the globe |
| Slot | A predefined position on a page that can hold a featured item or an ad |
| Approver | Admin-created reviewer (professor or senior analyst) who peer-reviews research |
| Expert | Admin-created profile for a recognised specialist; can submit articles and reports |
| Application | A contributor signup awaiting admin approval |
| Read | One counted view of a content item by a unique IP within 24 hours |

---

## 2. Technical architecture

### 2.1 Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js (App Router), TypeScript** | One codebase: public site, portals, admin, API (Route Handlers and Server Actions) |
| Hosting | **Vercel** | Preview deployments per branch; production on `forumstrategic.com` |
| Database | **PostgreSQL** (Neon or Vercel Postgres) + **Prisma ORM** | Point-in-time recovery enabled; `pg_trgm` and full-text search extensions |
| Auth | **Auth.js (NextAuth v5)** credentials provider | Database sessions; argon2id password hashing; TOTP 2FA |
| File storage | **Cloudflare R2** (S3-compatible) | Two buckets: `psf-public` (CDN-served) and `psf-private` (signed URLs only) |
| CDN and images | Cloudflare CDN in front of R2; `next/image` with a custom loader | Automatic WebP/AVIF, responsive sizes, EXIF stripped on upload |
| Email | **Resend** with React Email templates | Transactional only; DKIM and SPF on `forumstrategic.com` |
| Cache and rate limiting | Upstash Redis | Rate limits, OTP attempt counters, read-count dedup keys, ticker cache |
| Bot protection | Cloudflare Turnstile | Signup, sign-in after failures, all public forms |
| Search | PostgreSQL full-text search + `pg_trgm` | Upgrade path to Meilisearch if volume demands |
| Geo-IP | MaxMind GeoLite2 City (self-hosted DB, refreshed weekly) | Country and city from IP for analytics and submissions |
| Rich text editor | **TipTap** (ProseMirror) | Stored as JSON; rendered server-side to sanitised HTML |
| Globe | `react-globe.gl` (three.js) with Natural Earth 110m country polygons | Lazy-loaded client component; static fallback image |
| Charts (admin) | Recharts | Single chart style defined in Section 3.9 |
| PDF generation | `@react-pdf/renderer` (server) | Campaign analytics export, research cover pages |
| OG images | `next/og` (`ImageResponse`) | Dynamic share cards per content item |
| Scheduled jobs | Vercel Cron | Publishing schedules, featured rotation, IP anonymisation, YouTube sync, reminders |
| Monitoring | Sentry (errors), Vercel Analytics (Web Vitals), uptime monitor (Better Stack or similar) | Alerts to PSF tech contact |
| Video | YouTube Data API v3 | Channel uploads synced every 6 hours |
| Social embeds | X (Twitter) embed widget, Instagram oEmbed | Loaded only after consent |

### 2.2 Application zones and route groups

| Zone | Route prefix | Rendering | Indexing |
| --- | --- | --- | --- |
| Public site | `/` | Static + ISR, on-demand revalidation on publish | Indexed |
| Auth | `/sign-in`, `/join`, `/set-password`, `/forgot-password`, `/reset-password` | Dynamic | `noindex` |
| Contributor and approver portal | `/portal/*` | Dynamic, authenticated | `noindex`, disallowed in robots.txt |
| Admin dashboard | `/admin/*` | Dynamic, authenticated, permission-gated | `noindex`, disallowed in robots.txt |
| ID card verification | `/verify/[token]` | Dynamic | `noindex, nofollow` via meta and `X-Robots-Tag`; never linked or listed in sitemaps |
| API | `/api/*` | Route handlers | Not indexed |

### 2.3 Architecture rules

- **FR-ARC-01** Every API route and Server Action checks the session and the specific permission server-side. UI hiding is never the only control.
- **FR-ARC-02** All uploads go browser to R2 through short-lived pre-signed URLs issued by the API after permission and file-type checks. Files are never proxied through the Next.js server.
- **FR-ARC-03** Sensitive files (student and institutional ID uploads, unpublished manuscripts, application attachments) go to `psf-private` and are served only via signed URLs valid for 10 minutes to users with permission.
- **FR-ARC-04** Public pages revalidate on demand (`revalidateTag`) when content, taxonomy, featured slots, ads, navigation or CMS sections change. Fallback revalidation every 10 minutes.
- **FR-ARC-05** All writes that change state are recorded in the Activity Log (Section 21).
- **FR-ARC-06** All timestamps are stored as UTC `timestamptz`. Scheduling inputs are entered in PKT and converted.
- **FR-ARC-07** Soft delete everywhere for user-generated content (`deletedAt`). Purge jobs run after the retention period.
- **FR-ARC-08** Rich text is stored as TipTap JSON and rendered through an allowlist sanitiser. No raw HTML input from contributors.
- **FR-ARC-09** Environment variables hold all secrets; no secret is exposed to the client bundle.
- **FR-ARC-10** Three environments: Development, Staging (`staging.forumstrategic.com`, password-protected, `noindex`), Production.

### 2.4 Domain and subdomains

| Host | Role after relaunch |
| --- | --- |
| `forumstrategic.com` / `www` | Public site, portal and admin (single Next.js app) |
| `research.forumstrategic.com` | 301 redirect to `/research` |
| `portal.forumstrategic.com` | 301 redirect to `/portal` |
| `cdn.forumstrategic.com` | Cloudflare-fronted R2 public bucket |
| `pakstrategic.com` (legacy) | 301 redirects to mapped new URLs (Section 26) |

---

## 3. Design system

### 3.1 Design principles

1. **Institutional, not decorative.** PSF should read like a serious research institute with a live newsroom: FT and Reuters for density and date-stamped credibility, SIPRI and IISS for sobriety, CSIS for readable long-form.
2. **Typography does the heavy lifting.** Hierarchy comes from type, rules (hairlines) and whitespace, not from boxes, shadows or colour.
3. **Green carries meaning.** The logo green marks action, active state, PSF-owned elements and peer-reviewed status. It is never used as a background wash across large areas except the footer and the CTA band.
4. **Every number has a date and a source.** Cards show dates; charts show source and "as of" lines; the globe shows counts and date ranges.
5. **Calm motion.** Motion confirms an action or reveals data. Nothing bounces, glows or loops for attention, except the globe rotation (which pauses on hover and honours reduced motion).

### 3.2 "Must not look AI-generated" rules (binding)

| Do not use | Use instead |
| --- | --- |
| Gradient backgrounds, gradient text, mesh blobs | Flat ivory or white surfaces; dark scrim only over photos |
| Glassmorphism, frosted panels, glow shadows | Hairline borders (1px) and one subtle dropdown shadow |
| Fully rounded pill buttons and pill cards | Square-ish corners: 2px buttons and inputs, 4px cards |
| Emoji, sparkle icons, robot or "magic" icons | One line-icon family (Lucide, 1.5px stroke) |
| Generic 3D illustrations, stock soldiers, flags, metallic weapon hero art | Credited photography, archival images, data-derived graphics, typographic cards |
| Centred hero with a big tagline and two buttons | Editorial lead story layout with real content |
| Card grids where every card has a heavy shadow | Ruled lists, mixed card sizes, editorial grid |
| Lorem-style filler stats ("10x faster") | Real counts from the database, or the section is hidden |
| Animated counters on every number, parallax everywhere | Static numbers; one subtle fade-in per section at most |
| Dark mode as default, black and neon | Light theme only in v1 |

### 3.3 Colour tokens

> **[CONFIRM]** The green scale below is a placeholder derived from the current site. Replace `--green-700` with the exact logo hex and regenerate the scale (keep the same lightness steps). Yellow from the logo is **not** used anywhere.

**Surfaces and ink**

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#FFFFFF` | Default page background, cards, inputs |
| `--ivory-50` | `#FBF9F4` | Alternating section background (the "ivory" feel) |
| `--ivory-100` | `#F5F1E8` | Utility bar, sidebar background, table header, quote blocks |
| `--ivory-200` | `#E9E3D5` | Borders and dividers on ivory surfaces |
| `--line` | `#E4E2DC` | Hairlines on white |
| `--ink-900` | `#14171A` | Primary text, headlines |
| `--ink-700` | `#2E3338` | Body text on long-form |
| `--ink-500` | `#5A6169` | Secondary text, metadata |
| `--ink-400` | `#7A8189` | Placeholder text, disabled labels (never for body text) |

**Brand green (placeholder scale)**

| Token | Hex | Use |
| --- | --- | --- |
| `--green-900` | `#0A2A1C` | Footer background, deep overlays |
| `--green-800` | `#0E3B28` | Primary button pressed, active nav underline |
| `--green-700` | `#134F35` | **Primary brand**: buttons, links, active states, logo lockups |
| `--green-600` | `#1B6545` | Primary button hover |
| `--green-500` | `#2A7D57` | Focus rings, globe coverage points, chart series 1 |
| `--green-200` | `#BFD9CB` | Selected rows, chip borders |
| `--green-100` | `#E3EFE8` | Peer-reviewed badge background, success toasts |
| `--green-50` | `#F1F7F3` | Hover background for list rows |

**Semantic**

| Token | Hex | Use |
| --- | --- | --- |
| `--danger-700` | `#A4231A` | Destructive buttons, errors, "Breaking" label, Active conflict layer |
| `--danger-50` | `#FBEDEB` | Error field background, destructive confirmation panels |
| `--warning-700` | `#9A4A0B` | Pending, due soon, High tension layer (amber-brown, not yellow) |
| `--warning-50` | `#FBF1E6` | Warning banners |
| `--info-700` | `#1F4A7A` | Informational banners, links in admin help text |
| `--info-50` | `#EAF1F8` | Info banners |
| `--success-700` | `#1B6545` | Same as `--green-600` |

**Status chips (dashboards)**

| Status | Text | Background |
| --- | --- | --- |
| Draft | `--ink-500` | `--ivory-100` |
| Pending / In review | `--warning-700` | `--warning-50` |
| Changes requested | `--warning-700` | `--warning-50` (with outline) |
| Approved / Live / Published | `--green-700` | `--green-100` |
| Scheduled | `--info-700` | `--info-50` |
| Rejected | `--danger-700` | `--danger-50` |
| Deactivated | `--ink-500` | `--ivory-200` |
| Banned / Permanently rejected | `#FFFFFF` | `--danger-700` |

**Contrast rule FR-DS-01:** all text meets WCAG 2.1 AA (4.5:1 body, 3:1 large text and UI components). `--ink-400` is never used for readable text.

### 3.4 Typography

**Families** (self-hosted with `next/font`, `font-display: swap`, Latin subset):

| Role | Family | Weights | Why |
| --- | --- | --- | --- |
| Editorial (headlines, article and report body, pull quotes) | **Source Serif 4** (variable, optical sizing) | 400, 400 italic, 600, 700 | Built for long reading on screen, optical sizes keep headlines crisp and body comfortable, institutional tone |
| Interface (navigation, labels, metadata, buttons, forms, tables, dashboards, charts) | **Inter** (variable) | 400, 500, 600 | Highly legible at small sizes, tabular numerals for data |

**Type scale** (desktop / mobile, rem based on 16px):

| Token | Family | Size (desktop / mobile) | Line height | Weight | Use |
| --- | --- | --- | --- | --- | --- |
| `display` | Serif | 56 / 36 | 1.08 | 600 | Home lead headline, page heroes |
| `h1` | Serif | 44 / 32 | 1.12 | 600 | Article and report titles |
| `h2` | Serif | 32 / 26 | 1.2 | 600 | Section titles, article H2 |
| `h3` | Serif | 24 / 21 | 1.25 | 600 | Card titles (large), article H3 |
| `h4` | Serif | 20 / 18 | 1.3 | 600 | Card titles (standard) |
| `standfirst` | Serif | 22 / 19 | 1.45 | 400 | Article subtitle under H1 |
| `body-long` | Serif | 19 / 18 | 1.65 | 400 | Article, report and research body (max measure 68 characters) |
| `body` | Inter | 16 / 16 | 1.55 | 400 | UI body, forms, dashboard text |
| `body-sm` | Inter | 14 / 14 | 1.5 | 400 | Card summaries, table cells |
| `meta` | Inter | 13 / 13 | 1.4 | 500 | Author, date, read time |
| `label` | Inter | 12 / 12 | 1.2 | 600, uppercase, letter-spacing 0.08em | Content labels, overlines, section kickers |
| `data` | Inter | any | 1.2 | 500, `tabular-nums` | KPIs, tables, counters |
| `quote` | Serif italic | 28 / 22 | 1.35 | 400 | Pull quotes |

**Rules**

- Headings use sentence case. Never all caps except `label`.
- Article body links: `--green-700`, underline 1px with 3px offset; hover thickens underline to 2px.
- Drop cap optional on long-form (CMS toggle per item), 3 lines, Serif 600.
- Numbers in tables and KPIs always use `tabular-nums`.
- Reader text size control (A−, A, A+) in the utility bar scales `body-long` by 0.9 / 1 / 1.15 and persists in `localStorage`.

### 3.5 Layout, grid and spacing

| Item | Value |
| --- | --- |
| Breakpoints | `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1440 |
| Container | max 1280px content width, 1440px for full-bleed sections |
| Grid | 12 columns, 24px gutters (desktop), 16px gutters and 16px side margin (mobile) |
| Long-form column | 720px max (body), 960px for wide figures, full-bleed for infographics |
| Spacing scale (px) | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 |
| Section vertical rhythm | 80px desktop, 48px mobile between home sections |
| Radii | 2px (buttons, inputs, chips), 4px (cards, modals, dropdowns), 0 for images inside cards, 50% only for avatars |
| Elevation | Level 0: none. Level 1: 1px `--line` border. Level 2 (dropdowns, popovers): `0 8px 24px rgba(20,23,26,0.08)` + border. Level 3 (modals): `0 24px 64px rgba(20,23,26,0.16)` |
| Hairlines | 1px `--line`; section dividers on home use a 2px `--ink-900` top rule with the section label above it (newspaper convention) |

### 3.6 Iconography and imagery

- **Icons:** Lucide, 1.5px stroke, sizes 16 / 20 / 24. Icons always paired with text in navigation and buttons, except universally understood controls (search, close, menu, share, chevrons) which carry `aria-label`.
- **Topic icons:** uploaded per subtopic by admin (SVG preferred, monochrome, drawn on a 24px grid, single colour `currentColor`). A default icon set ships for the seeded subtopics (Land, Air, Sea, Strategic Systems, Cyber & Information, South Asia, Afghanistan, Americas, Middle East, Security, Economy, Policy, Battles & Operations, Profiles).
- **Photography:** every image has caption, credit and alt text. Credits appear bottom-right on hero images (`meta` size, 70% white on scrim) and below images in articles.
- **Image scrim:** only on hero images with overlaid text: linear `rgba(10,42,28,0)` to `rgba(10,42,28,0.82)` bottom 60%. This is the only gradient allowed.
- **No-image fallback:** typographic card using `--ivory-100` background, the content label, and the first letter of the topic set large in Source Serif at 20% opacity green. Never a stock weapon photo.
- **Maps:** the globe and any static map carry the borders disclaimer (Appendix A.17).

### 3.7 Core components (design and build specification)

Every component lists its states. All interactive components have visible focus (2px `--green-500` ring, 2px offset).

| Component | Variants | States and rules |
| --- | --- | --- |
| Button | Primary (green-700 fill, white text), Secondary (white fill, ink-900 1px border), Tertiary (text, green-700, underline on hover), Destructive (danger-700 fill), Ghost icon button | Default, hover, pressed, focus, loading (spinner replaces icon, label stays), disabled (40% opacity, `not-allowed`). Heights 40px (default), 48px (large), 32px (compact, dashboards). Label in Inter 500, 15px |
| Link | Inline, standalone with arrow | Visited state not styled differently (editorial convention) |
| Text input | Default, with prefix icon, with counter | Label above (Inter 500 14px), helper text below, error text in danger-700 with icon, character counter right-aligned when a max applies |
| Textarea | Auto-grow up to 12 lines | Counter for limited fields |
| Select / Combobox | Single, multi with chips, searchable, async (users, locations) | Keyboard: arrows, type-ahead, Enter, Esc |
| Cascading location picker | Region > Country > City | Country disabled until region chosen; city searchable; "Country-wide (no specific city)" option |
| Checkbox, Radio, Switch | | Hit area 44px minimum |
| Date and time picker | Date, datetime (PKT label always visible) | Range picker for filters with presets (Today, 7d, 30d, 90d, 12m, Custom) |
| File upload field | Image (with crop), document, multi-file | Shows: recommended size, aspect ratio, max file size, accepted formats (Section 18). Drag and drop, progress bar, replace, remove, preview thumbnail, error on wrong type or size before upload |
| Rich text editor | Full (articles, reports, research), Simple (newsroom, bios) | Section 10.4 |
| Content card | Lead (image left 7 cols, text 5), Standard (image top 3:2), Compact (no image, ruled list), Horizontal (thumb 96px left), Research (no image, abstract line, Peer-reviewed badge), Report (cover thumbnail portrait 3:4 + "PDF" tag), News (time + region, no image) | Every card shows: content label, title, author(s), date, read time (articles), read count only on admin views. Hover: title underline, image zoom 1.02 over 300ms |
| Content label | Analysis, Explainer, Opinion, Interview, Investigation, Profile, Book Review, News, Report, Research Paper, Policy Brief, Peer-reviewed, Archive, Breaking | Inter `label` style. Peer-reviewed: green-700 text on green-100 with check icon. Breaking: white on danger-700. Archive: ink-500 on ivory-100 |
| Tag chip | Topic/subtopic chips, filter chips | 2px radius, 28px height, removable variant in filters |
| Tabs | Underline tabs (public), segmented tabs (dashboards) | Count badges in dashboards |
| Table | Admin listing table | Sticky header, sortable columns, row hover green-50, row checkbox, overflow menu (⋯) at row end, truncated text with full text in tooltip on hover, pagination 25/50/100, column visibility toggle |
| Modal / Dialog | Standard (560px), Large (880px), Full-screen (preview) | Focus trap, Esc closes (except destructive confirms which require explicit Cancel), backdrop `rgba(20,23,26,0.48)` |
| Confirmation dialog | Standard, Destructive (type-to-confirm for Ban and Permanent Reject) | Destructive requires typing the user's email or `BAN` |
| Drawer | Right drawer 480px (globe location panel, quick view in admin) | |
| Toast | Success, error, info | Bottom-right desktop, top mobile, 5s auto-dismiss, pausable on hover |
| Banner | Info, warning, error, success | Page-level (for example "Your application was returned with comments") |
| Stepper | Horizontal numbered (forms) | Completed steps clickable, current highlighted green-700, future muted |
| Empty state | Per module | Short sentence, one action. No illustrations beyond a single line icon |
| Skeleton loaders | Card, table row, chart | Ivory-100 blocks, shimmer disabled under reduced motion |
| Pagination | Numbered (public listings), "Load more" (globe drawer, newsroom) | |
| Breadcrumbs | All public inner pages | `Home / Topics / Defence / Air` |
| Share bar | Inline (top of article), sticky vertical (desktop left rail), native share (mobile) | Section 6.7 |
| Avatar | 24, 32, 48, 96, 160 | Initials fallback on ivory-100 with ink-700 text |
| KPI tile | Number, label, delta vs previous period, sparkline optional | Inter `data` 32px |
| Notification bell | Badge count (max "9+") | Dropdown list of last 10, "View all" |

### 3.8 Motion

| Use | Spec |
| --- | --- |
| Hover transitions | 150ms ease-out (colour, underline) |
| Card image zoom | scale 1.02, 300ms ease-out |
| Dropdown and mega menu | fade + 4px translate, 160ms; close delay 120ms to prevent flicker |
| Modal | fade + scale 0.98 to 1, 200ms |
| Newsroom ticker | vertical auto-scroll one item every 5s, 400ms slide; pauses on hover, focus or when tab hidden |
| Globe | auto-rotate 0.35 deg/frame; stops on hover, drag or when a location is selected; resumes after 8s idle |
| Section reveal | single fade-up 12px, 400ms, once per section |
| Reduced motion | `prefers-reduced-motion: reduce` disables auto-rotate, ticker auto-scroll (manual arrows remain), reveal animations and image zoom |

### 3.9 Data visualisation house style (admin analytics, report charts, campaign PDFs)

- Series colours in order: `--green-700`, `--info-700`, `--warning-700`, `--ink-500`, `--green-500`, `--danger-700`. Never more than six series.
- Axes: Inter 12px `--ink-500`, gridlines `--line` horizontal only, no chart borders.
- Every chart: title (Inter 600 15px), subtitle with date range and timezone ("1 to 30 Oct 2026, PKT"), source line at bottom.
- Tooltips show exact values with thousands separators.
- Empty data: "No data for this period" in the chart area, never an empty axis.

### 3.10 Voice and tone

**Voice:** authoritative, measured, precise, evidence-led. PSF explains; it does not shout.

| Principle | Do | Avoid |
| --- | --- | --- |
| Precise | "Three JF-17 squadrons were redeployed to Quetta, according to two officials." | "Massive air force move shocks region!" |
| Measured | "This raises the risk of escalation along the LoC." | "War is coming." |
| Transparent | Label analysis, opinion and reporting distinctly; state sources | Mixing opinion into news without a label |
| Plain | Short sentences, defined acronyms on first use | Jargon without explanation |
| Respectful | Neutral naming, disputed territory noted as disputed | Slurs, partisan nicknames |

**Microcopy rules**

- Buttons are verbs: "Submit for review", "Save draft", "Approve and publish", "Request changes".
- Errors say what happened and what to do: "That code has expired. Request a new one."
- Dates: `16 Oct 2026`. Times: `14:30 PKT`. Relative time only under 24 hours ("3 hours ago"), then absolute.
- Numbers: thousands separators (`12,480`), "k" only in KPI tiles over 10,000 (`12.5k`).
- No exclamation marks in UI copy except the application-submitted confirmation.
- Never "Oops", "Whoops", "Uh-oh", or humour in error states.

### 3.11 Accessibility (acceptance criteria)

- **FR-A11Y-01** WCAG 2.1 AA across public site, portals and admin.
- **FR-A11Y-02** Skip-to-content link, landmarks (`header`, `nav`, `main`, `aside`, `footer`), one H1 per page.
- **FR-A11Y-03** Full keyboard operation: mega menu (arrows, Esc), modals, editor toolbar, globe (Tab to "View as list" alternative; arrow keys rotate; Enter selects focused location).
- **FR-A11Y-04** Alt text mandatory on every image upload (CMS enforces; decorative images can be marked decorative explicitly).
- **FR-A11Y-05** Captions on all video embeds where YouTube provides them; transcripts linked when available.
- **FR-A11Y-06** Form errors announced via `aria-live`, linked with `aria-describedby`.
- **FR-A11Y-07** Touch targets 44x44px minimum.
- **FR-A11Y-08** Reader text size control (Section 3.4) and respect for browser zoom up to 200% without horizontal scroll.

---

## 4. Information architecture

### 4.1 Primary navigation

Six top-level items. Topics, Reports, Research and About open dropdowns; the Topics dropdown is a three-level mega menu (Topic > Subtopics > featured item), matching the current site's dropdown behaviour.

| # | Item | Behaviour | Contents |
| --- | --- | --- | --- |
| 1 | **Topics** | Mega menu | Left column: every active Topic (dynamic, admin ordered). Hovering a Topic shows its Subtopics (with icons and article counts) in the middle column, and the Topic's featured item (image, label, title) in the right column. Footer link: "All topics" |
| 2 | **Reports** | Dropdown | Every active Report Category (dynamic), then "All reports" |
| 3 | **Research** | Dropdown | "Latest research", every active Research Category (dynamic), "How peer review works", "Submit a paper" |
| 4 | **Global Watch** | Direct link | `/global-watch` |
| 5 | **Newsroom** | Direct link | `/newsroom`, with a small live dot (green-500) when a post was published in the last 2 hours |
| 6 | **About** | Dropdown | About PSF, Editorial Policy, Publish With Us, Videos, Where We Are, Contact |

**FR-NAV-01** New Topics, Subtopics, Report Categories and Research Categories appear in navigation automatically when set Active, in the admin-defined order. Inactive categories disappear from navigation but their URLs return 410 if never published or keep working if content exists (see Section 16).

**FR-NAV-02** Maximum 8 Topics shown in the mega menu left column; beyond that, "More topics" links to `/topics`.

**FR-NAV-03** Mobile: hamburger opens a full-height drawer with accordion levels (Topic > Subtopics), search field at top, Sign in and Join buttons at bottom.

### 4.2 Sitemap (public)

```
/                                   Home
/topics                             Topics hub
/topics/[topic]                     Topic (category) page
/topics/[topic]/[subtopic]          Subtopic page
/articles/[slug]                    Article detail
/reports                            Reports hub
/reports/category/[category]        Report category page
/reports/[slug]                     Report detail
/research                           Research hub
/research/category/[category]       Research category page
/research/papers                    All research (filterable listing)
/research/[slug]                    Research paper detail
/research/peer-review               How peer review works
/research/submit                    Submit a paper (landing, routes to /join?track=research)
/newsroom                           Newsroom listing
/newsroom/[id]-[slug]               Newsroom post detail (shareable)
/global-watch                       Global Watch (globe page)
/authors/[username]                 Author profile (byline page)
/search                             Search results
/videos                             Videos
/where-we-are                       Social channels
/about                              About PSF
/editorial-policy                   Editorial Policy
/corrections                        Corrections (policy + form + corrections log)
/contributor-agreement              Contributor Agreement
/publish-with-us                    Publish With Us
/contact                            Contact Us
/advertise                          Advertise With Us
/privacy                            Privacy Policy
/cookies                            Cookie Policy
/disclaimer                         Disclaimer
/copyright                          Copyright & Takedown
/terms                              Terms of Use
/verify/[token]                     ID card verification (hidden)
/rss.xml, /rss/[topic].xml          RSS feeds
/sitemap.xml (index)                Sitemaps
/llms.txt, /llms-full.txt           AI discoverability files (kept from current site)
```

### 4.3 Sitemap (auth, portal, admin)

```
/sign-in
/join                               Track chooser
/join/article                       Article Writer signup (stepper)
/join/research                      Research Writer signup (stepper)
/set-password?token=                Invite acceptance
/forgot-password, /reset-password?token=
/two-factor                         2FA challenge

/portal                             Contributor overview (role-aware)
/portal/application                 Application status / resubmission
/portal/articles                    My articles (tabs)
/portal/articles/new, /portal/articles/[id]/edit, /portal/articles/[id]
/portal/reports                     My reports (tabs)
/portal/reports/new, /portal/reports/[id]/edit, /portal/reports/[id]
/portal/research                    My research papers (tabs)
/portal/research/new, /portal/research/[id]/edit, /portal/research/[id]
/portal/reviews                     Approver review queue (tabs)
/portal/reviews/[assignmentId]      Review workspace
/portal/notifications
/portal/profile                     Public profile settings
/portal/account                     Account, security, sessions, data export
/portal/apply-role                  Apply for an additional contributor track

/admin                              Overview
/admin/analytics
/admin/users, /admin/users/[id], /admin/users/new
/admin/applications, /admin/applications/[id]
/admin/roles, /admin/roles/[id]
/admin/articles, /admin/articles/[id]
/admin/reports, /admin/reports/[id]
/admin/research, /admin/research/[id]
/admin/newsroom
/admin/featured
/admin/taxonomy/topics, /admin/taxonomy/report-categories, /admin/taxonomy/research-categories, /admin/taxonomy/tags
/admin/global-watch                 Status layer management
/admin/ads/campaigns, /admin/ads/campaigns/[id], /admin/ads/campaigns/[id]/analytics, /admin/ads/calendar
/admin/inbox, /admin/inbox/[id]
/admin/id-cards
/admin/cms/pages, /admin/cms/pages/[key], /admin/cms/navigation, /admin/cms/footer, /admin/cms/social, /admin/cms/media
/admin/activity-logs
/admin/settings (general, email templates, integrations, security, maintenance)
/admin/account
```

### 4.4 Page and screen inventory (counts)

| Area | Count | Items |
| --- | --- | --- |
| Public templates | 31 | Home, Topics hub, Topic, Subtopic, Article, Reports hub, Report category, Report, Research hub, Research category, All research, Research paper, Peer review, Submit a paper, Newsroom, Newsroom post, Global Watch, Author, Search, Videos, Where We Are, About, Editorial Policy, Corrections, Contributor Agreement, Publish With Us, Contact, Advertise, Privacy, Cookies, Disclaimer, Copyright, Terms, Verify, 404, 410, 500, Maintenance (legal pages share one template) |
| Auth screens | 12 | Sign in, 2FA, Join chooser, Article signup step 1, OTP, Article step 2, Research signup step 1, OTP, Research step 2, Submitted, Set password, Forgot / Reset password |
| Portal screens | 18 | Overview, Application status, My articles, Article editor, Article view, My reports, Report editor, Report view, My research, Research editor (3 steps), Research view, Review queue, Review workspace, Notifications, Profile, Account, Apply for role, Submission success |
| Admin screens | 34 | Listed in Section 12 |
| Modals and drawers | 40+ | Listed per module, consolidated in Appendix C |

---

## 5. Roles and permissions (RBAC)

### 5.1 Model

- A **Permission** is a fixed, code-defined capability (for example `articles.approve`).
- A **Role** is a named bundle of permissions. System roles are seeded and cannot be deleted; custom roles are created by admins with `roles.manage`.
- A **User** can hold **one or more roles**. Effective permissions are the union of all their roles.
- **FR-RBAC-01** Permission checks happen server-side on every request.
- **FR-RBAC-02** At least one active Super Admin must exist; the last Super Admin cannot be demoted, deactivated or banned.
- **FR-RBAC-03** Only a Super Admin can grant the Super Admin role or edit a role that contains `roles.manage`.
- **FR-RBAC-04** Role changes take effect on the user's next request (sessions re-read permissions; permission cache TTL 60 seconds).
- **FR-RBAC-05** A user cannot change their own roles.
- **FR-RBAC-06** Contributor "own content" permissions (create, edit own drafts) are scoped to the user's own items regardless of other permissions.

### 5.2 System roles

| Role | Created by | Summary |
| --- | --- | --- |
| Super Admin | Seed / Super Admin | Everything, including roles, settings and activity logs |
| Admin (template) | Super Admin | Editorial and platform management except roles, settings and log export. Used as a starting point for sub-admins |
| Article Writer | Self signup (approved) or admin invite | Write and submit articles and reports |
| Research Writer | Self signup (approved) or admin invite | Write and submit research papers and reports |
| Approver | Admin invite only | Peer-review assigned research papers; write articles and reports |
| Expert | Admin invite only | Write articles and reports; "PSF Expert" badge on byline |

Custom role examples PSF may create: "Editor" (articles, reports, newsroom, featured), "Research Editor" (research screening and final approval), "Ad Manager" (ads only), "Analyst Viewer" (analytics read-only), "Moderator" (applications and users, no bans).

### 5.3 Permission catalogue

Admins see these as grouped checkboxes on the Role editor with a "Select all in group" control.

| Group | Permission key | Description |
| --- | --- | --- |
| Dashboard | `dashboard.view` | Access admin Overview |
| | `analytics.view` | View Analytics module |
| | `analytics.export` | Export analytics CSV/PDF |
| Users | `users.view` | View user list and profiles |
| | `users.create` | Create users via invite |
| | `users.edit` | Edit user profile fields |
| | `users.assign_roles` | Change a user's roles |
| | `users.deactivate` | Deactivate and reactivate users |
| | `users.ban` | Permanently ban users |
| | `users.view_ip` | See IP and geo data on users and submissions |
| | `users.impersonate_view` | View the portal as the user (read-only) **[CONFIRM: optional]** |
| Applications | `applications.view` | View pending and past applications |
| | `applications.decide` | Approve or return applications |
| | `applications.reject_permanent` | Permanently reject and blocklist the email |
| Roles | `roles.view` | View roles |
| | `roles.manage` | Create, edit, delete custom roles |
| Articles | `articles.submit` | Create and submit own articles |
| | `articles.view_all` | View all articles in admin |
| | `articles.edit_any` | Edit any article (versioned) |
| | `articles.decide` | Approve, request changes, reject |
| | `articles.publish` | Publish now, schedule, unpublish |
| | `articles.delete` | Soft delete and restore |
| Reports | `reports.submit`, `reports.view_all`, `reports.edit_any`, `reports.decide`, `reports.publish`, `reports.delete` | As articles |
| Research | `research.submit` | Create and submit own papers |
| | `research.review` | Review papers assigned to them (Approver) |
| | `research.view_all` | View all papers in admin |
| | `research.screen` | Desk-reject or accept for review |
| | `research.assign` | Assign and replace approvers |
| | `research.final_decide` | Final approve or reject after review |
| | `research.publish` | Publish, schedule, unpublish, set DOI/volume/issue |
| | `research.delete` | Soft delete and restore |
| | `research.see_identities` | See author identity during review (admins only; approvers never) |
| Newsroom | `newsroom.manage` | Create, edit, delete, pin newsroom posts |
| Featured | `featured.manage` | Manage featured and top stories placements |
| Taxonomy | `taxonomy.manage` | Manage topics, subtopics, report and research categories, tags |
| Global Watch | `globe.manage` | Manage status layer entries and globe settings |
| Ads | `ads.view` | View campaigns and analytics |
| | `ads.manage` | Create, edit, pause, archive campaigns |
| | `ads.export` | Download campaign PDF reports |
| Inbox | `inbox.view` | Read contact, corrections and advertising submissions |
| | `inbox.manage` | Change status, assign, add notes, delete |
| ID Cards | `cards.view` | View cards |
| | `cards.manage` | Create, activate, deactivate cards |
| CMS | `cms.edit` | Edit page sections (drafts) |
| | `cms.publish` | Publish CMS drafts and roll back |
| | `navigation.manage` | Edit navigation, footer and social links |
| | `media.manage` | Manage media library |
| Logs | `logs.view` | View Activity Logs |
| | `logs.export` | Export Activity Logs |
| Settings | `settings.manage` | General settings, email templates, integrations, security policy, maintenance mode |

### 5.4 Default role to permission matrix

✔ = granted by default. Own = only on own items.

| Permission group | Super Admin | Admin | Article Writer | Research Writer | Approver | Expert |
| --- | --- | --- | --- | --- | --- | --- |
| Dashboard, Analytics view | ✔ | ✔ | | | | |
| Analytics export | ✔ | ✔ | | | | |
| Users view, create, edit, assign roles, deactivate | ✔ | ✔ (no assign of Super Admin) | | | | |
| Users ban, view IP | ✔ | ✔ | | | | |
| Applications view, decide, reject permanent | ✔ | ✔ | | | | |
| Roles view | ✔ | ✔ | | | | |
| Roles manage | ✔ | | | | | |
| Articles submit | ✔ | ✔ | ✔ Own | | ✔ Own | ✔ Own |
| Articles view all, edit any, decide, publish, delete | ✔ | ✔ | | | | |
| Reports submit | ✔ | ✔ | ✔ Own | ✔ Own | ✔ Own | ✔ Own |
| Reports view all, edit any, decide, publish, delete | ✔ | ✔ | | | | |
| Research submit | ✔ | ✔ | | ✔ Own | | |
| Research review | | | | | ✔ (assigned only) | |
| Research view all, screen, assign, final decide, publish, delete, see identities | ✔ | ✔ | | | | |
| Newsroom, Featured, Taxonomy, Globe | ✔ | ✔ | | | | |
| Ads view, manage, export | ✔ | ✔ | | | | |
| Inbox view, manage | ✔ | ✔ | | | | |
| Cards view, manage | ✔ | ✔ | | | | |
| CMS edit, publish, navigation, media | ✔ | ✔ | | | | |
| Logs view | ✔ | | | | | |
| Logs export | ✔ | | | | | |
| Settings manage | ✔ | | | | | |

Note: Activity Logs are visible to Super Admin only by default, as requested. Super Admin can grant `logs.view` to a custom role if needed.

### 5.5 Portal and admin access rules

- **FR-RBAC-07** A user with any admin-group permission sees an "Admin" switcher in the portal header and can reach `/admin`.
- **FR-RBAC-08** The admin sidebar shows only modules the user has at least one permission for.
- **FR-RBAC-09** The portal sidebar shows sections based on contributor permissions: My Articles (`articles.submit`), My Reports (`reports.submit`), My Research (`research.submit`), Reviews (`research.review`).
- **FR-RBAC-10** Users in status Pending, Returned, Deactivated, Banned or Permanently Rejected cannot reach any portal section except the ones listed in Section 9.9.

---

## 6. Global components (public site)

### 6.1 Utility bar (top strip, desktop and tablet only)

Height 36px, background `--ivory-100`, bottom hairline.

| Left | Right |
| --- | --- |
| Current date in PKT (`Friday, 16 October 2026`) | Reader text size control `A− A A+` |
| "Global Watch" quick link with live count ("212 locations covered") | Social icons (X, Facebook, Instagram, YouTube) from CMS social links |
| | "Advertise" link |

Hidden on mobile (date and social move into the mobile drawer).

### 6.2 Header

Height 72px desktop, 60px mobile. White background, bottom hairline. Becomes sticky after 120px scroll at 60px height with the logo reduced (wordmark hidden, emblem kept).

| Zone | Element | Detail |
| --- | --- | --- |
| Left | Logo lockup | Emblem + wordmark "Pakistan Strategic Forum". Links to `/`. SVG from CMS (Global Settings) |
| Centre | Primary navigation | Section 4.1. Active item: 2px `--green-700` underline. Mega menu opens on hover (desktop, 120ms intent delay) and on click/Enter (keyboard) |
| Right | Search | Icon button opens the search overlay (6.4). Shortcut: `/` |
| Right | Signed out | "Sign in" (tertiary) and "Write for PSF" (primary, opens `/join`) |
| Right | Signed in | Notification bell (badge), avatar menu: Dashboard, My profile, Account, Admin (if permitted), Sign out |

**Mega menu (Topics)** width 1280px container, white, level 2 elevation, three columns:

1. Topics list (Serif h4, active one with green left rule 3px).
2. Subtopics of the hovered Topic: icon, name, item count, 2 columns if more than 6.
3. Featured item for the hovered Topic (from the `topic_featured` slot, Section 14): image 3:2, label, title, date. Falls back to the latest item in that Topic.

Bottom strip of the mega menu: "Browse all topics" and "See coverage on Global Watch".

**Dropdowns (Reports, Research, About):** single column, 280px wide, each item with optional one-line description.

### 6.3 Newsroom ticker (home hero)

See Section 7.1 Hero. Not shown globally.

### 6.4 Search overlay

- Full-width panel under the header, input autofocused, placeholder "Search articles, reports, research, newsroom".
- Instant results after 2 characters (debounce 200ms), grouped: Articles, Reports, Research, Newsroom, Authors, Topics; max 4 per group with "See all results" to `/search?q=`.
- Recent searches stored locally (last 5), clearable.
- Esc closes; arrow keys move through results.

### 6.5 Footer

Background `--green-900`, text white at 85% opacity, links white, hover underline.

| Row | Content |
| --- | --- |
| Top | Logo (white version), one-line mission (CMS), "Write for PSF" secondary button (white outline) |
| Link columns (5) | **Topics** (dynamic, all active Topics) / **Publications** (Reports, Research, Newsroom, Global Watch, Videos, RSS) / **PSF** (About, Editorial Policy, Corrections, Contributor Agreement, Publish With Us, Where We Are, Contact) / **Work with us** (Advertise With Us, Submit a paper, Write an article, How peer review works) / **Legal** (Privacy, Cookies, Disclaimer, Copyright & Takedown, Terms of Use) |
| Social | X, Facebook, Instagram, YouTube icons (CMS) |
| Bottom bar | `© 2019 to 2026 Pakistan Strategic Forum. All rights reserved.` (end year automatic) / "Cookie settings" link (reopens consent) / "Back to top" |

All footer text and links are editable in CMS > Footer (Section 12.17).

### 6.6 Cookie consent banner

- Bottom bar on first visit; does not block content.
- Buttons with equal visual weight: **Accept all**, **Reject non-essential**, **Settings**.
- Settings modal categories: Essential (always on: session, security, consent record, read-count dedup), Analytics (first-party visitor analytics cookies), Social media (X and Instagram embeds), Video (YouTube embeds; `youtube-nocookie.com` used regardless).
- Consent stored for 12 months (`psf_consent` cookie with version). Changing the cookie policy version re-prompts.
- Until Social media consent is given, embed areas show a placeholder card: "X posts are hidden until you allow social media cookies. [Allow and load]".
- **FR-CONS-01** Server-side IP capture for read counts and security logging is disclosed in the Privacy Policy as legitimate interest and is not cookie-dependent. Analytics cookies (visitor ID for returning-visitor stats) are set only with Analytics consent.

### 6.7 Share bar and rich link previews

**Share targets:** X, Facebook, WhatsApp, LinkedIn, Telegram, Email, Copy link. On mobile, a single "Share" button invokes the native share sheet (`navigator.share`) with fallback to the list.

**Placement:** under the article/report/research header (inline row), and as a sticky vertical rail on the left on desktop (≥1280px) for long-form pages. Newsroom posts and Global Watch drawer items have a compact share icon.

**Rich preview cards (D11):** every shareable page outputs Open Graph and Twitter Card metadata so WhatsApp, Facebook, X, LinkedIn and Telegram render a card with image, title, description and PSF branding.

| Meta | Value |
| --- | --- |
| `og:title` | SEO title or item title |
| `og:description` | SEO description or standfirst/abstract (max 160) |
| `og:image` | Dynamic share card 1200x630 JPEG (below), absolute URL, under 300KB for WhatsApp |
| `og:type` | `article` (content), `website` (others) |
| `og:site_name` | Pakistan Strategic Forum |
| `article:published_time`, `article:author`, `article:section` | From item |
| `twitter:card` | `summary_large_image` |
| `twitter:site` | PSF X handle (CMS) |

**Dynamic share card design (generated by `next/og`, cached on CDN):**

```
+--------------------------------------------------------------+
| [card image, right 55%, full height, scrim on left edge]     |
| [PSF emblem + "Pakistan Strategic Forum"]  (top-left, white) |
|                                                              |
| ANALYSIS · DEFENCE / AIR        (label, green-100 text)      |
| Title in Source Serif 600, 56px, max 3 lines, white          |
|                                                              |
| Author name · 16 Oct 2026       (Inter 24px, 80% white)      |
| [4px green-500 bar along bottom edge]  forumstrategic.com    |
+--------------------------------------------------------------+
Left 45% background: --green-900
```

Variants: Report (adds "REPORT · PDF" and report number), Research (adds "PEER-REVIEWED" badge), Newsroom (headline, region, time PKT, "NEWSROOM" label, no image if none), Author page (avatar, name, designation), Static pages (logo-only card from CMS).

- **FR-SHARE-01** Admin can override the share image per item with an uploaded 1200x630 image.
- **FR-SHARE-02** Share cards regenerate when the title or card image changes (cache key includes `updatedAt`).
- **FR-SHARE-03** Each share click is logged as an analytics event (`share_click` with target).
- **FR-SHARE-04** Copy link shows "Link copied" toast and appends no tracking parameters. Outbound share links append `utm_source=[target]&utm_medium=share`.

### 6.8 Ad slot component

Renders the active creative for a slot (Section 15). Label "Advertisement" (Inter `label`, `--ink-400` background ivory-100 strip above creative) is always shown. Empty slot collapses with no gap. Desktop and mobile creatives swap at 768px. Impressions are counted when 50% of the slot is visible for 1 second (IntersectionObserver). Clicks go through `/api/ads/click/[placementId]` (302 to target URL) for counting.

### 6.9 Breadcrumbs, back to top, error pages

- Breadcrumbs on every page except Home, with `BreadcrumbList` structured data.
- Back to top button appears after 2 viewport heights of scroll.
- **404:** "This page could not be found." Search field, links to Latest, Topics, Newsroom.
- **410:** "This content has been removed." Same links. Used for unpublished or deleted items that were once public.
- **500:** "Something went wrong on our side. Please try again in a few minutes." Error reference ID shown.
- **Maintenance:** toggled in Settings; public site shows CMS-editable maintenance message; `/admin` and `/sign-in` remain available to admins.

---

## 7. Public pages

Each page lists sections top to bottom. "CMS" marks text and images editable in CMS > Pages (template locked, content editable). "Data" marks content pulled from the database. Every page has a CMS-editable SEO title, meta description and share image unless it is a content detail page (which uses the item's own SEO fields).

### 7.1 Home `/`

Purpose: show that PSF is current, broad and credible within the first screen, then route readers into topics, the globe, reports and research.

**Section H1: Hero (lead story + newsroom ticker)**

Layout desktop: 12-column grid, full-bleed image background behind columns 1 to 8, ticker panel in columns 9 to 12 on white. Height 640px desktop. Mobile: lead story full width (image 4:3), ticker below as a horizontal swipeable strip.

| Element | Detail | Source |
| --- | --- | --- |
| Lead story background | Cover image of the `home_hero_lead` slot item with scrim | Data (Featured slot, fallback: latest published Article) |
| Label | Content label + Topic / Subtopic | Data |
| Headline | `display` serif, white, max 3 lines | Data |
| Standfirst | 2 lines max, 85% white | Data |
| Byline | Author avatar(s), names, date, read time | Data |
| CTA | "Read the analysis" (white outline button) | Static |
| Image credit | Bottom-right | Data |
| **Newsroom ticker panel** | Title "Newsroom" with live dot, "View all" link to `/newsroom` | |
| Ticker items | Last 12 published Newsroom posts. Each item: time `14:30 PKT` and date if not today, region/country chip, headline (Inter 600 15px, 2 lines), Breaking label if flagged. Pinned posts first | Data |
| Ticker behaviour | Vertical list showing 5 items; auto-scrolls up one item every 5s; up and down arrow buttons; pause on hover/focus; click opens `/newsroom/[id]-[slug]` | |

**Section H2: Topic quick access bar**

Directly under the hero, a 4-column strip (scrolls horizontally on mobile). One tile per Topic flagged "Show on home quick access" (admin-ordered, max 6).

| Tile element | Detail |
| --- | --- |
| Icon | Topic icon (admin upload) |
| Name | Serif h4 |
| Count | "142 articles" (published items in Topic) |
| Subtopic chips | First 4 subtopics as links |
| Click | `/topics/[topic]` |

**Section H3: Top Stories**

Section label "Top stories" with 2px ink rule. Layout: 1 large (positions 1, 6 columns) + 3 standard (positions 2 to 4). Source: `home_top_stories` slot positions 1 to 4 (Section 14). Fallback per empty position: most-read published Article of last 7 days not already shown on the page.

**Section H4: Ad slot `home_leaderboard_1`** (Section 15)

**Section H5: Latest Coverage**

Two columns. Left (8 cols): `home_latest_featured` slot positions 1 to 4 ("listing of the top four", admin-managed) as a 2x2 card grid. Right (4 cols): "Just published" ruled list of the 8 most recent published items of any type (Article, Report, Research), each with label, title, time. Button "View all latest" to `/search?sort=latest`.

**Section H6: PSF Coverage (globe module)**

Ivory background. Left (7 cols): compact rotating globe (Section 8) showing PSF Coverage points from the last 90 days. Right (5 cols): heading "Where we are reporting", sub "Every article, report, paper and newsroom post is mapped to where it happened.", stats row (locations covered, items this month, most covered country), "Top locations" list (5 rows: country flag, city/country, count, latest headline). Hovering a point shows a tooltip; clicking a point or a list row goes to `/global-watch?loc=[locationId]`. Button "Open Global Watch".

**Section H7: Topic desks**

For each Topic flagged "Show on home" (admin-ordered), one desk block. Blocks alternate layout A and B to avoid monotony:

| Layout A | Layout B |
| --- | --- |
| Header row: Topic name (h2), description (1 line), subtopic chips, "All [Topic]" link | Same header |
| Left 6 cols: `topic_home_featured` item for this Topic (Lead card) | Left 4 cols: ruled list of 5 latest |
| Right 6 cols: 4 latest items in the Topic as compact horizontal cards | Right 8 cols: featured item + 2 standard cards |

Topics with fewer than 3 published items are hidden from the home desks automatically.

**Section H8: Reports**

Heading "Reports", sub from CMS. Layout: featured report (`home_reports_featured` slot) as a wide card with portrait cover thumbnail, report number, executive summary excerpt, "Download PDF" and "Read report". Next to it: 2 latest reports (compact). Category chips row linking to report categories. "All reports" link.

**Section H9: Research and academia**

Heading "Research", sub "Peer-reviewed papers and policy briefs from scholars across the region." Three research cards (`home_research_featured` slot positions 1 to 3, fallback latest published). Each: Peer-reviewed badge, research category, title, authors with institutions, abstract first line, published date. Right side panel (ivory-100): "Publish your research with PSF", 4-step process (Submit, Screening, Double-blind review, Publication), stats (median time to decision, papers published) shown only when at least 5 papers exist, buttons "Submit a paper" and "How peer review works".

**Section H10: Ad slot `home_sponsor_carousel`** (up to 5 slides, Section 15)

**Section H11: Most read**

"Most read this week": numbered 1 to 5 list in large serif numerals (green-700), title, label, read count hidden publicly (shows "Most read" ranking only). Source: read events last 7 days across Articles, Reports, Research.

**Section H12: Videos**

Latest 4 videos from YouTube sync (pinned first). Thumbnail 16:9 with duration, title, published date. Click opens a lightbox player (`youtube-nocookie`). "All videos" link.

**Section H13: PSF on social**

Two columns: latest X posts (official embed timeline or 3 latest posts) and Instagram (latest 6 posts grid via oEmbed). Consent-gated and lazy-loaded when the section enters the viewport. Fallback: follow buttons for each platform. CMS: toggle section on/off, handles.

**Section H14: Write for PSF band**

`--green-900` background, white text. Two columns: "Write for PSF" (articles and reports, admin-reviewed) and "Publish research" (double-blind peer review). Each with 2 lines of copy (CMS) and a button to `/join/article` or `/join/research`.

**Home CMS-editable fields:** section headings and subheadings, visibility toggles for H6, H11, H12, H13, H14, order of H7 desks (via Topic settings), band copy, SEO fields.

### 7.2 Newsroom `/newsroom`

Purpose: chronological, fast news stream.

| Section | Detail |
| --- | --- |
| Header | Title "Newsroom", sub (CMS), last updated time PKT |
| Filters bar | Region, Country, Topic, Date range (Today, 7d, 30d, custom), "Breaking only" toggle; filters reflected in the URL query |
| Pinned | Pinned posts (max 3) at top with pin icon |
| Stream | Grouped by date heading ("Today", "Yesterday", then `14 Oct 2026`). Each post: time PKT, region > country > city, Topic chip, Breaking label, headline (Serif h4), summary (rich text with links), optional thumbnail right (96px), source link, share icon, permalink |
| Pagination | "Load more" (20 per page) |
| Sidebar (desktop) | Mini globe or "Most active regions this week" list, ad slot `newsroom_sidebar` |

**Newsroom post page `/newsroom/[id]-[slug]`:** headline, time, location, topic, summary, image if any, source link, share bar, "More from the Newsroom" (5 latest), "Related coverage" (3 items in same country). Purpose: shareable URL with rich preview.

### 7.3 Topics hub `/topics`

| Section | Detail |
| --- | --- |
| Hero | Title "Topics", intro paragraph, background image (CMS) |
| Topic sections | One block per active Topic: Topic name (h2), description, hero thumbnail, Subtopic tiles grid (icon, name, count, one-line description), "Go to [Topic]" button, 3 latest items row |
| Coverage stats | Optional strip: items per Topic (horizontal bar chart in house style) |

### 7.4 Topic page `/topics/[topic]`

Standard template for every Topic (dynamic, Section 16).

| Section | Detail |
| --- | --- |
| Hero | Topic hero image (admin upload) with scrim, breadcrumb, Topic name (`display`), base description (max 280 chars), item count |
| Subtopic CTAs | Row of Subtopic buttons/tiles with icons (one per Subtopic), links to Subtopic pages |
| Featured | `topic_featured` slot for this Topic: Lead card (fallback latest) |
| Ad slot | `topic_banner` |
| Latest | Grid of standard cards, newest first, 12 per page, numbered pagination. Filters: Subtopic, Content type (Articles, Reports, Research, Newsroom), Content label, Date range, Country. Sort: Latest, Most read (7d, 30d) |
| Sidebar (desktop ≥1280) | Most read in Topic (5), Coverage map thumbnail (static, links to Global Watch filtered by Topic) |

### 7.5 Subtopic page `/topics/[topic]/[subtopic]`

Same as Topic page with: subtopic icon in hero, breadcrumb `Topics / Defence / Air`, sibling Subtopic chips row (current highlighted), `subtopic_featured` slot, listing restricted to the Subtopic.

### 7.6 Article page `/articles/[slug]`

| Section | Detail |
| --- | --- |
| Breadcrumb | Home / Topic / Subtopic |
| Header | Content label, Topic/Subtopic links, H1 title, standfirst, byline (avatars, names linking to author pages, "PSF Expert" badge if Expert), published date and time PKT, "Updated [date]" if edited after publish, read time, location chip (City, Country, links to Global Watch) |
| Share bar | Inline + sticky rail |
| Cover image | Full container width 16:9, caption and credit |
| Body | `body-long` serif, 720px column; supports H2 to H4, lists, blockquotes, pull quotes, images with captions, full-width infographics, galleries, tables, embeds (YouTube, X), key takeaways box, callouts, footnotes (superscript links to notes at end) |
| In-article ad | `article_inline` after the 4th paragraph (never inside the first 3 or within 2 paragraphs of an image) |
| Sources and notes | Numbered footnotes and source list |
| Corrections note | If corrections exist: "Correction, 18 Oct 2026: [text]" box at top and bottom |
| Author box | For each author: avatar, name, designation, institution, short bio, link to author page |
| Tags | Tag chips (link to search filtered by tag) |
| Report an error | Link to `/corrections?item=[id]` prefilled |
| Related | "Related coverage": 3 items (same Subtopic, then same Topic, then same country), "More from [Author]" (3) |
| Sidebar (desktop ≥1280) | Ad slot `article_sidebar` (sticky), Most read (5) |
| Archive banner | For migrated items: "From the archive. First published [date]. Context may have changed since publication." |

Read count increments per Section 17.

### 7.7 Reports hub `/reports`

| Section | Detail |
| --- | --- |
| Hero | Title "Reports", intro (CMS), image |
| Featured report | `reports_hub_featured` slot: large card with cover, report number, executive summary, key finding count, "Read" and "Download PDF" |
| Categories | Tiles for each Report Category (name, description, count, icon) |
| Latest reports | Grid (report cards, portrait cover thumbnails), 12 per page. Filters: Report Category, Topic, Year, Country |
| Ad slot | `reports_banner` |

**Report category page `/reports/category/[category]`:** hero (category image, name, description), featured (`report_category_featured`), listing with filters.

### 7.8 Report page `/reports/[slug]`

Everything in the Article page, plus:

| Additional element | Detail |
| --- | --- |
| Report meta strip | Report number (`PSF-R-2026-004`), Report Category, pages, publication date, PDF size |
| Download | Primary button "Download PDF" (counts `pdf_download` event); secondary "Cite this report" (opens citation modal) |
| Executive summary | Ivory-100 box at top |
| Key findings | Numbered box (3 to 7 findings) |
| Table of contents | Auto-generated from H2/H3; sticky right column on desktop, collapsible on mobile; highlights current section |
| Charts and figures | Figure numbering ("Figure 3"), source line under each |
| Citation modal | Formats: APA 7, Chicago, Harvard, BibTeX, RIS (download). Copy buttons |

### 7.9 Research hub `/research`

| Section | Detail |
| --- | --- |
| Hero | Title "PSF Research", sub "Peer-reviewed research on defence, security and strategy", ISSN display (when set), buttons "Browse research" and "Submit a paper" |
| Latest research | `research_hub_featured` slot (1 lead) + 6 latest papers as research cards |
| Research categories | Tiles per Research Category (seeded: Research Papers, Policy Briefs, Emerging Scholars) |
| How to publish with PSF | 5-step horizontal process: 1 Apply as a Research Writer, 2 Submit your manuscript, 3 Editorial screening, 4 Double-blind peer review by two approvers, 5 Final approval and publication. Each with 1 line (CMS) |
| Our standards | 4 points: double-blind review, authors keep copyright (CC BY 4.0 licence **[CONFIRM]**), free to read, every stage tracked |
| Review stats | Papers published, median days to first decision, acceptance rate (shown when ≥5 decisions exist) |
| Call for papers | Optional CMS block: theme, deadline, link |
| CTA band | "Ready to submit?" Sign up / Sign in buttons |

**Research category page** and **All research `/research/papers`:** listing with filters (Research Category, Topic, Subtopic, Paper type, Year, Country, Institution) and sort (Latest, Most read).

**How peer review works `/research/peer-review`:** CMS page explaining the process, timelines, reviewer criteria, appeals, ethics, licence (Appendix A.9 draft).

**Submit a paper `/research/submit`:** landing with requirements (manuscript format, word limits, referencing style, anonymisation rules, files accepted) and buttons to sign up or sign in.

### 7.10 Research paper page `/research/[slug]`

| Section | Detail |
| --- | --- |
| Header | Peer-reviewed badge, Paper type, Research Category, Topic/Subtopic, H1 title, authors (each with institution, ORCID icon link if provided), received date, accepted date, published date, DOI (if set, linked to `https://doi.org/...`), volume/issue (if set), ISSN |
| Actions | Download PDF, Cite (modal as Reports), Share |
| Abstract | Ivory box |
| Keywords | Chips |
| Body | Full text in `body-long` with numbered sections and figures |
| References | Formatted reference list |
| Declarations | Funding, conflicts of interest, data availability, ethics |
| Supplementary files | List with type and size, download links |
| Licence | Licence statement and icon |
| Peer review statement | "This paper was reviewed double-blind by two independent reviewers." (reviewer identities never shown) |
| Related research | 3 papers |

No ads on research pages (protects academic credibility).

### 7.11 Global Watch `/global-watch`

Full specification in Section 8.

### 7.12 Author page `/authors/[username]`

| Section | Detail |
| --- | --- |
| Header | Avatar (160), name, designation, institution, badges (PSF Expert, Approver shown as "PSF Reviewer" **[CONFIRM]**, Research Writer), short bio (2 lines for Approvers, 1 line for Experts, up to 600 chars for writers), expertise chips, links (ORCID, Google Scholar, LinkedIn, X, personal site) |
| Stats | Published counts by type |
| Work | Tabs: All, Articles, Reports, Research. Cards, newest first, 12 per page |

Only users with at least one published item, or Experts and Approvers flagged "Show public profile" by admin, have a public page. Others return 404. Deactivated users' pages remain if they have published content; banned users' pages return 410.

### 7.13 Search `/search`

Query input, result count, facets (Content type, Topic, Subtopic, Content label, Author, Country, Date range), sort (Relevance, Latest, Most read), result rows (label, title with highlighted terms, snippet, author, date, type icon). Empty state: "No results for '[query]'. Try fewer words or browse Topics." `noindex`.

### 7.14 Videos `/videos`

| Section | Detail |
| --- | --- |
| Hero | "Videos", sub, "Subscribe on YouTube" button |
| Featured | Pinned video (large player) |
| Playlists | Tabs from YouTube playlists (synced), "All" default |
| Grid | 16:9 thumbnails, duration, title, date, view count (from YouTube). 12 per page, Load more |
| Player | Lightbox with title, description excerpt, "Watch on YouTube" link, share |

### 7.15 Where We Are `/where-we-are`

Hero "Where we are" with sub "Follow PSF on our official channels." Grid of large channel cards: platform icon, platform name, handle, one-line description of what PSF posts there, follower count (manual field in CMS, optional), "Follow" button opening the URL in a new tab. Channels managed in CMS > Social links (X, Facebook, Instagram, YouTube, plus optional LinkedIn, Telegram, WhatsApp Channel). Note line: "These are PSF's only official accounts. Report impersonation to [email]."

### 7.16 About PSF `/about`

No team or staff listing (decided). Sections (all CMS, draft copy in Appendix A.1):

| Section | Detail |
| --- | --- |
| Hero | Title "About PSF", mission statement (Serif display), background image |
| Who we are | 2 paragraphs + image |
| What we do | 4 pillars as columns: Analysis, Research, Newsroom, Global Watch; each icon + 2 lines |
| Our desks | The Topics with descriptions (data-driven list of active Topics) |
| By the numbers | Live counts: items published, research papers, countries covered, contributors (hidden if counts below thresholds set in CMS) |
| Our journey (timeline) | Vertical timeline 2019 to present; each milestone: year, title, 2 lines, optional image. Managed as a repeatable CMS list (add, edit, reorder, delete) |
| How we work | Editorial standards summary with links to Editorial Policy, Corrections, peer review |
| Independence and funding | Statement (CMS) **[CONFIRM content]** |
| Work with us | Three cards: Write for PSF, Publish research, Advertise |

### 7.17 Editorial Policy `/editorial-policy`

Long-form legal/policy template (shared with all policy pages): title, "Last updated" date (auto from CMS publish), sticky table of contents from headings, body, "Questions? Contact" footer. Draft in Appendix A.2.

### 7.18 Corrections `/corrections`

| Section | Detail |
| --- | --- |
| Policy | How PSF handles corrections (Appendix A.3) |
| Request a correction form | Fields in table below |
| Corrections log | Public list of published corrections: date, item title (link), correction text. Paginated |

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| First name | Text | Yes | 2 to 50 chars |
| Last name | Text | Yes | 2 to 50 chars |
| Email | Email | Yes | Valid format |
| Item URL | URL | Yes | Must be a forumstrategic.com URL; prefilled when coming from "Report an error" |
| What is incorrect | Textarea | Yes | 20 to 2000 chars |
| Suggested correction and source | Textarea | No | Up to 2000 chars |
| Supporting link or file | URL or file (PDF/JPG/PNG, 5MB) | No | |
| Turnstile | | Yes | |

Submission goes to Admin > Inbox with source "Corrections". Confirmation: "Thank you. Our editors will review your request and reply by email if we need more information."

### 7.19 Contributor Agreement `/contributor-agreement`

Policy template. Draft in Appendix A.4. Linked and must be accepted in signup and at each submission.

### 7.20 Publish With Us `/publish-with-us`

| Section | Detail |
| --- | --- |
| Hero | "Publish with PSF" + sub |
| Two tracks | Cards: Articles and reports (who, formats, length, turnaround, "Apply as writer") / Research (who, peer review, licence, "Apply as researcher") |
| What we look for | Bullet list (CMS) |
| Formats and lengths | Table: Analysis 1,200 to 2,000 words, Explainer 800 to 1,500, Opinion 800 to 1,200, Report 4,000+, Research paper 6,000 to 10,000, Policy brief 2,000 to 3,500 **[CONFIRM]** |
| Process | Steps for each track |
| FAQs | Accordion (CMS repeatable) |
| CTA | Buttons to `/join/article` and `/join/research` |

### 7.21 Contact Us `/contact`

No address or phone shown (decided). Sections: hero, "How we can help" (routing guide: editorial questions, corrections, advertising, research submissions, technical problems, each with which form to use), contact form, response time note ("We aim to reply within 3 working days").

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| First name | Text | Yes | 2 to 50 |
| Last name | Text | Yes | 2 to 50 |
| Email | Email | Yes | |
| Reason for contact | Select | Yes | General enquiry, Editorial, Research and peer review, Partnerships and events, Media request, Technical issue, Other |
| Subject | Text | Yes | 5 to 120 |
| Message | Textarea | Yes | 20 to 3000 |
| Consent | Checkbox | Yes | "I agree to PSF processing my details to respond to this message (Privacy Policy)." |
| Turnstile | | Yes | |

Goes to Inbox, source "Contact". Auto-reply email (Appendix B).

### 7.22 Advertise With Us `/advertise`

Distinct, sales-oriented layout.

| Section | Detail |
| --- | --- |
| Hero | "Reach Pakistan's defence and policy audience", sub, primary button "Enquire now" (scrolls to form), image |
| Audience in numbers | Live or CMS-entered figures: monthly readers, page views, top reader countries, share of mobile readers (CMS toggle: live from analytics or manual) |
| Who reads PSF | 4 audience cards (policy professionals, defence industry, academics, informed public) |
| Placements | Visual cards of each ad placement with a mockup thumbnail, dimensions, page location (Home leaderboard, Home sponsor carousel, Topic banner, Article inline, Article sidebar, Newsroom sidebar, Reports banner, Global Watch banner) |
| Formats and policies | Accepted formats, what PSF does not accept (political ads, weapons sales to private individuals, gambling, unverified claims), editorial independence statement |
| Process | 4 steps: Enquire, Proposal, Creative approval, Live with reporting |
| Enquiry form | Fields below |
| FAQ | Accordion |

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| First name, Last name | Text | Yes | |
| Work email | Email | Yes | |
| Phone | Tel (country code) | No | |
| Company / brand | Text | Yes | |
| Website | URL | No | |
| Industry | Select | Yes | Defence industry, Government / public sector, Education, Technology, Media, NGO / think tank, Other |
| Interested placements | Multi-select | Yes | From active ad slots |
| Campaign start (approx.) | Date | No | |
| Duration | Select | No | 1 week, 2 weeks, 1 month, 3 months, Longer |
| Budget range | Select | No | Ranges in PKR **[CONFIRM ranges]** |
| Message / objectives | Textarea | Yes | 20 to 2000 |
| Media kit request | Checkbox | No | "Send me the media kit" |
| Consent + Turnstile | | Yes | |

Goes to Inbox, source "Advertise". Confirmation and auto-reply.

### 7.23 Legal pages

`/privacy`, `/cookies`, `/disclaimer`, `/copyright`, `/terms` use the policy template. Drafts in Appendix A.10 to A.15. The Cookie page includes a live table of cookies (name, purpose, category, duration) managed in CMS, and a "Change cookie settings" button. The Copyright page includes a takedown request form (name, email, copyright owner, URL of PSF content, original work URL, description, good-faith statement checkbox, electronic signature) routed to Inbox source "Copyright".

### 7.24 ID card verification `/verify/[token]`

Minimal page, no site header navigation, no footer links, no analytics cookies.

| State | Display |
| --- | --- |
| Active | PSF logo, green check icon, "Verified", "This card was issued by Pakistan Strategic Forum and is currently valid.", Card ID, Designation, "Verified on [date time PKT]" |
| Inactive | Red cross icon, "Not valid", "This card is not currently active. If you were presented with this card, please contact PSF.", Card ID shown, designation hidden |
| Unknown token | "We could not verify this card." with no detail |

- **FR-CARD-01** `<meta name="robots" content="noindex, nofollow, noarchive">` and `X-Robots-Tag: noindex, nofollow` header.
- **FR-CARD-02** Excluded from sitemaps, search, internal links and llms.txt. Not disallowed in robots.txt (so crawlers that find it see `noindex`).
- **FR-CARD-03** Token is 24 random URL-safe characters (≈143 bits); not derived from the card ID.
- **FR-CARD-04** Rate limit 30 requests per minute per IP.
- **FR-CARD-05** Each scan logs time, IP country (not shown publicly) for the admin scan counter.

---

## 8. Global Watch and the PSF Coverage globe

### 8.1 Concept

Every content item (Article, Report, Research Paper, Newsroom Post) carries a primary location (Region > Country > City) and up to 4 additional locations. The globe plots each location that has published content as a **PSF Coverage** point. Hovering shows what PSF has published there; clicking opens the related content in a side panel. The globe appears in compact form on Home (Section 7.1 H6) and in full on `/global-watch`.

### 8.2 Data rules

- **FR-GLB-01** A point is created per unique location (city, or country centroid when "Country-wide" is chosen) that has at least one published item within the active date filter.
- **FR-GLB-02** Point size scales with item count (log scale, 4 size steps: 1, 2 to 5, 6 to 20, 21+).
- **FR-GLB-03** Point colour shows recency of the latest item: last 48 hours `--danger-700` pulse ring (only for Newsroom posts flagged Breaking) else `--green-700` (last 7 days), `--green-500` (8 to 30 days), `--green-200` (older).
- **FR-GLB-04** Unpublished, scheduled, deleted or banned-author content never appears.
- **FR-GLB-05** Globe data is served from `/api/globe?from=&to=&types=&topic=` as a compact JSON (location id, lat, lng, name, country code, counts by type, latest item title/url/date), cached at the edge for 5 minutes and purged on publish.
- **FR-GLB-06** Coordinates come from the location dataset (Section 16.4). Country-wide items use the country's capital or centroid as defined in the dataset.

### 8.3 Status layer (optional layer, admin-managed)

Carries forward the current Atlas idea. Admins with `globe.manage` can mark countries or sub-national regions with a status:

| Status | Colour (country fill at 35% opacity) | Meaning |
| --- | --- | --- |
| Active conflict | `--danger-700` | Ongoing armed conflict |
| High tension | `--warning-700` | Elevated military tension |
| Watch | `--ink-500` with hatching | Situation PSF is monitoring |

Each entry: country (and optional region name), status, short note (max 200 chars), start date, review-by date, linked items (optional). Expired review dates show a reminder in admin. The layer is toggleable by visitors; default on.

### 8.4 Global Watch page `/global-watch`

| Section | Detail |
| --- | --- |
| Header strip | Title "Global Watch", sub "Mapping PSF coverage around the world", live stats: locations covered, items in range, most covered country, last update time PKT |
| Globe stage | Desktop: globe fills 8 columns at 70vh, left filter panel (3 columns, collapsible), right drawer opens over the globe on selection. Mobile: globe 60vh full width, filters in a bottom sheet, drawer becomes a bottom sheet |
| Filter panel | Content type checkboxes (Articles, Reports, Research, Newsroom), Topic and Subtopic, Date range presets (7d, 30d, 90d default, 12m, All time, Custom), Region select, Country search (flies the globe to the country), Layer toggles (PSF Coverage, Status layer, Country borders), Reset |
| Controls | Zoom in/out, reset view, pause/play rotation, "View as list" toggle, fullscreen |
| Hover tooltip | City, Country, flag, item count by type, latest headline and date |
| Location drawer | Header: City, Country, region, counts by type, status layer badge if any. Tabs: All, Articles, Reports, Research, Newsroom. List of item cards (compact: label, title, date, author), newest first, Load more (10 at a time). Footer: "See all coverage in [Country]" (applies country filter to region cards below) and share link (`/global-watch?loc=`) |
| Legend | Point sizes, recency colours, status colours, disclaimer link |
| Borders disclaimer | Always visible small text under the globe (Appendix A.17) |
| Region-wise coverage | Below the globe. Region tabs (All, South Asia, Middle East, Central Asia, East Asia, Southeast Asia, Europe, Africa, Americas, Oceania). Within a tab: country chips with counts, then a grid of content cards for that region filtered by the panel filters, 12 per page |
| Most covered | Ranked list: top 10 countries by items in range, with horizontal bars |
| Recent activity feed | Last 10 published items with location, as a timeline |
| Ad slot | `global_watch_banner` below the region cards |

**URL state:** all filters and the selected location are stored in the query string (`?types=article,news&from=2026-07-01&loc=1172451`) so views can be shared.

### 8.5 Interaction and technical rules

- **FR-GLB-07** The globe is a client component loaded with `dynamic(..., { ssr: false })` after the page's main content. A static rendered image of the globe (regenerated nightly) shows until WebGL loads and as the fallback when WebGL is unavailable.
- **FR-GLB-08** "View as list" renders the same data as an accessible table (Location, Country, Items, Latest) and is the keyboard and screen reader path.
- **FR-GLB-09** Auto-rotation pauses on hover, drag, focus or selection; resumes after 8 seconds idle; disabled under reduced motion.
- **FR-GLB-10** Clicking a point flies the camera to the location (800ms) and opens the drawer.
- **FR-GLB-11** On the Home compact globe, clicking a point navigates to `/global-watch?loc=[id]`.
- **FR-GLB-12** Performance budget: globe bundle ≤ 350KB gzipped, initial data ≤ 150KB, 60fps on a mid-range Android; reduce polygon resolution and disable atmosphere effect on mobile.
- **FR-GLB-13** Visual style: land `--ivory-200`, ocean `--paper` with a very light `--ivory-50` graticule, country borders `#C9C2B0` 0.5px, Pakistan border slightly stronger, no satellite imagery, no glowing atmosphere (matches the "not AI-looking" rule).

---

## 9. Authentication and onboarding

### 9.1 Account types and how they are created

| Account type | Created by | Activation |
| --- | --- | --- |
| Article Writer | Self signup `/join/article` | Email OTP, then admin approval |
| Research Writer | Self signup `/join/research` | Email OTP, then admin approval |
| Approver | Admin invite only | Set-password link |
| Expert | Admin invite only | Set-password link |
| Admin / custom roles | Admin invite only (Super Admin for Super Admin role) | Set-password link, 2FA setup mandatory |
| Writer created by admin | Admin invite (same fields as signup) | Set-password link; no approval step (admin-created = pre-approved) |

### 9.2 Sign in `/sign-in`

| Element | Detail |
| --- | --- |
| Fields | Email, Password (show/hide toggle), "Keep me signed in" (30-day session vs 12-hour) |
| Links | "Forgot password?", "New to PSF? Write for PSF" |
| Turnstile | Shown after 2 failed attempts from the same IP or account |
| Errors | Generic: "Email or password is incorrect." (never reveals if the email exists) |
| Lockout | 5 failed attempts in 15 min locks sign-in for that account for 15 min; email sent to the user |
| 2FA | If enabled or required by role, redirect to `/two-factor` (6-digit TOTP or backup code) |
| Post-login redirect | Admin users with no contributor role → `/admin`; others → `/portal`; or the page they were trying to reach |

**Status-based routing after sign in:**

| Status | Destination |
| --- | --- |
| Active | Portal or admin |
| Application pending | `/portal/application` (status: under review) |
| Application returned | `/portal/application` (returned with comments, edit and resubmit) |
| Invited (password not set) | Cannot sign in; "Check your email for your invitation link" with resend link |
| Deactivated | Signed out with message "Your account has been deactivated. Contact PSF if you think this is a mistake." |
| Banned / Permanently rejected | Signed out with message "This account is not available." |

### 9.3 Join chooser `/join`

Two large option cards plus a sign-in link.

| Card | Copy | Button |
| --- | --- | --- |
| Write articles and reports | "Analysis, explainers and opinion on defence, security and strategy. Reviewed by PSF editors." | "Apply as a writer" → `/join/article` |
| Publish research | "Submit research papers and policy briefs for double-blind peer review." | "Apply as a researcher" → `/join/research` |

Footer note: "Approvers and PSF Experts are invited by PSF and cannot sign up here."

### 9.4 Signup step 1 (both tracks, identical)

Stepper shows: 1 Account, 2 Verify email, 3 About you, 4 Submitted.

| Field | Type | Required | Validation and rules |
| --- | --- | --- | --- |
| First name | Text | Yes | 2 to 50 chars, letters, spaces, hyphen, apostrophe |
| Last name | Text | Yes | 2 to 50 chars |
| Email | Email | Yes | RFC format; lowercase stored; must not exist as an active, pending, deactivated or banned account; must not be on the blocklist (message: "We can't create an account with this email."); disposable email domains rejected |
| Password | Password | Yes | Min 10 chars, at least 1 letter and 1 number; strength meter; checked against breached-password list (k-anonymity) |
| Confirm password | Password | Yes | Must match |
| Areas of expertise | Multi-select (grouped by Topic, includes Subtopics) | Yes | 1 to 5 selections; options come from active Topics and Subtopics |
| Institution / University | Combobox (suggestions from existing institutions, free text allowed) | No | Up to 120 chars |
| Designation | Combobox with "Student" as first option | Yes | Up to 80 chars. Examples: Student, Research Associate, Lecturer, Retired Officer, Analyst, Journalist |
| Profile picture | Image upload with circular crop | No | Recommended 400x400, square, JPG/PNG/WebP, max 2MB |
| Agreements | Checkbox | Yes | "I agree to the Terms of Use, Privacy Policy and Contributor Agreement." (links open in new tab) |
| Turnstile | | Yes | |

Button: "Continue". On submit, the server stores a **pending signup** record (not a user), hashes the password, and sends a 6-digit OTP.

### 9.5 Email verification (OTP)

| Element | Rule |
| --- | --- |
| Screen | "Check your email. We sent a 6-digit code to a***@domain.com." 6 separate digit boxes, paste supported, auto-submit on 6th digit |
| Expiry | 10 minutes |
| Attempts | 5 wrong attempts invalidate the code |
| Resend | Enabled after 60 seconds; max 5 codes per hour per email |
| Change email | "Use a different email" returns to step 1 with fields kept (password cleared) |
| On success | User record created with status `application_draft`, email marked verified, session started, continue to step 2 |
| Abandonment | Pending signups expire after 24 hours and are purged |

**FR-AUTH-01** No user record exists until the email is verified (closes the unverified-signup gap found in the current Portal).

### 9.6 Signup step 2, Research Writer track

Read-only summary at top: name, email (verified badge).

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Institution / University name | Text | Yes | Auto-filled from step 1 and locked if provided there; editable and required if left blank in step 1 |
| Designation | Text | Yes | Auto-filled from step 1, locked |
| Department / Faculty | Text | No | Up to 120 |
| Programme / Degree | Text with suggestions | Yes | Example: "MPhil, International Relations". Up to 120 |
| Graduation status | Radio | Yes | "Currently enrolled", "Graduated", "Not applicable (faculty / professional)" |
| Graduation year / expected year | Year select | Conditional | Required if enrolled or graduated |
| University registration / roll number | Text | Conditional | Required if Currently enrolled; optional otherwise; up to 40 chars |
| Student or institutional ID card | File upload | No | JPG/PNG/PDF, max 5MB, front side; helper text: "Optional. Uploading your ID helps us verify your identity faster. It is stored privately and deleted after review." |
| ORCID iD | Text | No | Format `0000-0000-0000-000X`, checksum validated |
| Google Scholar / LinkedIn / profile URL | URL (up to 3) | No | |
| Research interests | Textarea | Yes | 50 to 1000 chars |
| Why do you want to register on PSF? | Textarea | Yes | 50 to 1000 chars |
| Previous publications | Textarea | No | Up to 2000 chars (citations or links) |

Buttons: "Back", "Submit application".

### 9.7 Signup step 2, Article Writer track

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Tell us about yourself and your writing | Textarea | Yes | 100 to 1500 chars. Helper: "Your background, what you want to write about for PSF, and why." |
| Link to a previous publication | URL | No | One URL, plus "Add another" up to 3 |
| Writing sample upload | File (PDF/DOCX, 5MB) | No | |
| Social / professional profile | URL | No | LinkedIn, X or personal site |

Buttons: "Back", "Submit application".

### 9.8 Application submitted

Full-page confirmation: green check icon, "Application submitted!", "Thank you, [First name]. Our team will review your application and email you at [email] once a decision is made. This usually takes 3 to 5 working days." Buttons: "Back to home", "View application status". Email sent: Application received (Appendix B).

Application record status → `pending`. Submission IP, geo and user agent stored (visible to admins with `users.view_ip`).

### 9.9 Application status page `/portal/application`

| Status | What the user sees | Actions |
| --- | --- | --- |
| Pending | "Your application is under review." Submitted date, track, read-only summary | Withdraw application |
| Returned (rejected with comments) | Warning banner: "Your application needs changes." Admin comment shown in a quoted box. Form opens prefilled (steps 1 profile fields and step 2) | Edit and resubmit (status → pending, attempt count +1) |
| Approved | Redirects to portal overview with a welcome banner | |

Pending and returned users can also access Account settings (change password, sign out) only.

### 9.10 Invite flow (admin-created accounts)

1. Admin creates the user (Section 12.4.4). Status `invited`.
2. System sends invite email: "You've been invited to join Pakistan Strategic Forum as [Role]." Button "Set up your account" → `/set-password?token=`.
3. Token: single-use, 72-hour expiry, hashed in DB. Admin can resend (invalidates previous token) or revoke the invite.
4. Set password page: shows name, email (read-only), role; fields Password, Confirm password; agreement checkbox (Terms, Privacy, and Contributor Agreement for contributor roles).
5. If the role requires 2FA (Admin, custom roles with any admin permission, Approver), the next screen enforces TOTP setup: QR code, manual key, verify a code, show 10 backup codes (download/copy, must confirm saved).
6. Redirect to `/sign-in` with "Your account is ready. Please sign in."
7. Expired link page: "This invitation link has expired." Button "Request a new link" (sends request to admins and notifies; or user enters email to receive a new link if the invite is still valid in status).

### 9.11 Forgot and reset password

- `/forgot-password`: email field + Turnstile. Always responds "If an account exists for that email, we've sent a reset link."
- Reset link valid 60 minutes, single use. `/reset-password` fields: new password, confirm. On success all other sessions are revoked and the user is emailed "Your password was changed."

### 9.12 Two-factor authentication

- Optional for contributors (enable in Account), mandatory for any user holding an admin permission and for Approvers.
- TOTP (authenticator apps), 10 single-use backup codes, regenerate codes, disable (requires password + current code; not allowed when mandatory).
- Admins with `users.edit` can reset a user's 2FA (logged); the user must set it up again at next sign-in.

### 9.13 Sessions and devices

Account page lists active sessions: device/browser, IP country/city, first seen, last active, "This device" marker; actions "Sign out" per session and "Sign out of all other sessions".

### 9.14 Email change

User enters new email + current password → OTP to the new email → on success email updated, notification sent to the old email.

---

## 10. Contributor portal (Article Writers, Research Writers, Experts, Approvers as authors)

### 10.1 Layout

- Left sidebar (240px, collapsible to icons): Overview, My Articles, My Reports, My Research, Reviews (Approvers), Notifications, Profile, Account. Items appear per permission (FR-RBAC-09). Bottom: "View site", "Admin" (if permitted), Sign out.
- Top bar: page title, primary actions ("Write article", "Write report", "Submit research" as a split button per permission), notification bell, avatar menu.
- Background `--ivory-50`, content panels white with hairline borders.

### 10.2 Overview `/portal`

| Block | Content |
| --- | --- |
| Welcome | "Welcome back, [First name]." Roles as badges. First-login banner for new users with a 3-item checklist: complete profile, read the Contributor Agreement, start your first piece |
| KPI tiles | Published, In review, Drafts, Changes requested / Rejected, Total reads (all time), Reads last 30 days (with delta vs previous 30) |
| Reads chart | Line chart, daily reads of the user's published items, last 30/90 days toggle |
| Top content | Table: top 5 published items by reads (title, type, published date, reads) |
| Status board | Mini-kanban counts per stage for research (Submitted, Screening, Under review, Revisions requested, Awaiting final approval, Published) |
| Action needed | List of items needing the user's action: changes requested, revision requests, review assignments (Approvers), invites to co-author |
| Recent activity | Last 10 events on the user's items (submitted, approved, published, comment received) |
| Geography | "Where your readers are": top 5 countries by reads (bar list) |

### 10.3 My Articles `/portal/articles` (My Reports is identical)

Tabs with counts: **All**, **Live**, **In review**, **Drafts**, **Changes requested**, **Rejected**, **Scheduled**.

| Column | Detail |
| --- | --- |
| Title | Truncated to 1 line, full on hover |
| Topic / Subtopic | |
| Status | Status chip |
| Last updated | Date time PKT |
| Published | Date (if live) |
| Reads | Count (live only) |
| Actions | View, Edit (Draft, Changes requested), Duplicate, Withdraw (In review → Draft), Delete (Draft only, confirm), View on site (Live), Request update (Live: opens a message to editors, see 10.8) |

Filters: Topic, Subtopic, Status, Date range. Search by title. Sort: Last updated, Published, Reads.

Empty states: All: "You haven't written anything yet. Start your first article." [Write article]. Drafts: "No drafts." Rejected: "Nothing here."

### 10.4 Article editor `/portal/articles/new` and `/[id]/edit`

Layout: main editing column (left, 760px) + settings sidebar (right, 360px, scrolls independently). Sticky top bar: autosave status ("Saved 14:32"), "Preview", "Save draft", "Submit for review".

**Main column**

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Title | Large serif input | Yes | 10 to 120 chars, counter |
| Standfirst (subtitle) | Textarea | Yes | 40 to 220 chars |
| Body | Full rich text editor | Yes | Min 400 words for submission; word count and read time live in footer |
| Key takeaways | Repeatable list | No | 0 to 5 bullets, each up to 200 chars; renders as a box at the top of the article |
| Sources and references | Repeatable (text + optional URL) | No | Rendered as numbered list; footnotes created in the body link here |

**Editor toolbar (full):** Paragraph / H2 / H3 / H4, Bold, Italic, Underline, Strikethrough, Link (URL + open in new tab toggle; internal link search for PSF content), Bulleted list, Numbered list, Blockquote, Pull quote, Callout box (info / note), Footnote, Horizontal rule, Table (insert, add/remove rows and columns, header row), Image (upload with caption, credit, alt text, size: column / wide / full), Infographic (full-width image block, higher size limit, optional "Download" toggle), Gallery (2 to 8 images), Embed (YouTube URL, X post URL), Undo / Redo, Clear formatting. Keyboard shortcuts (Ctrl/Cmd+B, I, K, etc.). Markdown-style shortcuts (`## `, `- `, `> `). Paste from Word/Google Docs is cleaned (keeps headings, lists, bold, italic, links; strips styles). Drag-and-drop images into the body upload directly.

**Settings sidebar (panels, collapsible)**

| Panel | Field | Type | Required | Rules |
| --- | --- | --- | --- | --- |
| Classification | Content label | Select | Yes | Analysis, Explainer, Opinion, Interview, Investigation, Profile, Book Review, News Analysis |
| | Topic | Select | Yes | Active Topics |
| | Subtopic | Select | Yes | Filtered by Topic |
| | Tags | Combobox multi | No | Up to 10, existing tags suggested, new tags allowed (admin can merge later) |
| Location | Region | Select | Yes | Section 16.4 |
| | Country | Searchable select | Yes | Filtered by Region |
| | City | Searchable select | Yes | Filtered by Country, includes "Country-wide (no specific city)" |
| | Additional locations | Repeatable trio | No | Up to 4 more |
| Images | Card image | Image upload with crop | Yes | 1200x800 (3:2), Section 18 |
| | Cover image | Image upload with crop | Yes | 1920x1080 (16:9) |
| | Cover caption | Text | Yes | Up to 200 |
| | Cover credit | Text | Yes | Up to 100. Example "Photo: ISPR" |
| | Alt text (card and cover) | Text | Yes | Up to 160 |
| Authors | Co-authors | User search | No | Up to 4 approved contributors; each co-author receives an invite to accept; unaccepted co-authors are removed at submission with a warning |
| SEO | SEO title | Text | Yes | Up to 60 chars; defaults to title; live Google preview |
| | SEO description | Textarea | Yes | 70 to 160 chars; defaults to standfirst |
| | URL slug | Text | Auto | Generated from title; editable before first publish; admin-only after publish |
| | Share image override | Image | No | 1200x630 |
| | Share preview | Live preview of WhatsApp / X / Facebook card | | |
| Declarations | Original work | Checkbox | Yes | "This is my original work and has not been published elsewhere." |
| | Conflict of interest | Radio + text | Yes | "None" or describe |
| | Contributor Agreement | Checkbox | Yes | "I agree to the Contributor Agreement." |
| | Note to editors | Textarea | No | Up to 1000, visible only to admins |

**Autosave and versions**

- **FR-ED-01** Autosave every 10 seconds of inactivity after a change and on blur; offline changes queue in local storage and sync when online; conflict warning if the same item is open in two tabs.
- **FR-ED-02** Every manual save and every submission creates a version. Users can view and restore their own versions while in Draft or Changes requested.
- **FR-ED-03** Navigating away with unsaved changes prompts a confirmation.

**Submission flow**

1. User clicks "Submit for review". Client validation runs; missing fields are listed in a panel with "Go to field" links.
2. **Preview modal (full screen):** renders the article exactly as on the public site (desktop/mobile toggle) with the share-card preview below. Buttons: "Back to editing", "Confirm and submit".
3. On confirm: status `in_review`, content locked for the author, submission IP/geo/user agent stored, version snapshot, admin notification, confirmation email to author.
4. **Success screen:** "Your article has been submitted." Summary card (title, topic, submitted time, reference ID `ART-2026-00123`), "What happens next: an editor will review your article. You'll be notified when it's approved or if changes are needed." Buttons: "Go to My Articles", "Write another".

**After an admin decision**

| Decision | Author experience |
| --- | --- |
| Approved and published | Email + bell "Your article is live." Status Live, View on site |
| Approved and scheduled | Status Scheduled with publish time |
| Changes requested | Status Changes requested; banner with the editor's comments at the top of the editor; content unlocked; previous comment history panel; resubmit goes through the same preview flow |
| Rejected | Status Rejected; comment shown; content locked, can be duplicated into a new draft |

### 10.5 Report editor

Same as the article editor with these differences:

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Report Category | Select | Yes | Active Report Categories |
| Content label | Fixed | | "Report" |
| Executive summary | Textarea (simple rich text) | Yes | 100 to 400 words |
| Key findings | Repeatable list | Yes | 3 to 7 findings, each up to 300 chars |
| Full report PDF | File upload | Yes | PDF, max 50MB; first page used as the cover thumbnail if no cover is uploaded |
| Report cover (portrait) | Image | No | 1240x1754 (A4 ratio) for listings |
| Number of pages | Number | Auto | Read from PDF |
| Body | Full editor | Yes | Minimum 1,500 words |

Report number (`PSF-R-YYYY-NNN`) is assigned at publication.

### 10.6 Research paper submission `/portal/research/new`

Three-step editor with a progress stepper (each step saves; user can move freely between steps).

**Step 1: Paper details**

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Title | Text | Yes | 10 to 200 chars |
| Running title (short) | Text | No | Up to 60 |
| Paper type | Select | Yes | Research article, Policy brief, Review article, Case study, Commentary |
| Research Category | Select | Yes | Active Research Categories |
| Topic / Subtopic | Selects | Yes | As articles |
| Locations | Region > Country > City (+ up to 4) | Yes | As articles |
| Abstract | Textarea | Yes | 150 to 300 words |
| Keywords | Tag input | Yes | 3 to 8 |
| Your details (read-only, from profile) | Display | | Full name, Institution, Designation, Programme / Degree, ORCID. Note: "To change these, update your profile." |
| Co-authors | Repeatable group | No | Name, email, institution, ORCID, corresponding author toggle. External co-authors allowed (not PSF users). Max 8 |
| Corresponding author | Radio | Yes | Defaults to submitter |
| Funding statement | Textarea | Yes | "No funding" allowed |
| Conflict of interest | Textarea | Yes | "None" allowed |
| Ethics statement | Textarea | No | For human subjects research |
| Data availability | Textarea | No | |
| Previously presented? | Text | No | Conference or seminar details |

**Step 2: Manuscript**

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Full text | Full editor (with numbered section headings, figures with numbering, tables, equations as images) | Yes | 3,000 to 12,000 words (Policy brief: 1,500 to 4,000) |
| References | Structured text area | Yes | Reference style select (APA 7 default, Chicago author-date); one reference per line; minimum 5 |
| Figures and tables list | Auto | | Generated from body |

**Step 3: Files and declarations**

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Anonymised manuscript PDF | File | Yes | PDF, max 20MB. Helper: "Remove names, affiliations, acknowledgements and self-identifying references. Reviewers will see this file." System checks the PDF metadata author field and warns if it contains the submitter's name |
| Title page PDF (with author details) | File | No | Hidden from approvers |
| Supplementary files | Multi-file | No | PDF, JPG, PNG, CSV, XLSX, DOCX; up to 5, 20MB each |
| Card image | Image | Yes | 1200x800 |
| Cover image | Image | No | 1920x1080 (default typographic cover used if empty) |
| SEO title / description | Text | Yes | As articles |
| Declarations | Checkboxes | Yes | Original work; not under review elsewhere; all co-authors approved submission; manuscript anonymised; agree to Contributor Agreement and licence (CC BY 4.0 **[CONFIRM]**); authors retain copyright |
| Suggested reviewers | Repeatable (name, institution, email) | No | Up to 3, for admin reference only |
| Reviewers to exclude | Text | No | |
| Cover letter to editor | Textarea | No | Up to 2000 |

**Submission:** "Review and submit" → full preview (paper page as it would appear, plus a file list) → "Confirm and submit". The approver is **not** chosen by the author (admin assigns). Status `submitted`, reference ID `RES-2026-00045`, emails to author and admins. Success screen describes the stages and typical timelines.

### 10.7 My Research `/portal/research`

Tabs with counts: **All**, **Drafts**, **Submitted** (screening), **Under review**, **Revisions requested**, **Awaiting final approval**, **Published**, **Rejected**.

Research detail view `/portal/research/[id]` for the author:

| Block | Detail |
| --- | --- |
| Status timeline | Vertical timeline of stages with dates (Submitted, Screening completed, Review started, Decision, Revision submitted, Final approval, Published) |
| Decision letters | Each decision with editor/approver comments to author (approver identities hidden: "Reviewer 1", "Reviewer 2") |
| Versions | v1, v2... with submitted date and download of the PDF submitted |
| Actions | Revise and resubmit (when revisions requested): opens the editor with a required "Response to reviewers" field (up to 5000 chars, or upload PDF); Withdraw submission (before final decision; confirm with reason) |

### 10.8 Requesting changes to a live item

Authors cannot edit live content directly. "Request update" opens a modal: what to change, reason, optional attachment. It creates an admin task on the item (Admin > Articles > item > Update requests). Admin edits and republishes; the item shows "Updated [date]".

### 10.9 Notifications `/portal/notifications`

List with unread highlighting, filter (All, Unread, Submissions, Reviews, Account), "Mark all as read". Each notification links to the relevant screen. Notification preferences: per category email on/off (account and security emails cannot be disabled).

### 10.10 Profile `/portal/profile`

| Field | Rules |
| --- | --- |
| Profile picture | 400x400, crop |
| First name, Last name | Changes after approval require admin re-approval **[CONFIRM]**; default: allowed, logged |
| Public display name | Optional override, for example "Dr. A. Khan" |
| Username (URL) | Auto from name, editable once; used in `/authors/[username]` |
| Designation, Institution, Department | |
| Short bio | Writers: up to 600 chars; Experts: one line up to 120; Approvers: two lines up to 160 (as set by admin; editable) |
| Expertise | 1 to 5 Topics/Subtopics |
| Links | ORCID, Google Scholar, LinkedIn, X, personal website |
| Show public profile | Toggle (writers with published work always have a page; toggle hides bio links only) **[CONFIRM]** |

Preview of the public author page.

### 10.11 Account `/portal/account`

Change email (OTP), change password, 2FA, active sessions, notification preferences, download my data (JSON export of profile, submissions metadata, versions list; generated async, link emailed, valid 24h), request account deletion (creates admin task; published work handling explained: anonymised to "Former contributor" or removed per Contributor Agreement **[CONFIRM]**).

### 10.12 Apply for another role `/portal/apply-role`

An approved Article Writer can apply for the Research Writer track and vice versa. Opens the relevant step 2 form (Section 9.6 or 9.7) with profile prefilled. Creates a new Application of type `role_upgrade`; existing access continues meanwhile. Admin approves or returns it like any application.

---

## 11. Approver portal

Approvers have the contributor portal plus the Reviews section. They can also write Articles and Reports (admin-approved like any writer).

### 11.1 Reviews queue `/portal/reviews`

Tabs with counts: **Invitations** (assigned, awaiting accept), **To review**, **Re-submitted** (revised versions awaiting their re-review), **Completed: Approved**, **Completed: Revisions requested**, **Completed: Rejected**, **All**.

| Column | Detail |
| --- | --- |
| Paper title | Anonymised title (no author info anywhere) |
| Reference ID | `RES-2026-00045` |
| Paper type, Topic | |
| Round | Round 1, Round 2... |
| Assigned | Date |
| Due | Date, with chip: "Due in 3 days" (warning), "Overdue" (danger) |
| Status | |
| Action | Accept / Decline (Invitations), Review (To review) |

Overview KPI additions for approvers: Assigned, Pending, Completed, Average days to complete, Due this week.

### 11.2 Accepting an assignment

Invitation shows title, abstract, keywords, paper type, word count, due date (default 21 days, admin can change). Approver must tick "I have no conflict of interest with this paper" before Accept. Decline requires a reason (Conflict of interest, Outside my expertise, Unavailable, Other + text) and optionally suggests another reviewer. Unaccepted invitations auto-expire after 5 days and notify admins.

### 11.3 Review workspace `/portal/reviews/[assignmentId]`

Split screen.

| Left (paper, 60%) | Right (review form, 40%) |
| --- | --- |
| Tabs: "Paper" (rendered anonymised full text), "PDF" (in-browser viewer of the anonymised manuscript with page thumbnails), "Files" (supplementary files), "Previous round" (for Round 2+: previous version, diff view of text changes, author's response to reviewers, own previous comments) | Recommendation (radio, required): Approve (accept as is), Minor revisions, Major revisions, Reject |
| Highlight-to-comment: select text in the Paper tab to add a comment anchored to that passage (exported into the comments list with section references) | Scores (1 to 5, required): Originality, Methodological rigour, Evidence and sourcing, Clarity of writing, Relevance to PSF readers |
| | Comments to author (rich text, required unless Approve; minimum 100 chars for revisions or reject) |
| | Confidential comments to editor (not shared with author) |
| | Attach annotated file (optional PDF) |
| | Buttons: Save draft review, Submit review |

**Submit review:** confirmation dialog summarising the recommendation ("You are recommending Major revisions. Your comments will be shared with the author anonymously."). On submit: review locked, admin notified, assignment status `completed`.

### 11.4 Decision logic across approvers

| Situation (all assigned approvers have submitted) | System outcome |
| --- | --- |
| 1 approver assigned, Approve | Paper → `awaiting_final_approval` |
| 1 approver, Minor/Major revisions | Paper → `revisions_requested`; author notified with comments |
| 1 approver, Reject | Paper → `awaiting_editor_decision` (admin confirms rejection or overrides with a new approver) |
| 2 approvers, both Approve | → `awaiting_final_approval` |
| 2 approvers, any revisions and no reject | → `revisions_requested` (comments of both shared, labelled Reviewer 1 and 2) |
| 2 approvers, one or both Reject | → `awaiting_editor_decision`: admin chooses Reject, Request revisions, or Assign a third approver |

- **FR-REV-01** Approvers never see author names, emails, institutions, title page files or the other reviewer's identity. Authors never see approver identities.
- **FR-REV-02** An approver cannot be assigned a paper they authored or co-authored (system blocks by email match on authors and co-authors).
- **FR-REV-03** Revised versions return to the same approvers by default (Round 2); admin can change.
- **FR-REV-04** Reminder emails at 7 days and 2 days before the due date and on the due date; admins see overdue assignments on their overview.
- **FR-REV-05** "Request revisions" by the approver is the "reject with comments" the brief describes: the author edits and resubmits, and the paper returns to the approver.

---

## 12. Admin dashboard

### 12.1 Layout and navigation

- Left sidebar (264px, collapsible), grouped. Sub-items expand under their parent. Counts shown as badges where something needs action (pending applications, submissions in review, unread inbox, overdue reviews).
- Top bar: global admin search (users, content by title or reference ID, campaigns, cards), "Create" quick menu (Newsroom post, User, Campaign, Card), notification bell, avatar menu (My account, View site, Portal, Sign out).
- Every listing page shares the table component (Section 3.7) with: search, filters drawer, active-filter chips, saved views (per admin), column chooser, bulk actions, CSV export (permission-gated), pagination.

**Sidebar structure**

```
Overview
Analytics
Users
  All users
  Pending applications   (badge)
  Article Writers
  Research Writers
  Approvers
  Experts
  Staff and admins
  Invited
  Deactivated
  Banned
  Permanently rejected
Roles and permissions
Articles
  All | Pending review (badge) | Live | Scheduled | Changes requested | Rejected | Drafts | Deleted
Reports
  (same sub-items as Articles)
Research papers
  All | New submissions (badge) | Under review | Revisions requested | Editor decision needed (badge) | Awaiting final approval (badge) | Published | Rejected | Withdrawn | Deleted
Newsroom
Featured and Top Stories
Taxonomy
  Topics | Report categories | Research categories | Tags
Global Watch
Ad management
  Campaigns | Slot calendar
Inbox  (badge)
  All | Contact | Corrections | Advertise | Copyright
ID cards
CMS
  Pages | Navigation | Footer | Social links | Media library | Global settings
Activity logs   (Super Admin)
Settings        (Super Admin)
```

### 12.2 Overview `/admin`

| Block | Content |
| --- | --- |
| Action centre | Cards with counts and links: Pending applications, Articles pending review, Reports pending review, Research new submissions, Research editor decisions needed, Research awaiting final approval, Overdue reviews, Unread inbox, Featured slots holding expired items, Campaigns ending in 7 days, Globe status entries past review date |
| Traffic KPIs (today, PKT) | Visitors, Page views, Reads, Avg. time on page, with delta vs same day last week |
| Visitors chart | Last 30 days, daily visitors and page views (two series) |
| Hourly heatmap | Visitors by hour of day (PKT) x day of week, last 4 weeks |
| Geography | Top 10 countries and top 10 cities by visitors (table + small world choropleth) |
| Content KPIs | Published this month by type, total live items, contributors (active), submissions this month, approval rate |
| Top content | Top 10 items by reads (7 days), with type and author |
| Recent submissions | Latest 10 submissions across types with status and submitter IP country |
| Live now | Visitors in the last 5 minutes and their current pages (top 5) |

Date range selector (default Today and Last 30 days per block). All data PKT.

### 12.3 Analytics `/admin/analytics`

Tabs: **Audience**, **Content**, **Acquisition**, **Geography**, **Contributors**, **Engagement**. Global filters: date range (presets + custom), compare to previous period, content type, Topic, Subtopic, country, device. Every chart and table exportable as CSV (and PNG for charts) with `analytics.export`.

| Tab | Metrics and visuals |
| --- | --- |
| Audience | Visitors (unique per day by IP hash + user agent), sessions, page views, pages per session, avg. session duration, new vs returning (consented visitors only), device split, browser, OS, screen size, hourly distribution (PKT), day-of-week distribution |
| Content | Reads by content type, by Topic, by Subtopic, by Content label; top 50 items (title, type, author, published, reads, avg. read time, scroll depth 25/50/75/100%, shares, PDF downloads); items published per week; median reads in first 7 days; content with zero reads in 30 days |
| Acquisition | Referrers (search, social by platform, direct, other sites), UTM campaigns, share-originated visits by platform, top landing pages, top exit pages, internal search terms and zero-result searches |
| Geography | Visitors and reads by country and city (table + map), reads by country per Topic, IP-based region of submitters and applicants |
| Contributors | Submissions per contributor, approval rates, average review time (admin and approvers), top authors by reads, approver turnaround and overdue counts |
| Engagement | Share clicks by platform, PDF downloads, video plays (on-site lightbox), globe interactions (point clicks, filters used), newsroom ticker clicks, ad impressions and clicks (summary, detail in Ads) |

**Visitor detail (IP view, permission `users.view_ip`):** a "Visitors log" table: time PKT, IP (masked after 90 days), country, city, device, browser, landing page, pages viewed, referrer. Filter by IP, country, date. Used for abuse investigation.

### 12.4 User management

#### 12.4.1 All users listing `/admin/users`

| Column | Detail |
| --- | --- |
| User | Avatar, full name, email |
| Roles | Role chips (multiple) |
| Status | Active, Pending, Returned, Invited, Deactivated, Banned, Permanently rejected |
| Institution / Designation | |
| Published | Count |
| Pending | Count of items in review |
| Joined | Date |
| Last active | Date time PKT |
| Signup country | From IP |
| ⋯ Actions | View, Edit profile, Edit roles, Reset 2FA, Resend invite (Invited), Revoke invite (Invited), Deactivate / Reactivate, Ban, Copy email |

Filters: Role (multi), Status, Institution, Expertise Topic, Joined date range, Last active range, Country, Has published content (yes/no), 2FA enabled. Search: name, email, username. Bulk: Export CSV, Deactivate (with confirmation), Send email (opens composer using a template; logged).

The sub-pages (Article Writers, Research Writers, Approvers, Experts, Staff and admins, Invited, Deactivated, Banned, Permanently rejected) are pre-filtered views of the same table with role-specific columns:

| View | Extra columns |
| --- | --- |
| Approvers | Assigned reviews (open), completed reviews, avg. turnaround days, overdue |
| Experts | Show public profile (toggle inline), published count |
| Research Writers | Programme / degree, graduation status, ORCID |
| Banned | Banned date, banned by, reason, items removed count |
| Permanently rejected | Rejected date, by, reason |
| Deactivated | Deactivated date, by, reason |

#### 12.4.2 User detail `/admin/users/[id]`

| Section | Content |
| --- | --- |
| Header | Avatar, name, email (verified badge), roles, status chip, username, public profile link, actions (Edit profile, Edit roles, Deactivate/Reactivate, Ban, Reset 2FA) |
| Counters | Posted (live), Pending (in review), Rejected, Drafts (count only), Total reads; per type breakdown on hover |
| Profile | All profile fields, expertise, links, bio |
| Application | Full application as submitted (both steps), uploaded ID (signed URL viewer, if not yet purged), decision history with comments and admin names, attempt count |
| Security | 2FA status, last sign-in time and IP/geo, active sessions (admin can revoke), failed sign-in count (24h) |
| Submissions | Simple list (no cover images): Title, Type, Status, Date, Reads, "View" link to the admin item page. Tabs: All, Articles, Reports, Research. Filter by status |
| Reviews (Approvers) | Assignments list: reference ID, assigned, due, completed, recommendation |
| Activity | Last 50 activity log entries for this user (link to full log filtered) |
| Admin notes | Internal notes thread (visible to admins only) |

#### 12.4.3 Edit roles (modal)

Shows all roles as checkboxes with descriptions and the effective permission summary (expandable). Rules FR-RBAC-02/03/05 enforced. Changing roles requires a reason (optional text) and is logged. If an added role needs extra profile data (for example Approver two-line description), the modal asks for it.

#### 12.4.4 Create user `/admin/users/new` (stepper)

| Step | Content |
| --- | --- |
| 1. Role | Select one or more roles (cards with descriptions). The fields in step 2 adapt to the union of selected roles |
| 2. Details | Fields per role (table below) |
| 3. Review and invite | Summary; "Send invitation" (email with set-password link, Section 9.10); option "Copy invite link" for manual sharing (logged) |

| Field | Article / Research Writer | Approver | Expert | Admin / custom role |
| --- | --- | --- | --- | --- |
| First name, Last name, Email | Required | Required | Required | Required |
| Profile picture (400x400) | Optional | Optional | Optional | Optional |
| Institution / University | Optional (Writer), Required (Research) | Required | Optional | No |
| Designation | Required | Required | Required | Optional |
| Short description | Bio (optional, 600) | **Two-line description** (required, max 160 chars, shown under designation) | **One-line bio** (required, max 120 chars) | No |
| Expertise areas | Required (1 to 5) | Required | Required | No |
| Programme / Degree, Graduation status | Research Writer only, optional | No | No | No |
| ORCID, links | Optional | Optional | Optional | No |
| Show public profile | Default on | Default on **[CONFIRM]** | Default on | Off |
| Require 2FA | Optional | Forced on | Optional | Forced on |

Admin-created contributors skip the application step (status becomes Active once they set a password).

#### 12.4.5 Deactivate and reactivate

- Confirmation modal with reason (dropdown: Inactive, Requested by user, Under investigation, Other + text).
- Effects: all sessions revoked, cannot sign in, open review assignments are flagged to admins for reassignment, in-review items stay in queue (admin decides), **published content stays live**. User appears in the Deactivated tab.
- Reactivate: modal with optional note; user receives "Your account has been reactivated" email.

#### 12.4.6 Ban (permanent)

- Destructive confirmation: shows impact ("12 published items, 2 in review and 1 draft will be removed from the site.") and requires typing the user's email. Reason required (dropdown: Fake identity, Plagiarism, Abuse or harassment, Spam, Security threat, Policy violation, Other + text).
- Effects (immediate): sessions revoked, account status Banned, email and normalised variants (dots, plus-addressing for Gmail) added to the blocklist, all of the user's content unpublished and set to `removed_ban` (hidden from site, retained privately for audit and legal reasons, URLs return 410), removed items deleted from featured slots (slots fall back per Section 14), co-authored items: banned user removed from byline; item stays live if another author exists, otherwise removed. Open review assignments cancelled and flagged.
- Banned users appear in the Banned tab with removed-items count. There is **no unban action in the UI** (permanent by design). Super Admin can view removed items read-only.
- The user is not emailed by default (toggle "Notify user" available).

### 12.5 Applications `/admin/applications` (also under Users > Pending applications)

Listing columns: Applicant (name, email), Track (Article Writer, Research Writer, Role upgrade), Institution, Designation, Expertise, Submitted (date time), Attempt (#), Signup IP country, ID uploaded (yes/no), Status. Filters: track, status (Pending, Returned, Approved, Permanently rejected, Withdrawn), date range, country, institution. Default sort: oldest pending first.

**Application review page `/admin/applications/[id]`** (read-only, admins cannot edit applicant data):

| Section | Content |
| --- | --- |
| Header | Name, email (verified), track, attempt number, submitted time PKT, status |
| Step 1 data | All fields, profile photo |
| Step 2 data | All fields; uploaded ID card in a secure viewer (zoom, rotate; no download unless `users.edit`); writing samples and links (open in new tab) |
| Submission context | IP, country, city, device, browser, time to complete form; flags: same IP as another account, disposable-looking domain, email domain matches institution (green check if the email domain matches the stated university's domain) |
| History | Previous attempts with the admin comments and dates |
| Duplicate check | Other users with the same name, phone or IP (links) |
| Decision panel (sticky bottom) | **Approve**, **Reject with comments**, **Reject permanently** |

| Action | Dialog | Result |
| --- | --- | --- |
| Approve | Optional welcome note; role(s) to grant prefilled from track (editable) | Status Active, roles granted, welcome email, application ID file scheduled for deletion (30 days) |
| Reject with comments | Required comment to applicant (20 to 1000 chars), optional internal note | Status Returned; email "Your PSF application needs changes" with the comment; applicant signs in and resubmits the prefilled form (Section 9.9) |
| Reject permanently | Reason dropdown (Fake or misleading information, Impersonation, Plagiarised samples, Abusive content, Spam, Other) + required text; type-to-confirm | Status Permanently rejected, email blocklisted, account cannot sign in, email "Your PSF application was not accepted" (no resubmission) ; the email can never be used again for signup |

### 12.6 Roles and permissions `/admin/roles`

- Listing: Role name, description, type (System / Custom), users count, last edited.
- Role editor: name (unique), description, colour of chip (from a fixed 6-colour set), permission checklist grouped as in Section 5.3 with "Select all" per group and search. Live summary: "This role can approve articles, manage newsroom...".
- System roles: permissions viewable; Super Admin role read-only; other system roles' permissions editable only by Super Admin with a warning.
- Delete custom role: only when no users hold it, or reassign users to another role in the delete dialog.
- "Duplicate role" to start from an existing bundle.

### 12.7 Articles `/admin/articles` (Reports identical at `/admin/reports`)

**Listing columns:** ID, Title (truncated to one line; full title, standfirst and card image in a hover card), Content label, Author(s) (avatar, name, role chip), Topic / Subtopic, Location (flag + city), Status, Submitted at, Published at, Reads, Featured (icon if in any slot), Last updated, ⋯ actions.

**Filters:** Status, Topic, Subtopic, Content label, Author, Author role, Country, Region, Submitted date range, Published date range, Reads range, Featured (yes/no), Has update request, Migrated (archive) yes/no. **Search:** title, ID, slug. **Sort:** Submitted, Published, Reads, Last updated.

**Row actions:** View/Review, Edit, Approve and publish, Schedule, Request changes, Reject, Unpublish, Feature (opens Featured flow prefilled), Copy public link, View on site, Version history, Delete, Restore (Deleted tab).

**Bulk actions:** Unpublish, Delete, Export CSV, Move to Topic/Subtopic, Add tag. (No bulk approve.)

**Review page `/admin/articles/[id]`**

| Area | Content |
| --- | --- |
| Main (left) | Rendered preview (desktop/mobile toggle), with "Edit" switching into the editor (admin edits are saved as a new version labelled "Edited by [admin]") |
| Metadata panel (right) | All sidebar fields from the editor, editable by admins with `edit_any`; slug; SEO; share-card preview; location on a mini map |
| Submission panel | Submitted by, submitted at, IP, country, city, device, browser, author's note to editors, co-author acceptance status |
| Author snapshot | Author's published/pending/rejected counts, approval rate, link to user |
| Checks | Word count, missing alt text count, external links list with status (broken link check), duplicate title warning, similarity hook (reserved for plagiarism integration) |
| History | Status timeline, versions (diff between versions), comments thread between admins and author (comments to author vs internal notes) |
| Decision bar | **Approve and publish now**, **Approve and schedule** (date time PKT), **Request changes** (comment required, goes to author, item editable again), **Reject** (comment required, final for this item) |

Unpublish: confirmation with reason; URL returns 410; item becomes "Unpublished" (in Drafts tab for admin; author sees "Unpublished by editors"). Delete: soft delete, visible in Deleted tab for 30 days, then purged.

**Report-specific:** report number assigned on publish (editable by admin), PDF replace (versioned), executive summary and key findings editable.

**Corrections on live items:** "Add correction" action on live items: correction text, date (default now), position (top and bottom). Appears on the item and in the public corrections log; logged.

### 12.8 Research papers `/admin/research`

**Listing columns:** Reference ID, Title, Corresponding author (visible only with `research.see_identities`), Institution, Paper type, Research Category, Topic, Round, Approvers (names, status per approver: Invited, Accepted, Submitted, Declined, Overdue), Status, Submitted, Last action, Days in current stage.

**Filters:** Status, Paper type, Research Category, Topic, Subtopic, Approver, Institution, Country, Submitted date, Days in stage (> N), Overdue reviews.

**Research item page `/admin/research/[id]`**

| Panel | Content |
| --- | --- |
| Manuscript | Rendered text, anonymised PDF viewer, title page PDF, supplementary files, versions (v1, v2 with diff), author's response to reviewers |
| Metadata | Step 1 fields (editable by admin), declarations, suggested and excluded reviewers, cover letter |
| Submission context | IP, geo, device |
| Screening (status Submitted) | Checklist: in scope, anonymised correctly, formatting OK, references present, word count within limits. Actions: **Desk reject** (comment required, final), **Return to author for formatting** (comment, back to author without review), **Send to review** (opens Assign) |
| Assign approvers | Search approvers filtered by expertise match (shows each approver's open load and average turnaround). Assign 1 or 2, set due date (default 21 days), optional message. Conflict check (FR-REV-02). Approvers get invitation emails |
| Review tracker | Per approver: status, invited/accepted/submitted dates, recommendation, scores, comments to author, confidential comments, reminder button, replace approver |
| Editor decision (when needed) | After reviews: **Request revisions** (compiled comments to author, admin can add a cover note and edit approver comments before sending), **Reject** (comment), **Assign additional approver** |
| Final approval (status Awaiting final approval) | Preview as published, set: publication date (now or scheduled), DOI (optional, format `10.xxxx/...`), volume, issue, page range, licence, featured toggle. Buttons **Approve and publish**, **Reject** (comment required), **Request minor edits** (back to author without re-review) |
| Communications | All decision letters sent, with templates (Appendix B) and editable text before sending |
| History | Full stage timeline with actor (admin names visible to admins) |

**Published research:** Unpublish, Add correction, Issue retraction (marks paper "Retracted" with notice, keeps page with banner, PDF watermarked "RETRACTED"; requires Super Admin).

**Settings (Research):** ISSN (shown on research pages), default review due days, default number of approvers, publisher name for citations, licence default.

### 12.9 Newsroom `/admin/newsroom`

**Listing (simple table):** Time (PKT), Headline, Location (region > country > city), Topic, Status (Published, Scheduled, Draft, Expired), Breaking, Pinned, Author (admin), Clicks (ticker + page views), ⋯ (Edit, Pin/Unpin, Duplicate, Unpublish, Delete).

Filters: status, region, country, topic, date range, breaking, pinned. "New post" button. Clicking a row opens the **edit modal** (Large modal):

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Headline | Text | Yes | 10 to 110 chars |
| Summary | Simple rich text (bold, italic, link, bulleted list) | Yes | 30 to 800 chars |
| Region, Country, City | Cascading | Yes | City allows "Country-wide" |
| Topic | Select | No | |
| Source name and link | Text + URL | No | |
| Thumbnail | Image | No | 800x450 (16:9) |
| Breaking | Toggle | No | Shows the Breaking label for 6 hours, then auto-off |
| Pin to top | Toggle | No | Max 3 pinned; pinning a 4th unpins the oldest (warning shown) |
| Publish | Radio | Yes | Now / Schedule (date time PKT) / Save as draft |
| Expire after | Date time | No | Removed from ticker and globe after expiry (stays on newsroom page and URL) |

Delete requires confirmation; deleted posts' URLs return 410.

### 12.10 Featured and Top Stories `/admin/featured`

Manages every featured position across the site (Home top stories, latest coverage, hero lead, desks, topic and subtopic pages, reports, research). Full rules in Section 14.

**Screens**

1. **Slots overview:** grouped by page (Home, Topics, Reports, Research, Mega menu). Each slot card: slot name, page, positions, current item(s) per position with thumbnails, state (Scheduled, Active, Holding after expiry, Fallback/automatic), next scheduled item, "Manage".
2. **Slot timeline (Manage):** per position, a horizontal timeline (Gantt) of placements: current, upcoming, past (last 30 days). Clicking a bar opens edit.
3. **Add placement flow (stepper modal):**

| Step | Field | Rules |
| --- | --- | --- |
| 1 | Page | Home, Topic page, Subtopic page, Reports hub, Report category, Research hub, Mega menu |
| 2 | Topic / Subtopic / Category | Only when the page requires it (for example Topic page → choose Topic) |
| 3 | Section and position | Predefined slots for that page (for example Home > Top stories > Position 2). Occupied windows shown |
| 4 | Content | Searchable dropdown of **published** items allowed in that slot (type filter; title, author, date, thumbnail). Items scheduled to publish later can be chosen if their publish time is before the placement start |
| 5 | Start and end | Start date time PKT (default now), End date time PKT (required, or "No end date") |
| 6 | Review | Preview of the slot with the item; conflicts listed; "Feature" button |

The "Feature" action on any content row opens this flow at step 1 with the item preselected.

### 12.11 Taxonomy `/admin/taxonomy/*`

Three hierarchical taxonomies plus tags. All dynamic; changes reflect in navigation, forms, filters and footer automatically (FR-NAV-01).

**Topics (two levels: Topic > Subtopic)**

Tree view with drag-and-drop ordering, item counts, status (Active/Inactive), "Show in nav", "Show on home quick access", "Show as home desk".

| Topic field | Rules |
| --- | --- |
| Name | Required, unique, up to 40 chars |
| Slug | Required, unique, lowercase, hyphens; auto from name; changing it after publish creates a 301 from the old slug |
| Base description | Required, up to 280 chars (hero) |
| Hero image | Required, 2400x1000 (12:5) |
| Icon | Required, SVG or PNG 96x96 |
| SEO title and description | Optional (defaults generated) |
| Flags | Active, Show in nav, Show on home quick access, Show as home desk |
| Subtopics | Inline repeatable list on create: name, slug, icon (96x96), one-line description (up to 120) |

| Subtopic field | Rules |
| --- | --- |
| Parent Topic | Required |
| Name, Slug | As Topic, unique within parent |
| Icon | Required, SVG/PNG 96x96 |
| Description | Up to 120 chars |
| Hero image | Optional, 2400x1000 (falls back to parent) |
| Active | Toggle |

Rules:
- **FR-TAX-01** A Topic or Subtopic with content cannot be deleted; it can be deactivated or **merged** into another (moves all items, creates 301s).
- **FR-TAX-02** Deactivated categories are hidden from nav and submission forms; their pages remain accessible if they contain published content, otherwise return 410.
- **FR-TAX-03** Seed data: Defence (Land, Air, Sea, Strategic Systems, Cyber & Information), Geopolitics (South Asia, Afghanistan, Americas, Middle East), National Affairs (Security, Economy, Policy), History (Battles & Operations, Profiles).

**Report categories** (one level by default, optional sub-level): name, slug, description, hero image (2400x1000), icon, order, active. Seed **[PLACEHOLDER]**: Strategic Assessments, Special Reports, Annual Outlooks, Event Readouts.

**Research categories** (one level): name, slug, description, icon, order, active. Seed: Research Papers, Policy Briefs, Emerging Scholars.

**Tags:** listing with usage counts; rename, merge, delete (removes from items).

### 12.12 Global Watch admin `/admin/global-watch`

| Section | Content |
| --- | --- |
| Status layer entries | Table: country/region, status, note, start, review-by, last edited; create/edit modal (fields per Section 8.3); end entry (sets end date, keeps history) |
| Globe settings | Default date range (90 days), default layers on/off, auto-rotate speed, home globe on/off, disclaimer text (CMS) |
| Coverage health | Items without coordinates (should be zero), top locations, migrated items without location (for the archive tagging task) |

### 12.13 Ad management

**Campaign listing `/admin/ads/campaigns`:** Campaign number, Brand, Name, Status (Draft, Scheduled, Live, Paused, Ended, Archived), Placements count, Start, End, Impressions, Clicks, CTR, ⋯ (View analytics, Edit, Duplicate, Pause/Resume, Archive). Filters: status, brand, slot, date range.

**Create / edit campaign `/admin/ads/campaigns/new`** (one page form with a repeatable placements section):

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| Brand name | Text | Yes | Internal only, never shown publicly |
| Campaign number | Text | Yes | Auto-suggested `CMP-2026-0012`, editable, unique |
| Campaign name | Text | Yes | Internal |
| Description / notes | Textarea | No | Internal |
| Contact (advertiser) | Name, email | No | Internal |
| Linked enquiry | Inbox item link | No | |

**Placements** (each added with "+ Add placement", opening a modal):

| Step in modal | Field | Rules |
| --- | --- | --- |
| 1 | Slot | Select from the slot registry (Section 15): shows page, position, desktop and mobile sizes |
| 2 | Start date and time, End date and time (PKT) | Required. The picker greys out windows already booked for that slot; overlap is blocked server-side (FR-ADS-01) |
| 3 | Creatives | Desktop creative (exact size shown, for example "Upload 970x250 px, JPG/PNG/WebP/GIF, max 300KB"), Mobile creative (for example 320x100), Alt text (required), Click-through URL (optional; https only), Open in new tab (default yes). Carousel slot: up to 5 slides, each with its own creatives and URL |
| 4 | Confirm | Preview of the slot with creative at desktop and mobile widths; "Add placement" |

Placements list within the campaign: slot, window, creative thumbnails, status, ⋯ (edit, duplicate, remove).

- **FR-ADS-01** One placement per slot per moment in time (carousel slot: one campaign per window, up to 5 slides). Validation compares `[start, end)` intervals across all non-archived campaigns.
- **FR-ADS-02** Available windows are computed and occupied ranges disabled in the picker ("Booked by CMP-2026-0009, 1 to 15 Nov").
- **FR-ADS-03** Campaign status is derived: Scheduled (all placements in future), Live (any placement active), Ended (all past), Paused (manual; paused placements render nothing and free nothing).
- **FR-ADS-04** Creatives are validated for exact pixel dimensions (or exact 2x for retina uploads) and file size before upload completes.

**Slot calendar `/admin/ads/calendar`:** month and week views, rows = slots, bars = placements (colour per campaign), click to open. Filter by page.

**Campaign analytics `/admin/ads/campaigns/[id]/analytics`**

| Block | Content |
| --- | --- |
| Header | Campaign number, brand, name, period, status, countdown ("Ends in 6 days 4 hours" when live) |
| KPIs | Impressions, Unique viewers, Clicks, CTR, Days live, Avg. daily impressions |
| Chart | Daily impressions and clicks from start to end (to today if live) |
| By placement | Table: slot, window, impressions, clicks, CTR |
| By device | Desktop vs mobile |
| By country | Top 10 countries |
| By hour | Impressions by hour (PKT) |
| Download results | **PDF report**: PSF logo, campaign ID, brand, campaign name, period, KPI summary, chart, placement table, device and country tables, generated date time PKT, "Prepared by Pakistan Strategic Forum". Also CSV of daily data |

### 12.14 Inbox `/admin/inbox`

Unified inbox for every public form. Tabs: **All**, **Contact**, **Corrections**, **Advertise**, **Copyright**.

| Column | Detail |
| --- | --- |
| From | Name, email |
| Source | Contact / Corrections / Advertise / Copyright + page URL it was sent from |
| Subject / reason | First line or reason |
| Received | Date time PKT |
| Status | New, Open, Replied, Closed, Spam |
| Assigned to | Admin |

Detail view: all submitted fields exactly as entered, attachments (signed URLs), IP country, internal notes, status change, assign, "Reply by email" (opens composer that sends from `editor@` or `ads@` address per source **[CONFIRM addresses]**, logs the reply in the thread), linked item (for corrections: link to the content item + "Add correction" shortcut), "Convert to campaign" (Advertise: prefills brand and contact). Spam: mark as spam (trains a simple block list of emails/IPs).

### 12.15 ID cards `/admin/id-cards`

| Element | Detail |
| --- | --- |
| Listing | Card ID, Designation, Status (Active / Inactive), Verification URL (copy button), QR (download PNG/SVG), Scans (count), Last scanned, Created by, Created at |
| Create card (modal) | Card ID (text, required, unique, up to 40 chars), Designation (text, required, up to 80 chars). "Create" generates the unique URL immediately and shows it with Copy URL and Download QR (PNG 1024px and SVG) buttons |
| Actions | Activate / Deactivate (confirm; reason optional). **No delete** |
| Filters | Status, created date, search by Card ID or designation |

- **FR-CARD-06** Card ID and designation are editable only while the card has never been scanned; after the first scan they are locked (deactivate and create a new card instead).

### 12.16 CMS `/admin/cms`

Purpose: edit all public text and images without code, inside locked templates.

**Pages:** list of every public page (Home, Topics hub, Reports hub, Research hub, Peer review, Submit a paper, Newsroom, Global Watch, Videos, Where We Are, About, Editorial Policy, Corrections, Contributor Agreement, Publish With Us, Contact, Advertise, Privacy, Cookies, Disclaimer, Copyright, Terms, Verify page messages, 404/410/500/Maintenance). Each shows status (Published, Draft changes pending), last edited by and when.

**Page editor:** the page's sections listed in template order; each section has typed fields (text, rich text, image with size hint, link, repeatable list, toggle). Section order and layout are locked; sections marked optional can be toggled hidden. Right side: live preview (desktop/tablet/mobile).

- **Draft, preview, publish (D23):** edits save as a draft; "Preview" opens the real page with draft content (signed preview URL, `noindex`); "Publish" makes it live and revalidates the page; "Discard draft".
- **History:** every publish stores a revision (who, when, diff summary). "Restore this version" creates a new draft from it.
- **Repeatable lists:** About timeline, What we do pillars, FAQs, Advertise audience cards, process steps, cookie table.
- **Policy pages:** rich text body with "Last updated" set on publish.

**Navigation:** dynamic parts (Topics, categories) come from taxonomy; editable parts: About dropdown items, utility bar links, header CTA labels.

**Footer:** mission line, column titles, static links (add, remove, reorder), copyright text template.

**Social links:** platform (X, Facebook, Instagram, YouTube, LinkedIn, Telegram, WhatsApp Channel), URL, handle, description (Where We Are), follower count (optional), show in footer / utility bar / Where We Are toggles, order.

**Media library:** all uploaded images and files, with search, filters (type, uploaded by, date, used/unused), details (dimensions, size, alt text, credit, where used), replace (keeps URL references), delete (blocked if in use).

**Global settings:** logo (SVG, light and dark versions), favicon (512x512 PNG), default share image (1200x630), site name, tagline, contact emails per form source, X handle for cards, maintenance message, borders disclaimer text, home section toggles.

### 12.17 Activity logs `/admin/activity-logs` (Super Admin)

Immutable, append-only log of every action (catalogue in Section 21).

| Column | Detail |
| --- | --- |
| Log ID | Sequential, for example `LOG-0001248` |
| Date and time | PKT, to the second |
| Actor | Name and email (or "Visitor" / "System"), role(s) at the time |
| Action | Human-readable action ("Approved article", "Signed in", "Banned user") |
| Target | Entity type and title/name with link (for example Article: "Pakistan's air defence...") |
| URL | Page or endpoint where the action happened |
| IP and location | IP, country, city |
| Device | Browser and OS |
| Result | Success / Failed (for example failed sign-in) |
| Details | Expandable row: changed fields (before → after), reason/comment |

Filters: date range, actor, role, action type (grouped: Auth, Users, Applications, Content, Research, Newsroom, Featured, Taxonomy, Ads, Inbox, Cards, CMS, Settings), target type, result, IP, country. Export CSV (`logs.export`). Retention: 2 years online **[CONFIRM]**, then archived to cold storage.

### 12.18 Settings `/admin/settings` (Super Admin)

| Tab | Contents |
| --- | --- |
| General | Site name, timezone (fixed PKT, display only), date format, contact emails, research settings (Section 12.8) |
| Email templates | Every template in Appendix B: subject and body editable with variables (`{{firstName}}`, `{{itemTitle}}`...), preview, send test |
| Integrations | YouTube channel ID and API key status, X handle and embed settings, Instagram account, Turnstile keys status, GeoIP database last update, Resend status |
| Security | Password policy (min length), session lengths, 2FA enforcement for roles, sign-in lockout thresholds, IP blocklist, allowed admin IP ranges (optional) |
| Data retention | Raw IP retention (default 90 days), application ID document retention (30 days after decision), deleted content purge (30 days), activity log retention |
| Maintenance | Maintenance mode toggle with message |
| Cookie policy version | Bump version to re-prompt consent |

### 12.19 Admin account `/admin/account`

Same as portal account (password, 2FA, sessions, notification preferences), plus "My saved views".

---

## 13. State machines

### 13.1 User account status

| Status | Entered when | Can sign in | Next states |
| --- | --- | --- | --- |
| `pending_signup` (not a user yet) | Step 1 submitted, OTP sent | No | `application_draft` (OTP verified), expired (24h) |
| `application_draft` | OTP verified | Yes (application only) | `pending` |
| `pending` | Application submitted / resubmitted | Yes (application only) | `active`, `returned`, `permanently_rejected`, `withdrawn` |
| `returned` | Admin rejected with comments | Yes (application only) | `pending` |
| `invited` | Admin created user | No | `active` (password set), `invite_revoked` |
| `active` | Approved or invite accepted | Yes | `deactivated`, `banned` |
| `deactivated` | Admin deactivated | No | `active` |
| `banned` | Admin banned | No | Terminal |
| `permanently_rejected` | Admin permanently rejected | No | Terminal |
| `withdrawn` | Applicant withdrew | Yes (can re-apply once) | `pending` |

### 13.2 Article and Report status

| Status | Meaning | Author can edit | Visible publicly |
| --- | --- | --- | --- |
| `draft` | Being written | Yes | No |
| `in_review` | Submitted | No (can withdraw to draft) | No |
| `changes_requested` | Returned with comments | Yes | No |
| `scheduled` | Approved with future publish time | No | No (yes at time) |
| `published` | Live | No (request update) | Yes |
| `unpublished` | Taken down by admin | No | No (410) |
| `rejected` | Final rejection | No (can duplicate) | No |
| `removed_ban` | Author banned | No | No (410) |
| `deleted` | Soft deleted | No | No (410) |

Transitions: `draft → in_review` (author submit) · `in_review → draft` (author withdraw) · `in_review → changes_requested | rejected | published | scheduled` (admin) · `changes_requested → in_review` (author resubmit) · `scheduled → published` (cron at time) · `scheduled → in_review` (admin cancels schedule) · `published → unpublished` (admin) · `unpublished → published` (admin) · any → `deleted` (admin; author for drafts) · `deleted → previous` (admin restore within 30 days) · any → `removed_ban` (ban).

### 13.3 Research paper status

| Status | Meaning |
| --- | --- |
| `draft` | Author writing |
| `submitted` | Awaiting admin screening |
| `returned_formatting` | Sent back for formatting before review |
| `desk_rejected` | Rejected at screening (terminal) |
| `under_review` | Approvers assigned (sub-states per assignment: invited, accepted, declined, submitted, overdue) |
| `editor_decision` | Reviews conflict or a reject recommendation needs admin decision |
| `revisions_requested` | Author revising (round N) |
| `resubmitted` | Revised version back with approvers (round N+1) |
| `awaiting_final_approval` | Approvers approved; admin final check |
| `minor_edits` | Admin requested small edits before publishing (no re-review) |
| `scheduled` | Approved with future publish time |
| `published` | Live |
| `rejected` | Rejected after review (terminal) |
| `withdrawn` | Author withdrew (terminal) |
| `unpublished`, `retracted`, `deleted`, `removed_ban` | As articles; retracted keeps the page with a retraction notice |

### 13.4 Application status

`pending → approved | returned | permanently_rejected | withdrawn`; `returned → pending` (resubmission, attempt +1).

### 13.5 Featured placement status

`scheduled → active → holding → ended` (Section 14.3), `active → ended` (replaced or removed), `scheduled → cancelled`.

### 13.6 Ad campaign and placement status

Placement: `scheduled → live → ended`, `live ↔ paused`. Campaign derived from placements plus manual `draft` and `archived`.

### 13.7 ID card status

`active ↔ inactive`. No deletion.

---

## 14. Featured and Top Stories slots

### 14.1 Slot registry

| Slot key | Page | Positions | Allowed types | Fallback when empty |
| --- | --- | --- | --- | --- |
| `home_hero_lead` | Home hero | 1 | Article, Report, Research | Latest published Article |
| `home_top_stories` | Home Top Stories | 4 | Article, Report, Research | Most read Article in last 7 days not on page |
| `home_latest_featured` | Home Latest Coverage | 4 | Article, Report, Research | Latest published items |
| `topic_home_featured:[topic]` | Home desk for each Topic | 1 | Items in that Topic | Latest in Topic |
| `home_reports_featured` | Home Reports | 1 | Report | Latest Report |
| `home_research_featured` | Home Research | 3 | Research | Latest Research |
| `topic_featured:[topic]` | Topic page + mega menu | 1 | Items in Topic | Latest in Topic |
| `subtopic_featured:[subtopic]` | Subtopic page | 1 | Items in Subtopic | Latest in Subtopic |
| `reports_hub_featured` | Reports hub | 1 | Report | Latest Report |
| `report_category_featured:[category]` | Report category page | 1 | Reports in category | Latest in category |
| `research_hub_featured` | Research hub | 1 | Research | Latest Research |

Slots for new Topics, Subtopics and categories are created automatically when the category is created.

### 14.2 Placement rules

- **FR-FEAT-01** One active placement per slot position at any moment. New placements cannot overlap an existing **scheduled or active** placement window for the same position; the form shows the conflict and offers "Replace current placement from [start]" (ends the current one at the new start).
- **FR-FEAT-02** The same item may appear in different slots, but not in two positions of the same section on the same page (the renderer de-duplicates and promotes the fallback).
- **FR-FEAT-03** Only `published` items render. If a featured item is unpublished, deleted or removed by ban, the placement ends immediately and the next placement or fallback applies.

### 14.3 Expiry and holding (as specified by PSF)

- **FR-FEAT-04** When a placement's end time passes:
  - If another placement is scheduled to start at or before that moment for the same position, it becomes active and the old one ends.
  - If **nothing is scheduled**, the expired item **stays visible** in status `holding` until an admin adds a new placement. The Overview action centre lists holding slots.
  - When a new placement is added for a holding position with start "now" or earlier, the holding item ends immediately.
- **FR-FEAT-05** If a scheduled placement's start arrives while another placement is still active (only possible via "Replace"), the scheduled one wins and the active one ends at that moment.
- **FR-FEAT-06** A cron job runs every minute to apply starts and ends and triggers revalidation of affected pages.
- **FR-FEAT-07** "No end date" placements stay active until replaced.

---

## 15. Ad slot registry

| Slot key | Page / position | Desktop size | Mobile size | Notes |
| --- | --- | --- | --- | --- |
| `home_leaderboard_1` | Home, after Top Stories | 970x250 | 320x100 | |
| `home_sponsor_carousel` | Home, after Research | 1200x300 per slide (up to 5) | 600x300 per slide | Auto-advances every 6s, pause on hover, dots and arrows |
| `topic_banner` | Topic and Subtopic pages, after Featured | 970x90 | 320x100 | One booking covers all Topic pages; optional per-Topic targeting **[CONFIRM]** |
| `article_inline` | Article and Report pages, after 4th paragraph | 728x90 | 300x250 | |
| `article_sidebar` | Article and Report sidebar (≥1280px), sticky | 300x600 | Not shown | |
| `newsroom_sidebar` | Newsroom page sidebar | 300x250 | 300x250 (inline after 5th post) | |
| `reports_banner` | Reports hub, after categories | 970x250 | 320x100 | |
| `global_watch_banner` | Global Watch, below region cards | 970x250 | 320x100 | |

Rules: no ads on Research pages, author pages, policy pages, auth, portal, admin, verify page. Accepted formats JPG, PNG, WebP, GIF (static or animated ≤ 15 seconds, no flashing more than 3 times per second); max 300KB (carousel slide 400KB). Retina: upload exactly 2x dimensions accepted and served scaled. Clicks use `rel="sponsored noopener"`.

---

## 16. Taxonomy and locations

### 16.1 Content classification summary

| Content type | Topic + Subtopic | Section taxonomy | Content label | Location | Tags |
| --- | --- | --- | --- | --- | --- |
| Article | Required | n/a | Required | Required (1 + up to 4) | Optional |
| Report | Required | Report Category (required) | Fixed "Report" | Required | Optional |
| Research Paper | Required | Research Category (required) + Paper type | Fixed "Research Paper" / "Policy Brief" | Required | Keywords |
| Newsroom Post | Optional (Topic only) | n/a | Fixed "News" | Required (1) | No |

### 16.2 URL and slug rules

- Slugs are lowercase, ASCII, hyphen-separated, max 80 chars, unique per type.
- Changing a published slug creates a permanent 301 redirect from the old URL.
- Category slug changes create 301s for the category page and all child URLs.

### 16.3 Content labels

Fixed list in code (editable display names in Settings): Analysis, Explainer, Opinion, Interview, Investigation, Profile, Book Review, News Analysis, News (newsroom only), Report, Research Paper, Policy Brief, Archive (system label for migrated items, shown in addition).

### 16.4 Location dataset (D12, standard only)

- Source: an open countries-states-cities dataset with latitude/longitude (for example the `countries-states-cities-database`, ODbL licence) imported into `Country` and `City` tables. Cities with population above 15,000 plus all national and provincial capitals (keeps the list manageable, around 25,000 cities). Pakistan: full city list including smaller towns and district headquarters.
- **Regions** (PSF analytical regions, seeded mapping from countries): South Asia, Middle East, Central Asia, East Asia, Southeast Asia, Europe, Africa, North America, Latin America and the Caribbean, Oceania. Each country belongs to exactly one region.
- Cascade in all forms: Region → Country (filtered) → City (searchable, filtered, plus "Country-wide").
- Country names follow the dataset; disputed areas are represented as cities/areas within the dataset and the globe disclaimer applies. **[CONFIRM]** how Jammu & Kashmir, Gilgit-Baltistan and Azad Jammu & Kashmir should be listed in the Country/City pickers (recommended: list them as areas under a dedicated "Jammu and Kashmir (disputed)" grouping in the city picker, consistent with the current site's disclaimer).
- No admin editing of the dataset in v1 (decided "standard only"); a developer script updates it.

---

## 17. Read counts, visitor analytics and tracking

### 17.1 Read count

- **FR-READ-01** A read is counted when a visitor loads a published Article, Report, Research Paper or Newsroom post page and remains on it for at least 10 seconds or scrolls 25% (whichever first). Counted via a beacon to `/api/track/read`.
- **FR-READ-02** Deduplication: one read per **IP + item** per rolling 24 hours (Redis key with 24h TTL on `hash(ip + itemId)`).
- **FR-READ-03** Excluded: known bots (user-agent list + verified crawler IPs), prefetch requests, preview URLs, signed-in users viewing their own items, admins viewing items.
- **FR-READ-04** Read counts are shown on all admin and portal listings and item pages. Public pages do not show raw counts (Most Read uses ranking only) **[CONFIRM: show counts publicly?]**.
- PDF downloads and share clicks are counted separately.

### 17.2 Visitor analytics

| Data point | How |
| --- | --- |
| Page view | Server-side middleware event for every public page request (not static assets) + client beacon for SPA navigations |
| Visitor (unique) | Daily salted hash of IP + user agent (salt rotates daily, so uniques are per day) |
| Returning visitor | Only with Analytics consent: first-party cookie `psf_vid` (random ID, 12 months) |
| IP | Stored raw for 90 days for analytics and abuse investigation, then truncated (IPv4 last octet zeroed, IPv6 /48) |
| Geo | Country, region, city from GeoLite2 at ingestion time |
| Device, browser, OS | Parsed from user agent |
| Referrer, UTM | From request |
| Time | Stored UTC, reported in PKT buckets |
| Session | 30-minute inactivity window |
| Scroll depth | Client beacon at 25/50/75/100% |
| Events | `read`, `pdf_download`, `share_click`, `video_play`, `globe_point_click`, `globe_filter`, `ticker_click`, `search`, `ad_impression`, `ad_click`, `form_submit` |

### 17.3 Storage and aggregation

- Raw events in a partitioned `events` table (monthly partitions). Nightly job aggregates into daily tables (`daily_page_stats`, `daily_item_stats`, `daily_geo_stats`, `hourly_traffic`). Dashboards read aggregates plus today's raw data.
- Raw events older than 13 months are deleted; aggregates kept indefinitely.

### 17.4 Submission and signup IP capture

Every signup, application, submission, review submission, form submission and sign-in stores IP, country, city, user agent and timestamp. Shown on the relevant admin screens to holders of `users.view_ip`.

---

## 18. Upload rules (every upload field shows these hints)

**FR-UP-01** Every upload field displays: recommended dimensions, aspect ratio, minimum dimensions, accepted formats and maximum file size, before the user selects a file. Fixed-ratio image fields open a cropper locked to the ratio. Files failing rules are rejected client-side and server-side with a specific message ("Image is 800x600. Minimum is 1200x800.").

**FR-UP-02** EXIF and GPS metadata are stripped from all images. Images are converted on the CDN to WebP/AVIF with responsive widths (320, 640, 960, 1280, 1920, 2400).

**FR-UP-03** PDFs are scanned for malware (ClamAV service or provider scanning) before becoming available; until then they show "Processing".

| Field | Recommended | Ratio | Minimum | Formats | Max size | Bucket |
| --- | --- | --- | --- | --- | --- | --- |
| Profile picture | 400x400 | 1:1 | 200x200 | JPG, PNG, WebP | 2MB | Public |
| Student / institutional ID | Clear photo of front side | Any | 600px short side | JPG, PNG, PDF | 5MB | **Private** (deleted 30 days after decision) |
| Writing sample | | | | PDF, DOCX | 5MB | Private |
| Article / Report / Research card image | 1200x800 | 3:2 | 900x600 | JPG, PNG, WebP | 5MB | Public |
| Cover image (all content) | 1920x1080 | 16:9 | 1600x900 | JPG, PNG, WebP | 8MB | Public |
| Inline body image | 1600 wide | Any | 800 wide | JPG, PNG, WebP, GIF | 8MB | Public |
| Infographic (full width) | 2400 wide | Any | 1600 wide | JPG, PNG, WebP | 12MB | Public |
| Gallery image | 1600 wide | Any | 800 wide | JPG, PNG, WebP | 8MB each | Public |
| Share image override | 1200x630 | 1.91:1 | 1200x630 | JPG, PNG | 1MB | Public |
| Report PDF | | | | PDF | 50MB | Public on publish (private before) |
| Report portrait cover | 1240x1754 | A4 | 620x877 | JPG, PNG | 5MB | Public |
| Research anonymised manuscript | | | | PDF | 20MB | **Private** (public PDF generated on publish) |
| Research title page | | | | PDF | 10MB | **Private** |
| Research supplementary | | | | PDF, JPG, PNG, CSV, XLSX, DOCX | 20MB each, 5 files | Private until published |
| Newsroom thumbnail | 800x450 | 16:9 | 640x360 | JPG, PNG, WebP | 3MB | Public |
| Topic / category hero | 2400x1000 | 12:5 | 1600x667 | JPG, PNG, WebP | 8MB | Public |
| Topic / subtopic icon | 96x96 (SVG preferred) | 1:1 | 48x48 | SVG, PNG | 200KB | Public |
| CMS hero images | 2400x1200 | 2:1 | 1600x800 | JPG, PNG, WebP | 8MB | Public |
| CMS section images | 1600x1200 | 4:3 | 800x600 | JPG, PNG, WebP | 5MB | Public |
| About timeline image | 800x600 | 4:3 | 400x300 | JPG, PNG, WebP | 3MB | Public |
| Logo | SVG | | | SVG (PNG fallback 512px) | 500KB | Public |
| Favicon | 512x512 | 1:1 | 512x512 | PNG | 500KB | Public |
| Ad creatives | Exact slot size (Section 15) or exact 2x | Fixed | Exact | JPG, PNG, WebP, GIF | 300KB (carousel 400KB) | Public |
| Inbox attachments (public forms) | | | | PDF, JPG, PNG | 5MB | Private |
| Approver annotated file | | | | PDF | 20MB | Private |

---

## 19. Notifications and emails

All emails use one branded template (logo, white body, green-700 buttons, footer with address-free contact line and unsubscribe for optional categories). Sender: `Pakistan Strategic Forum <no-reply@forumstrategic.com>`, reply-to per category **[CONFIRM addresses]**. In-app bell notifications mirror the email unless marked email-only.

| # | Trigger | Recipient | Channel | Template (Appendix B) |
| --- | --- | --- | --- | --- |
| N1 | Signup OTP | Applicant | Email only | Verify your email |
| N2 | Application submitted | Applicant | Email | Application received |
| N3 | New application | Admins with `applications.decide` | Bell + daily digest email | New application |
| N4 | Application approved | Applicant | Email + bell | Welcome to PSF |
| N5 | Application returned | Applicant | Email + bell | Application needs changes |
| N6 | Application permanently rejected | Applicant | Email | Application not accepted |
| N7 | Invite | Invited user | Email only | You're invited |
| N8 | Password reset | User | Email only | Reset your password |
| N9 | Password changed / email changed / 2FA changed / new device sign-in | User | Email only | Security notice |
| N10 | Account locked (failed sign-ins) | User | Email only | Sign-in attempts blocked |
| N11 | Content submitted (article, report, research) | Author | Email + bell | Submission received |
| N12 | New submission | Admins with decide permission | Bell + digest | New submission |
| N13 | Content approved / published / scheduled | Author(s) | Email + bell | Your [type] is live / scheduled |
| N14 | Changes requested | Author(s) | Email + bell | Changes requested |
| N15 | Content rejected | Author(s) | Email + bell | Decision on your submission |
| N16 | Content unpublished / correction added | Author(s) | Email + bell | Update on your [type] |
| N17 | Co-author invitation / accepted / declined | Co-author / author | Email + bell | Co-author request |
| N18 | Research: screening outcome (sent to review, returned for formatting, desk reject) | Author | Email + bell | Research update |
| N19 | Review invitation | Approver | Email + bell | Review invitation |
| N20 | Review reminder (7d, 2d, due, overdue) | Approver | Email + bell | Review reminder |
| N21 | Invitation declined / expired / review submitted / overdue | Admins | Bell (+ email for overdue) | Review status |
| N22 | Revisions requested | Author | Email + bell | Revisions requested |
| N23 | Revised paper resubmitted | Assigned approvers | Email + bell | Revised paper ready |
| N24 | Editor decision needed / awaiting final approval | Admins with research permissions | Bell + digest | Research action needed |
| N25 | Research published / rejected | Author(s) | Email + bell | Research decision |
| N26 | Account deactivated / reactivated | User | Email | Account status |
| N27 | Ban (optional toggle) | User | Email | Account status |
| N28 | New inbox message | Admins with `inbox.view` (by source) | Bell + email per source setting | New message |
| N29 | Contact / advertise / corrections auto-reply | Sender | Email | We received your message |
| N30 | Featured slot holding expired item | Admins with `featured.manage` | Bell (daily) | Featured slot needs attention |
| N31 | Campaign starting / ending in 3 days / ended | Admins with `ads.manage` | Bell | Campaign update |
| N32 | Update request on live item | Admins | Bell | Update requested |
| N33 | Data export ready | User | Email | Your data export |
| N34 | Globe status entry past review date | Admins with `globe.manage` | Bell | Review status layer |

Digest: admins can choose immediate or daily digest (08:00 PKT) for N3, N12, N24.

---

## 20. Search

- Index: title (weight A), standfirst/abstract/summary (B), body text, keywords, tags, author names (C).
- PostgreSQL `tsvector` with English configuration + `pg_trgm` for typo tolerance and prefix matching.
- Facets computed per query (content type, Topic, Subtopic, label, author, country, year).
- **FR-SRCH-01** Only published items appear. Search queries are logged (hashed IP) for the zero-result report.
- **FR-SRCH-02** Response under 300ms at p95 for 50,000 items.
- Admin global search covers users, content (any status), campaigns, cards, inbox items, by name, title, email or reference ID.

---

## 21. Activity log catalogue

Every entry stores: `id`, `occurredAt`, `actorId` (nullable), `actorType` (user, visitor, system), `actorRoles`, `action`, `targetType`, `targetId`, `targetLabel`, `url`, `method`, `ip`, `country`, `city`, `userAgent`, `result`, `metadata` (JSON: changed fields before/after, reason, comment).

| Group | Actions logged |
| --- | --- |
| Auth | Sign in success, sign in failed, sign out, session revoked, password reset requested, password changed, email change requested/confirmed, 2FA enabled/disabled/reset, backup codes regenerated, account locked, OTP sent, OTP verified, OTP failed |
| Signup and applications | Pending signup created, application submitted, resubmitted, withdrawn, approved, returned, permanently rejected, role-upgrade applied |
| Users | Invite created/resent/revoked, invite accepted, profile edited (by self/admin), roles changed, deactivated, reactivated, banned, data export requested, deletion requested |
| Roles | Role created, edited (permissions diff), duplicated, deleted |
| Content (articles, reports) | Draft created, saved (manual saves only), submitted, withdrawn, edited by admin, approved, scheduled, published, changes requested, rejected, unpublished, republished, deleted, restored, slug changed, correction added, update requested, co-author invited/accepted/declined |
| Research | Submitted, screened, desk rejected, returned for formatting, approver assigned/replaced, invitation accepted/declined/expired, review submitted, editor decision, revisions requested, resubmitted, final approved, scheduled, published, rejected, withdrawn, unpublished, retracted |
| Newsroom | Post created, edited, published, scheduled, pinned/unpinned, breaking set, deleted |
| Featured | Placement created, edited, replaced, cancelled, started (system), ended (system), holding (system) |
| Taxonomy | Topic/subtopic/category created, edited, reordered, activated/deactivated, merged; tag merged/deleted |
| Global Watch | Status entry created, edited, ended; settings changed |
| Ads | Campaign created, edited, paused, resumed, archived; placement added/edited/removed; report exported |
| Inbox | Message received (system), status changed, assigned, replied, marked spam, deleted |
| ID cards | Card created, activated, deactivated, scanned (system, aggregated per day per card) |
| CMS | Draft saved, previewed, published, discarded, restored; navigation/footer/social edited; media uploaded/replaced/deleted; global settings changed |
| Settings | Any settings change (with diff), email template edited, maintenance toggled, cookie version bumped |
| Analytics | Export performed, visitor IP log viewed |
| Security | Permission denied (403) attempts on admin routes, rate-limit blocks, Turnstile failures (aggregated) |

Public page views and reads are **not** written to the activity log (they live in analytics), to keep the log readable.

---

## 22. SEO, sharing and discoverability

| Area | Requirement |
| --- | --- |
| Titles and descriptions | Per item from SEO fields; per page from CMS; title template `[Title] | Pakistan Strategic Forum` |
| Canonical URLs | Absolute canonical on every page; filtered listings canonicalise to the unfiltered URL; paginated pages self-canonical |
| Structured data (JSON-LD) | `NewsArticle`/`Article` (articles, newsroom), `Report` (reports), `ScholarlyArticle` (research, with `author`, `affiliation`, `datePublished`, `identifier` DOI, `isPartOf` with ISSN), `Person` (author pages), `Organization` (site-wide, with logo and `sameAs` social links), `BreadcrumbList`, `WebSite` with `SearchAction`, `VideoObject` (videos page), `CollectionPage` (category pages) |
| Google Scholar | Research pages include Highwire Press meta tags (`citation_title`, `citation_author`, `citation_author_institution`, `citation_publication_date`, `citation_pdf_url`, `citation_doi`, `citation_issn`, `citation_journal_title` = "PSF Research") |
| Sitemaps | Sitemap index with per-type sitemaps (articles, reports, research, newsroom, topics, authors, pages); Google News sitemap for items published in last 48h |
| robots.txt | Disallow `/portal`, `/admin`, `/api`, `/search`, preview URLs. Allow everything else |
| noindex | Auth pages, portal, admin, search results, previews, verify pages, filtered parameter URLs beyond the first filter |
| Open Graph / Twitter | Section 6.7 |
| RSS | Site-wide feed and per-Topic feeds (latest 30 items, full summary, link) |
| llms.txt / llms-full.txt | Kept and regenerated nightly from published content; includes guidance to cite by title, author and original date |
| Redirects | Managed redirect table (old path → new path, 301), editable by Super Admin in Settings; legacy pakstrategic.com and old forumstrategic.com URL patterns mapped at launch |
| Performance SEO | Core Web Vitals thresholds in Section 24 |

---

## 23. Security and privacy

| Control | Requirement |
| --- | --- |
| Passwords | argon2id; min 10 chars with letter and number; breached-password check; no maximum below 128 |
| Sessions | HTTP-only, Secure, SameSite=Lax cookies; rotation on privilege change; idle timeout 12h (30 days with "keep me signed in"); admins 8h fixed |
| 2FA | TOTP; mandatory for admin permissions and Approvers |
| Rate limiting | Sign in (10/min/IP), OTP send (5/hour/email), OTP verify (5 attempts/code), forms (5/min/IP), search (60/min/IP), tracking endpoints (120/min/IP), verify page (30/min/IP) |
| Bot protection | Turnstile on signup, public forms, password reset; sign in after failures |
| Authorisation | Server-side permission checks (FR-ARC-01); object-level checks (authors only access own items; approvers only assigned papers) |
| Anonymity integrity | Approver views and APIs strip all author-identifying fields and private files (FR-REV-01); tested with automated tests |
| Content security | TipTap JSON with allowlist rendering; CSP with nonces; embeds only from allowlisted domains (youtube-nocookie.com, platform.twitter.com, instagram.com) |
| Files | Pre-signed uploads with content-type and size enforcement; private bucket for sensitive files; malware scan for PDFs and DOCX |
| Transport | HTTPS only, HSTS (preload), TLS 1.2+ |
| Headers | CSP, X-Content-Type-Options, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, frame-ancestors none (except preview) |
| WAF / DDoS | Vercel Firewall and/or Cloudflare in front of the domain; bot fight mode; country challenge rules available to Super Admin |
| Secrets | Vercel encrypted env vars; rotation documented |
| Backups | Database point-in-time recovery (7 days) + daily encrypted logical backup to separate storage (30 days); R2 bucket versioning; quarterly restore test |
| Monitoring | Sentry errors, uptime checks every minute with SMS/email alert, security alerts for spikes in failed sign-ins |
| Disclosure | `/.well-known/security.txt` with security contact |
| Privacy | Privacy Policy covers IP collection, analytics, applications, ID documents retention, research reviewer data, cookies, user rights (access, export, deletion request); data export self-service (Section 10.11) |
| Data minimisation | ID uploads auto-deleted 30 days after application decision; raw IPs anonymised after 90 days; OTPs hashed |
| Audit | Activity logs immutable (no update or delete API; DB role without delete permission) |

---

## 24. Performance and reliability

| Metric | Target (mobile, 4G, mid-range Android) |
| --- | --- |
| Largest Contentful Paint | ≤ 2.5s on Home, Article, Topic pages (p75) |
| First Contentful Paint | ≤ 1.8s |
| Interaction to Next Paint | ≤ 200ms |
| Cumulative Layout Shift | ≤ 0.1 (ad slots reserve height) |
| JS on article page | ≤ 170KB gzipped (excluding embeds loaded on consent) |
| Globe | Lazy-loaded; never blocks LCP; static fallback image |
| Images | `next/image`, responsive sizes, lazy below the fold, priority for hero |
| Fonts | Self-hosted, subset, preload two files (serif 600, Inter 400) |
| Caching | ISR for public pages; edge cache for globe and ticker JSON (60s ticker, 5 min globe) |
| Availability | 99.9% monthly for public site |
| Release gate | Lighthouse CI on key templates in staging; failures block production deploy |

---

## 25. Integrations

### 25.1 YouTube (Videos page, home)

- YouTube Data API v3: channel uploads playlist and channel playlists synced every 6 hours into a `videos` table (id, title, description, published, duration, thumbnail, view count, playlist IDs).
- Admin (CMS > Videos, under Global settings or a Videos panel): pin a video (featured), hide a video, reorder pinned.
- Player uses `youtube-nocookie.com`, loads on click (thumbnail facade) to protect performance.

### 25.2 X and Instagram (home social section)

- X: official embed for the PSF profile timeline or 3 latest post embeds (post URLs added by admin if timeline embeds are unavailable). Instagram: oEmbed for latest posts (admin pastes post URLs, or Basic Display/Graph API if PSF provides a business account **[CONFIRM]**).
- Both load only after Social media consent and when the section scrolls near the viewport; 5-second timeout falls back to follow cards.

### 25.3 GeoIP

MaxMind GeoLite2 City database, downloaded weekly by a scheduled job (licence key in env). Lookups in-process.

### 25.4 Plagiarism check (reserved)

An interface `checkSimilarity(itemId)` is defined in the review page with a disabled "Run similarity check" button, to be connected to a provider later (for example Copyleaks or Turnitin) **[future]**.

### 25.5 Email (Resend)

Domain verification (SPF, DKIM, DMARC). Bounce and complaint webhooks stored in `email_log`; hard-bounced addresses flagged on the user record.

---

## 26. Archive migration (2020 to 2024 content)

1. **Export:** obtain full content from the current CMS database or API **[CONFIRM current stack and access]**; fallback: parse `llms-full.txt`, RSS and sitemap.
2. **Map taxonomy:** current desks and sections map 1:1 to seeded Topics and Subtopics.
3. **Authors:** create author records for named bylines; items bylined "PSF Desk" use a system author "PSF Desk" (no personal profile, author page lists desk content).
4. **Content:** convert HTML to TipTap JSON (headings, paragraphs, lists, quotes, images, links); download images to R2 with alt text from original or title.
5. **Dates:** keep original published dates; set `migrated = true`; show the Archive label and banner (Section 7.6).
6. **Locations:** items need a location for the globe. Run an assisted tagging pass: auto-suggest country/city from title and body (named-entity matching against the location dataset), then admin confirms in a migration review screen (Global Watch admin > Coverage health). Items without a confirmed location are excluded from the globe until tagged.
7. **URLs:** generate a redirect map from every old URL (forumstrategic.com current paths and pakstrategic.com legacy paths) to new `/articles/[slug]`; verify with an automated crawl (zero 404s for old sitemap URLs).
8. **Read counts:** start at zero for migrated items (old analytics not imported) **[CONFIRM]**.
9. **QA:** sample 10% of migrated items visually; check images, links, footnotes.

---

## 27. Build order and milestones (suggested)

| Phase | Scope | Exit criteria |
| --- | --- | --- |
| 0. Foundations | Repo, CI, environments, design tokens, typography, core components, Prisma schema, seed data, auth skeleton, R2 uploads, email | Component library page in staging; tokens match Section 3 |
| 1. Identity and access | Sign in, signup (both tracks) with OTP, applications, invites, set password, 2FA, RBAC, roles editor, user management, activity log core | All Section 9 and 12.4 to 12.6 flows pass acceptance tests |
| 2. Content core | Taxonomy, locations, article and report editors, submission, admin review, publishing, scheduling, public article/report/topic/subtopic pages, search, share cards | An article goes from signup to published with share preview working on WhatsApp |
| 3. Research | Research submission, screening, assignment, approver portal, double-blind review, decisions, final approval, research pages, citations, PDFs | Two-approver paper passes end to end with identities hidden (automated test) |
| 4. Home and discovery | Home page, featured slots and scheduling, newsroom (admin + public + ticker), Global Watch globe, videos, social, reports hub, research hub | Featured holding rule verified; globe performance budget met |
| 5. Platform | CMS for all pages, inbox and forms, ad management with analytics and PDF export, ID cards, analytics dashboards, cookie consent | All CMS pages editable; ad overlap prevention tested |
| 6. Migration and launch | Archive migration, redirects, SEO, performance and accessibility audits, security review, content population, training | Launch checklist (Appendix D) complete |

---

## 28. Data model summary

Full ERD in the companion diagrams file. Core entities:

| Domain | Entities |
| --- | --- |
| Identity | `User`, `UserProfile`, `Role`, `Permission`, `RolePermission`, `UserRole`, `Session`, `TwoFactor`, `BackupCode`, `PendingSignup`, `EmailOtp`, `Invite`, `PasswordReset`, `EmailBlocklist` |
| Applications | `Application`, `ApplicationDocument`, `ApplicationDecision` |
| Taxonomy | `Category` (type: topic, subtopic, report_category, research_category; self-referencing parent), `Tag`, `Region`, `Country`, `City` |
| Content | `ContentItem` (type: article, report, research, news; common fields), `ArticleDetails`, `ReportDetails`, `ResearchDetails`, `NewsDetails`, `ContentVersion`, `ContentAuthor`, `ExternalCoAuthor`, `ContentLocation`, `ContentTag`, `ContentFile`, `EditorialComment`, `Correction`, `UpdateRequest`, `Redirect` |
| Research review | `ReviewAssignment`, `Review`, `ReviewComment`, `EditorialDecision` |
| Placements | `FeaturedSlot`, `FeaturedPlacement`, `AdSlot`, `Campaign`, `CampaignPlacement`, `AdCreative`, `AdStatDaily` |
| Globe | `StatusLayerEntry` |
| Engagement | `Video`, `SocialLink` |
| Inbox | `InboxMessage`, `InboxNote`, `InboxReply` |
| Cards | `IdCard`, `IdCardScanDaily` |
| CMS | `CmsPage`, `CmsSection`, `CmsRevision`, `NavigationItem`, `FooterLink`, `MediaAsset`, `Setting`, `EmailTemplate` |
| Analytics | `Event` (partitioned), `ReadEvent`, `DailyPageStat`, `DailyItemStat`, `DailyGeoStat`, `HourlyTraffic`, `SearchLog` |
| System | `Notification`, `NotificationPreference`, `EmailLog`, `ActivityLog`, `Job` |

---

## 29. API surface (indicative)

Server Actions are used for form mutations from the UI; Route Handlers for public tracking, uploads and integrations. All return typed errors.

| Area | Endpoints / actions |
| --- | --- |
| Auth | `POST /api/auth/signup/start`, `POST /api/auth/otp/verify`, `POST /api/auth/otp/resend`, `POST /api/auth/application/submit`, Auth.js routes, `POST /api/auth/set-password`, `POST /api/auth/forgot`, `POST /api/auth/reset`, `POST /api/auth/2fa/*` |
| Uploads | `POST /api/uploads/sign` (returns pre-signed URL after rule check), `POST /api/uploads/complete` |
| Content | Server actions: `createDraft`, `saveDraft`, `submitItem`, `withdrawItem`, `decideItem`, `publishItem`, `scheduleItem`, `unpublishItem`, `deleteItem`, `restoreItem`, `addCorrection` |
| Research | `submitPaper`, `screenPaper`, `assignApprovers`, `respondInvitation`, `submitReview`, `editorDecision`, `resubmitRevision`, `finalDecision`, `retractPaper` |
| Public data | `GET /api/globe`, `GET /api/newsroom/ticker`, `GET /api/search`, `GET /api/locations/countries?region=`, `GET /api/locations/cities?country=&q=` |
| Tracking | `POST /api/track/read`, `POST /api/track/event`, `GET /api/ads/click/[placementId]`, `POST /api/ads/impression` (batched) |
| Forms | `POST /api/forms/contact`, `/corrections`, `/advertise`, `/copyright` |
| Admin | Server actions per module (users, applications, roles, featured, newsroom, taxonomy, globe, ads, inbox, cards, CMS, settings) |
| Exports | `GET /api/admin/analytics/export`, `GET /api/admin/ads/[id]/report.pdf`, `GET /api/admin/logs/export` |
| Cron | `/api/cron/publish-scheduled` (1 min), `/api/cron/featured` (1 min), `/api/cron/ads-status` (1 min), `/api/cron/aggregate-analytics` (nightly), `/api/cron/anonymise-ips` (nightly), `/api/cron/purge` (nightly), `/api/cron/youtube-sync` (6h), `/api/cron/review-reminders` (hourly), `/api/cron/geoip-update` (weekly), `/api/cron/llms-txt` (nightly), `/api/cron/globe-snapshot` (nightly) |
| Verify | `GET /verify/[token]` (page) |

---

## 30. Open items to confirm

| # | Item | Default used in this spec |
| --- | --- | --- |
| O1 | Exact logo green hex | Placeholder `#134F35` scale |
| O2 | Logo files (SVG, white version) | Required before design |
| O3 | Research licence | CC BY 4.0, authors keep copyright |
| O4 | ISSN application and Crossref membership for DOIs | Fields ready; values empty until obtained |
| O5 | Reply-to and inbox email addresses per form | `editor@`, `ads@`, `research@`, `contact@` forumstrategic.com |
| O6 | Show read counts publicly | Not shown publicly |
| O7 | Approver badge wording on author pages | "PSF Reviewer" |
| O8 | Profile name changes after approval | Allowed, logged |
| O9 | Account deletion: handling of published work | Anonymise to "Former contributor" |
| O10 | Jammu & Kashmir representation in location pickers | Grouped as disputed, consistent with disclaimer |
| O11 | About page timeline facts (2019 to present) | Placeholder milestones (Appendix A.1) |
| O12 | Independence and funding statement | Placeholder text |
| O13 | Ad budget ranges and media kit | Placeholder ranges |
| O14 | Report category seed list | Strategic Assessments, Special Reports, Annual Outlooks, Event Readouts |
| O15 | Content length guidance per format | Section 7.20 table |
| O16 | Current site stack and DB access for migration | Assumed exportable |
| O17 | Per-Topic ad targeting for `topic_banner` | Single booking covers all Topic pages |
| O18 | Activity log retention | 2 years online |
| O19 | Instagram integration method | Admin-pasted post URLs via oEmbed |
| O20 | Migrated items' read counts | Start at zero |

---

## Appendix A. Draft static content (CMS seed copy)

> All copy below is **[PLACEHOLDER]** draft for PSF review. Legal pages (A.10 to A.14) must be reviewed by a lawyer before launch. Facts marked **[CONFIRM]** must be checked.

### A.1 About PSF

**Hero**
- Title: About PSF
- Mission statement: Independent analysis of the forces shaping Pakistan's security and the region around it.

**Who we are**
Pakistan Strategic Forum is a defence and military think tank. We study how wars are fought, how states prepare for them and how they are prevented. Our work covers the armed forces and defence industry, national security, regional geopolitics and the military history that explains the present.

We publish for decision-makers, scholars, journalists and readers who want evidence rather than noise. Every piece we publish is labelled for what it is: reporting, analysis, opinion or peer-reviewed research.

**What we do (4 pillars)**
| Pillar | Copy |
| --- | --- |
| Analysis | Timely, sourced analysis of defence and security developments, written by analysts, practitioners and scholars. |
| Research | Peer-reviewed papers and policy briefs through PSF Research, open to scholars across the region. |
| Newsroom | Fast, verified updates on events that matter to Pakistan's security environment. |
| Global Watch | A live map of where PSF is reporting, linking every story to the place it happened. |

**Our desks:** generated from active Topics with their descriptions.

**By the numbers:** live counts (items published, research papers, countries covered, contributors).

**Our journey (timeline) [CONFIRM all entries]**
| Year | Milestone | Copy |
| --- | --- | --- |
| 2019 | PSF founded | Pakistan Strategic Forum begins as an independent platform for defence and strategic commentary, originally at pakstrategic.com. |
| 2020 | First analysis desk | Regular analysis on land, air and naval developments begins, building the archive that continues today. |
| 2021 | Geopolitics coverage expands | Coverage widens to Afghanistan, the Middle East and great-power competition in South Asia. |
| 2022 | Investigations | PSF publishes its multi-part investigation into militant recruitment of children, its most significant piece of original reporting. |
| 2023 | Military history desk | The History desk launches with battle studies and profiles. |
| 2024 | New home | PSF moves to forumstrategic.com. |
| 2026 | Relaunch | PSF relaunches with PSF Research, a contributor portal, the Newsroom and Global Watch. |

**How we work:** We separate reporting from opinion. We correct errors openly and log every correction. Research is reviewed double-blind by independent reviewers before publication. Read our Editorial Policy, Corrections Policy and how peer review works.

**Independence and funding [CONFIRM]:** PSF is editorially independent. Our editors decide what we publish. Advertising and partnerships never influence our coverage, and sponsored material is always clearly labelled. [Add funding sources and governance statement.]

**Work with us:** Write for PSF | Publish research | Advertise with PSF.

### A.2 Editorial Policy

**1. Purpose.** This policy sets out the standards Pakistan Strategic Forum applies to everything it publishes.

**2. Independence.** PSF's editors make all editorial decisions. No advertiser, partner, contributor or funder may approve, alter or suppress content. Sponsored or partner content, if ever published, carries a clear "Sponsored" or "In partnership with" label.

**3. Accuracy and sourcing.** We verify facts before publication. We attribute information to its source wherever possible. When we rely on anonymous sources, an editor must know the source's identity and judge them credible, and we explain why anonymity was granted. Imagery and open-source material are verified before use and credited.

**4. Labelling.** Every item carries a label: News, Analysis, Explainer, Opinion, Interview, Investigation, Profile, Book Review, Report, Research Paper or Policy Brief. Opinion pieces reflect the views of their authors, not of PSF.

**5. Fairness.** We give people and institutions that are the subject of serious allegations an opportunity to respond before publication where practical.

**6. Sensitive security information.** We do not publish information that would endanger lives, identify protected individuals or compromise ongoing security operations. Editors may withhold details for these reasons.

**7. Names and territory.** We use widely recognised names for places and people. Disputed territories are described as disputed. Maps carry a disclaimer that boundaries are approximate and do not imply endorsement.

**8. Contributors.** All contributors agree to the Contributor Agreement. Contributors must disclose conflicts of interest, and these are published with their work where relevant.

**9. Peer review.** Research papers are reviewed double-blind by at least one and normally two independent reviewers, followed by an editorial decision. See How peer review works.

**10. Corrections.** We correct significant errors promptly and transparently. See our Corrections Policy.

**11. Use of AI tools.** Contributors must disclose any substantial use of AI tools in research or drafting. AI-generated text or imagery presented as original reporting is not accepted. [CONFIRM policy]

**12. Archive.** Content first published before 2025 is labelled "From the archive" with its original date. We do not rewrite archived pieces; corrections are added where needed.

**13. Contact.** Questions about this policy: [editor email].

### A.3 Corrections Policy

PSF aims to be accurate. When we get something wrong, we say so.

- **What we correct:** factual errors, misattributed quotes, wrong names, dates, figures, captions or locations.
- **How:** we correct the text and add a dated correction note at the top and bottom of the item explaining what changed. Significant corrections are listed in the public corrections log below.
- **Clarifications:** where a piece was accurate but could be misunderstood, we add a clarification note.
- **Updates:** where events have moved on, we add an "Updated" note with the date.
- **What we do not do:** we do not silently remove published content. Content is removed only for legal reasons, safety reasons or serious breaches of our standards, and we note the removal where we can.
- **Research:** errors in peer-reviewed papers are handled through a published correction notice; serious problems may lead to retraction, with the retraction notice kept online.
- **Request a correction:** use the form below. We aim to respond within 5 working days.

### A.4 Contributor Agreement (summary structure for legal drafting)

1. **Parties:** the contributor and Pakistan Strategic Forum.
2. **Originality:** the contributor confirms the work is original, not previously published, and does not infringe anyone's rights.
3. **Copyright and licence:** the contributor keeps copyright. The contributor grants PSF a worldwide, non-exclusive, perpetual licence to publish, edit for length, clarity and style, translate summaries, archive and distribute the work in any format. Research papers are additionally published under CC BY 4.0 **[CONFIRM]**.
4. **Editing:** PSF may edit for accuracy, clarity, length and house style. Substantive changes are agreed with the contributor before publication where practical.
5. **Accuracy and sourcing:** the contributor is responsible for the accuracy of facts and will provide sources on request.
6. **Conflicts of interest:** the contributor must disclose any financial, professional or personal interest relevant to the work.
7. **Confidential and security information:** the contributor will not submit classified information or material that could endanger lives.
8. **Exclusivity window:** the contributor will not republish the work elsewhere for 30 days after PSF publication without permission, and will credit PSF when republishing **[CONFIRM]**.
9. **Payment:** contributions are unpaid unless agreed in writing **[CONFIRM]**.
10. **Removal:** PSF may decline, unpublish or correct work under its Editorial Policy.
11. **Account conduct:** fake identities, plagiarism or abuse lead to removal of work and a permanent ban.
12. **Peer reviewers:** reviewers keep manuscripts confidential, do not use them for their own work and declare conflicts of interest.
13. **Data:** personal data is handled under the Privacy Policy.
14. **Governing law:** laws of Pakistan; courts of Islamabad **[CONFIRM]**.

### A.5 Publish With Us

- **Hero:** Publish with PSF. Reach readers who shape defence and security thinking in Pakistan and beyond.
- **Articles and reports:** For analysts, practitioners, retired officers, journalists and scholars. Write analysis, explainers, opinion and reports. Every piece is reviewed by PSF editors before publication. Typical decision time: 5 working days.
- **Research:** For academics, researchers and postgraduate students. Submit research papers and policy briefs for double-blind peer review by two independent reviewers. Free to publish, free to read, and you keep your copyright.
- **What we look for:** original arguments backed by evidence; clear relevance to Pakistan or the region; sources we can check; writing a non-specialist can follow; no previously published work.
- **FAQs**
  - *Do I need an account?* Yes. Apply as a writer or researcher; we review every application.
  - *Can I write both articles and research?* Yes. Once approved for one track, apply for the other from your dashboard.
  - *Do you pay contributors?* [CONFIRM]
  - *Can I publish anonymously?* Only in exceptional cases where publication would put you at risk. Contact the editors before submitting.
  - *How long does peer review take?* Typically 4 to 8 weeks from submission to first decision.
  - *Can I republish my article elsewhere?* After 30 days, with credit to PSF.

### A.6 Contact Us

- **Hero:** Contact PSF.
- **How we can help:** Editorial questions and pitches: use this form and choose Editorial. Corrections: use the correction form. Advertising: visit Advertise With Us. Research submissions: apply as a researcher. Technical problems with your account: choose Technical issue.
- **Response note:** We aim to reply within 3 working days.

### A.7 Advertise With Us

- **Hero title:** Reach Pakistan's defence and policy audience.
- **Hero sub:** Place your brand alongside trusted analysis read by policymakers, defence professionals, academics and informed readers.
- **Audience cards:** Policy professionals (officials, advisers and parliamentary staff following security policy) | Defence industry (manufacturers, suppliers and procurement specialists) | Academia (faculty and students in IR, strategic and security studies) | Informed public (readers who want depth beyond the headlines).
- **What we don't accept:** political campaign advertising, gambling, adult content, unverified health or financial claims, and any advertising that could compromise our editorial independence. All advertising is labelled.
- **Process:** 1 Tell us your goals. 2 We send a proposal with placements and dates. 3 You send creatives; we check them against our standards. 4 Your campaign goes live with a performance report at the end.
- **FAQs:** minimum booking period (1 week), creative specifications (see placements), reporting (impressions, clicks, CTR, geography), targeting (by page type).

### A.8 Where We Are

- **Hero:** Where we are. Follow PSF on our official channels.
- **Channel descriptions:** X: breaking updates and analysis threads. Facebook: our latest articles and community discussion. Instagram: infographics, maps and visual explainers. YouTube: video explainers, interviews and discussions.
- **Note:** These are PSF's only official accounts. If you see an account impersonating PSF, tell us via the contact form.

### A.9 How peer review works (PSF Research)

1. **Submission.** Approved Research Writers submit an anonymised manuscript, abstract, keywords and declarations through their dashboard.
2. **Editorial screening (within 7 days).** Editors check scope, anonymisation, formatting and basic quality. Papers may be returned for formatting or declined at this stage.
3. **Double-blind review (typically 3 to 6 weeks).** Editors invite one or two independent reviewers with relevant expertise. Reviewers do not know who wrote the paper, and authors do not know who reviewed it.
4. **Decision.** Reviewers recommend acceptance, minor revisions, major revisions or rejection. Where reviewers disagree, editors decide or seek a further review.
5. **Revision.** Authors revise and respond to every comment. Revised papers usually return to the same reviewers.
6. **Final approval and publication.** An editor gives final approval. Papers are published open access with a citation, PDF and, where registered, a DOI.

**Reviewers assess:** originality, method, evidence and sourcing, clarity and relevance.
**Ethics:** we follow COPE principles on authorship, conflicts of interest, plagiarism and research misconduct **[CONFIRM adoption]**.
**Appeals:** authors may appeal a rejection once, in writing, within 30 days. Appeals are considered by an editor not involved in the original decision.
**Licence:** CC BY 4.0, authors keep copyright **[CONFIRM]**.

### A.10 Privacy Policy (structure and key clauses)

1. Who we are and how to contact us about privacy.
2. **What we collect:** (a) visitors: IP address, approximate location derived from IP, device and browser information, pages viewed, referrer, interactions; (b) applicants and contributors: name, email, password (hashed), institution, designation, programme, registration number, optional ID document, profile information, submissions and communications; (c) form senders: details entered in contact, corrections, advertising and copyright forms; (d) reviewers: profile, review records.
3. **Why:** to run and secure the site, count readership, understand our audience, process applications, publish contributions, run peer review, respond to messages, manage advertising campaigns.
4. **Legal basis:** consent (analytics and social cookies), contract (contributor accounts), legitimate interests (security, readership statistics, preventing abuse).
5. **IP addresses:** stored in full for up to 90 days for analytics and security, then anonymised.
6. **ID documents:** used only to verify applicants, stored privately, deleted 30 days after a decision.
7. **Sharing:** service providers (hosting, email, storage, analytics infrastructure, security) under contract; authorities when legally required. We do not sell personal data.
8. **International transfers:** our providers may process data outside Pakistan.
9. **Retention:** per data type, as set out in a table.
10. **Your rights:** access, correction, export (self-service in your dashboard), deletion request, objection, withdrawal of consent.
11. **Children:** the site is not intended for under-16s; contributors must be 18 or older **[CONFIRM]**.
12. **Changes** and last updated date.

### A.11 Cookie Policy

Explains cookies, then a table (managed in CMS):

| Cookie | Purpose | Category | Duration |
| --- | --- | --- | --- |
| `psf_session` | Keeps contributors and staff signed in | Essential | Session / 30 days |
| `psf_csrf` | Protects forms from forgery | Essential | Session |
| `psf_consent` | Remembers your cookie choices | Essential | 12 months |
| `psf_vid` | Recognises returning visitors for statistics | Analytics | 12 months |
| X and Instagram cookies | Set by embedded posts when you allow social media | Social media | Per provider |
| YouTube (nocookie) | Video playback | Video | Per provider |

Button: Change cookie settings.

### A.12 Disclaimer

The content on this site is provided for information and analysis. Views expressed by contributors are their own and do not necessarily represent PSF. While we work to ensure accuracy, we make no warranty that information is complete or current. Nothing on this site is professional, legal or investment advice. Maps and boundaries are illustrative and approximate. Links to external sites are provided for reference; PSF is not responsible for their content. Advertising does not imply endorsement.

### A.13 Copyright and Takedown

- **PSF content:** © Pakistan Strategic Forum or the respective authors. You may quote short extracts with attribution and a link. Republishing full articles requires written permission. Research papers are licensed CC BY 4.0 as stated on each paper **[CONFIRM]**.
- **Third-party material:** images and material from third parties are credited and used with permission or under applicable law.
- **Takedown requests:** if you believe content on this site infringes your copyright, submit the form with: your contact details, the work you own, the URL on our site, a statement of good-faith belief, and a statement that the information is accurate and you are the owner or authorised to act. We review requests within 5 working days and may remove or disable access while we investigate.

### A.14 Terms of Use

1. Acceptance of terms. 2. Use of the site (lawful use, no scraping beyond reasonable personal use, no attempts to disrupt or access accounts). 3. Contributor accounts (accurate information, one person per account, keep credentials secure, PSF may approve, decline, suspend or ban). 4. Content you submit (governed by the Contributor Agreement). 5. Intellectual property. 6. Advertising and third-party links. 7. Disclaimers and limitation of liability. 8. Termination. 9. Governing law (Pakistan) **[CONFIRM]**. 10. Changes to these terms. 11. Contact.

### A.15 System messages

| Screen | Copy |
| --- | --- |
| Verify: active | Verified. This card was issued by Pakistan Strategic Forum and is currently valid. |
| Verify: inactive | Not valid. This card is not currently active. If you were presented with this card, please contact PSF. |
| Verify: unknown | We could not verify this card. |
| 404 | This page could not be found. Try searching, or explore our latest coverage. |
| 410 | This content has been removed. |
| 500 | Something went wrong on our side. Please try again in a few minutes. Reference: {{errorId}} |
| Maintenance | PSF is being updated. We'll be back shortly. |
| Application submitted | Application submitted! Thank you, {{firstName}}. We'll email you at {{email}} once a decision is made. This usually takes 3 to 5 working days. |
| Article submitted | Your article has been submitted. An editor will review it and you'll be notified when it is approved or if changes are needed. |
| Research submitted | Your paper has been submitted. Editors will screen it within 7 days, then send it for double-blind review. You can follow every stage in your dashboard. |
| Empty newsroom | No newsroom posts match these filters. |
| Globe empty filter | No PSF coverage in this period. Try a longer date range. |

### A.16 Home section copy

| Section | Heading | Sub / copy |
| --- | --- | --- |
| Newsroom ticker | Newsroom | |
| Top stories | Top stories | |
| Latest coverage | Latest coverage | Just published |
| Globe | Where we are reporting | Every article, report, paper and newsroom post is mapped to where it happened. |
| Reports | Reports | In-depth assessments from PSF analysts and contributors. |
| Research | Research | Peer-reviewed papers and policy briefs from scholars across the region. |
| Research panel | Publish your research with PSF | Double-blind peer review. Free to publish, free to read. You keep your copyright. |
| Most read | Most read this week | |
| Videos | Videos | Explainers, interviews and discussions. |
| Social | PSF on social | |
| Write band | Write for PSF / Publish research | Share your analysis with readers who shape defence thinking. Every piece is reviewed by our editors. / Submit your work for double-blind peer review. |

### A.17 Map and borders disclaimer

Boundaries, names and designations on PSF maps are approximate and do not imply endorsement or acceptance by PSF. Jammu and Kashmir is a disputed territory whose final status is yet to be determined in accordance with relevant UN Security Council resolutions. **[CONFIRM wording; carry forward the current site's disclaimer verbatim if preferred]**

---

## Appendix B. Email templates (draft copy)

Variables in `{{ }}`. All templates editable in Settings > Email templates.

| Key | Subject | Body (summary) | Button |
| --- | --- | --- | --- |
| `otp` | Your PSF verification code | Your code is **{{code}}**. It expires in 10 minutes. If you didn't request this, ignore this email. | |
| `application_received` | We've received your application | Hi {{firstName}}, thank you for applying to {{track}} with Pakistan Strategic Forum. We'll review your application and email you within 3 to 5 working days. | View status |
| `application_approved` | Welcome to Pakistan Strategic Forum | Hi {{firstName}}, your application has been approved. You can now sign in and start writing. {{welcomeNote}} | Go to your dashboard |
| `application_returned` | Your PSF application needs changes | Hi {{firstName}}, our team reviewed your application and needs a few changes: "{{comment}}". Sign in to update and resubmit. | Update application |
| `application_rejected_permanent` | Your PSF application | Hi {{firstName}}, after review we're unable to accept your application. This decision is final. | |
| `invite` | You're invited to join Pakistan Strategic Forum | Hi {{firstName}}, {{inviterName}} has invited you to join PSF as {{roleNames}}. Set up your account within 72 hours. | Set up your account |
| `password_reset` | Reset your PSF password | Use the link below within 60 minutes. If you didn't ask, ignore this email. | Reset password |
| `security_notice` | Security update on your PSF account | {{event}} on {{dateTime}} PKT from {{device}}, {{location}}. If this wasn't you, reset your password and contact us. | Review account |
| `submission_received` | We've received your {{type}} | "{{title}}" (ref {{refId}}) has been submitted for review. | View submission |
| `content_live` | Your {{type}} is live | "{{title}}" was published on {{dateTime}} PKT. | View on site |
| `content_scheduled` | Your {{type}} is scheduled | "{{title}}" will publish on {{dateTime}} PKT. | View |
| `changes_requested` | Changes requested on "{{title}}" | Our editors have asked for changes: "{{comment}}". | Edit and resubmit |
| `content_rejected` | Decision on "{{title}}" | We won't be publishing this piece. Editor's note: "{{comment}}". | View |
| `coauthor_request` | {{authorName}} added you as a co-author | Accept or decline being listed as a co-author of "{{title}}". | Respond |
| `research_screened` | Update on your paper {{refId}} | Your paper has been {{outcome}}. {{comment}} | View paper |
| `review_invitation` | Review invitation: {{refId}} | You've been invited to review "{{anonTitle}}". Abstract: {{abstract}}. Due {{dueDate}}. | Accept or decline |
| `review_reminder` | Reminder: review due {{dueRelative}} | Your review of {{refId}} is due on {{dueDate}}. | Open review |
| `revisions_requested` | Revisions requested for {{refId}} | Reviewers have recommended revisions. Comments from Reviewer 1 and Reviewer 2 are in your dashboard. Please resubmit by {{dueDate}}. | View comments |
| `revised_ready` | Revised paper ready for review: {{refId}} | The author has submitted a revised version (round {{round}}). | Review |
| `research_published` | Your paper has been published | "{{title}}" is now live. {{doiLine}} | View paper |
| `research_rejected` | Decision on your paper {{refId}} | After review, we are unable to publish your paper. Comments are in your dashboard. | View decision |
| `account_status` | Your PSF account | Your account has been {{status}}. {{reasonLine}} | |
| `form_autoreply` | We've received your message | Thank you for contacting PSF about {{reason}}. We aim to reply within {{days}} working days. Reference {{refId}}. | |
| `admin_digest` | PSF daily summary, {{date}} | Pending applications {{n}}, submissions in review {{n}}, research needing action {{n}}, unread messages {{n}}. | Open admin |
| `data_export` | Your PSF data export is ready | Download within 24 hours. | Download |

---

## Appendix C. Modal, drawer and dialog inventory

| # | Modal / drawer | Where | Section |
| --- | --- | --- | --- |
| 1 | Search overlay | Header | 6.4 |
| 2 | Mega menu / dropdowns | Header | 6.2 |
| 3 | Mobile navigation drawer | Header | 4.1 |
| 4 | Cookie settings | Consent banner, footer | 6.6 |
| 5 | Video lightbox | Home, Videos | 7.1, 7.14 |
| 6 | Citation modal | Report, Research pages | 7.8, 7.10 |
| 7 | Globe location drawer / bottom sheet | Global Watch | 8.4 |
| 8 | Globe filters bottom sheet (mobile) | Global Watch | 8.4 |
| 9 | Image cropper | All image uploads | 18 |
| 10 | Editor: link, image, table, embed, footnote dialogs | Editors | 10.4 |
| 11 | Submission preview (full screen) | Article, Report, Research editors | 10.4, 10.6 |
| 12 | Missing fields panel | Editors | 10.4 |
| 13 | Withdraw submission confirm | Portal | 10.3, 10.7 |
| 14 | Request update on live item | Portal | 10.8 |
| 15 | Accept / decline review invitation | Approver | 11.2 |
| 16 | Submit review confirm | Approver | 11.3 |
| 17 | 2FA setup and backup codes | Auth, Account | 9.12 |
| 18 | Change email (OTP) | Account | 9.14 |
| 19 | Edit roles | Admin users | 12.4.3 |
| 20 | Deactivate / reactivate | Admin users | 12.4.5 |
| 21 | Ban (type-to-confirm) | Admin users | 12.4.6 |
| 22 | Application: approve / reject with comment / reject permanently | Admin applications | 12.5 |
| 23 | ID document viewer | Admin applications | 12.5 |
| 24 | Role editor delete / reassign | Admin roles | 12.6 |
| 25 | Approve and schedule picker | Admin content | 12.7 |
| 26 | Request changes / reject comment dialogs | Admin content | 12.7 |
| 27 | Unpublish / delete confirm | Admin content | 12.7 |
| 28 | Add correction | Admin content | 12.7 |
| 29 | Assign approvers | Admin research | 12.8 |
| 30 | Editor decision / final approval / retraction | Admin research | 12.8 |
| 31 | Newsroom post create/edit | Admin newsroom | 12.9 |
| 32 | Add featured placement (stepper) | Admin featured, content rows | 12.10 |
| 33 | Topic / subtopic / category create-edit, merge | Admin taxonomy | 12.11 |
| 34 | Status layer entry | Admin Global Watch | 12.12 |
| 35 | Add / edit ad placement (stepper) | Admin ads | 12.13 |
| 36 | Pause / archive campaign | Admin ads | 12.13 |
| 37 | Inbox reply composer | Admin inbox | 12.14 |
| 38 | Create ID card + copy URL + QR | Admin ID cards | 12.15 |
| 39 | Activate / deactivate card | Admin ID cards | 12.15 |
| 40 | CMS publish / discard / restore revision | Admin CMS | 12.16 |
| 41 | Media details / replace | Admin CMS | 12.16 |
| 42 | Activity log row details | Admin logs | 12.17 |
| 43 | Create user stepper | Admin users | 12.4.4 |

---

## Appendix D. Launch checklist

- [ ] Logo, exact green hex and brand assets in place (O1, O2)
- [ ] All CMS pages populated with approved copy; legal pages reviewed by a lawyer
- [ ] Seed taxonomy, regions and locations loaded; Topic heroes and icons uploaded
- [ ] Archive migrated; 100% of old sitemap URLs redirect (automated crawl report)
- [ ] Super Admin accounts created with 2FA; custom roles defined
- [ ] Email domain authenticated (SPF, DKIM, DMARC); all templates tested
- [ ] Turnstile, GeoIP, YouTube, X, Instagram integrations configured
- [ ] Cookie consent tested (accept, reject, settings, re-prompt)
- [ ] Share previews verified on WhatsApp, Facebook, X, LinkedIn, Telegram
- [ ] Double-blind anonymity automated tests passing
- [ ] Featured holding rule, ad overlap prevention and scheduled publishing tested
- [ ] Lighthouse and Core Web Vitals targets met on Home, Article, Topic, Global Watch
- [ ] WCAG 2.1 AA audit passed (automated + manual keyboard and screen reader)
- [ ] Security headers, rate limits, backups and restore test done
- [ ] Monitoring and alerts live; uptime check configured
- [ ] `robots.txt`, sitemaps, llms.txt, security.txt live; staging `noindex` confirmed
- [ ] Admin training session held; this document handed over

---

## Appendix E. Brief traceability (every requirement from the PSF brief)

| # | Brief requirement | Covered in |
| --- | --- | --- |
| 1 | White and ivory theme with logo green, no yellow | 3.3, D4 |
| 2 | Professional reading fonts recommended | 3.4, D21 |
| 3 | Professional header: logo, name, nav, sign in, sign up, no subscribe, extra elements | 6.1, 6.2 |
| 4 | Home hero with latest article and background image | 7.1 H1 |
| 5 | Quick access to Defence, Geopolitics, National Affairs, History from hero | 7.1 H2 |
| 6 | Newsroom ticker in hero with cards, date and time, scroll up/down, link to newsroom | 7.1 H1, 7.2 |
| 7 | Latest coverage section with admin-featured top four | 7.1 H5, 14.1 |
| 8 | Globe on home: location from posts, highlight, hover shows content, click through | 7.1 H6, 8 |
| 9 | Dynamic topic sections on home (Defence, Geopolitics, National Affairs, History) | 7.1 H7 |
| 10 | Research and academic section on home | 7.1 H9 |
| 11 | Additional home elements at designer's discretion | 7.1 H3, H8, H11 to H14 |
| 12 | Dedicated listing per topic and subtopic | 7.4, 7.5 |
| 13 | Global Watch page: map first, region-wise cards below, more features | 8.4 |
| 14 | Reports page with dynamic admin-created categories, richer than articles | 7.7, 7.8, 10.5, 12.11 |
| 15 | Research page: hero, latest research, how to submit | 7.9 |
| 16 | Two-step signup, shared step 1 (name, email, expertise from topics, optional institution, designation/student, password, confirm) | 9.4 |
| 17 | Email OTP between step 1 and step 2 | 9.5 |
| 18 | Research step 2: auto-filled institution and designation, programme/degree, purpose, registration number, graduate checkbox, optional ID upload with helper note | 9.6 |
| 19 | Article step 2: tell us more (required), reference link (optional) | 9.7 |
| 20 | Submitted screen and admin-review notice | 9.8 |
| 21 | Articles approved by admin; research approved by certified approvers | 10.4, 11, 12.7, 12.8 |
| 22 | Approvers created only by admin | 9.1, 12.4.4 |
| 23 | Admin user management sections: article writers, research writers, approvers | 12.4.1 |
| 24 | Admin can create profiles directly; invite link to set password; then sign in | 9.10, 12.4.4 |
| 25 | Approver fields: name, institution, designation, two-line description, optional photo | 12.4.4 |
| 26 | Profile picture optional on all signup forms | 9.4 |
| 27 | Pending applications in side nav; full application view including ID; no editing | 12.5 |
| 28 | Reject with comment, email, user resubmits same form | 12.5, 9.9 |
| 29 | Reject permanently with reason; email can never be reused | 12.5, 13.1 |
| 30 | User listing with three-dot menu: view, deactivate, ban | 12.4.1 |
| 31 | Ban removes all posted content immediately and moves to banned list | 12.4.6 |
| 32 | Deactivated tab with reactivation | 12.4.5 |
| 33 | User detail with counts (posted, pending, rejected) and simple submissions list | 12.4.2 |
| 34 | User management filters | 12.4.1 |
| 35 | User dashboard overview with infographics and tracking | 10.2 |
| 36 | My Articles tabs: all, live, in review, drafts, rejected | 10.3 |
| 37 | Separate Write Article and Write Research buttons | 10.1 |
| 38 | Article editor with all fields, rich editor, images and infographics | 10.4 |
| 39 | SEO title and description on submission | 10.4 |
| 40 | Preview before submit, then admin approval | 10.4 |
| 41 | Category, subcategory, region > country > city cascade on submission | 10.4, 16.4 |
| 42 | Research basic info with locked institution, designation, programme | 10.6 |
| 43 | Research editor with PDF and image uploads, standard research fields | 10.6 |
| 44 | Research approver choice left to system | 10.6, 12.8 |
| 45 | Approver dashboard with research tabs: pending, approved, rejected, comments | 11.1 |
| 46 | Approver full view, reject with comments, author edits and resubmits | 11.3, 11.4, 10.7 |
| 47 | Approved research moves to admin for final approve or reject with comment | 12.8 |
| 48 | Approvers can also write articles (admin-approved) | 11, 5.4 |
| 49 | Reports submitted like articles but separate | 10.5, 12.7 |
| 50 | Admin overview with analytics, pending counts, visitor flow by time (PKT), region | 12.2 |
| 51 | Visitor IP capture for analytics | 17.2 |
| 52 | IP shown on submissions to admin | 12.5, 12.7, 17.4 |
| 53 | Admin creates Expert profiles (name, photo, designation, one-line bio) who submit reports and articles with admin approval | 12.4.4, 5.2 |
| 54 | Dynamic roles with permission checkboxes; sub-admins | 5, 12.6 |
| 55 | Create user stepper with role first | 12.4.4 |
| 56 | Assign or edit any user's role from three-dot menu | 12.4.3 |
| 57 | Articles admin: all, live, rejected, deleted, drafts; filters; truncated titles with hover; view, approve, reject with comment | 12.7 |
| 58 | Reports admin same as articles, separate | 12.7 |
| 59 | Research admin listing with approver info and actions | 12.8 |
| 60 | Featured tab: page, topic, section, position, post picker, start and end dates | 12.10 |
| 61 | Featured expiry: keep current until replaced; scheduled replaces | 14.3 |
| 62 | Top stories featuring | 14.1, 7.1 H3 |
| 63 | Read counts on all listings, per visitor IP | 17.1 |
| 64 | Newsroom: short posts with title, description, hyperlinks, region/country/city; home carousel; dedicated page; admin listing with modal edit, add, delete | 7.2, 12.9 |
| 65 | Ad management: campaigns, predefined sections, carousel and banners, resolution shown per section | 12.13, 15 |
| 66 | Ad booking by section, date and time; no conflicts; occupied slots disabled | 12.13, FR-ADS-01/02 |
| 67 | Campaign listing, edit, analytics (visitors, clicks, chart, countdown), PDF download with campaign ID and brand | 12.13 |
| 68 | Campaign internal fields: brand name, campaign number, description | 12.13 |
| 69 | Separate card image and cover image uploads | 10.4, 18 |
| 70 | Contact form submissions listing with separate Advertise section | 12.14 |
| 71 | Corrections form submissions in same inbox with source | 7.18, 12.14 |
| 72 | Activity logs: every action, ID, date time, URL, activity; Super Admin only | 12.17, 21 |
| 73 | Analytics tab with visitors, content, topic-wise counts, charts, most viewed, filters | 12.3 |
| 74 | About page with who we are, what we do, images, 2019 to present timeline, no team | 7.16, A.1 |
| 75 | Topics page with hero and sections per category | 7.3 |
| 76 | CMS: edit all text and images within locked templates | 12.16 |
| 77 | Dynamic categories: name, slug, hero image, description, subcategories with icons; auto in nav | 12.11, FR-NAV-01 |
| 78 | Category page template: hero, description, subcategory CTAs, featured, date-wise articles | 7.4 |
| 79 | Recommended size shown on every upload field | 18, FR-UP-01 |
| 80 | Dynamic categories also for reports and research | 12.11 |
| 81 | Current-site style multi-level dropdown nav | 4.1, 6.2 |
| 82 | Editorial Policy, Corrections (with form), Contributor Agreement, Publish With Us, Contact, Advertise With Us (hero, sections, form) | 7.17 to 7.22 |
| 83 | Privacy, Cookies, Disclaimer, Copyright & Takedown, Terms | 7.23, A.10 to A.14 |
| 84 | Globe: rotating, highlights posted cities, click shows related content on the right; called PSF Coverage; on home and own page | 8 |
| 85 | ID cards: create card ID and designation, unique URL, verified page, noindex, activate/deactivate, no delete | 7.24, 12.15 |
| 86 | Professional, non-AI look, smooth, clear, easy navigation, not cluttered | 3.1, 3.2 |
| 87 | Long professional footer with all links | 6.5 |
| 88 | Videos page from YouTube | 7.14, 25.1 |
| 89 | Contact page with form, no address | 7.21 |
| 90 | Where We Are page with social URLs; icons in footer; social feed on home | 7.15, 6.5, 7.1 H13 |
| 91 | All public pages editable from CMS | 12.16 |
| 92 | Next.js front and back end, Vercel, CDN for uploads | 2.1 |
| 93 | Detailed user flow doc for development and design, plus flow diagrams | This document + diagrams file |
