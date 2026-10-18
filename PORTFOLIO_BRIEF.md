# Portfolio Site — Build Brief

A personal portfolio site for Ben Miller's product management job search. Audience: PM recruiters and hiring managers. The site should be fast, clean, readable in 30 seconds, and easy for Ben to edit later without touching layout code.

## Stack and hosting

- **Framework:** Astro (static output, no backend)
- **Content:** Every piece of copy lives in Markdown files (or one small config file for site-wide links). Ben should be able to edit any text by editing a `.md` file, including from GitHub's web editor, without touching components.
- **Case studies:** An Astro content collection (`src/content/work/`), one Markdown file per case study. Adding a third case study later should mean adding one new `.md` file and nothing else.
- **Hosting:** GitHub Pages, deployed by a GitHub Actions workflow on every push to `main`, using Astro's official GitHub Pages action.
- **Repo:** `benmiller1820.github.io`, so the site lives at `https://benmiller1820.github.io` with no base path. (If the repo gets a different name, set `base` in `astro.config.mjs` accordingly.)

## Site structure

| Page | Path | Content source |
| --- | --- | --- |
| Home | `/` | `src/content/pages/home.md` + list of case studies |
| Case study | `/work/<slug>/` | `src/content/work/<slug>.md` |
| About | `/about/` | `src/content/pages/about.md` |
| Resume | `/resume.pdf` | `public/resume.pdf` (Ben drops in his PDF) |

Site-wide links (email, LinkedIn URL, resume path) go in one file, e.g. `src/site.config.ts`, so they're set once.

## Design tokens

Dark editorial style. Use these as CSS custom properties.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#111214` | Page background |
| `--surface` | `#1E1F22` | Image placeholders, panels |
| `--text` | `#ECEAE4` | Primary text, headings |
| `--text-muted` | `#B9B6AE` | Body copy, secondary text |
| `--text-subtle` | `#8C8980` | Labels, eyebrows, footer |
| `--border` | `#2A2B2F` | Dividers |
| `--border-strong` | `#606165` | Button outlines, table header rule (was `#3A3B3F`; raised to 3:1 contrast on `--bg` in step 8 so outlines are visible to low-vision users) |
| `--accent` | `#8AB4FF` | Accent text, links, numbers, primary button fill |
| `--accent-hover` | `#B3CDFF` | Link hover |

**Type**
- Headings and display: **Instrument Serif** (regular and italic, weight 400), from Google Fonts
- Body and UI: **Geist** (400, 500, 600), from Google Fonts
- Eyebrow labels: Geist, 13px, uppercase, letter-spacing 0.1em, `--text-subtle` or `--accent`

**Layout**
- Content container: max-width 1160px, centered, 24px side padding
- Fluid and responsive. At phone width, everything stacks to one column; nav wraps; tables scroll horizontally inside their own box. No horizontal page scroll.
- Buttons: pill-shaped (radius 999px), min height 48px. Primary = accent fill with `#111214` text. Secondary = 1px `--border-strong` outline.
- Images: rounded 12–16px corners on `--surface` background.
- No hero videos, heavy animation, gradients, or emoji. Keep it fast.

**Accessibility**
- Real `<a>` and `<button>` elements, visible focus styles, alt text on every image, 44px minimum touch targets, semantic headings.

## Shared components

- **Header:** "Ben Miller" in Instrument Serif (26px) linking home; nav: Work, About, Resume, and "Get in touch" in accent color (mailto).
- **Footer:** "Ben Miller · Raleigh, NC" on the left; LinkedIn, Email, Resume (PDF) links on the right; top border.

## Page layouts

### Home
1. **Hero:** Large Instrument Serif headline (~76px desktop, scales down on mobile). The second sentence is italic and accent-colored. Below it, a row with the bio paragraph (left, muted) and two stacked outline pill buttons (right): "Resume ↗" and "LinkedIn ↗". (Was "Download resume ↓"; changed after launch because resume links open the PDF in a new tab rather than downloading it. Links that leave the site open in a new tab.)
2. **Selected work:** Small uppercase header row ("Selected work" left, "2026" right) with a bottom border. Then one row per case study, separated by borders. Each row: large accent number (01, 02) in Instrument Serif, then title (48px serif), one-line summary, and a small uppercase tag line, with a screenshot thumbnail on the right. The whole row links to the case study. Rows are generated from the content collection, ordered by an `order` field.
3. Footer.

