# SEO

## What's in place

- `robots.txt` and `sitemap.xml` at the site root, listing every indexable page (legal pages included as of the rebrand; `thank-you.html` explicitly excluded via `noindex, nofollow` since it's a post-action page with no standalone search value).
- Unique, descriptive `<title>` and `<meta name="description">` on every page — not a repeated template string.
- `<link rel="canonical">` on every page, pointing at its own real URL — prevents duplicate-content issues if the site is ever reachable via multiple URLs (e.g. with/without `www`).
- Open Graph (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`) and Twitter Card tags (including `twitter:image`) on the homepage, the 4 case studies, `pricing.html`, and `enquiry.html` — shared links render a proper preview card with an image, not a bare URL. Legal/utility pages (privacy policy, terms, `thank-you.html`, etc.) intentionally have no OG tags, consistent with their low share-likelihood.
- `assets/og-image.png` (1200×630) — dark-theme graphic built from the client's actual logo (`assets/logo-icon.png`), not a stock/generic AI image.
- `application/ld+json` structured data (`ProfessionalService` schema) on the homepage — gives search engines a machine-readable summary of what the business is and how to contact it.
- Semantic heading structure (`h1` per page, `h2` for major sections) rather than styled `div`s standing in for headings.

## Known gap: no baseline Lighthouse SEO score

No automated Lighthouse SEO run has been captured against the live deployment yet — see [`Roadmap.md`](Roadmap.md) and [`Testing.md`](Testing.md).

## Content strategy notes (not yet executed)

- Each of the 4 case studies is already effectively a long-form content page targeting its client's industry — this is genuinely good for SEO (real, specific, non-generic content) but isn't yet supported by any deliberate keyword/content strategy beyond "describe the real project honestly."
- No blog or resources section exists. If organic search becomes a real acquisition channel (vs. the current paid-ads-focused design per [`PRD.md`](PRD.md)), that's the next lever — but don't add one just to "do content marketing" without a clear topic strategy first.
