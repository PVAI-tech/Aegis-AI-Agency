# SOP — Testing (process)

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers stage 12 of [`ClientJourney.md`](../ClientJourney.md) — verifying work before a client ever sees it. For the Aegis site's own technical testing approach (what tools, what's actually been checked), see [`../Testing.md`](../Testing.md) — this SOP is the process a person follows, that doc is the technical reference.

## Who does this today
Laiba Sheikh, solo — the same person who built it also tests it, which is a known limitation (see "Common failure mode" below).

## Process
1. **Check against the original scope/acceptance criteria** from the signed SOW — not against a general sense of "does this look finished." If the SOW listed specific acceptance criteria, test against those explicitly, one by one.
2. **Test at multiple widths** (mobile ~375px, tablet ~768px, desktop ~1280px) per [`sops/Design.md`](Design.md)'s standard.
3. **Check the browser console for errors** on every page/view touched by the build.
4. **Click through every interactive element** added or changed — every link, button, form, modal — don't rely on visual inspection alone to catch a dead link or a broken handler.
5. **If a serverless/backend function was touched**, verify it can't be exercised by a local static server alone (see [`../Testing.md`](../Testing.md)'s documented limitation) — test it after deployment, not just assume the local check was sufficient.
6. **Log what wasn't tested**, not just what was — an honest "not yet verified: X" is more useful to the next person than silence that could be mistaken for "X was checked and passed."

## What "testing complete" looks like
Every SOW acceptance criterion explicitly checked, console-clean at all three widths, every new interactive element click-tested — ready for the client's own UAT (stage 13 of the client journey), not a substitute for it.

## Common failure mode to avoid
The same person who wrote the code testing it against their own mental model of what it should do, rather than the client's actual signed acceptance criteria — this is why step 1 explicitly says to test against the SOW, not against "does this feel right."

## Handoff notes for a future hire
If a dedicated tester is ever hired, the single highest-value change is exactly that: someone who didn't write the code checking it against the SOW, independent of the builder's assumptions.
