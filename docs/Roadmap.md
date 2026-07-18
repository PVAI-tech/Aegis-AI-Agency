# Roadmap

Real, known open items — not aspirational feature ideas.

## Known gaps, not yet scheduled
- **`og:image`**: no real 1200×630 social-preview graphic exists. This needs actual design work using the client's now-final logo (`assets/logo-full-lockup.png` / `assets/logo-icon.png`) — not something to auto-generate.
- **Resend sending domain**: currently sends from the shared `onboarding@resend.dev` address because Wix's DNS can't create the subdomain MX record Resend wants for a verified custom sending domain. Options: move DNS to a provider that supports it (e.g. Cloudflare), or accept the shared address.
- **No Lighthouse baseline** has been captured against the live deployment. Should be done once, then re-checked after any large change.
- **No automated tests** exist (see [`Testing.md`](Testing.md)) — the manual verification approach used during the rebuild works but doesn't protect against future regressions the same way a real test suite would.
- **Jarvis is not connected to a real AI backend** — see [`Agents.md`](Agents.md). Revisit the "AI Business Consultant" framing once real usage data exists.
- **CRM / Google Sheets / Jarvis-dashboard logging** for enquiries are stubbed but not implemented (`api/enquiry.js`'s `notifyChannels()`) — only the two email notifications are live.
- **Stripe is not yet wired into the codebase.** Architecture is planned (see [`PaymentSystem.md`](PaymentSystem.md)) and the client has a Stripe account, but no `api/stripe-*` code exists yet — needs real API keys shared and confirmed before implementation starts.
- **Real usage metering for Productised AI** does not exist — see [`UsageMetering.md`](UsageMetering.md) for the full architecture required (a real AI backend, a database, and an alerting/pause mechanism) and the product/infra decisions that need making first.

## Explicitly out of scope unless requested
- A blog or content-marketing section.
- User accounts or a client portal.
