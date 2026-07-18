# Security Policy

Company-level security practices — how Aegis Health AI Ltd protects its own accounts and client data day-to-day. For the technical security measures implemented specifically in this website's code, see [`Security.md`](../Security.md) instead; this document is about practice, not code.

## Account security
- Two-factor authentication enabled on: email, GitHub, Vercel, Stripe, Resend, and any client-system admin access.
- No password reuse across these accounts — a password manager is used rather than memorized/repeated passwords.
- Client-system access credentials are revoked when a project or retainer ends, not left active indefinitely.

## Data handling
- Client data is only ever accessed for the purpose of delivering the agreed work — see [`DataRetentionPolicy.md`](DataRetentionPolicy.md) for how long it's kept.
- Personal data is never shared with a third party beyond the processors disclosed in the [Privacy Policy](/privacy-policy.html), and never used to train AI models for other clients.
- Sensitive credentials (API keys, database access) are stored as environment variables, never committed to source control — see [`Security.md`](../Security.md) for how this is enforced in practice on this codebase.

## Third parties
Every third-party tool used to deliver services (hosting, email delivery, payment processing) is chosen partly on its own security track record, not just cost/features. Current list: Vercel, Resend, Stripe, Calendly — see [`Architecture.md`](../Architecture.md) for how each is used.

## Incident handling
See [`IncidentResponsePlan.md`](IncidentResponsePlan.md) for the concrete steps if something goes wrong.

## Review
This policy should be revisited whenever a new tool, sub-processor, or data category is introduced — it reflects practice as of this writing, not a permanent state.

## Contact
Aegishealthai@outlook.com
