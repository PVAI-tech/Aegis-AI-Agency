# SOP — Sales

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers stages 1–7 of [`ClientJourney.md`](../ClientJourney.md) (Lead → signed contract).

## Who does this today
Laiba Sheikh, solo. No dedicated sales hire or CRM — enquiries are tracked by email only.

## Trigger
A lead arrives via the enquiry form (`enquiry.html`), WhatsApp, or a direct Calendly booking.

## Process
1. **Respond within 1 hour** during business hours — this is a stated promise on `thank-you.html`; treat it as a hard commitment, not a target.
2. **Qualify before booking a call**: check the enquiry's stated budget range and timeline against a realistic tier (see [`PricingStrategy.md`](../PricingStrategy.md)). If the requested scope is one of the unproven categories (mobile app, large enterprise platform — see [`BusinessModel.md`](../BusinessModel.md)), flag this to the prospect honestly before the call, not after a quote is written.
3. **Run the discovery call** per [`sops/Discovery.md`](Discovery.md).
4. **Write the proposal + quote** using [`templates/Proposal.md`](../templates/Proposal.md) and [`templates/Quotation.md`](../templates/Quotation.md) — a specific figure or narrow range, never the full category range from the pricing strategy doc.
5. **Send the contract** (Statement of Work: [`templates/StatementOfWork.md`](../templates/StatementOfWork.md); for larger/ongoing engagements, the Master Service Agreement: [`templates/MasterServiceAgreement.md`](../templates/MasterServiceAgreement.md)). Confirm the client has actually read it — don't accept a signature on an unread document.
6. **Do not start work before the deposit clears** — see [`PaymentSystem.md`](../PaymentSystem.md) and [`sops/Finance.md`](Finance.md).

## What "closed" looks like
Signed SOW/MSA + cleared deposit. Anything short of both is still a prospect, not a client, regardless of how confident the conversation felt.

## Common failure mode to avoid
Verbally agreeing to scope changes during the sales conversation that never make it into the written SOW. If it isn't in the signed document, it isn't agreed — this is what the Change Request process (`templates/ChangeRequestForm.md`) exists to formalize once work has started.

## Handoff notes for a future hire
This role needs read access to the enquiry inbox, the pricing docs, and template files above. It does not currently need CRM access because no CRM exists — flag that gap to whoever takes this on next; see [`AegisOperatingSystem.md`](../AegisOperatingSystem.md)'s tools table.
