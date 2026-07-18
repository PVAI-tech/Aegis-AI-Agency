# Database

**There isn't one.** This is a deliberate architectural choice, not a gap — see [`ADR.md`](ADR.md) for the full reasoning (static site, no build tooling, minimal moving parts for a marketing/lead-gen site).

## Where data actually lives instead

| Data | Where it lives |
|---|---|
| Enquiry form submissions | Not persisted anywhere — validated, then emailed via Resend to the internal inbox and the enquirer (see [`API.md`](API.md)). If no one reads the email, the data is effectively gone. This is the single biggest operational gap once enquiry volume grows — see below. |
| Rate-limiting state | In-memory `Map` inside the `api/enquiry.js` serverless function — resets on cold start, not persisted (see [`Security.md`](Security.md)) |
| Jarvis chat conversations | Not stored at all — processed client-side only, per [`Agents.md`](Agents.md) |
| Site content (portfolio, pricing, copy) | Hardcoded in the HTML/CSS/JS files themselves, not a CMS |

## When this needs to change

The moment enquiry volume makes "read every notification email manually" unworkable, or the Productized AI line ([`BusinessModel.md`](BusinessModel.md)) needs to track client subscriptions/usage, a real data store becomes necessary. Recommended options at that point, roughly in order of effort:
1. **A lightweight structured store for enquiries** — even a Google Sheet appended via a serverless function would be a large improvement over "email only," and was already scoped as a TODO in `api/enquiry.js`'s `notifyChannels()` function.
2. **Vercel Postgres or a similar managed Postgres** — once there's a real need to query/report on client data (e.g. for Managed Services usage tracking), not before.
3. **Stripe itself** — once [`PaymentSystem.md`](PaymentSystem.md) is implemented, Stripe's own dashboard already tracks customers/subscriptions; don't build a parallel database for data Stripe already holds.

Don't add a database before one of these triggers actually happens — an unused database is complexity with no offsetting benefit, which is exactly the trap the current architecture was built to avoid.
