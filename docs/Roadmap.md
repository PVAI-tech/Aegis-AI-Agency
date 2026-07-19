# Roadmap

Real, known open items — not aspirational feature ideas.

## Known gaps, not yet scheduled
- **Resend sending domain**: currently sends from the shared `onboarding@resend.dev` address because Wix's DNS can't create the subdomain MX record Resend wants for a verified custom sending domain. Options: move DNS to a provider that supports it (e.g. Cloudflare), or accept the shared address.
- **No Lighthouse baseline** has been captured against the live deployment. Should be done once, then re-checked after any large change.
- **No automated tests** exist (see [`Testing.md`](Testing.md)) — the manual verification approach used during the rebuild works but doesn't protect against future regressions the same way a real test suite would.
- **Jarvis is not connected to a real AI backend** — see [`Agents.md`](Agents.md). Revisit the "AI Business Consultant" framing once real usage data exists.
- **CRM / Google Sheets / Jarvis-dashboard logging** for enquiries are stubbed but not implemented (`api/enquiry.js`'s `notifyChannels()`) — only the two email notifications are live.
- **Stripe webhook is built (`api/stripe-webhook.js`) but not yet registered with Stripe.** See [`PaymentSystem.md`](PaymentSystem.md)'s "Remaining setup steps" — needs `STRIPE_SECRET_KEY`/`STRIPE_PUBLISHABLE_KEY` added to Vercel, the webhook endpoint registered in the Stripe Dashboard, and `STRIPE_WEBHOOK_SECRET` added once Stripe generates it. Not yet exercised against a real Stripe-sent event.
- **Real usage metering for Productised AI** does not exist — see [`UsageMetering.md`](UsageMetering.md) for the full architecture required (a real AI backend, a database, and an alerting/pause mechanism) and the product/infra decisions that need making first.

## Explicitly out of scope unless requested
- A blog or content-marketing section.
- User accounts or a client portal.
