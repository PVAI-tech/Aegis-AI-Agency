# Pricing Page Audit

Audit of the working draft (at the time, `pricing-mockup.html` — a `noindex`, unlinked page, since promoted to the live `pricing.html`) before implementing the requested improvements. This is an audit of what actually existed at the time, not a generic checklist — every finding below was checked against the real code, not assumed.

## Confusing wording
- "One setup fee, then a simple monthly plan" (intro) doesn't actually explain what either fee *covers* — a prospective client can't tell if setup means "you configure it" or "you build it from scratch."
- "Web + WhatsApp" is stated as a plain included feature on Professional/Business with no qualifier — reads as a firm promise.
- "Same-day support" (Business tier) has no defined window (does "same day" mean within business hours, within 24 clock hours, guaranteed or best-effort?).
- "~20 knowledge base items" / "~100 knowledge base items" — "knowledge base item" is undefined; a client can't tell if one FAQ page and one 500-page PDF count the same.
- "conversations/mo" is never defined anywhere on the page.

## Unsupported promises
- No VAT status is stated at all — silence here could be read either way.
- WhatsApp integration is presented as simply included, but **no WhatsApp Business API integration exists in this codebase** — the only WhatsApp-related code is a static `wa.me` contact link (`assets/site.css` `#wa`), unrelated to an AI assistant responding via WhatsApp. This is a real gap between marketing copy and actual capability.
- "Monthly review call" / "Same-day support" imply an operational support process that doesn't exist yet — there is currently no client, no support inbox process, no SLA tooling.
- Usage limits (conversations/month) imply metering that **does not exist**. Checked directly: `assets/jarvis.js` runs entirely client-side with keyword-matched canned replies (see `docs/Agents.md`) — there is no backend, no database (`docs/Database.md`), and therefore no way to count, log, or enforce a monthly conversation limit for any real client today.

## Missing commercial terms
- No minimum term stated.
- No cancellation policy.
- No statement of when billing starts.
- No refund position on the setup fee.
- No overage/top-up mechanism described (what happens at the limit).
- No mention of what happens to the assistant/data after cancellation.

## Visual problems
- Setup fee (`.pc-setup`) is genuinely low-contrast/small (`.78rem`, muted color) relative to the monthly price — exactly the "buried in small text" problem the brief flags.
- Enterprise card's price fallback (`Custom`) still uses the old gradient-text treatment inherited from `.pc-amt` (a leftover from before the rebrand's palette consolidation) — inconsistent with the plain-text treatment used elsewhere on Enterprise.
- Feature lists are a flat bullet dump with no hierarchy — 5-6 items of equal visual weight, nothing signals what's actually different between tiers at a glance.
- No comparison table exists — a prospective client comparing all 4 tiers has to re-read every card.

## Mobile issues
- 4-column grid (`.price-grid-4`) collapses to 2 columns at 1100px, then 1 column at 600px — functional, but untested against real narrow-viewport content overflow (long feature text wrapping, card height mismatch between adjacent cards in the 2-column state).
- No accordion/stacked alternative for a comparison table, because no comparison table exists yet.

## Accessibility issues
- "Most Popular" / "Best Value" badges (`.pc-badge`) are plain colored `<span>`s with no `aria-label` clarifying they're a recommendation, not a factual claim — and "Most Popular" specifically implies a sales-volume claim with zero actual sales data behind it (there are currently zero Productized AI subscribers — the product doesn't exist as an operating service yet).
- No visible focus state has been verified on `.btn-price`/`.pc` interactive elements specifically (inherited from the global button/link styles, not confirmed against this component).
- All CTAs currently point to `href="#"` (mockup placeholder) — not yet wired to the enquiry flow.

## Pricing inconsistencies
- None found in the four core numbers (£299/£59, £599/£119, £1,199/£249, Enterprise custom) — these match `docs/PricingStrategy.md` exactly and are kept unchanged per instruction.
- Overage rates (£15/£12/£10 per 100) are mentioned once, in tiny footer text, not shown per-card or in a comparison table.

## Unclear usage limits
- As above: "conversations" is undefined, unmeasured, and unmeasurable by the current system. This is the single most important finding in this audit — see the "Conversation definition" section of the implementation below for how this is being handled honestly rather than papered over.

## Weak conversion points
- Every CTA says "Get Started →" (Starter and Professional are identical, indistinguishable) — no plan-specific language, no urgency, no clarity on what happens after clicking.
- CTAs go nowhere (`href="#"`) — dead ends in the current mockup.
- No FAQ addressing the objections a real buyer would have before paying a setup fee (ownership, data handling, accuracy, cancellation).
- No trust/safety framing near the cards — for an AI product specifically, an experienced buyer will want to know the AI's answers aren't guaranteed accurate before committing.

## What's being fixed, in one line
Every finding above is addressed in the same commit as this audit — see `docs/PRICING_IMPLEMENTATION.md` for exactly what changed and why, and `docs/PRICING_POLICY.md` for the underlying commercial rules the new page content reflects.
