# The Aegis Operating System

The internal handbook for how Aegis Health AI Ltd actually runs. Read this alongside [`BusinessModel.md`](BusinessModel.md) (the strategy), [`ClientJourney.md`](ClientJourney.md) (the client-facing timeline this handbook supports), and the 12 function-specific SOPs in [`sops/`](sops/).

## What this document is, and isn't

This is a real operating reference, not aspirational org-chart theatre. As of this writing, **Aegis is a solo operation — Laiba Sheikh performs every function below personally.** The 12 "departments" that follow are functions, not headcount. Each one is written as a standalone SOP specifically so that the moment a second person joins (a subcontractor, a hire, a partner), there's already a real process to hand them instead of tribal knowledge in one person's head. Don't read the department structure as a claim that 12 people or 12 teams currently exist — they don't.

## Company facts

- **Legal entity:** Aegis Health AI Ltd, Company No. 16695420 (England & Wales, Companies House).
- **Trading/display brand:** "Aegis AI" (the domain and email use the "healthai" form — see [`Memory.md`](Memory.md) for why these intentionally differ).
- **Primary contact:** Aegishealthai@outlook.com, WhatsApp +447942944260.
- **VAT status:** not asserted either way on the live site or in this handbook — confirm actual registration status before any pricing/invoicing document states it one way or the other.

## Tools and systems actually in use today

| Function | Tool | Status |
|---|---|---|
| Code hosting | GitHub (`PVAI-tech/Aegis-AI-Agency`) | Live |
| Hosting/deploy | Vercel (auto-deploy on push to `main`) | Live |
| Domain/DNS | Wix DNS, pointed at Vercel | Live |
| Enquiry notifications | Resend (via `api/enquiry.js`) | Live, sending from shared `onboarding@resend.dev` (see [`Roadmap.md`](Roadmap.md) for why) |
| Discovery calls | Calendly | Live |
| Client messaging | WhatsApp (static contact link only) | Live |
| Website AI widget | Jarvis (client-side canned responses, no backend) | Live, not connected to a real AI backend — see [`Agents.md`](Agents.md) |
| Payments/subscriptions | Stripe | Account exists; not yet wired into the codebase — see [`PaymentSystem.md`](PaymentSystem.md) |
| CRM | None | Not yet adopted — enquiries currently live only in email/inbox |
| Usage metering (Productised AI) | None | Not yet built — see [`Database.md`](Database.md) and the `usage.provisional` flag in [`../assets/pricing-data.js`](../assets/pricing-data.js) |

Don't assume a tool listed as "Live" is fully automated end-to-end — for example, Resend notification failures are logged server-side but not currently monitored by any alerting system; check Vercel function logs manually if an enquiry seems to have gone missing.

## Project folder convention

**Recommended starting convention** (not yet enforced by any tooling — a naming discipline to follow manually until volume justifies a real project-management tool):

```
Clients/
  <ClientName>_<ProjectType>_<YYYY-MM>/
    01-Contracts/        Signed SOW, MSA, DPA (see docs/templates/)
    02-Discovery/         Completed DiscoveryQuestionnaire.md, research notes
    03-Assets/            Brand assets, logins/credentials received from client
    04-Dev/                Working files, if not already in a dedicated git repo
    05-Invoices/           Copies of sent invoices (docs/templates/InvoiceTemplate.md)
    06-Handover/           Final deliverables, training notes
```

Example: `Clients/SlayBeautyLondon_AIWebsite_2026-03/`.

## The 12 functions

Each links to a standalone SOP in [`sops/`](sops/). Read the SOP itself for the actual process — this table is a map, not a summary.

| # | Function | SOP | One-line scope |
|---|---|---|---|
| 1 | Sales | [`sops/Sales.md`](sops/Sales.md) | Lead response through signed contract |
| 2 | Marketing | [`sops/Marketing.md`](sops/Marketing.md) | Website, SEO, content, ad spend (once running) |
| 3 | Discovery | [`sops/Discovery.md`](sops/Discovery.md) | Turning a signed client into a real, scoped brief |
| 4 | Development | [`sops/Development.md`](sops/Development.md) | Building the actual website/system/automation |
| 5 | Design | [`sops/Design.md`](sops/Design.md) | Visual/UX decisions across client work and the Aegis site itself |
| 6 | AI Development | [`sops/AIDevelopment.md`](sops/AIDevelopment.md) | Building/configuring any AI assistant component |
| 7 | Testing | [`sops/Testing.md`](sops/Testing.md) | Verifying work before a client ever sees it |
| 8 | Deployment | [`sops/Deployment.md`](sops/Deployment.md) | Getting finished work live, safely |
| 9 | Support | [`sops/Support.md`](sops/Support.md) | Handling issues/questions after launch, within the agreed window |
| 10 | Client Success | [`sops/ClientSuccess.md`](sops/ClientSuccess.md) | Retention, upsell to Managed Services, review calls |
| 11 | Finance | [`sops/Finance.md`](sops/Finance.md) | Invoicing, payment tracking, basic bookkeeping |
| 12 | Operations | [`sops/Operations.md`](sops/Operations.md) | Tooling, documentation, this handbook's own upkeep |

## Decision authority

Every decision — pricing exceptions, scope changes, refunds, who to hire, what to build next — currently sits with Laiba Sheikh as founder. There is no other approval layer. This is stated explicitly so that when a second person is hired into any function above, it's clear from day one which decisions they can make independently versus which stay with the founder until the SOP is formally updated to delegate them.

## Review cadence

This handbook and the 12 SOPs should be re-read and corrected every time a real process actually changes (a new tool adopted, a step that turned out not to work, a first hire). Treat drift between "what this document says" and "what actually happens" as a bug, the same way stale code comments are — see the honesty discipline in [`Memory.md`](Memory.md).
