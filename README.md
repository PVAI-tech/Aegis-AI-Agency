# Aegis AI Agency — Website

The marketing site and enquiry pipeline for Aegis AI Agency, a UK-based agency building websites, automation and AI tools for small businesses. Live at [aegishealthai.co.uk](https://aegishealthai.co.uk).

## Stack

Static HTML/CSS/JS. No framework, no build step, no bundler — deliberately (see `docs/ADR.md`). One Vercel serverless function (`api/enquiry.js`) handles the enquiry form backend.

- **Pages:** `index.html`, `enquiry.html`, `thank-you.html`, four `case-study-*.html` pages
- **Shared assets:** `assets/site.css`, `assets/site.js` (loaded on every page), plus feature-specific JS (`modal.js`, `jarvis.js`, `conversion.js`, `enquiry-form.js`)
- **Backend:** `api/enquiry.js` — validates and emails enquiry submissions via Resend
- **Hosting:** Vercel, auto-deploys on push to `main`

## Local development

There's no build step. Serve the directory with any static file server:

```
python3 -m http.server 8756
```

`api/enquiry.js` will **not** run under this local server — it's a Vercel serverless function. The enquiry form degrades gracefully locally (see the header comment in `assets/enquiry-form.js`) and still redirects to the thank-you page so the client-side flow is testable without a deployment.

## Deployment

Push to `main` — Vercel auto-deploys. See `docs/Deployment.md` for domain/DNS/environment-variable setup.

## Documentation

See `docs/` for architecture, security posture, API reference, testing approach, and product/technical requirements. See `WEBSITE_AUDIT.md` for the most recent full site audit.
