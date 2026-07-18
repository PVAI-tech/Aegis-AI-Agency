# Usage Metering — Architecture for a Not-Yet-Built System

What real conversation-usage metering for the Productised AI line would actually require. **Nothing in this document is built.** It exists so that when the decision is made to build it, the shape of the work is already scoped — see [`Database.md`](Database.md) (why no database exists today) and [`PRICING_POLICY.md`](PRICING_POLICY.md) (why the advertised conversation limits are marked `provisional` until this exists).

## Why this doesn't exist yet

Jarvis, the only AI-assistant code in this codebase today, runs entirely client-side with keyword-matched canned replies (see [`Agents.md`](Agents.md)) — there is no server round-trip to count, no session concept that survives a page reload, and no database to write a count to even if there were. Building real metering means building three things that don't exist today, not one small addition to what's there.

## The three things that need to exist first

### 1. A real backend for the assistant itself
Usage can only be metered for conversations that pass through a server Aegis controls. That means the productized Concierge assistant (see [`BusinessModel.md`](BusinessModel.md)'s Motion 1) needs an actual API call per message — client browser → Aegis backend → LLM provider → response — instead of client-side keyword matching. This is a prerequisite, not an add-on: metering a client-side-only widget is architecturally impossible, there's no server in the loop to count anything.

### 2. A database to persist counts against
Per [`Database.md`](Database.md)'s recommended path: Vercel Postgres or a similarly managed Postgres, introduced specifically when this trigger (real client usage tracking) arrives — not before. Minimum schema shape:
- `clients` (id, plan tier, billing period start/end)
- `conversations` (id, client_id, started_at, message_count, ended_at) — matching the `usage` definition in [`assets/pricing-data.js`](../assets/pricing-data.js): "one customer chat session lasting up to 24 hours and containing up to 20 user messages"
- A rollup query (or a scheduled job) that sums conversations per client per billing period, to compare against the plan's `conversationsIncluded` value

### 3. A way to act on the count
Per [`PRICING_POLICY.md`](PRICING_POLICY.md)'s overage policy: alerts at 70%/90%/100% of the allowance, then either a manual top-up (client-approved) or the assistant pausing until the next billing cycle. This requires:
- A notification path (email, same Resend integration already used for enquiries) firing at each threshold
- A flag the assistant's backend checks before responding, once the 100% threshold is hit and no top-up has been approved
- Eventually, Stripe usage-based billing for automatic top-ups — currently `overagePolicy.automaticTopUps: "planned"` in the pricing data, correctly not advertised as live

## Decisions that need to be made before building any of this

This isn't purely an engineering task — it needs real product/infrastructure decisions first:
1. **Which LLM provider and at what per-call cost?** This determines whether the advertised conversation limits are even commercially viable at the current price points in [`PricingStrategy.md`](PricingStrategy.md).
2. **Hosting for the backend** — Vercel serverless functions (consistent with the existing `api/enquiry.js` pattern) versus a dedicated always-on service, depending on expected latency/concurrency needs.
3. **Data retention** — how long raw conversation logs are kept, and whether they contain data that needs to be handled per [`data-processing-notice.html`](../data-processing-notice.html) and [`templates/DataRetentionPolicy.md`](templates/DataRetentionPolicy.md).
4. **Timing relative to Stripe** — usage-based billing (item 3 above) depends on [`PaymentSystem.md`](PaymentSystem.md) being implemented first; building metering before Stripe exists means the count would have nowhere to feed into for automatic billing (manual top-up approval would still work as an interim state).

## What NOT to do in the meantime

Do not fake usage metering with a client-side counter (e.g. `localStorage`) to make the pricing page's numbers look more "real" — a client-side counter resets on a cleared cache, isn't tied to a real billing period, and would misrepresent the current honest "provisional" framing as something quietly enforced when it isn't. The current approach (state it plainly as provisional, cap nothing, bill nothing automatically) is the correct interim state, not a stopgap to be hidden.

## When to revisit this document

The moment there's a real, paying Productised AI subscriber — at that point, item 1 (a real backend) stops being optional, because there's now an actual client whose usage figure needs to mean something.
