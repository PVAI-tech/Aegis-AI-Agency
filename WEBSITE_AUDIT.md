# Aegis AI Agency — Website Audit

**Date:** 2026-07-18
**Scope:** All 7 pages (`index.html`, `enquiry.html`, `thank-you.html`, 4 case studies), shared assets (`assets/*.css`, `assets/*.js`), backend (`api/enquiry.js`), and deployment config.
**Method:** Direct code review, grep-based pattern audits, manual contrast calculation, and functional testing in a local preview browser. Not a substitute for a real Lighthouse/axe-core run against the live deployment — see Opportunities for that gap.

**Honest framing:** this site is functionally solid — every link works, the enquiry pipeline is real, there are no fabricated stats left. The problems below are about *why it reads as AI-generated* and *why it can't yet support £5k–£25k invoices*, not about broken features.

---

## Critical Issues

These actively damage trust, security, or legal standing. Fix before taking on real client money.

1. **User input is injected unescaped into HTML emails.** [`api/enquiry.js:84-116`](api/enquiry.js) interpolates `enquiry.fullName`, `enquiry.businessName`, `enquiry.projectDescription`, etc. directly into HTML email templates via template literals with zero escaping. Anyone submitting the enquiry form can inject arbitrary HTML/CSS into both the client-confirmation and internal-notification emails — a phishing/spoofing vector, and it renders broken if a user's name or business contains an ampersand or angle bracket. Needs an HTML-escape helper on every interpolated field. Additionally, `enquiry.businessName`/`enquiry.urgency` land straight in the email **subject line** with no newline stripping — a CRLF injection risk depending on how Resend parses that field.

2. **No rate limiting on `/api/enquiry`.** Confirmed absent (`grep` for rate/throttle/limit returns nothing). Anyone can script repeated submissions, each triggering two real Resend sends — this is both a cost/abuse vector and a spam-inbox risk once real email is flowing.

3. **Zero legal pages exist.** No Privacy Policy, Terms of Service, Cookie Policy, or GDPR notice anywhere on the site (`ls *.html | grep -iE "privacy|terms|cookie"` returns nothing). The enquiry form collects real personal data (name, email, phone, business details) and the site loads third-party scripts/embeds (Calendly, Resend indirectly, WhatsApp deep links) that set cookies or process data off-site. Operating a UK business collecting this data with no privacy notice is a real compliance gap, not just a trust one — this needs to exist before the site is used for actual client acquisition, independent of the rebrand.

4. **No security headers configured anywhere.** There is no `vercel.json` and no header configuration at all — no Content-Security-Policy, no `X-Frame-Options`, no `X-Content-Type-Options`, no `Referrer-Policy`. The site is wide open to clickjacking and has no defense-in-depth if a future XSS is ever introduced.

---

## Major Issues

These are the reasons the site reads as "AI-generated" rather than "established agency," per your brief.

5. **The visual identity is a generic AI-startup template, not a brand.** The entire palette is `#3B82F6 → #06B6D4 → #8B5CF6` (blue/cyan/violet) gradients on near-black — this is *the* default palette every AI-wrapper landing page uses. It appears **64 times** across `assets/site.css` as gradients, glows, or text-shadows. There is no distinct brand color, no restraint, no single accent used with intention.

6. **Cliché AI iconography throughout.** A live particle-canvas background (`assets/site.js:78-93`, animated dots/lines — the literal "neural network" visual), a decorative `.jarvis-orb-hero` pulsing/spinning orb next to the headline, and **24 instances of emoji-as-icon** (🤖💬🎯📅⚙️🔒🛡✨) used as functional UI icons instead of a real icon set. None of Stripe, Linear, Vercel, or Anthropic use emoji as interface icons or animated neural backgrounds — this is the single biggest visual tell that the site was assembled from an AI-agency template rather than designed.

7. **Four competing persistent UI elements fight for attention on every page.** A top scroll-progress bar, a sticky "Book Free Consultation" bar, a floating WhatsApp bubble, and a floating Jarvis chat launcher are all visible simultaneously and permanently. This reads as desperate rather than premium — a Stripe or Linear site has exactly one persistent action, not four.

