# System Requirements Document

## Hosting
- **Platform:** Vercel (Hobby tier as of this writing)
- **Deploy trigger:** push to `main` on the connected GitHub repo (`PVAI-tech/Aegis-AI-Agency`)
- **Domain:** `aegishealthai.co.uk`, DNS managed through Wix (the registrar). Vercel's DNS records (A + CNAME) were added manually in Wix — see git history / prior session notes for the exact records if the domain ever needs re-pointing.

## Serverless function requirements
- `api/enquiry.js` runs on Vercel's Node.js runtime, auto-detected from the `/api` directory — no `vercel.json` function config needed.
- Requires `RESEND_API_KEY` set in Vercel's Environment Variables (Production) to actually send email. Without it, the endpoint still validates and responds successfully, but no email is sent (logged server-side only).
- Cannot be tested against the local static file server — see [`Testing.md`](Testing.md).

## Third-party dependencies (all runtime, no npm packages)
| Service | Purpose | Where |
|---|---|---|
| Resend | Transactional email for enquiry notifications | `api/enquiry.js` |
| Calendly | Booking widget + direct booking links | Embedded on homepage `#contact`, linked everywhere else |
| Google Fonts | Inter typeface | `<link>` in every page `<head>` |
| WhatsApp (`wa.me`) | Direct contact link | Floating button, footer, contact section |
| Google Analytics 4 / Google Tag Manager | Analytics | Present but **commented out** in every page `<head>` — inert until real IDs are pasted in |

## DNS/email note
The domain's DNS is on Wix, which does **not** support custom subdomain MX records — this blocked verifying `aegishealthai.co.uk` as a sending domain in Resend for the "custom MAIL FROM" / bounce-handling subdomain record. As of this writing, email sends from Resend's shared `onboarding@resend.dev` address rather than a `@aegishealthai.co.uk` address. See [`Roadmap.md`](Roadmap.md) for the options (move DNS to a provider like Cloudflare, or accept the shared sending address).

## Required manual setup for a fresh deployment
1. Connect the GitHub repo to a new Vercel project.
2. Add `RESEND_API_KEY` (and optionally `RESEND_FROM`) as environment variables.
3. Point the domain's DNS at Vercel (A record + CNAME, per Vercel's domain settings).
4. Verify `vercel.json`'s security headers are being served (`curl -I` the live domain and check for `content-security-policy`, etc.).
