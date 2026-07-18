# SOP — AI Development

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers building or configuring any AI assistant component — both for client projects (e.g. a Hera/Beauty-Concierge-style build) and for Aegis's own Jarvis widget.

## Who does this today
Laiba Sheikh, solo.

## Current real state (don't oversell this internally either)
- Jarvis (the Aegis site's own widget, [`../../assets/jarvis.js`](../../assets/jarvis.js)) is entirely client-side, keyword-matched canned replies — there is no backend, no real language model call, no usage logging. See [`Agents.md`](../Agents.md).
- The two real client builds this pattern is based on (Hera for H.Sheikh London, the Beauty Concierge for Slay Beauty London) are the actual proof points for what this function can deliver — reference these honestly in any internal capability discussion, not the aspirational 14-product list from the original business brief (see [`BusinessModel.md`](../BusinessModel.md)).
- No usage-metering backend exists for the Productised AI line's advertised conversation limits — those numbers are marked `provisional` in [`assets/pricing-data.js`](../../assets/pricing-data.js) precisely because this function hasn't built the thing that would make them real yet.

## Process for a new AI assistant build (client or productized)
1. Confirm what's actually needed: a keyword/rules-based widget (fast, no ongoing API cost) versus a real LLM-backed assistant (higher capability, real ongoing cost and infrastructure). Don't default to the more expensive option if the simpler one meets the brief.
2. If building the productized Concierge line, keep the same core code with per-client config/branding (name, avatar, tone, knowledge sources) — the whole economic case for a subscription product depends on this, per [`BusinessModel.md`](../BusinessModel.md)'s margin argument. A bespoke rebuild per client breaks that model.
3. Never present an AI response as guaranteed-accurate to an end user — every AI-facing surface (client-facing or Aegis's own) should carry the same disclaimer standard as [`ai-disclaimer.html`](../../ai-disclaimer.html).
4. If the build involves real usage metering, treat it as a real infrastructure project (see [`Database.md`](../Database.md)) — not something to fake with a client-side counter that resets on page reload.

## Common failure mode to avoid
Quietly advertising a capability (WhatsApp Business API integration, guaranteed accuracy, unlimited usage) that the current build doesn't actually have. This project has a standing rule against exactly this — see the honesty discipline documented throughout [`PRICING_POLICY.md`](../PRICING_POLICY.md).

## Handoff notes for a future hire
Needs to read [`Agents.md`](../Agents.md) end to end before touching Jarvis or any client AI build — it documents exactly what's real versus aspirational today.
