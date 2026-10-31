---
order: 2
title: "Haywood, Denny & Miller"
tag: "Client project · Product owner & builder"
summary: "A lean, credibility-first website for a Durham law firm, designed around what the firm actually needed rather than industry convention."
hook: "A law firm website built for trust, not leads."
intro: "I redesigned and rebuilt the website for Haywood, Denny & Miller, L.L.P., a Durham law firm, and I own its maintenance after launch."
role: "Sole product owner, designer, and builder"
timeline: "October 2026 – present"
status: "In final review with the partners"
liveUrl: "https://hdmllp.com (once launched)"
thumbnail:
  src: "../../assets/work/hdm/thumbnail.png"
  alt: "Haywood, Denny & Miller, L.L.P. seal logo, established 1955"
hero:
  src: "../../assets/work/hdm/hero.png"
  alt: "The new Haywood, Denny & Miller home page, with the firm's navy seal, name and navigation above the headline \"Experienced counsel in North Carolina's courts for more than seventy years.\""
screenshots:
  - src: "../../assets/work/hdm/before.png"
    alt: "The previous hdmllp.com home page: a blue firm name, a photo of downtown Durham and two paragraphs of dense text"
  - src: "../../assets/work/hdm/after.png"
    alt: "The new home page: the firm's seal and name on cream, a short navigation bar, and a navy headline section"
decision:
  eyebrow: "Key decision"
  headline: "Lean is a feature"
  body: "Every decision came back to one question: does this help a visitor confirm the firm is credible, or does it add noise?"
  points:
    - "Cut the attorneys section from the home page."
    - "All three partner bios on one Attorneys page."
    - "Removed \"The Firm\" from the nav."
    - "Each fact lives on one page only."
    - "Nav order: Home, Practice Areas, Attorneys, Contact."
    - "Assets built to be swappable."
---

## The problem

The firm's previous website gave visitors the information they needed, but it no longer reflected the quality and professionalism of the practice. The design felt dated, the content was hard to digest, and the experience didn't convey the depth of expertise clients and peers expect from an established law firm.

For a small firm, a dated website quietly undermines trust. The redesign had to represent the firm's reputation, history, and experience with a modern, polished presence: better structure, cleaner presentation, and a stronger first impression that matches the firm's standing in the legal community.

## Users and goals

The site's job is credibility, not lead generation. Visitors:

- **Prospective clients** confirming the firm is legitimate.
- **Referring attorneys** confirming who's at the firm and how to reach them.
- **Insurance carriers and claims professionals** checking who's handling their file.
- **Opposing counsel** looking up the attorney on the other side.
- **Existing clients** who need the address, phone, or fax number.

## Constraints

- **No calls to action.** Contact details are shown plainly, with no forms.
- **Existing URLs had to keep working.**
- **Outside IT controls the domain.**
- **Firm email runs on the same domain.** Every address is @hdmllp.com, so pointing the domain at the new site couldn't disrupt email.
- **Limited partner time for reviews.**

<!-- key-decision -->

## Execution

I built the site from scratch with Astro as a static site: no WordPress, database, or CMS. Attorneys, practice areas, and clients live in simple data files. It's hosted on Netlify and deploys automatically from GitHub. I built it with Claude Code, acting as product lead: I wrote the requirements, set the guardrails, and reviewed every change.

The work ran in defined steps. A step wasn't done until a smoke test of the new work and a full regression of everything built so far both passed, with automated tests checking every page at phone, tablet, and desktop widths.

The new site keeps the old page addresses, so existing links and bookmarks keep working. Because email runs on the same domain, the switch changes only the two website records. Before it, I'll confirm with the firm's IT vendor where email is hosted and record every DNS record as a rollback plan; after it, I'll test email in both directions.

## What changed after feedback

Early on, the firm told me they didn't want the site to generate leads. Most of their work comes from insurance carriers and referrals, so the site's job is credibility. I took out every contact form, "schedule a consultation" button, and pop-up, and listed contact details only as reference information.

I also flagged claims that need the firm's approval before launch, like the firm-wide "AV Rated" line, since the current site attributes that rating to only one partner.

## Results

- **Page speed:** Google PageSpeed Insights performance went from 71 to 100 on mobile and from 80 to 100 on desktop (measured October 2026).
- **Status:** In final review with the partners. The new site replaces the current one at hdmllp.com after their written sign-off.

## What I learned

- The right requirement isn't always the best practice.
- Lean is a feature.
- Settle logistics on day one: a single IT contact, and photos with clear usage rights. I ended up with a building photo of unknown origin and attorney portraits recovered from a 2018 version of the site.
- Show a rough preview early. I held review until the site felt finished, and an earlier look would have surfaced the partners' decisions sooner.
