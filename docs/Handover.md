# Handover

What a client actually receives at project completion, and what "done" means. Referenced by [`ClientJourney.md`](ClientJourney.md) step 14 (final payment / launch) and the [`StatementOfWork.md`](templates/StatementOfWork.md) ownership clause.

## What's handed over

- **Source code** — full repository access (GitHub transfer, or a zip export if the client doesn't want an ongoing GitHub relationship with Aegis).
- **Hosting/domain access** — if Aegis set up hosting (typically Vercel) on the client's behalf, admin access is transferred to the client's own account, not left under Aegis's account indefinitely.
- **Any third-party service logins created during the build** (e.g. Resend, a CRM) — transferred to the client's own accounts, per [`MasterServiceAgreement.md`](templates/MasterServiceAgreement.md) — Aegis doesn't retain standing access after handover unless a Managed Services retainer says otherwise.
- **A short written summary** of what was built, how it's structured, and where to go for common tasks (e.g. "to update pricing, edit this section of this file").

## What's explicitly not included by default

- Ongoing content updates — unless covered by a Managed Services retainer, the client owns making future changes themselves or engaging Aegis for a paid change request.
- Training beyond the one included walkthrough call, per [`ProjectTimeline.md`](templates/ProjectTimeline.md).

## The trigger for handover

Per [`PaymentSystem.md`](PaymentSystem.md): handover happens once final payment has actually cleared (the Stripe webhook fired), not when the invoice is sent and not on a verbal "looks good." This protects Aegis from doing free work and gives the client a clean, unambiguous point at which they know they own everything outright.

## Post-handover support window

Whatever's stated in the specific SOW (commonly: a defined number of days for bug-only fixes at no charge) — tracked so it doesn't silently become unlimited free support, per [`ClientJourney.md`](ClientJourney.md) step 17.
