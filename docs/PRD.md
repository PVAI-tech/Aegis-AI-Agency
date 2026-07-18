# Product Requirements Document

## Purpose

Convert visitors — primarily from Google Ads and word of mouth — into booked discovery calls or submitted enquiries for Aegis AI Agency's services (websites, automation, AI chatbots, lead generation, booking systems, custom AI software).

## Target users

Small and growing UK businesses who:
- Have an outdated, slow, or non-existent website
- Are losing time to manual admin, scheduling, or follow-up
- Want AI/automation but don't have in-house technical capability
- Are price-sensitive but willing to pay for a fast, done-for-you result (£699–£1,499+ range)

## Core user journeys

1. **Cold visitor → enquiry**: lands on the homepage (ad or search), reads the hero/services/portfolio/pricing, clicks "Book Free Consultation" or fills the enquiry form.
2. **Considering visitor → portfolio proof**: clicks into a case study to see real, specific past work before committing.
3. **Price-conscious visitor → pricing clarity**: checks the 3-tier pricing and FAQ before booking a call.
4. **Curious visitor → Jarvis widget**: asks the AI assistant a quick question instead of reading the whole page.
5. **Post-enquiry**: reaches the thank-you page, sees the exact next-step timeline, optionally books directly via Calendly instead of waiting.

## Success metrics

- Enquiry form submissions and "Book a Call" clicks (tracked via `trackEvent()` → `dataLayer`, ready for GA4/GTM once activated)
- Time-to-first-response on submitted enquiries (currently target: within 1 hour, stated on thank-you page)

## Explicit non-goals

- No e-commerce/checkout on this site (pricing is informational; payment happens off-platform)
- No user accounts or client portal (out of scope unless explicitly requested)
- No blog/content marketing section (not currently planned)

## Constraints

- Must stay static HTML/CSS/JS (see [`ADR.md`](ADR.md))
- Must not fabricate stats, testimonials, or client logos — every claim on the site must be verifiable (this was an explicit, repeated instruction during development after earlier drafts included invented numbers)
