# Business Model — Aegis Health AI Ltd

**Status: draft for review.** Not yet reflected on the live site or in any client contract. Written with real strategic judgment, not just restating the brief back — including where I think the original ask should be narrowed before executing it.

## The core problem with the current model

Right now, revenue only happens once per client (a project fee) and stops the moment the project ships. There's no compounding — every month starts back at zero. The fix isn't "add subscriptions everywhere," it's making sure work already done keeps earning after delivery.

## The restructure: one business, three motions, not three businesses

The brief asks for three "divisions." I'd resist actually running them as three separate businesses with separate teams/branding — for a company this size, that's how you end up with three half-built things instead of one that works. Better framing: **one AI agency, three ways a client can buy from it**, all feeding the same underlying capability (the same AI-assistant patterns, the same delivery process).

### Motion 1 — Productized AI (recurring revenue engine)

**Strategic call, not just a list:** the brief names 14 possible AI products (Receptionist, Pharmacy Assistant, HR Assistant, Voice AI, etc.). Building and maintaining 14 distinct products with a small team is the fastest way to ship 14 mediocre things instead of 2 excellent ones. **Recommendation: launch with one productized line, not fourteen.**

That one line should be the thing already proven, twice, in real client work: a **branded AI Concierge/Assistant** — the same underlying pattern as Hera (H.Sheikh London) and the Beauty Concierge (Slay Beauty London), packaged as a repeatable product instead of a bespoke build each time. Concretely: a chat widget trained on a specific business's products/services/FAQs, brandable (name, avatar, tone), with a fixed integration path (embed script + a config file, not a from-scratch build per client).

Once that's selling and retaining well, the natural second product is a **Booking/Lead-Qualification Assistant** — Aegis already builds booking systems and lead-gen pipelines as bespoke services; templating that into a product is a much smaller lift than inventing "AI Pharmacy Assistant" from nothing. Everything else on the 14-item list (Voice AI, HR Assistant, Document Assistant, etc.) is a **future roadmap item**, not a day-one SKU — see [`Roadmap.md`](Roadmap.md).

**Why this matters financially:** a subscription only works if the marginal cost of serving one more client is low and predictable. A templated Concierge product (same core code, different config/branding per client) has that property. Fourteen bespoke "products" built one-off per client does not — that's just Custom Development wearing a subscription price tag, and the margins won't hold.

### Motion 2 — Custom Development (high-ticket, project-based)

This is closest to what Aegis already does well — websites, bespoke AI assistants, automation, dashboards — and needs the least reinvention. The change is formalizing the process (see [`ClientJourney.md`](ClientJourney.md)) and pricing it in ranges tied to real scope instead of ad-hoc quoting. See [`PricingStrategy.md`](PricingStrategy.md).

**Honest scope check:** the current portfolio (4 case studies) demonstrates websites, embedded AI assistants, and automation — genuinely strong evidence for those categories. It does **not** yet demonstrate native mobile app development or large enterprise software platforms. Both are listed in the brief's Custom Development examples. Two honest options: (a) treat those as real capability gaps to close before selling into them confidently, or (b) take them on selectively with a trusted subcontractor/partner for the mobile-specific work while Aegis leads the AI/product side. Pretending equal depth across all six listed categories would be the same mistake as the fabricated stats this project has already had to walk back once — don't oversell capability that isn't demonstrated yet.

### Motion 3 — Managed AI Services (retention layer, not a separate sales motion)

Don't sell this cold. Sell it as the natural next step *after* Motion 1 or Motion 2 delivers — "we built this for you; want us to keep it tuned, monitored and improved for £X/month?" This is the standard, proven way agencies build recurring revenue on top of project work, and it converts far better than pitching a retainer to someone who hasn't seen the delivered work yet.

## Revenue mix, realistically

For a company this size, don't target an even split across three streams. A more realistic early trajectory:
- **Year 1:** Custom Development remains the majority of revenue (it's what's proven). Productized AI and Managed Services are introduced as add-ons to Custom Development clients, building the first cohort of recurring revenue.
- **Year 2+:** As the productized line's client base grows and retention data proves out the unit economics, recurring revenue (Productized AI + Managed Services) becomes a larger share — this is what actually makes the business more valuable and less founder-dependent, not the custom project revenue.

## What "£1M ARR" actually requires — the math, not just the ambition

At the drafted Professional-AI-tier price point (~£99–149/mo), reaching meaningful recurring revenue from Motion 1 alone needs hundreds of active subscriptions, which requires either significant marketing spend/capacity or a much longer runway than a single founder can realistically hit alone in year one. The honest path to £1M ARR for a company this size is a **blend**: several high-ticket Custom Development projects (£1,500–£15,000+ each) plus a growing base of Managed Services retainers (£99–£299/mo per client) plus an emerging productized line — not any single stream carrying the whole target. Treat "£1M ARR" as a multi-year direction, not a same-year deliverable of a website/pricing redesign.

## What this means for the website

- Keep the current portfolio/case-study-led positioning for Custom Development — it's honest and it's working.
- Add a distinct, clearly-labeled section (or dedicated page) for the Productized AI line once it exists as a real, demoable product — not before. Advertising a product that isn't built yet is the same fabrication risk flagged earlier in this project.
- Pricing page redesign (see [`PricingStrategy.md`](PricingStrategy.md)) should present Custom Development and Productized AI as genuinely different purchase paths, not force them into one three-tier grid the way the current page does.