### Case study
1. "← All work" link, eyebrow ("Case study 01 · 0-to-1 product"), giant title (~96px serif), a one-line hook in serif (~32px), then a short intro paragraph.
2. **Facts strip:** Four cells divided by borders: Role, Timeline, Status, Try it (live link). From frontmatter.
3. **Hero screenshot**, full width.
4. **Body sections** rendered from Markdown: each `##` heading sits in a left column (~260px, serif 36px) with the content in a right column (max 720px) on desktop; stacked on mobile.
5. **Key decision callout:** A bordered, rounded panel with an accent eyebrow, a large serif headline, a paragraph, a comparison table, and a Why / Tradeoff pair. Support this from Markdown (e.g. a custom component or a fenced block convention) so Ben can edit its text.
6. Screenshot pair (two images side by side).
7. **Next case study** link at the bottom: eyebrow, large serif title, accent arrow.
8. Footer.

### About
1. **Intro:** Photo on the left (placeholder until Ben adds one), "Hi, I'm Ben." in large serif on the right, followed by an intro paragraph.
2. Sections in the same left-heading / right-content layout: **How I got here**, **What I believe** (opens with a large serif pull quote), **Outside of work** (three small bordered cards).
3. **Closing CTA:** "Hiring for a product role? I'd love to talk." with a primary "Email me" button and an outline "Resume ↗" button.
4. Footer.

## Content

Bracketed text like `[this]` is a placeholder Ben will fill in. Keep the brackets visible so they're easy to find.

### Site config
- Name: Ben Miller
- Location: Raleigh, NC
- Email: [email address]
- LinkedIn: [LinkedIn URL]
- Resume: `/resume.pdf`

### Home
**Headline:** AI is making products more powerful and more complicated. *I make sure people can still use them.*

**Bio:** I'm an Associate Product Owner at Prometheus Group in Raleigh, where I own the Web Planning & Scheduling application and lead product operations across all of our products. Outside work, I build products of my own, from a home repair marketplace to a law firm's website. I hold an MBA from Duke's Fuqua School of Business and a BA in Cognitive Science from Penn.

### Case study: Clink (`src/content/work/clink.md`)

Frontmatter:
- order: 1
- title: Clink
- tag: 0-to-1 product · Founder
- summary: A home repair marketplace that replaces long intake surveys with a conversation, built for homeowners who don't know repair basics.
- hook: Booking a home repair should feel like texting a pro, not filling out a form.
- intro: Clink connects Gen Z homeowners with trusted repair and service pros, matched by job type, location, and availability. I designed and built it from concept to working product.
- role: Founder: strategy, design, build
- timeline: [Start month] 2026 – present
- status: [Prototype / beta / live]
- liveUrl: [Live app link]

Sections:
- **The problem:** Booking a home repair online often starts with a long intake survey full of required questions. For someone who doesn't know repair basics, those questions are a wall: they don't know the pipe size or what's actually broken, so they guess or give up. Meanwhile, most repair jobs booked through two-way platforms get planned, quoted, and scheduled over text or email anyway. The survey adds friction without replacing the conversation.
- **Users:** Gen Z homeowners who don't know home repair basics. They value ease, trust, safety, and dependability over the lowest price. On the other side are repair and service pros, who need enough information to quote a job before they'll engage. [How you learned this.]
- **Key decision — Let the chat do the scoping (callout):** I kept job submission requirements to a minimum and moved scoping into the chat between homeowner and pro. Instead of asking users questions they can't answer, Clink gets them talking to someone who can.
  - Table (rows: Getting started / Who figures out details / Quote and scheduling; columns: Typical booking app / Clink):
    - Long survey with required fields / A few basics: [job type, location, availability]
    - The homeowner, upfront / The pro, by asking in chat
    - Often over text or email anyway / In the chat, where the conversation already is
  - Why: Required questions people can't answer are a major pain point, and most jobs get scoped over text regardless.
  - Tradeoff: Pros get less structured information upfront. [How you handle it.]
