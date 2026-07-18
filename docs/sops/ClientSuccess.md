# SOP — Client Success

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers stage 18 of [`ClientJourney.md`](../ClientJourney.md) — retention and the Managed Services upsell, the compounding-revenue layer described in [`BusinessModel.md`](../BusinessModel.md)'s Motion 3.

## Who does this today
Laiba Sheikh, solo.

## Process
1. **Offer Managed Services once, directly, right after launch** — "we built this for you; want us to keep it tuned, monitored, and improved for £X/month?" This is the moment conversion is highest, because the client has just seen delivered work, not a cold pitch to someone who hasn't.
2. **If declined, don't repeatedly re-pitch it.** One clear offer at the right moment beats repeated asks that read as pushy — note the decline and revisit only if the client's situation changes (e.g. they come back with a new request).
3. **If accepted, start the Stripe subscription per the billing-date rule** in [`PaymentSystem.md`](../PaymentSystem.md) — billing starts on the agreed date, not before.
4. **For any retained/subscription client, run a periodic review** (the cadence promised in their specific plan — see [`assets/pricing-data.js`](../../assets/pricing-data.js)'s `optimisationReview` field per tier) — this is the actual mechanism that justifies the recurring fee, not just uptime.
5. **Watch for churn signals** (unanswered weekly-update-equivalent check-ins, a client going quiet) and reach out proactively rather than waiting for a cancellation notice.

## What "client success" looks like, concretely
A retained client whose subscription renews without a difficult renegotiation, because they can see (via the review calls) what they're actually getting for the fee.

## Common failure mode to avoid
Treating the Managed Services pitch as an afterthought squeezed into the deployment call instead of its own clear moment — see [`BusinessModel.md`](../BusinessModel.md): this motion is described there as the standard, proven way agencies build recurring revenue on top of project work, but only if it's actually pitched deliberately, not mumbled at the end of a handover call.

## Handoff notes for a future hire
Needs visibility into which clients are on Managed Services, their specific review cadence, and the actual Stripe billing status for each — currently tracked manually since no CRM exists yet.
