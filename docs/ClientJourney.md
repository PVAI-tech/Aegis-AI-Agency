# Client Journey

The full path from first contact to retained client, with a checklist per stage. This is the operational backbone that [`PricingStrategy.md`](PricingStrategy.md) and [`PaymentSystem.md`](PaymentSystem.md) plug into.

## 1. Lead
A prospect submits the enquiry form, messages via WhatsApp, or books a call directly.
- [ ] Enquiry logged (currently: email notification via Resend — see [`API.md`](API.md))
- [ ] Responded to within the 1-hour promise stated on `thank-you.html`

## 2. Qualification
Before a discovery call, confirm this is a real fit.
- [ ] Budget range matches a realistic service tier (from the enquiry form data)
- [ ] Timeline expectation is achievable
- [ ] Not a scope Aegis has flagged as unproven (e.g. mobile app, large enterprise platform — see [`BusinessModel.md`](BusinessModel.md)) unless a partner is already lined up

## 3. Discovery call
- [ ] Business goals and current pain points understood
- [ ] Which of the three motions (Productized AI / Custom Development / Managed Services) actually fits, discussed openly
- [ ] Rough budget and timeline sanity-checked live, not left to guesswork

## 4. Discovery questionnaire
Sent after the call to capture detail a live conversation misses (brand assets, existing tools/logins needed, content readiness). See `docs/templates/DiscoveryQuestionnaire.md`.
- [ ] Sent within 24 hours of the call
- [ ] Chased once if not returned within a week

## 5. Research
- [ ] Competitor/reference sites reviewed
- [ ] Technical feasibility of any requested integration confirmed before quoting it

## 6. Proposal + Quote
- [ ] Written, itemized scope (not a verbal estimate)
- [ ] Price is a specific figure or narrow range, not the full category range from [`PricingStrategy.md`](PricingStrategy.md)
- [ ] Timeline stated in business days, matching real capacity — not optimistic best-case

## 7. Contract (Statement of Work)
- [ ] Scope, price, timeline, payment schedule, and ownership terms all match the proposal exactly — no surprises at signing
- [ ] Client has actually read it, not just scrolled to the signature field

## 8. Deposit
- [ ] Stripe Payment Link sent
- [ ] Development does not start until this clears — see [`PaymentSystem.md`](PaymentSystem.md)

## 9. Kickoff
- [ ] Access/credentials needed from the client collected (domain, existing hosting, brand assets)
- [ ] Internal project folder created following the naming convention in `docs/AegisOperatingSystem.md`

## 10. Development
- [ ] Working against the signed scope — any request beyond it goes through the Change Request process (`docs/templates/ChangeRequestForm.md`), not silently absorbed

## 11. Weekly updates
- [ ] Client hears from you at least weekly even if there's nothing dramatic to report — silence is the #1 driver of client anxiety on a fixed-price project

## 12. Testing
- [ ] Checked against the original scope/acceptance criteria before the client ever sees it

## 13. Client approval (UAT)
- [ ] Client explicitly confirms acceptance in writing (email is enough) — not just "looks good in a call"

## 14. Final payment
- [ ] Invoiced only after step 13
- [ ] Deployment, domain go-live, and code/asset handover happen only once this clears — see [`PaymentSystem.md`](PaymentSystem.md)

## 15. Launch
- [ ] Live URL confirmed working end-to-end (forms, integrations, mobile) before telling the client it's done

## 16. Training
- [ ] A short walkthrough call so the client actually knows how to use what they now own — already promised on the site ("30-minute walkthrough call on delivery")

## 17. Support
- [ ] Any included revision/support window (per the SOW) tracked so it doesn't silently become unlimited free support

## 18. Monthly retainer (optional)
- [ ] Offered once, directly, after launch — not repeatedly chased if declined
- [ ] If accepted: Stripe subscription started per the billing-date rule in [`PaymentSystem.md`](PaymentSystem.md)