- **Other decisions:** Match on job type, location, and availability. Position on trust and dependability, not price. A friendly mascot built around a toolbox item. Iterating on the name to signal dependability. [Tradeoffs for each.]
- **Execution:** A 9-step build plan with ~10 sub-steps each, plus living documents for scope, costs, progress, and open questions. [Sequencing logic; one deferred feature and why.]
- **Results:** Built: [what works end to end]. Tested: [feedback so far]. Next: [next milestone].
- **What I learned:** Design for what users know, not what the system wants. Copy the behavior that already works. [What I'd do differently.]
- Screenshots: [job submission], [chat], [brand/mascot]

### Case study: Haywood, Denny & Miller (`src/content/work/hdm.md`)

Frontmatter:
- order: 2
- title: Haywood, Denny & Miller
- tag: Client project · Product owner & builder
- summary: A lean, credibility-first website for a Durham law firm, designed around what the firm actually needed rather than industry convention.
- hook: [One-line hook, e.g. "A law firm website built for trust, not leads."]
- intro: I redesigned and rebuilt the website for Haywood, Denny & Miller, L.L.P., a Durham law firm, and I own its maintenance after launch.
- role: Sole product owner, designer, and builder
- timeline: [Start month] – [launch month] 2026
- status: [Launched / awaiting firm sign-off]
- liveUrl: https://hdmllp.com (once launched)

Sections:
- **The problem:** The firm's existing site no longer reflected the practice. [What was wrong.] For a small firm, a dated website quietly undermines trust.
- **Users and goals:** The site's job is credibility, not lead generation. Visitors: prospective clients confirming the firm is legitimate, referring attorneys confirming who's at the firm and how to reach them, [others].
- **Constraints:** No calls to action (contact details shown plainly, no forms). Existing URLs had to keep working. Outside IT controls the domain. Limited partner time for reviews.
- **Key decision callout — Lean is a feature:** Every decision came back to one question: does this help a visitor confirm the firm is credible, or does it add noise? Decisions: cut the attorneys section from the home page; all three partner bios on one Attorneys page; removed "The Firm" from nav; each fact lives on one page only; nav order Home, Practice Areas, Attorneys, Contact; assets built to be swappable.
- **Execution:** Defined steps; a step wasn't done until a smoke test of new work and a full regression of everything built so far both passed. Firm communications sequenced toward the end.
- **What changed after feedback:** [2–3 examples.]
- **Results:** [Launch date, before/after page speed, partner quote.]
- **What I learned:** The right requirement isn't always the best practice. Lean is a feature. [What I'd do differently.]
- Screenshots: [before/after home page]

### About (`src/content/pages/about.md`)
- **Intro heading:** Hi, I'm Ben.
- **Intro:** I grew up in Durham, studied cognitive science at Penn, and came back to the Triangle for my MBA at Duke. Today I'm an Associate Product Owner at Prometheus Group in Raleigh. [One or two sentences on what you're like to work with.]
- **How I got here:** Cognitive science taught me to look at how people actually think, not how we assume they do. [What drew you to it and pointed you toward product.] [How you went from Fuqua into product.]
- **What I believe:**
  - Pull quote: AI is making products more powerful and more complicated. Someone has to make sure people can keep up.
  - Body: If no one looks out for the person on the other end, the gap between what technology can do and what people can use grows with every release. Good product management closes it by shaping complicated technology around how people actually think. That's why Clink skips the long intake survey: most homeowners can't answer technical questions about their repair, and shouldn't have to.
- **Outside of work (cards):**
  - Building — Side products like Clink and client websites
  - Golf — [A specific: favorite course, a goal, or handicap]
  - Two cats — [Name] and [Name], my most demanding stakeholders
- **Closing:** Hiring for a product role? I'd love to talk.

## Images

Put images in `src/assets/` (or `public/images/`) and reference them from Markdown frontmatter or body. Until real screenshots exist, render a `--surface` placeholder box with a short label. Optimize with Astro's image component.

## Definition of done for each step

A step isn't complete until:
1. A smoke test of the new work passes (page builds, renders at desktop and phone widths, links work).
2. A full regression of everything built so far passes with no bugs.
3. `npm run build` succeeds with no errors or warnings.

## Build order

1. Scaffold Astro, design tokens, fonts, base layout, header, footer.
2. GitHub Actions workflow for GitHub Pages; confirm a deploy works with a placeholder page.
3. Content collections and site config.
4. Home page.
5. Case study template + Clink content.
6. HDM content.
7. About page.
8. Responsive and accessibility pass; Lighthouse check.
9. A short `EDITING.md` explaining how Ben edits copy, adds a case study, swaps images, and updates the resume.
