# SOP — Development

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers stage 10 of [`ClientJourney.md`](../ClientJourney.md) — the actual build. For the Aegis site's own codebase conventions (not client project conventions), see [`Architecture.md`](../Architecture.md) and [`TRD.md`](../TRD.md).

## Who does this today
Laiba Sheikh, solo.

## Trigger
Deposit cleared, kickoff complete (client access/credentials collected, project folder created per [`AegisOperatingSystem.md`](../AegisOperatingSystem.md)'s naming convention).

## Process
1. **Build against the signed scope only.** Anything requested beyond the SOW goes through [`templates/ChangeRequestForm.md`](../templates/ChangeRequestForm.md) — a verbal "can you also add..." during a working session is not an approved scope change until it's on that form and priced.
2. **Weekly updates to the client**, even when there's nothing dramatic to report. Silence during a fixed-price build is the most common driver of client anxiety — a short "here's where we are" email costs a few minutes and prevents a much longer anxious-client conversation later.
3. **Keep a running note of any technical assumption made without explicit client confirmation** (e.g. "assumed English-only content" or "assumed no existing CRM to migrate from") — these become the first thing to check during Testing/UAT, and the first thing to explain if they turn out wrong.
4. **Don't silently absorb scope creep** to avoid an awkward conversation — an unpriced feature added "because it was quick anyway" sets a bad precedent for both this client and the ones after them.

## What "development complete" looks like
Every item in the signed SOW is built and passes the developer's own check against the acceptance criteria — ready to hand to [`sops/Testing.md`](Testing.md), not yet ready for the client.

## Common failure mode to avoid
Treating "the client hasn't complained" as equivalent to "the client is aware of progress." Silence from the client side can mean satisfaction or it can mean they've quietly lost confidence — the weekly-update habit exists specifically to prevent that ambiguity from ever developing.

## Handoff notes for a future hire
Needs the project's actual codebase access, the signed SOW for the current engagement, and clear instruction that verbal scope requests are not authorization to build — only a completed Change Request form is.
