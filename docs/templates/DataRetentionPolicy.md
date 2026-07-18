# Data Retention Policy

Internal policy governing how long Aegis Health AI Ltd keeps different categories of data. Complements the public-facing [Privacy Policy](/privacy-policy.html) and [Data Processing Notice](/data-processing-notice.html), which state the client-facing summary of this.

| Data category | Retention period | Reason |
|---|---|---|
| Enquiry form submissions (no engagement resulted) | 12 months from submission, then deleted | Long enough to handle a delayed follow-up; no legitimate reason to keep longer |
| Client project data (during active engagement) | Duration of the engagement | Needed to deliver the work |
| Client project data (after engagement ends) | 6 years | UK standard limitation period for contract claims; matches general accounting record-keeping practice |
| Financial records (invoices, payment records) | 6 years | HMRC requirement for UK businesses |
| End-user data processed on a client's behalf (e.g. bookings collected via a system Aegis built) | Per the specific [`DataProcessingAgreement.md`](DataProcessingAgreement.md) for that engagement — Aegis does not unilaterally extend retention beyond what the Controller (client) instructs | Aegis is a processor, not the controller, for this category |
| Jarvis chat widget conversations | Not currently stored server-side at all (see [`Agents.md`](../Agents.md)) | N/A until the widget is connected to a real backend — revisit this policy at that point |

## Deletion process
On request (from an enquirer, client, or automatically at the end of a retention period above), data is deleted from: the email inbox holding notification copies, and any project files/systems holding it. There is currently no separate database to purge beyond these — see [`Architecture.md`](../Architecture.md) for the current (static site + email notification) architecture.

## Review
This policy should be revisited whenever the business adds a new place data is stored (e.g. a CRM, a database for the Productized AI line) — the table above reflects the architecture as of this writing, not a permanent state.
