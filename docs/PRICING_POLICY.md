# Pricing Policy — Productised AI

The commercial rules behind the Productised AI pricing shown on `pricing-mockup.html`. Read alongside [`PricingStrategy.md`](PricingStrategy.md) (the original numbers/reasoning) and [`PaymentSystem.md`](PaymentSystem.md) (the Stripe architecture these rules will eventually run on).

## The model: setup fee + monthly service fee

Every plan separates a **one-time setup fee** (configuring, branding, testing and launching the assistant) from a **monthly service fee** (hosting, included AI usage, monitoring, support). This is stated plainly on the page, not buried — both numbers are shown at equal visual prominence on every card, contrary to the earlier draft where the setup fee was in small muted text.

## Usage definition

**Provisional definition:** a conversation is one customer chat session lasting up to 24 hours and containing up to 20 user messages.

**Why "provisional":** the current Jarvis widget has no backend and no usage logging (see [`Database.md`](Database.md), [`Agents.md`](Agents.md)) — there is no live system today that could actually measure this definition for a real subscriber. This is stated openly on the pricing page itself, not hidden. **No client should be billed against a usage limit until real metering exists to enforce it fairly.** Until then, these are directional numbers used for planning and quoting, not a live enforcement mechanism.

**Knowledge sources:** one approved source = one webpage, one FAQ document, one PDF, or one approved product/service file, subject to file-size and content-volume limits assessed at onboarding — a 500-page document is not automatically "one source."

## Overage and usage-limit policy

- Alerts at 70%, 90% and 100% of the monthly allowance.
- **Overages are never charged unexpectedly.** The client chooses one of: a manual top-up (approved before being applied), or the assistant pausing at the limit until the next billing cycle.
- **Automatic top-up billing is planned, not implemented** — Stripe overage billing isn't configured yet (see [`PaymentSystem.md`](PaymentSystem.md)). Don't advertise automatic billing as live until it actually is.
- Usage resets each billing period; unused allowance does not roll over.
- Overage rates: £15 (Starter), £12 (Professional), £10 (Business) per additional 100 conversations. Enterprise overage is individually agreed.

## Minimum term, billing, cancellation

- **Minimum term:** three months following launch, then continues monthly.
- **Billing:** starts on the launch date, billed in advance each period.
- **Cancellation:** takes effect at the end of the current billing period; outstanding invoices remain payable.
- **Setup fee refunds:** non-refundable once implementation work begins.
- **Data export:** available on request at the end of an engagement.

All of the above is a **summary for the pricing page**, explicitly marked there as subject to the final signed service agreement — this document and the page do not themselves constitute that agreement.

## WhatsApp and other channel add-ons

WhatsApp is **not** presented as simply "included" on Professional/Business — it's shown as "available as an add-on, subject to technical scoping," because no WhatsApp Business API integration exists in this codebase today (only a static contact link, unrelated). Third-party messaging fees from Meta/WhatsApp are the client's responsibility, stated explicitly. The same caution applies to "voice" on Enterprise — labeled optional/subject to scoping, not claimed as operational.

## What's explicitly excluded from standard plans

See the `exclusions` array in [`../assets/pricing-data.js`](../assets/pricing-data.js) for the full list (bespoke app development, complex CRM migration, mobile apps, unlimited usage/revisions, regulated medical/legal/financial decision-making, etc.) — each is available by separate quotation, not silently assumed to be out of scope with no path forward.

## Trust and AI-safety framing

The page states plainly: AI responses may contain errors and should not replace professional medical, legal or financial advice. No blanket compliance claim (GDPR, EU AI Act, UK medical-device rules) is made — regulated/high-risk projects are flagged as needing additional discovery, human oversight and compliance review. This mirrors the site's existing [AI Disclaimer](/ai-disclaimer.html) and [AI Usage Policy](/ai-usage-policy.html).

## Features requiring technical scoping before being sold as a fixed feature

- WhatsApp integration (any tier)
- Voice/omnichannel (Enterprise)
- Any non-standard CRM integration beyond the one standard integration on Business
- Any add-on beyond the "from" price shown in `pricing-data.js`'s `addOns` array
