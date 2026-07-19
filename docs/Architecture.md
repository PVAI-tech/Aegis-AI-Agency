# Architecture

## File structure

```
index.html                     Homepage — hero, services, portfolio, pricing (Custom Development), about, FAQ, contact
pricing.html                    Full pricing page — Custom Development (Motion 1) + Productised AI (Motion 2)
enquiry.html                   Qualifying enquiry form (supports ?plan= pre-fill from pricing.html)
thank-you.html                 Post-submission confirmation + next-steps timeline
case-study-*.html (x4)         Individual portfolio project pages
7 legal pages                  privacy-policy, terms-of-service, cookie-policy, ai-usage-policy,
                                ai-disclaimer, data-processing-notice, accessibility-statement
api/
  enquiry.js                   Validates + emails enquiry submissions
  stripe-webhook.js             Verifies + handles Stripe payment/subscription webhook events
  _lib/                          Shared helpers (not routes — Vercel ignores underscore-prefixed paths)
    email.js                     Resend send wrapper
    text.js                      escapeHtml() / sanitizeForSubject()
    stripeSignature.js            Manual HMAC-SHA256 webhook signature verification
    stripeApi.js                  Minimal Stripe REST client (customer lookups)
    readRawBody.js                 Raw request body reader (needed for signature verification)
assets/
  site.css                     Every design token, every shared style — loaded on every page
  site.js                      Loader, nav, mobile menu, reveal-on-scroll, FAQ toggle — loaded on every page
  modal.js                     Shared modal engine (focus trap, ESC/click-outside close) — used by service
                                modals and the exit-intent audit modal
  jarvis.js                    The Jarvis AI widget (canned responses today, one swap point for a real API)
  conversion.js                Sticky CTA, floating-button visibility, exit-intent/scroll-depth audit modal
  enquiry-form.js               Client-side validation + submission for enquiry.html
  pricing-data.js                Single source of truth for Productised AI plans/policies — see PRICING_POLICY.md
  pricing-render.js              Renders pricing cards/table/accordion/FAQ from pricing-data.js
  favicon.png                  Favicon (cropped from the client's logo)
  logo-icon.png                 Shield icon (client's logo, background removed) — used in nav/footer/loader/hero
  logo-full-lockup.png          Full shield+wordmark lockup — reference/print only, black text unreadable on dark UI
  og-image.png                  Social-preview graphic (1200x630), built from logo-icon.png
  screenshots/                 Real product screenshots used in the 4 case studies
vercel.json                    Security headers (CSP, HSTS, etc.) — see Security.md
manifest.json, robots.txt, sitemap.xml   Standard PWA/SEO scaffolding
docs/                          This documentation, including sops/ (12 department SOPs) and templates/ (client-facing document templates)
WEBSITE_AUDIT.md                Most recent full-site audit
```

## Why HTML isn't shared across pages

There's no templating engine (see [`ADR.md`](ADR.md)), so the nav, footer, loader markup, and floating-widget markup are copy-pasted byte-for-byte across all 7 pages. This is the single riskiest part of the architecture: a change to shared boilerplate (e.g. adding a nav link) has to be applied identically 7 times by hand or by a careful find-and-replace script — there's no compiler to catch a page that got missed. When editing shared boilerplate, grep across all `*.html` files to confirm the change landed everywhere it should.

## The service-modal data flow

`index.html` defines `window.SERVICES_DATA` (an object keyed by service slug) inline in a `<script>` tag, and each service card's click handler looks up its own data and calls `window.openModal()` (from `modal.js`) with a generated HTML string. This is the pattern to follow for any new service: add an entry to `SERVICES_DATA`, add a card with a matching `data-service` attribute — no other file needs to change.

## The Jarvis widget's API-readiness

`assets/jarvis.js`'s `getJarvisResponse(promptText)` is the only function that would need to change to connect a real AI backend — everything else (typing indicator, message rendering, panel open/close, focus handling) already works against whatever this function returns. See the header comment in that file.

## Conversion feature interactions

`conversion.js` manages three independent pieces of state, each guarded so it safely no-ops on pages that don't have the relevant element: the sticky CTA bar (shows once the hero scrolls out of view), the floating WhatsApp/Jarvis buttons (hidden while the hero is in view, mobile only — added to fix a real overlap bug), and the once-per-session exit-intent/scroll-depth audit modal.
