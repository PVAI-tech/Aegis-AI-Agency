# AI Agents

This covers two different things: the AI-facing feature *on* the site (Jarvis), and guidance for AI coding assistants working *on* this codebase.

## Jarvis — the on-site AI widget

`assets/jarvis.js` implements a floating chat widget ("Jarvis, AI Business Consultant"). As of this writing it does **not** call a real language model — it matches the user's prompt against a `KNOWLEDGE_BASE` array of keyword/reply pairs and simulates a short typing delay. This is a deliberate, temporary state (see [`ADR.md`](ADR.md) / [`Roadmap.md`](Roadmap.md)), not an oversight.

**To connect a real backend later:** replace the body of `getJarvisResponse(promptText)` in `assets/jarvis.js` with a `fetch('/api/jarvis', {...})` call. Nothing else in the file needs to change — the typing indicator, message rendering, and panel UI are already written against whatever this function returns (a string).

**Marketing honesty note:** the widget is labeled "AI Business Consultant" on the site. Once real users start asking it substantive questions, revisit whether that framing overpromises relative to what a keyword-matched canned-reply system can actually do — this was flagged as an open question during the last full audit, not resolved either way.

## Guidance for AI coding assistants (Claude Code or otherwise) working on this repo

- **Do not fabricate stats, testimonials, or client claims.** This has come up twice in this project's history — see [`Memory.md`](Memory.md). If a section needs a number and no real number exists, either omit it or use an honest non-numeric framing (this codebase already has real examples of both patterns to follow).
- **Verify visually, not just via computed styles.** This environment has shown a repeated pattern where `getComputedStyle`/`getBoundingClientRect` return stale values shortly after a live DOM/style mutation via injected scripts, especially right after swapping a stylesheet. When a computed-style check looks suspiciously identical across different states, re-verify with an actual screenshot or a genuinely fresh page navigation before concluding something is broken (or working).
- **HTML boilerplate is duplicated across all 7 pages on purpose** (no templating engine — see [`ADR.md`](ADR.md)). Any shared-markup change needs to be applied to every page, and grepped for afterward to confirm it landed everywhere.
- **`api/enquiry.js` cannot be tested against the local dev server.** See [`Testing.md`](Testing.md) for how it was actually verified during development (mocked `req`/`res` in a plain Node script).
- **Check `WEBSITE_AUDIT.md` before making visual changes.** It documents exactly which patterns (gradient soup, emoji icons, stock robot photos, animated particle backgrounds) were identified as generic "AI-template" tells and removed — reintroducing any of them would be a regression.
