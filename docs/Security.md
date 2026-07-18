# Security

## What's in place

**Security headers** (`vercel.json`, applied to every route, verified live via `curl -I`):
- `Content-Security-Policy` — `default-src 'self'`, explicitly allowlisting only the domains the site actually loads (Google Fonts, Calendly, Google Tag Manager for when analytics is activated). Audited against a full grep of every external `src`/`href` in the codebase before writing, not guessed.
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN` + CSP `frame-ancestors 'self'` (clickjacking protection, belt and braces)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — denies geolocation/microphone/camera (none are used)
- `Strict-Transport-Security` — 2-year max-age, includeSubDomains, preload

**Known CSP tradeoff:** `script-src`/`style-src` include `'unsafe-inline'`. The site uses inline `onclick=` handlers and inline `style=` attributes extensively throughout every page. A stricter nonce- or hash-based CSP would require refactoring every inline handler to `addEventListener` and every inline style to a class — a substantial change that hasn't been done. This is a real, accepted weakening of the CSP's XSS protection; it's not an oversight.

**Input handling on the enquiry endpoint (`api/enquiry.js`):**
- Every field is validated server-side (not just client-side) before processing.
- Email format validated with a regex.
- Every user-supplied field is HTML-escaped (`escapeHtml()`) before being placed into the email bodies sent via Resend — this was a real vulnerability found and fixed during the rebrand: fields were originally interpolated unescaped into HTML emails, meaning a submission could inject arbitrary markup into an email a real person opens.
- Fields used in the email **subject line** have newlines stripped (`sanitizeForSubject()`) to prevent header-injection-style smuggling.

**Rate limiting:** `api/enquiry.js` limits to 5 submissions per 10 minutes per IP (`x-forwarded-for`), returning `429` on the 6th. Implemented as an in-memory `Map` — deliberately simple, with a documented limitation: it resets on every cold start and isn't shared across concurrent serverless instances, so it's "best effort," not a hard guarantee. If real abuse ever shows up, the upgrade path is an external store (Upstash Redis or Vercel KV).

## What's explicitly NOT done (known gaps)

- **No CSRF token** on the enquiry form. Low risk in practice (the endpoint only accepts a specific field shape and doesn't perform any state-changing action beyond sending email/rate-limit bookkeeping), but worth revisiting if the form's capability ever expands (e.g. to accept file uploads or trigger payments).
- **No automated dependency/vulnerability scanning** — there are no npm dependencies to scan (see `TRD.md`), but the CDN-hosted Google Fonts/Calendly/GTM scripts are trusted third parties without subresource integrity (SRI) hashes.
- **No WAF or DDoS protection** beyond whatever Vercel provides by default on the Hobby tier.
- **No logging/alerting on repeated rate-limit hits** — a sustained attack would currently just silently return 429s rather than notify anyone.

## Reporting

There's no dedicated security contact or disclosure process set up yet. If this becomes a real concern (e.g. once the site handles higher-value client data), add a `security.txt` and a stated response-time commitment.
