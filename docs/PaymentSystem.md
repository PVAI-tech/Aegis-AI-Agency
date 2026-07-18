# Payment System — Stripe Architecture

**Status: architecture plan, not yet wired to your live Stripe account.** Same pattern as this project's Resend email integration — the seam is designed now so connecting it later is a small, safe change, not a rebuild. Actual implementation (the code in `api/`) is the next concrete step once you're ready to share the relevant Stripe API keys; this document is what that code will be built against.

## Which Stripe products map to which payment type

| Your requirement | Stripe product | Why |
|---|---|---|
| Deposit payment | **Stripe Payment Links** | One-off, no checkout code to build — generate a link per project from the Stripe Dashboard or via API, send it in the proposal email |
| Milestone payment | **Stripe Invoicing** | Lets you itemize what the milestone covers; auto-reminds the client if unpaid |
| Final payment | **Stripe Invoicing** | Same as above; triggers the ownership-transfer webhook (see below) |
| Monthly subscription (Productized AI / Managed Services) | **Stripe Billing (Subscriptions)** | Handles recurring billing, proration, and dunning (failed-payment retries) automatically |
| Automatic invoices | Native to Invoicing + Billing | Stripe generates and emails these itself once configured — no custom code needed |
| Customer portal | **Stripe Customer Portal** | Pre-built by Stripe — lets subscribers update payment methods, view invoices, or cancel without you handling it manually |
| Payment links | Stripe Payment Links | As above |
| Receipts | Native to Stripe Checkout/Invoicing | Auto-emailed on successful payment |
| Subscription management | Stripe Billing + Customer Portal | Upgrades/downgrades/cancellations self-service |

## Exactly when each event happens

This is the part your brief explicitly asked to be precise about — vague timing is how agencies end up doing free work or losing IP:

- **Deposit payment** happens after the Statement of Work is signed, before any development work starts.
- **Stripe invoice generation** for the deposit happens the moment the SOW is signed (manually triggered by you sending the Payment Link, or automatically if you build the SOW-signing step through a service that can call the Stripe API on completion — not required for a v1).
- **Milestone payment** is invoiced when the agreed milestone (e.g. design sign-off, working demo) is reached — invoiced by you at that point, not on a fixed calendar date.
- **Final payment** is invoiced once the client has completed review/UAT and approved the delivered work.
- **Ownership of code/assets transfers, deployment happens, and source code is handed over only once the final payment's Stripe webhook (`payment_intent.succeeded` or `invoice.paid`, depending on which product is used) actually fires** — not when the invoice is merely sent. This is a real, enforceable trigger point, not a trust-based step: practically, this means the actual production deployment and the code handover (e.g. a GitHub repo transfer or zip export) are gated on that webhook, ideally via a small serverless function that listens for it (see `api/stripe-webhook.js` below) rather than you manually checking your bank account before remembering to deploy.
- **Subscription billing begins** on a clean date — recommended: the 1st of the month following project launch (for Custom Development clients converting to a retainer) or immediately on signup (for Productized AI clients, who are buying the subscription as the primary product, not an add-on).

## The one new serverless function this requires

`api/stripe-webhook.js` (not yet built) would:
1. Verify the webhook signature using `STRIPE_WEBHOOK_SECRET` (critical — an unverified webhook endpoint is a real vulnerability; anyone could POST a fake "payment succeeded" event otherwise).
2. Handle `payment_intent.succeeded` / `invoice.paid` → mark the relevant milestone/deposit/final payment as received (log it, notify you via email — reusing the same Resend pattern already built for enquiry notifications).
3. Handle `customer.subscription.created` / `.updated` / `.deleted` → track subscription status for Managed Services / Productized AI clients.
4. Never trust client-side confirmation of payment — only the server-side webhook, verified, is authoritative. (Same principle already applied to the enquiry form: client-side success doesn't mean the server-side action actually happened.)

## Required environment variables (once you're ready)

- `STRIPE_SECRET_KEY` — server-side API calls (creating invoices, checking subscription status).
- `STRIPE_WEBHOOK_SECRET` — verifying incoming webhook signatures.
- `STRIPE_PUBLISHABLE_KEY` — only needed if a custom checkout UI is built later; not required for the Payment-Links-first approach recommended here.

## What I need from you to actually build this

1. Confirmation you want to proceed with implementation now (vs. later).
2. The three keys above, added as Vercel environment variables (same process as `RESEND_API_KEY` — I won't ask you to paste secret keys directly into chat; add them in the Vercel dashboard and confirm once done).
3. Your actual Stripe account's product/price IDs once the tiers in `PricingStrategy.md` are finalized — these get created in the Stripe Dashboard (Products → Add Product) and referenced by ID in the webhook/checkout code, not hardcoded prices.
