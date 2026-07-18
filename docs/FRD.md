# Functional Requirements Document

## Navigation
- Sticky nav with anchor links (Services/Pricing/Portfolio/About/FAQ/Enquiry/Contact) on the homepage; other pages link back to `index.html#section`.
- Mobile hamburger menu, same link set.

## Services (homepage)
- 6 service cards (AI Websites, Business Automation, AI Chatbots, Lead Generation, Booking Systems, Custom AI Software), each opening a modal with Problem/Solution/Process/Deliverables/Timeline/Ideal-Client/ROI/FAQs (`window.SERVICES_DATA` in `index.html`, rendered via `assets/modal.js`).

## Portfolio
- 4 real case studies, each its own page, linked from homepage cards. No fabricated projects.

## Pricing
- 3 tiers (Starter Presence £699, Growth System £1,499 "Best Value", Custom Build — enterprise/scoped).

## Jarvis AI widget
- Floating launcher (bottom-left) opens a chat panel (`assets/jarvis.js`).
- Canned keyword-matched responses today (`KNOWLEDGE_BASE` array) — architected with a single swap point (`getJarvisResponse()`) to later call a real API without touching the rest of the widget.

## Enquiry pipeline
1. `enquiry.html` — full qualifying form (business details, budget, services interested, urgency, etc.), client-side validated in `assets/enquiry-form.js`.
2. Submits to `POST /api/enquiry` — server-side validated, rate-limited, sends two emails (client confirmation + internal notification) via Resend.
3. Redirects to `thank-you.html` on success; shows an inline error on a real rejection (e.g. rate-limited); still redirects on a network-level failure (expected in local dev, see [`Testing.md`](Testing.md)).

## Conversion features
- Sticky "Book a Call" bar, appears once the hero scrolls out of view.
- Exit-intent modal (desktop) / scroll-depth modal (mobile), once per session (`sessionStorage`), offering a free audit.
- WhatsApp + Jarvis floating buttons — hidden while the hero is in view on mobile to avoid overlapping the hero's own CTA (see `WEBSITE_AUDIT.md` history).

## FAQ
- Accordion, 9 general questions (homepage) covering pricing/timeline/support/integrations/SEO. Each service modal also has 2 service-specific FAQs.
