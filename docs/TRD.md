# Technical Requirements Document

## Stack

| Layer | Choice | Why |
|---|---|---|
| Markup/styling | Static HTML + one shared CSS file (`assets/site.css`) | No build tooling risk on a site serving paid ad traffic; see [`ADR.md`](ADR.md) |
| Client JS | Vanilla JS, split by feature (`site.js`, `modal.js`, `jarvis.js`, `conversion.js`, `enquiry-form.js`) | No framework overhead needed for this scope |
| Backend | One Vercel serverless function (`api/enquiry.js`) | Auto-detected by Vercel with zero config; only the enquiry form needs server logic |
| Email | Resend (HTTP API via `fetch`, no SDK) | Avoids adding a dependency that would require a build step |
| Hosting | Vercel | Git-push deploys, serverless functions, custom domain, all already in place |
| Booking | Calendly (embedded widget + direct links) | Third-party, no integration work needed |

## Environment variables (Vercel)

- `RESEND_API_KEY` — required for `api/enquiry.js` to send emails. Without it, enquiries still validate and return `200`, but `notifyChannels()` fails silently (logged server-side) — see [`Security.md`](Security.md).
- `RESEND_FROM` — optional, defaults to `Aegis AI <onboarding@resend.dev>` until the domain is verified in Resend.

## Browser support

No specific legacy-browser support target. Uses modern CSS (`:has()`, custom properties, `backdrop-filter`) and modern JS (`fetch`, `IntersectionObserver`, template literals) without polyfills. Effectively targets evergreen Chrome/Safari/Firefox/Edge.

## Performance targets

No automated Lighthouse baseline has been captured yet against the live deployment (see [`Roadmap.md`](Roadmap.md)). Known-good practices already in place: `loading="lazy"` on below-fold images, explicit `width`/`height` on every image (fixed as part of the rebrand — see git history), `font-display=swap` on Google Fonts.

## Key technical constraints

- No `node_modules`, no `package.json`, no bundler — any future dependency must either be loadable via a plain `<script src>`/`fetch` or requires revisiting this constraint deliberately (not silently).
- `api/enquiry.js` cannot be exercised by the local static file server — see [`Testing.md`](Testing.md).
