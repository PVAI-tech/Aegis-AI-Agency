# Pricing Strategy — Draft for Review

**Not live yet, by design** (per your instruction). These are reasoned starting numbers, not final prices — you know your actual costs (AI API usage, your own time capacity, tooling) better than I do. Treat every number here as a draft to sanity-check, not a decision already made.

## Part 1 — Productized AI (the Concierge line, per [`BusinessModel.md`](BusinessModel.md))

Pricing separates a one-time **setup fee** (your time: training the assistant on their content, branding, integration) from a **monthly fee** (ongoing hosting, AI usage, and support). This split is the standard SaaS pattern and matches what you asked for.

| | Starter AI | Professional AI | Business AI | Enterprise |
|---|---|---|---|---|
| Setup fee | £299 | £599 | £1,199 | Custom |
| Monthly | £59 | £119 | £249 | Custom |
| Assistants | 1 | 1 | Up to 2 | Multiple |
| Conversations/month | 300 | 1,500 | 5,000 (combined) | Custom |
| Channels | Web widget | Web + WhatsApp | Web + WhatsApp + booking | All + voice |
| Knowledge base size | ~20 items | ~100 items | Unlimited | Unlimited |
| CRM integration | — | — | 1 system | Multiple |
| Support response time | 48h, email | 24h, priority | Same-day | SLA-backed |
| Monthly review call | — | — | 15 min | Dedicated |
| Overage (per extra 100 conversations) | £15 | £12 | £10 | Negotiated |

**Why "conversations" instead of "tokens":** clients think in conversations, not tokens — exposing raw token/rate limits to a non-technical business owner creates confusion, not clarity. Conversations-per-month is the customer-facing unit; token/rate limits are the *internal* mechanism you use to make sure a flat monthly fee doesn't lose money on a heavy-usage client. Recommend tracking actual AI API cost-per-conversation once the first few clients are live, then re-checking these prices against real data within the first quarter — these are informed estimates, not measured numbers.

**Additional levers to price separately, once real demand shows up (don't build all of these upfront):** extra users/logins beyond a tier's default, extra integrations beyond the tier's included one, additional storage for document-heavy assistants, a one-time "priority onboarding" fee for clients who want faster-than-standard setup.

## Part 2 — Custom Development (project-based, not subscription)

Ranges, not fixed prices — actual quote depends on scope, confirmed after a discovery call. Deliberately excludes a monthly fee (per your instruction) — recurring revenue for these clients comes later, via an optional Managed Services retainer post-launch.

| Category | Range | Note |
|---|---|---|
| AI Websites | £699 – £2,500 | £699 is the existing Starter Presence entry point; scales with page count/complexity |
| Bespoke AI Assistants (beyond the productized line) | £1,500 – £5,000 | Custom logic/reasoning the productized Concierge line doesn't cover |
| Automation Systems | £1,000 – £4,000 | Workflow + integration builds |
| Dashboards / Internal Tools | £2,000 – £6,000 | |
| Mobile Apps | £6,000 – £18,000+ | **Not yet demonstrated in the current portfolio** — recommend partnering with a mobile specialist for the build while Aegis leads the AI/product side, at least until there's a shipped example to point to |
| Enterprise Software / Platforms | £10,000+ | Individually scoped, typically phased across multiple milestones rather than a single project fee |

### Payment structure (deposit → milestones → final)

1. **Discovery call** — free, unpaid, qualifies the lead.
2. **Proposal + written quote** — itemized scope, timeline, and price range narrowed to a fixed figure.
3. **Contract/Statement of Work signed.**
4. **Deposit invoiced via Stripe:**
   - Projects under ~£2,500: **50% deposit**, 50% on completion (two payments total — a third milestone adds admin overhead without real benefit at this size).
   - Projects £2,500+: **30% deposit**, **40% at a defined midpoint milestone** (e.g. design sign-off or a working demo), **30% on completion**.
5. **Development begins only once the deposit has cleared** — not before. This protects your time; it's standard practice, not aggressive.
6. **Milestone payment(s)** invoiced and cleared before the next phase of work continues, for projects using the 3-payment structure.
7. **Client review / UAT** — client tests the delivered work against the agreed scope.
8. **Final payment invoiced and cleared.**
9. **Ownership transfers, deployment happens, and source code is handed over only once final payment has cleared** — not before, and not on "invoice sent." This should be a real trigger tied to Stripe's payment-succeeded webhook, not a manual/trust-based step (see [`PaymentSystem.md`](PaymentSystem.md)).
10. **Optional Managed Services retainer** offered at this point — first subscription billing cycle starts on a clean date (recommend the 1st of the month following launch, for simple accounting) rather than the exact delivery date.

## What's next

[`PaymentSystem.md`](PaymentSystem.md) covers the actual Stripe implementation plan (Payment Links/Invoicing for one-off payments, Stripe Billing for subscriptions, the Customer Portal, and exactly which webhook event triggers ownership transfer/deployment) — drafted as architecture now, ready to wire in for real once you confirm you want to proceed and share the relevant Stripe API keys.
