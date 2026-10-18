# Editing the site

Every word on the site lives in a Markdown (`.md`) file or in `src/site.config.ts`. You never need to touch layout code.

You can edit straight on GitHub: open a file, click the pencil icon, make the change, then **Commit changes** to `main`. The site rebuilds and goes live in about two minutes. Watch progress in the repo's **Actions** tab. If the build fails, the live site keeps the previous version and the Actions log names the file and field to fix.

## Where things live

| What | File |
| --- | --- |
| Email, LinkedIn, name, location, resume path | `src/site.config.ts` |
| Home page headline, bio, button labels | `src/content/pages/home.md` |
| About page | `src/content/pages/about.md` |
| Case studies (one file each) | `src/content/work/*.md` |
| Images | `src/assets/` |
| Resume | `public/resume.pdf` |

## Editing copy

Each `.md` file has two parts:

```md
---
title: "Clink"            ← frontmatter: short fields between the --- lines
summary: "A home repair…"
---

## The problem            ← body: normal Markdown below the second ---

Booking a home repair online…
```

**Frontmatter rules** (the part between `---` lines):

- Wrap every text value in double quotes: `title: "Clink"`. This matters most for values starting with `[`, which break the build without quotes.
- If the text itself contains a double quote, put a backslash before it: `"Removed \"The Firm\" from the nav."`
- Apostrophes are fine as typed (`"I'd love to talk."`). The site turns straight quotes into curly ones.
- Keep the indentation of nested fields (two spaces), as in the existing files.

**Body rules:** each `## Heading` starts a new section, shown with the heading on the left and the text on the right. Use `**bold**`, `- ` for bullet lists and `> ` for a large pull quote (as in "What I believe" on the About page).

**Placeholders:** text in `[square brackets]` is a placeholder. Search each file for `[` to find what's left to fill in.

## Site-wide links

Edit `src/site.config.ts`:

```ts
email: 'ben@example.com',
linkedin: 'https://www.linkedin.com/in/your-name',
```

These feed the header, footer and every Email, LinkedIn and resume button. The email must be a real address and the LinkedIn URL must start with `https://`, or the build stops with an error.

## Adding a case study

1. In `src/content/work/`, copy an existing file and give it a new name. The file name becomes the URL: `budget-app.md` → `/work/budget-app/`. Use lowercase letters and hyphens.
2. Set `order:` to a number no other case study uses. Lower numbers appear first on the home page, and the number also sets the "01, 02, 03" label.
3. Fill in the frontmatter fields (all required unless marked optional):

   | Field | Shown as |
   | --- | --- |
   | `order` | Position and number on the home page |
   | `title`, `summary`, `tag` | Home page row; `tag` also sets the eyebrow, e.g. "Case study 03 · 0-to-1 product" (the part before the first `·`) |
   | `hook`, `intro` | Serif line and paragraph under the title |
   | `role`, `timeline`, `status` | Facts strip |
   | `liveUrl` | "Try it" in the facts strip. A bare `https://…` address becomes a link; anything else shows as plain text |
   | `thumbnail`, `hero` | Home page thumbnail and full-width image (see Images) |
   | `screenshots` | Optional. Up to two images, shown side by side near the end |
   | `decision` | The key decision panel (below) |
   | `draft` | Optional. `draft: true` hides the case study everywhere |

4. Write the body as `## ` sections.
5. Commit. The new case study appears on the home page and in the "Next case study" links automatically.

**Key decision panel.** Its text lives in the `decision:` frontmatter:

```yaml
decision:
  eyebrow: "Key decision"          # optional
  headline: "Let the chat do the scoping"
  body: "One paragraph explaining the decision."
  table:                           # optional comparison table; first row = column headers
    - ["", "Typical booking app", "Clink"]
    - ["Getting started", "Long survey", "A few basics"]
  points:                          # optional bullet list
    - "Cut the attorneys section from the home page."
  why: "Why you chose it."         # optional
  tradeoff: "What it cost."        # optional
```

To choose where the panel appears, put this line on its own between two sections in the body:

```md
<!-- key-decision -->
```

Without that line, the panel goes at the end of the body. The line is invisible on GitHub's file preview.

## Images

1. Put the image in `src/assets/`, for example `src/assets/work/clink/hero.png`. On GitHub: open the folder, then **Add file → Upload files**. JPG, PNG and WebP all work. The site resizes and compresses images automatically.
2. Point the field at it with a path relative to the `.md` file, and replace the placeholder `alt` with a description of the image:

   ```yaml
   hero:
     src: "../../assets/work/clink/hero.png"
     alt: "Clink job submission screen with three short fields"
   ```

   From any file in `src/content/work/` or `src/content/pages/`, paths start with `../../assets/`.
3. Until a `src` is added, the site shows a grey box labeled with the `alt` text.

Images are cropped to fill their frame, so use these shapes and minimum widths:

| Image | Shape | Minimum width |
| --- | --- | --- |
| Case study `hero` | 16:9 (wide) | 2240px |
| `thumbnail`, `screenshots` | 4:3 | 1100px |
| About `photo` | 4:5 (portrait) | 720px |

To put an image inside the body text of a case study, use Markdown: `![Description of the image](../../assets/work/clink/chat.png)`.

If a path is wrong, the build stops and names the missing file.

## Updating the resume

Replace `public/resume.pdf` with your new PDF and keep the same file name. On GitHub: open the `public` folder, then **Add file → Upload files**, upload `resume.pdf` and commit. Every resume link updates.

## Previewing on your computer (optional)

With [Node.js](https://nodejs.org) installed, run these in the project folder:

```sh
npm install        # once
npm run dev        # live preview at http://localhost:4321
npm run build      # the same check GitHub runs before publishing
npm run check      # extra type checks
```

If the preview ever shows old content after a change, stop it, delete `.astro/data-store.json` and start it again.

## Common build errors

| Error mentions | Fix |
| --- | --- |
| `Unexpected scalar` or `[` at a line number | A value starting with `[` needs double quotes |
| `does not match collection schema` | A required field is missing or misspelled; the message names it |
| `Two case studies share order` | Give each case study a different `order` |
| `site.config.ts is invalid` | Email or LinkedIn isn't a valid address (or a `[placeholder]`) |
| An image file name | The `src` path is wrong, or the file wasn't uploaded |
