# Non-Functional Requirements Document

## Security
See `Security.md` for full detail. Summary: security headers + CSP live via `vercel.json`, rate limiting on the enquiry endpoint, all user input HTML-escaped before being placed in emails. Known tradeoff: CSP allows `'unsafe-inline'` for scripts/styles (see `Security.md` for why).

## Accessibility
- Modal engine (`assets/modal.js`) implements focus trap, ESC-to-close, click-outside-to-close, and focus restoration.
- Service cards are keyboard-operable (`role="button"`, `tabindex="0"`, Enter/Space handling).
- Jarvis widget and modals carry `aria-haspopup`, `aria-expanded`, `aria-modal`, `aria-label` attributes.
- No automated accessibility audit (axe-core/Lighthouse) has been run yet against the live site — see `Roadmap.md`.
- Text contrast was manually verified for the rebranded palette: body text on background passes WCAG AA (18:1); muted text passes AA (5.87:1). The accent color, used for buttons/large text/icons only (never small body copy), passes AA for large text (4.0:1) but not for small text — this constraint is intentional and should be respected in future changes.

## Performance
- All images carry explicit `width`/`height` (fixed during the rebrand) to prevent layout shift.
- Lazy-loading on below-fold images.
- No animation runs continuously in the background anymore (the old particle canvas and mouse-glow effects were removed as part of the rebrand — they served no functional purpose and cost CPU/battery on every page view).
- No Lighthouse baseline captured yet against the live deployment.

## Reliability
- The enquiry endpoint validates every required field server-side (not just client-side) and never 500s on a downstream email-provider failure — a failed `notifyChannels()` call is logged but the enquiry itself still returns success, since the enquiry data itself was valid regardless of whether the notification succeeded.
- Rate limiting is in-memory and per-serverless-instance (documented limitation in `api/enquiry.js` and `Security.md`) — sufficient for current traffic, not a hard guarantee at scale.

## Browser/device support
See `TRD.md`. No legacy-browser polyfills. Mobile experience has been explicitly tested and fixed for real (not assumed) issues — see the WhatsApp/hero-overlap fix in git history as an example of testing rather than assuming.