8. **The logo is a generic shield-in-a-rounded-square with a gradient fill** — the same visual grammar as a thousand "AI security/agency" logos. It's not memorable, doesn't work meaningfully in true monochrome (it's built entirely around its gradient), and says nothing specific about Aegis.

9. **Copy leans on buzzwords rather than outcomes.** Phrases like "AI Systems & Websites That Grow Your Business," "Six Services. One Agency," and "done-for-you, fully set up" describe the *category* rather than a *result*. Per your own example — the site should say what changes for the client's business, not what technology was used.

10. **No case study depth beyond screenshots + prose.** The 4 case studies show what was built but not the client's process, decision points, or before/after framing beyond the one homepage "Before/After" section (which is generic, not tied to specific real clients). There's no visible development workflow, no discovery-to-launch narrative per project — the exact kind of detail that makes a £5k+ scope credible.

11. **No `og:image` on any of the 7 pages** (`grep -c "og:image"` returns 0 everywhere). Social shares of any page render with no preview image — a real credibility gap when a prospect shares a link in Slack/WhatsApp/LinkedIn.

12. **No structured data (JSON-LD) anywhere.** No `Organization`, `LocalBusiness`, or `Service` schema. Google has nothing to build a rich result from, and this is table-stakes for a business claiming enterprise readiness.

13. **15 images have no `width`/`height` attributes**, meaning the browser can't reserve layout space before they load — this causes visible layout shift (a directly measurable Core Web Vitals / Lighthouse penalty), most likely in the hero grid and portfolio cards.

---

## Minor Improvements

14. Google Fonts (`Inter`) loads render-blocking via a `<link rel="stylesheet">` in `<head>` rather than a preloaded/`font-display: swap` strategy — likely causing a flash of invisible text on slow connections.
15. The canvas particle background animates continuously and indefinitely even when the tab isn't visible or the section isn't in viewport — unnecessary battery/CPU cost, especially on mobile.
16. `robots.txt` and `sitemap.xml` are fine functionally but were written before the rebrand — they'll need re-verification once URLs/pages change.
17. Muted text color (`--muted: #6B7FA3` on `--bg: #04070F`) passes WCAG AA for normal text (contrast ratio 4.98:1, confirmed by direct calculation) — this is a genuine pass, not an issue, but should be re-verified if the palette changes in the rebrand.
18. No `Accessibility Statement`, despite the site otherwise having reasonable ARIA attributes on the modal, Jarvis widget, and hamburger menu — the mechanics are there, the disclosure page isn't.
19. FAQ, pricing, and process-timeline content is genuinely honest (no fake stats — confirmed clean in earlier session work), but still template-shaped: numbered-circle timelines and FAQ accordions are exactly the "bento grid" / "predictable card layout" pattern your brief calls out as an AI-generation tell, even though the *content* inside them is real.

---

## Opportunities

20. No Lighthouse/axe-core run has actually been executed against the live deployed site — everything above is derived from static code review. Before claiming a 100/100/100/100 target is met, an actual Lighthouse CI run (or the `run` skill against the deployed URL) should be captured as a baseline, then re-run after each major change.
21. There is no design system / component documentation — every visual decision lives inline in a single 1,549-line CSS file. A rebrand is a natural point to introduce documented design tokens (spacing scale, type scale, one accent color with defined use cases) rather than continuing the current ad-hoc token list.
22. The Jarvis AI widget is architecturally ready for a real backend (`assets/jarvis.js` has one clearly documented swap point) but currently runs on canned keyword-matched replies — worth deciding whether "AI Business Consultant" framing is honest marketing or should be renamed to avoid overpromising until it's real.
23. No automated testing exists anywhere in the project (no test files, no CI). For a site now handling real enquiries and email delivery, even lightweight smoke tests (form validation, email-escaping, broken-link checks) would catch regressions before they reach production.
24. There is no `ADR.md`/architecture record explaining *why* this project is static HTML/CSS/JS with no build step — a reasonable, deliberate choice made earlier in this project, but undocumented, so a future contributor (or you, in six months) has no record of why.

---

## What This Report Does *Not* Cover Yet

Per your Step 1 instruction, this stops at auditing — no redesign, rebrand, or code changes have been made. The 16 subsequent steps in your brief (rebrand, new logo, homepage rewrite, About rewrite, service page depth, legal pages, security hardening, SEO, performance, 15 documentation files, mobile redesign, and the 5-persona review) each involve real judgment calls — brand direction, actual legal facts about the business, security posture tradeoffs — that shouldn't be executed blind in one pass. My recommendation is to prioritize and sequence these together next, starting with the two items that are genuinely urgent regardless of rebrand direction: **the email-injection fix (Critical #1) and rate limiting (Critical #2)**, since those are live bugs on a production system right now, independent of any design decision.
