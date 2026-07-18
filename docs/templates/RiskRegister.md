# Risk Register (Template)

A living document, not a one-time form — reviewed at project kickoff and updated as risks change. Use per-project, or maintain one at the company level for cross-cutting risks.

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| Client delays feedback/content beyond agreed timeline | Medium | Delays delivery | Timeline explicitly states client responsibilities ([`StatementOfWork.md`](StatementOfWork.md) §7); flag early if slipping | Aegis |
| Scope creep via informal requests (chat, email asides) | High | Erodes margin, delays delivery | Every out-of-scope request goes through [`ChangeRequestForm.md`](ChangeRequestForm.md) — no silent absorption | Aegis |
| Third-party AI API cost exceeds what a subscription tier's price assumed | Medium | Erodes margin on Productized AI | Usage caps per tier ([`PricingStrategy.md`](../PricingStrategy.md)); monitor actual cost-per-conversation against price within first quarter | Aegis |
| Client's existing tools/hosting create unexpected technical blockers | Medium | Delays delivery | Discovery questionnaire ([`DiscoveryQuestionnaire.md`](DiscoveryQuestionnaire.md)) surfaces this before quoting, not after starting | Aegis |
| Non-payment after deposit / mid-project | Low | Direct revenue loss | Development pauses on overdue payment ([`MasterServiceAgreement.md`](MasterServiceAgreement.md) §2); milestone structure limits exposure on larger projects | Aegis |
| Single-founder dependency (bus factor of one) | High | Business continuity risk | Document processes (this docs/ folder) so the business isn't only in one person's head; revisit as team grows | Aegis |
| Overselling capability in categories not yet proven (mobile apps, enterprise platforms) | Medium | Reputational/delivery risk | Honest scope framing per [`BusinessModel.md`](../BusinessModel.md); partner for unproven categories rather than overpromise | Aegis |
| Data breach / mishandling of client data collected via enquiry form or client projects | Low | Legal/reputational | Security practices per [`Security.md`](../Security.md); data minimization already in place | Aegis |

*Add project-specific rows when starting a new engagement — the rows above are the recurring, company-level risks.*
