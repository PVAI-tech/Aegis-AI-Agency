# Architecture Decision Records

Short-form log of the decisions that would otherwise be invisible to a future contributor.

## ADR-001: Static HTML/CSS/JS, no framework, no build step

**Decision:** The site stays plain HTML/CSS/JS with zero build tooling, even through a full visual rebrand.

**Why:** The site serves paid Google Ads traffic. A framework migration (React/Next.js/etc.) is a large, high-risk change for a site whose actual requirements — marketing pages, a form, a chat widget — don't need one. "Clean, reusable architecture" is achieved through shared `assets/site.css`/`assets/site.js` files and a consistent HTML boilerplate pattern instead of componentization.

**Consequence:** HTML boilerplate (nav, footer, loader markup) is copy-pasted across all 7 pages and must be kept byte-identical by hand when it changes — there's no templating engine to enforce this.

## ADR-002: One shared CSS/JS pair, HTML stays duplicated per page

**Decision:** `assets/site.css` and `assets/site.js` are shared across every page. HTML structure (nav, footer, widgets) is not extracted into includes/partials.

**Why:** No templating engine is available without introducing a build step. A `fetch()`-based include would hurt SEO/crawlability and cause a flash of missing navigation on load.

## ADR-003: Single accent color, neutral near-black scale (rebrand)

**Decision:** Replaced a 3-hue gradient palette (blue/cyan/violet) with one deliberate accent (`#5B5FE9`) on a neutral (not blue-tinted) near-black scale.

**Why:** The original palette was identified as the single biggest "this looks like a generic AI-wrapper template" signal during a full site audit (`WEBSITE_AUDIT.md`). Implemented by redefining the CSS custom property *values* while keeping the same *names* (`--blue`, `--cyan`, `--violet` all now resolve to the same hue), which let the whole site's gradients collapse to flat/near-flat tones without rewriting every individual declaration.

## ADR-004: Custom SVG icon set, no emoji, no photo stock imagery on the homepage

**Decision:** Removed all emoji used as functional UI icons (~40 instances) in favor of a small custom line-icon set. Removed all Unsplash stock photography from the homepage after finding two literal circuit-board-brain and humanoid-robot images in the hero/service cards.

**Why:** Named explicitly in the rebrand brief as an "AI-generated template" tell. Rather than gambling on unverified replacement stock photos, service cards became icon-first (closer to how Linear/Stripe present features) instead of photo-illustrated.

## ADR-005: In-memory rate limiting instead of an external store

**Decision:** `api/enquiry.js` rate-limits by IP using an in-memory `Map`, not Redis/Upstash/Vercel KV.

**Why:** This project has no other need for an external data store, and current traffic doesn't justify the added dependency and cost. Documented as "best effort" (resets on cold start, not shared across concurrent instances) with the upgrade path noted in code comments and `Security.md`.

## ADR-006: Jarvis widget ships with canned responses, not a live model

**Decision:** `assets/jarvis.js` matches user prompts against a keyword-based `KNOWLEDGE_BASE` rather than calling a real LLM API.

**Why:** Explicit instruction: "Do not connect APIs yet. Simply prepare clean architecture." The entire swap to a real backend is a single function (`getJarvisResponse()`) — everything else (UI, typing indicator, focus handling) is already real and doesn't need to change.
