# Pricing Implementation

What actually changed in the code, and why, implementing the fixes identified in [`PRICING_PAGE_AUDIT.md`](PRICING_PAGE_AUDIT.md).

## Files touched

| File | What changed |
|---|---|
| `assets/pricing-data.js` (new) | Single source of truth for every Productised AI number — plan prices, features, usage definition, overage policy, minimum term, add-ons, exclusions, client responsibilities. Nothing pricing-related is hand-duplicated elsewhere; cards, comparison table, and the numeric bits of surrounding copy all read from this object. |
| `assets/pricing-render.js` (new) | Renders the 4 pricing cards, the desktop comparison table, the mobile accordion equivalent, the add-ons list, and the exclusions list from `pricing-data.js`. Also wires the "View full plan details" expand/collapse and fills in `[data-pricing-field]` placeholders in the surrounding static copy (VAT note, usage definition, minimum term, etc.) so those numbers can't drift out of sync with the cards. |
| `pricing-mockup.html` | Productised AI section rewritten: new intro copy (UK spelling "Productised AI", explains setup-vs-monthly plainly), card markup replaced with a JS-rendered container, new usage-policy section, new minimum-term/billing section, comparison table + accordion, add-ons section, exclusions section, trust/AI-safety section, client-responsibilities section, and a 16-question pricing FAQ. Custom Development section (Motion 1) left untouched — its numbers weren't in scope for this pass. |
| `assets/site.css` | New styles: `.plan-banner`, `.pc-tagline`, `.pc-featured`, `.pc-footnote`, `.pc-details-toggle`/`.pc-details`, `.pricing-usage-box`, `.usage-alert-chip`, `.pricing-table`/`.pricing-table-wrap`, `.addons-list`, `.exclusions-list`, `.pricing-trust-box`, plus a `focus-visible` outline rule for pricing CTAs/toggles/FAQ buttons that wasn't explicitly verified before. Comparison table hidden and the accordion shown below 760px, per the visual-design requirement. |
| `enquiry.html` | Added a `#planBanner` (shows "Enquiring about: [Plan Name]" with a Clear button) and a hidden `selectedPlan` input, both populated from a `?plan=` query parameter. |
| `assets/enquiry-form.js` | New `prefillPlan()` function: reads `?plan=starter\|professional\|business\|enterprise` from the URL, sets the hidden field and banner text, and pre-checks the existing "AI Chatbot" checkbox in the services-interested list (the closest existing category — no new form field was added for this, to avoid touching the form's validated field set more than necessary). |
| `api/enquiry.js` | Internal notification email now includes a "Selected pricing plan" line, HTML-escaped like every other field. |

## Exact pricing retained (unchanged, per instruction)

Starter AI: £299 setup / £59 mo · Professional AI: £599 setup / £119 mo · Business AI: £1,199 setup / £249 mo · Enterprise: custom. No mathematical or commercial conflict was found that would justify changing these, so they're unchanged from the prior draft.

## Wording changed

- "Productized AI" → "Productised AI" (UK spelling) throughout.
- "Most Popular" → "Recommended" (there is no sales-volume data to support "most popular" — zero real subscribers exist yet).
- "Same-day support" (Business) → "Priority response during UK business hours" (defines the window instead of an ambiguous claim).
- "Web + WhatsApp" stated as included → "WhatsApp integration available as an add-on" with a `*Third-party messaging fees may apply` footnote, on Professional and Business.
- "~20/~100 knowledge base items" → "approved knowledge sources" with an explicit definition and file-size/volume caveat.
- Setup fee display: from small muted text to the same visual tier as the monthly price (`.pc-setup strong`), per the "must be immediately visible" requirement.

## Technical assumptions made explicit

- **No usage metering exists.** The conversation limits shown are provisional and stated as such, in both the usage-policy box and the FAQ. See `usage.provisional: true` and the inline `TODO(usage-metering)` comment in `pricing-data.js`.
- **No WhatsApp Business API integration exists.** Only a static `wa.me` link is live — unrelated to an AI assistant responding via WhatsApp. Marked as add-on/scoping-required everywhere it's mentioned.
- **No Stripe overage billing is configured.** Automatic top-ups are marked "planned" in `pricing-data.js`'s `overagePolicy.automaticTopUps` field; manual approval is the only implemented path today.
- **VAT registration status is not asserted either way** — the page uses the conditional "Prices exclude VAT where applicable" wording exactly as instructed, rather than claiming a registration status that hasn't been confirmed.

## Features marked as add-ons / requiring scoping (not sold as fixed included features)

WhatsApp integration (Professional/Business), voice/omnichannel (Enterprise), any non-standard CRM integration, additional assistants/languages/integrations/locations (all in the `addOns` array in `pricing-data.js`, priced "from," not fixed).

## Still requiring real implementation before this can be a live, billable product

1. **Usage metering** — a real backend connection for the Jarvis-style assistant plus a way to count/log conversations against whatever definition is finalized. Currently: none exists (`Database.md`).
2. **Stripe** — subscriptions, invoicing, and (eventually) overage billing, per `PaymentSystem.md`. Not started; needs the account/keys confirmed earlier in this project.
3. **WhatsApp Business API integration** — if this add-on is ever sold, it needs to actually be built and tested before being delivered.
4. **The plan pre-fill's mapping to a form field** — currently reuses the existing "AI Chatbot" checkbox as the closest fit; if Productised AI becomes a real, separate line item, the enquiry form should get a dedicated field rather than overloading an existing one.

## Legal wording flagged for professional review

Per the brief's own instruction, no claim is made that a solicitor has reviewed this page. The minimum-term/cancellation/refund summary, the CRM/IP ownership language in the FAQ ("who owns the final system"), and the AI-safety disclaimer are all commercial/legal-adjacent wording that should be checked against the actual signed service agreement templates ([`MasterServiceAgreement.md`](templates/MasterServiceAgreement.md), [`DataProcessingAgreement.md`](templates/DataProcessingAgreement.md)) by a qualified solicitor before this page is used to actually sell a subscription.
