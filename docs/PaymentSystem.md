# Payment System — Stripe Architecture

**Status: live-tested and working.** `api/stripe-webhook.js` is deployed, registered as a webhook destination in the Stripe Dashboard (URL: `https://aegishealthai.co.uk/api/stripe-webhook`, 5 events), and confirmed end-to-end using `stripe listen --forward-to` + `stripe trigger payment_intent.succeeded`: signature verification passed, the event was processed, and the internal notification email was delivered to `aegishealthai@outlook.com`.

**Security note (resolved):** the secret/publishable keys were originally shared directly in a chat session rather than added straight to Vercel, which the original version of this document explicitly asked to avoid. Both were subsequently rotated in the Stripe Dashboard and the new values added to Vercel — the strings that were typed into chat are no longer valid.

**Bug found and fixed during live testing:** the first real end-to-end test returned `200` (signature verified correctly) but no notification email arrived. Vercel's function logs showed Resend rejecting the send with `403 validation_error: "You can only send testing emails to your own email address"` — expected behavior while sending from the shared `onboarding@resend.dev` sandbox address (see "Remaining known gap" below), but the address it was checking against didn't match. Root cause: `INTERNAL_INBOX` was hardcoded as `Aegishealthai@outlook.com` (capital "A") in both `api/enquiry.js` and `api/stripe-webhook.js`, while the actual Resend/Stripe account email is `aegishealthai@outlook.com` (lowercase) — Resend's sandbox restriction does an exact, case-sensitive match. Fixed in both files. This means **`api/enquiry.js`'s notification emails had likely never actually been delivered in production either**, since nobody had done a live end-to-end test of it until this session — the same silent failure would have applied there the whole time.

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

## The serverless function this required — built

`api/stripe-webhook.js` (built):
1. Disables Vercel's default JSON body parser (`handler.config = { api: { bodyParser: false } }`) and reads the raw request body via `api/_lib/readRawBody.js` — Stripe signs the exact raw bytes it sent, and a re-serialized/re-parsed body won't reliably match byte-for-byte.
2. Verifies the webhook signature using `STRIPE_WEBHOOK_SECRET` via `api/_lib/stripeSignature.js` — a hand-rolled HMAC-SHA256 check following Stripe's [publicly documented algorithm](https://stripe.com/docs/webhooks/signatures#verify-manually) exactly, including a 300-second replay-tolerance window. Implemented by hand instead of the `stripe` npm package to keep this project's zero-dependency architecture (see `ADR.md`, `TRD.md`). Requests with a missing, malformed, tampered, or expired signature are rejected with `400` before any event data is trusted.
3. Handles `payment_intent.succeeded` / `invoice.paid` → sends an internal notification email (reusing the Resend pattern from `api/enquiry.js`, now shared via `api/_lib/email.js`) with the amount, currency, and customer email (looked up via the Stripe REST API using `STRIPE_SECRET_KEY` if not present directly on the event).
4. Handles `customer.subscription.created` / `.updated` / `.deleted` → same notification pattern, with subscription status.
5. Never trusts client-side confirmation of payment — only the verified server-side webhook is authoritative, consistent with the enquiry form's existing principle that client-side success doesn't mean the server-side action actually happened.
6. Any other event type is acknowledged with `200` but intentionally not acted on.

Tested locally with a mocked `req`/`res` script (per the pattern in `docs/Testing.md`): confirmed correct behavior for a valid signature, a missing signature header, a tampered payload, an expired/replayed timestamp, an unhandled event type, and a missing `STRIPE_WEBHOOK_SECRET`. Not yet exercised against a real Stripe-sent event — that requires the endpoint to be deployed and registered (see below).

## Required environment variables

- `STRIPE_SECRET_KEY` — provided; add to Vercel (Production scope) if not already done. Used for server-side API calls (looking up a customer's email when an event doesn't include it directly).
- `STRIPE_PUBLISHABLE_KEY` — provided; add to Vercel. Not currently used by any code (no custom checkout UI is built — this project uses the Payment-Links-first approach), kept for when one is.
- `STRIPE_WEBHOOK_SECRET` — **not yet available.** Generated by Stripe only after the webhook endpoint is registered — see the next section.

## Setup steps completed

1. ~~Add `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` to Vercel~~ — done (values rotated after the chat-sharing incident above).
2. ~~Register the webhook destination in the Stripe Dashboard~~ — done. URL: `https://aegishealthai.co.uk/api/stripe-webhook`, listening to all 5 events: `payment_intent.succeeded`, `invoice.paid`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
3. ~~Add `STRIPE_WEBHOOK_SECRET` to Vercel~~ — done.
4. ~~End-to-end test~~ — done via `stripe listen --forward-to <live URL>` + `stripe trigger payment_intent.succeeded`, after temporarily swapping `STRIPE_WEBHOOK_SECRET` to the listener's own secret and reverting it afterward. Found and fixed the email-casing bug above.

## Remaining

- **Resend sandbox restriction still applies** — `api/enquiry.js` and `api/stripe-webhook.js` can currently only send to `aegishealthai@outlook.com`, because no custom sending domain is verified yet (see `docs/Roadmap.md`). If a second person ever needs their own notification address, or a client-facing email needs a different recipient, this restriction needs a verified domain first.
- Your actual Stripe account's product/price IDs, once the tiers in [`PricingStrategy.md`](PricingStrategy.md) are finalized — created in the Stripe Dashboard (Products → Add Product), referenced by ID wherever Payment Links/Invoices are generated, not hardcoded.
