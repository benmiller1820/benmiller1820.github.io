---
order: 1
title: "Clink"
tag: "0-to-1 product · Founder"
summary: "A home repair marketplace that replaces long intake surveys with a conversation, built for homeowners who don't know repair basics."
hook: "Booking a home repair should feel like texting a pro, not filling out a form."
intro: "Clink connects Gen Z homeowners with trusted repair and service pros, matched by job type, location, and availability. I designed and built it from concept to working product."
role: "Founder: strategy, design, build"
timeline: "August 2026 – present"
status: "Working prototype, pre-launch"
liveUrl: "https://clink-dusky.vercel.app"
thumbnail:
  src: "../../assets/work/clink/thumbnail.png"
  alt: "Clink mascot: a smiling hex nut in a blue cap and tool belt, holding a wrench and screwdriver"
hero:
  alt: "[job submission]"
screenshots:
  - alt: "[chat]"
  - src: "../../assets/work/clink/brand.png"
    alt: "Clink mascot in three poses: holding a wrench and screwdriver, waving, and a head-and-shoulders icon"
decision:
  eyebrow: "Key decision"
  headline: "Let the chat do the scoping"
  body: "I kept job submission requirements to a minimum and moved scoping into the chat between homeowner and pro. Instead of asking users questions they can't answer, Clink gets them talking to someone who can."
  table:
    - ["", "Typical booking app", "Clink"]
    - ["Getting started", "Long survey with required fields", "A few basics: repair type, a few short questions, photos, timing, and address"]
    - ["Who figures out details", "The homeowner, upfront", "The pro, by asking in chat"]
    - ["Quote and scheduling", "Often over text or email anyway", "In the chat, which ends in a single quote with a price and appointment time"]
  why: "Required questions people can't answer are a major pain point, and most jobs get scoped over text regardless."
  tradeoff: "Pros get less structured information upfront. To make up for it, each repair type has its own short questions, either side can add photos, and pros see the full request before they accept or decline."
---

## The problem

Booking a home repair online often starts with a long intake survey full of required questions. For someone who doesn't know repair basics, those questions are a wall: they don't know the pipe size or what's actually broken, so they guess or give up.

Meanwhile, most repair jobs booked through two-way platforms get planned, quoted, and scheduled over text or email anyway. The survey adds friction without replacing the conversation.

## Users

Gen Z homeowners who don't know home repair basics. They value ease, trust, safety, and dependability over the lowest price.

On the other side are repair and service pros, who need enough information to quote a job before they'll engage.

Clink started with my own dryer repair. Getting it fixed was an awful experience, and it seemed just as painful for the technician who came out to fix it. If the process was that frustrating on both sides, the problem was the process, not the people. It also made me think: if one of my siblings needed a plumber, they'd have no idea who to call. My generation expects the ease we get from other apps, and home repair still runs on phone calls and Google searches. Since building it, I've tested Clink with an HVAC company to see how the pro side holds up in a real business's workflow.

<!-- key-decision -->

## Other decisions

- **Match on job type, location, and availability.** Instead of sending each job to every pro and letting the first to claim it win, Clink offers it to eligible pros one at a time, in an order I set, and only during their business hours. That's slower, but I control who shows up. I designed a timer to pass jobs along from slow responders, then removed it: with a small group of pros, skipping a good one hurt more than it helped. Ratings wait until there are real jobs behind them, and price is left out on purpose.
- **Position on trust and dependability, not price.** I approve every pro personally, all payments run through the app, and a homeowner can switch pros even after booking. The cost is a smaller group of pros I recruit myself, slower matching, and no price shopping. For homeowners who want ease and confidence more than the lowest quote, that's the right trade.
- **A friendly mascot built around a toolbox item.** Clink is a hex-nut handyman: the warm, capable friend you call when something breaks. A character can carry both halves of that in a way a wordmark can't: friendly enough to take the stress out of a bad moment, and dependable enough that you trust him to get the job done right. To keep him from reading as unprofessional, red is reserved for real problems, legal text is never reworded for personality, and the pro side is plainer, because for pros Clink is a business tool.
- **Iterating on the name to signal dependability.** My early favorite, "Tinker," sounded friendly but suggested fiddling around rather than getting the job done right. [Why Clink won out, and other names you tried.]

## Execution

A 9-step build plan with about 10 sub-steps each, plus living documents for scope, costs, progress, and open questions.

After the foundation, data model, and sign-in, I built the homeowner side first, because the request defines the job everything else acts on. Pros could be onboarded by hand at first; homeowners had to be self-serve from day one. Then came the pro side and matching, chat and quotes, payments, text notifications, and admin tools, with the full visual design last, once the flows had settled. Each step shipped its screens together with its logic, so there was always something real to test.

I deliberately put off ratings and reviews. They need a track record of completed jobs to mean anything, and early on I vet every pro personally anyway. Building them first would have added complexity without adding trust.

## Results

- **Built:** The full job flow works on the live app. A homeowner submits a request with photos, the top-ranked pro gets a text alert, they chat, the pro sends a quote, and the homeowner books it. When the job is done, the homeowner is charged and the pro is paid automatically. Cancellations, refunds, switching pros, and an admin panel work too.
- **Tested:** An HVAC company tried the pro side. They saw a real gap Clink can fill, and their biggest request was a CRM integration, so new jobs show up where they already manage their work. Larger pro businesses need Clink to plug into their tools; smaller ones may be happy in Clink's own dashboard.
- **Next:** More testing to learn how many pros need a CRM integration and whether the built-in dashboard works for smaller ones, plus feedback from homeowners. Before launch: production infrastructure, email verification for pros, and text-messaging compliance.

## What I learned

- Design for what users know, not what the system wants.
- Copy the behavior that already works.
- Get the other side of the marketplace using it sooner. Pros aren't one group, and earlier conversations would have shown me that before I built one dashboard for all of them.
