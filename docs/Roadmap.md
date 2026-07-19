# Roadmap

Real, known open items — not aspirational feature ideas.

## Known gaps, not yet scheduled
- **Resend sending domain**: currently sends from the shared `onboarding@resend.dev` address because Wix's DNS can't create the subdomain MX record Resend wants for a verified custom sending domain. Confirmed via live testing that this also restricts recipients to the account's own registered email (`aegishealthai@outlook.com`) only — see [`PaymentSystem.md`](PaymentSystem.md). Options: move DNS to a provider that supports it (e.g. Cloudflare), or accept the shared address and single-recipient limit.
- **No Lighthouse baseline** has been captured against the live deployment. Should be done once, then re-checked after any large change.
- **No automated tests** exist (see [`Testing.md`](Testing.md)) — the manual verification approach used during the rebuild works but doesn't protect against future regressions the same way a real test suite would.
- **Jarvis is not connected to a real AI backend** — see [`Agents.md`](Agents.md). Revisit the "AI Business Consultant" framing once real usage data exists.
- **CRM / Google Sheets / Jarvis-dashboard logging** for enquiries are stubbed but not implemented (`api/enquiry.js`'s `notifyChannels()`) — only the two email notifications are live.
- ~~Stripe webhook not registered~~ — **done.** `api/stripe-webhook.js` is live, registered, and confirmed working end-to-end via a real Stripe CLI-forwarded event. See [`PaymentSystem.md`](PaymentSystem.md).
- **Real usage metering for Productised AI** does not exist — see [`UsageMetering.md`](UsageMetering.md) for the full architecture required (a real AI backend, a database, and an alerting/pause mechanism) and the product/infra decisions that need making first.

## Explicitly out of scope unless requested
- A blog or content-marketing section.
- User accounts or a client portal.
