# SOP — Marketing

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers everything that generates a lead before Sales takes over — the website itself, SEO, and (once running) paid acquisition.

## Who does this today
Laiba Sheikh, solo. No marketing hire, no paid ad campaigns live yet.

## What currently exists
- The website (`index.html` + case studies + `pricing.html`), positioned around real, verifiable case studies — see [`Memory.md`](../Memory.md) for the explicit "no fabricated stats/testimonials" rule that governs all marketing copy on this site.
- Basic SEO scaffolding: `sitemap.xml`, `robots.txt`, JSON-LD structured data, per-page meta descriptions — see [`SEO.md`](../SEO.md).
- No paid campaigns are live yet.

## Process for any new marketing claim (site copy, ad copy, social post)
1. **Check it against real evidence.** A stat, testimonial, or capability claim only goes live if it's independently verifiable — a real client outcome, a real built feature. Not "sounds credible."
2. **Check it against the honesty flags already in the codebase** before publishing: no claim of guaranteed AI accuracy, no claim of full GDPR compliance, no claim of capability in categories the portfolio doesn't demonstrate (see [`BusinessModel.md`](../BusinessModel.md)'s capability-gap section).
3. **If it touches pricing, cross-check [`PricingStrategy.md`](../PricingStrategy.md) and [`assets/pricing-data.js`](../../assets/pricing-data.js)** — pricing figures must never drift between marketing copy and the actual data source.
4. **If it's a new page or meta change, update `sitemap.xml`** in the same change — a page that isn't in the sitemap is invisible to search engines regardless of how well it's written.

## Before turning on paid ads
- Confirm `og:image` exists and renders correctly on the platform being used (see [`Roadmap.md`](../Roadmap.md) for its current status).
- Confirm GA4/GTM tracking (currently commented out in every page's `<head>` — see [`SEO.md`](../SEO.md)) is uncommented and the real IDs are in place, otherwise ad spend can't be measured.
- Confirm the enquiry form's rate limiting (`api/enquiry.js`, 5 submissions per 10 minutes per IP) won't itself block legitimate traffic spikes from a successful campaign — revisit the limit if a campaign is expected to drive high concurrent volume.

## Handoff notes for a future hire
Needs write access to the HTML/CSS/JS repo (or a review relationship with whoever has it), and must be briefed on the "no fabrication" rule before writing a single word of copy — this has been a repeated, explicit instruction on this project, not a style preference.
