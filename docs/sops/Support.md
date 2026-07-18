# SOP — Support

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers stage 17 of [`ClientJourney.md`](../ClientJourney.md) — handling issues/questions after launch, within whatever window the signed SOW promises.

## Who does this today
Laiba Sheikh, solo. No ticketing system, no SLA tooling — support requests currently arrive by email/WhatsApp and are tracked manually.

## Process
1. **Check the signed SOW for the actual included support window** before responding to a request — "how long is support included" is a per-contract fact, not a fixed company-wide policy. Don't promise a response time or scope that wasn't actually sold.
2. **Track usage of the included window** so it doesn't silently become unlimited free support — a simple running note per client (in the client's project folder, see [`AegisOperatingSystem.md`](../AegisOperatingSystem.md)'s naming convention) is enough at current volume; this becomes a real tracking-tool need once client count grows.
3. **Distinguish a genuine bug/issue (covered) from a new feature request (not covered)** — a new feature request goes through the same Change Request process as an in-flight project ([`templates/ChangeRequestForm.md`](../templates/ChangeRequestForm.md)), priced separately, not folded into "support" for free.
4. **For Productised AI clients**, remember the honesty constraint already established: don't claim real-time usage monitoring or automatic overage handling that doesn't exist yet — see [`PRICING_POLICY.md`](../PRICING_POLICY.md)'s overage section.

## What "support request resolved" looks like
The client confirms the issue is fixed (or the feature request has been logged/priced as a separate change), and the interaction is noted against the client's remaining support-window budget.

## Common failure mode to avoid
Answering "can you also add X" support requests as if they're free bug fixes because saying no feels awkward — this erodes both the support-window economics and the precedent for every future client.

## Handoff notes for a future hire
Needs the specific SOW for each active client (support terms vary per contract) and clear authority on when to say "this is a paid change request" versus "this is covered."
