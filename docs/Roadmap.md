# Roadmap

Real, known open items — not aspirational feature ideas.

## In progress
- **Logo replacement**: the client is replacing the current custom geometric mark with their own design. Once ready, it needs to go into `assets/favicon.svg` and the inline SVG used in every page's nav/footer/loader/hero (currently the same nested-hexagon path repeated ~22 times across the 7 pages).
- **Legal pages**: Privacy Policy, Terms of Service, Cookie Policy, and a GDPR notice do not exist yet — flagged as a Critical item in `WEBSITE_AUDIT.md` since the enquiry form collects real personal data. Needs real facts from the business owner (entity type, registered address, data retention practice) before drafting — placeholders for genuinely unknown facts, not invented ones.

## Known gaps, not yet scheduled
- **`og:image`**: no real 1200×630 social-preview graphic exists. This needs actual design work (ideally using the client's final logo, once decided) — not something to auto-generate.
- **Resend sending domain**: currently sends from the shared `onboarding@resend.dev` address because Wix's DNS can't create the subdomain MX record Resend wants for a verified custom sending domain. Options: move DNS to a provider that supports it (e.g. Cloudflare), or accept the shared address.
- **No Lighthouse baseline** has been captured against the live deployment. Should be done once, then re-checked after any large change.
- **No automated tests** exist (see `Testing.md`) — the manual verification approach used during the rebuild works but doesn't protect against future regressions the same way a real test suite would.
- **Jarvis is not connected to a real AI backend** — see `Agents.md`. Revisit the "AI Business Consultant" framing once real usage data exists.
- **CRM / Google Sheets / Jarvis-dashboard logging** for enquiries are stubbed but not implemented (`api/enquiry.js`'s `notifyChannels()`) — only the two email notifications are live.

## Explicitly out of scope unless requested
- Payment processing / Stripe — the brief that drove the rebrand referenced "preserving the Stripe integration," but no Stripe integration has ever existed in this codebase. If checkout/payment is actually wanted, that's a real scoping conversation, not something to add quietly.
- A blog or content-marketing section.
- User accounts or a client portal.
