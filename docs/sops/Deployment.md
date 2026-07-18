# SOP — Deployment (process)

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers stages 14–15 of [`ClientJourney.md`](../ClientJourney.md) — final payment through launch. For the Aegis site's own technical deploy mechanics, see [`../Deployment.md`](../Deployment.md) — this SOP is the process/gate a person follows; that doc is the technical how-to.

## Who does this today
Laiba Sheikh, solo.

## Process
1. **Confirm final payment has actually cleared** before doing anything else in this list — see [`PaymentSystem.md`](../PaymentSystem.md)'s explicit rule: ownership/deployment/code handover is gated on a verified payment event, never on "invoice sent."
2. **Run the pre-push checklist** for the specific project (equivalent of [`../Deployment.md`](../Deployment.md)'s checklist, adapted to whatever stack the client project uses).
3. **Confirm the live URL end-to-end** — forms submit, integrations fire, mobile renders correctly — before telling the client it's done. Never report "live" based on a local/staging check alone.
4. **Hand over code/assets/credentials** only after step 3 passes, following whatever ownership terms the signed SOW specifies.
5. **Schedule the training/walkthrough call** (stage 16) immediately after confirming launch — don't let "it's live" and "the client knows how to use it" become two separate, disconnected milestones.

## What "deployed" looks like
Live, end-to-end verified, payment cleared, handover complete — all four, not just the first one.

## Common failure mode to avoid
Treating "the final payment invoice was sent" as equivalent to "the final payment cleared," and deploying/handing over before the money has actually arrived. This exact distinction is called out explicitly in [`PaymentSystem.md`](../PaymentSystem.md) because it's the single easiest gate to accidentally skip under client pressure to "just go live."

## Handoff notes for a future hire
Needs access to whatever payment confirmation system is in use (Stripe dashboard, bank statement, etc.) — deployment should never be authorized from a verbal "they said they paid."
