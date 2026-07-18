# SOP — Operations

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers tooling, documentation, and the upkeep of this handbook and the other 11 SOPs — the function that keeps everything else in this folder honest and current.

## Who does this today
Laiba Sheikh, solo.

## Process
1. **Whenever a real process changes** (a new tool adopted, a step that turned out not to work, the first hire into any function), update the relevant SOP in the same work session — don't let documentation drift silently out of sync with reality. Stale process documentation is treated the same as stale code comments on this project: a bug, not a harmless inaccuracy.
2. **Keep the tools table in [`AegisOperatingSystem.md`](../AegisOperatingSystem.md) current** — it's the single source of truth for what's actually live versus planned (Stripe, CRM, usage metering, etc.).
3. **Own the technical documentation set** ([`Architecture.md`](../Architecture.md), [`Security.md`](../Security.md), [`Testing.md`](../Testing.md), [`Deployment.md`](../Deployment.md), and the rest) — these describe the Aegis site's own codebase and must stay accurate as the code changes, cross-checked against real files, not assumed.
4. **Maintain the document cross-reference integrity** — when a doc is renamed, moved, or removed, check for and fix every other doc that links to it (a relative-path link-checker script was used earlier in this project's history specifically for this; rerun the same approach after any large documentation reorganization).
5. **Review this handbook and all 12 SOPs periodically** (see [`AegisOperatingSystem.md`](../AegisOperatingSystem.md)'s review-cadence note) — not on a fixed calendar necessarily, but whenever a real operational change happens.

## What "operations is working" looks like
Anyone (including a future hire) can read the current SOP for a function and have it match what actually happens today — no "well actually we don't do it that way anymore" gap.

## Common failure mode to avoid
Writing a thorough SOP once and never revisiting it as the business actually changes — a handbook that was accurate at launch but wrong a year later is worse than no handbook, because it creates false confidence.

## Handoff notes for a future hire
This is the function most naturally owned by the founder even after other functions are delegated, since it requires visibility across all 11 other functions to keep the documentation honest.
