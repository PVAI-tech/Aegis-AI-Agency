# SOP — Finance

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers invoicing, payment tracking, and basic bookkeeping across every client engagement.

## Who does this today
Laiba Sheikh, solo. No bookkeeper, no accounting software integration currently wired up.

## Process
1. **Every invoice uses [`templates/InvoiceTemplate.md`](../templates/InvoiceTemplate.md)** — consistent numbering, consistent line-item structure, so nothing is invoiced ad hoc.
2. **Never treat "invoice sent" as "paid.**" Deployment, handover, and any milestone gated on payment (see [`PaymentSystem.md`](../PaymentSystem.md)) require a verified payment confirmation — a Stripe `payment_intent.succeeded`/`invoice.paid` webhook once that's wired up, or a confirmed bank transfer today.
3. **Follow the deposit/milestone/final structure** documented in [`PricingStrategy.md`](../PricingStrategy.md) (50/50 under £2,500; 30/40/30 above) — don't improvise a different split per client without a documented reason.
4. **VAT status**: don't state a VAT registration position on any invoice or public page without first confirming the actual registered status — the site currently uses the deliberately conditional "prices exclude VAT where applicable" wording specifically because this hasn't been confirmed either way (see [`PRICING_POLICY.md`](../PRICING_POLICY.md)).
5. **Setup fees for Productised AI plans are non-refundable once implementation work begins** — per [`PRICING_POLICY.md`](../PRICING_POLICY.md); apply this consistently, don't negotiate it case by case without updating the policy doc first.
6. **Overage billing for Productised AI is manual-approval only today** — there is no automatic top-up billing live yet (`overagePolicy.automaticTopUps: "planned"` in [`assets/pricing-data.js`](../../assets/pricing-data.js)). Don't bill a client automatically for overage until that's actually built and tested.

## What "finance is in order" looks like, per client
Every invoice matches the signed SOW's payment schedule, every payment-gated milestone has a verified (not assumed) payment confirmation behind it, and nothing has been invoiced that wasn't in the original scope without going through a Change Request first.

## Common failure mode to avoid
Assuming a payment cleared based on the client saying "I've sent it" — always confirm against the actual payment processor or bank statement before unlocking the next milestone.

## Handoff notes for a future hire
Needs access to Stripe (once wired up) or bank statements, the invoice template, and the pricing/payment docs above. This is the one function where a mistake (releasing work before payment clears) is hardest to reverse — treat verification here as non-negotiable, not a formality.
