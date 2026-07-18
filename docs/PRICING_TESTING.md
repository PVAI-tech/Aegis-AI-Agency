# Pricing Page Testing

Actual verification results for `pricing-mockup.html` and the enquiry-flow changes, run against the local preview server. Screenshots are unreliable at non-zero scroll in this environment (a known tool artifact documented elsewhere in this project's history) — verification below relies on direct DOM/computed-style inspection, which is more reliable, plus screenshots where they did render correctly.

## All four cards
Verified via DOM query: all 4 cards render with correct `data-plan` ids, names, setup fees, and monthly fees exactly matching `pricing-data.js` (£299/£59, £599/£119, £1,199/£249, Enterprise/Custom). Only Professional carries the "Recommended" badge (`role="note" aria-label="Recommended plan"` — confirmed present, not just visually implied).

## Every CTA
- Starter → `enquiry.html?plan=starter`
- Professional → `enquiry.html?plan=professional`
- Business → `enquiry.html?plan=business`
- Enterprise → auto-rewritten to the Calendly link by the site's existing "Book…" CTA auto-detection in `assets/site.js` (the button text "Book an Enterprise Call" matches its keyword check) — this is correct, intentional behavior: Enterprise is a discovery-call motion, not a form-fill motion, consistent with how every other "Book a Call" CTA on the site works.
- Zero `href="#"` placeholder links remain anywhere on the page (checked programmatically: `deadHashLinks: 0` out of 16 total links).

## Preselected plan handling
Navigated to `enquiry.html?plan=professional` directly: confirmed `#planBanner` becomes visible with text "Professional AI", the hidden `#selectedPlan` field is set to "Professional AI", and the "AI Chatbot" checkbox is pre-checked. The "Clear" button removes the banner and resets the hidden field (verified in code; the click handler is a simple two-line reset, low risk).

## Mobile / tablet / desktop widths
| Width | Card columns | Comparison table | Accordion |
|---|---|---|---|
| 375px (mobile) | 1 column (verified: `337.5px` computed grid-template-columns) | hidden (`display:none`) | visible (`display:block`) |
| 768px (tablet) | 2 columns (verified: `324px 324px`) | visible | hidden |
| 1280px (desktop) | 4 columns | visible | hidden |

## Keyboard navigation
- "View full plan details" toggle is focusable and receives visible focus (new `:focus-visible` outline rule added to `assets/site.css` for `.pc-details-toggle`, `.btn-price`, `.faq-q` — this wasn't explicitly verified before this pass).
- Toggle correctly sets `aria-expanded` and updates its own label text ("View full plan details" ↔ "Hide plan details") on activation — confirmed via direct click simulation, not just visual inspection.

## Screen-reader labels
- Comparison table uses `scope="col"`/`scope="row"` throughout (verified: 19 scoped header cells present) rather than plain `<td>`s standing in for headers.
- The "Recommended" badge carries `role="note" aria-label="Recommended plan"` so it reads as a note, not an unexplained visual pill, to a screen reader.
- FAQ and comparison-accordion buttons carry `aria-expanded`, toggled correctly on click (confirmed for both the accordion table alternative and the FAQ).

## Text overflow
Feature list text wraps normally within each card at all three tested widths; no observed clipping or horizontal scroll on the cards themselves (the comparison table intentionally scrolls horizontally on its own via `.pricing-table-wrap{overflow-x:auto}` at widths where it's shown, which is expected/correct for a data table, not a bug).

## Comparison table / FAQ accordion behavior
- Table populates all 14 comparison rows across all 4 plan columns (verified count).
- Mobile accordion equivalent renders one collapsible section per plan (4, confirmed), each opening/closing correctly on click.
- Pricing FAQ: 16 items render (covering all 17 requested topics — two, minimum term and cancellation, are combined into one FAQ entry since they're naturally answered together); first-item open/close verified via click simulation.

## Currency formatting
All amounts use `Number.prototype.toLocaleString("en-GB")` in `pricing-render.js` (e.g. `1500` → `1,500`), so figures above 999 get a UK-formatted thousands separator consistently, rather than being manually formatted (and risking inconsistency) per occurrence.

## VAT wording
Confirmed the exact instructed phrase renders: "Prices exclude VAT where applicable" — sourced from `pricing-data.js`'s `vatNote` field via the `[data-pricing-field]` mechanism, not hand-typed in the HTML (so it can't drift from the single source).

## Overage wording
Confirmed present: the "never charged unexpectedly" framing, the manual-top-up-vs-pause choice, and the explicit "automatic top-ups are planned, not yet built" caveat (tied to `docs/PaymentSystem.md`'s actual Stripe-billing status, not asserted independently).

## Broken links
Zero — checked programmatically (see "Every CTA" above) and manually followed the AI Disclaimer / Privacy Policy / AI Usage Policy links referenced in the trust section and FAQ; all resolve to real, existing pages.

## Dark-theme contrast
Not independently re-measured in this pass beyond what was already verified for the base design system in `docs/Accessibility.md` — the new components (`.pricing-usage-box`, `.pricing-table`, `.addons-list`, etc.) all reuse the existing `--text`/`--muted`/`--blue` tokens rather than introducing new colors, so they inherit the contrast properties already checked there rather than needing a fresh audit. Flagged in `docs/Roadmap.md`-style terms: a full automated Lighthouse/axe pass against the deployed page is still outstanding, same as the rest of the site.

## What wasn't (and can't yet be) tested
- Actual Stripe checkout/subscription flow — not built (see `docs/PRICING_IMPLEMENTATION.md`).
- Real usage metering enforcement — not built; the "provisional" framing exists specifically because this can't be tested against a real system yet.
- `api/enquiry.js`'s handling of the new `selectedPlan` field against a live Resend send — same limitation as every other `api/` test in this project: the local static-file server can't execute serverless functions (see `docs/Testing.md`). The field addition follows the exact same `escapeHtml()` pattern as every other field, so the risk here is low, but it hasn't been exercised against a real deployed request in this pass.
