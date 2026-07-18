# Incident Response Plan

What happens if something goes wrong — a data breach, a compromised account, a client's system going down. For a company this size, this is deliberately simple: a real checklist that gets followed, not a 40-page framework nobody reads under pressure.

## What counts as an incident
- Unauthorized access to Aegis's own systems (email, Vercel account, GitHub, Stripe).
- Unauthorized access to a client's system that Aegis built or manages.
- Accidental exposure of personal data (e.g. an enquiry emailed to the wrong address, a misconfigured access setting).
- A security vulnerability discovered in Aegis-built code, whether exploited or not.

## Immediate steps (first hour)
1. **Contain it.** Revoke the compromised credential, take the affected system offline if actively being exploited, or roll back the exposing change — whichever stops the bleeding fastest.
2. **Don't destroy evidence.** Don't delete logs or reset things further than needed to contain the issue — you may need to understand what happened.
3. **Note the time and what's known so far**, even roughly — this becomes the incident record.

## Within 24 hours
4. Assess scope: what data/systems were actually affected, and who is impacted (Aegis only, or a specific client's data too).
5. If client data is affected, notify the client directly — don't wait for them to notice.
6. If personal data of UK/EEA individuals is affected and the breach is likely to result in a risk to their rights, UK GDPR requires notifying the ICO **within 72 hours** of becoming aware — see [ico.org.uk](https://ico.org.uk) for the reporting process. Don't skip this if in doubt; under-reporting is the bigger legal risk.

## Within a week
7. Fix the root cause, not just the symptom.
8. Write a short internal record: what happened, what was affected, what was done, what changes prevent a repeat.
9. If a client was affected, follow up once resolved with what was done to prevent recurrence — this matters more to retaining trust than the incident itself often does.

## Prevention checklist (review periodically, not just after an incident)
- [ ] Two-factor authentication on email, Vercel, GitHub, Stripe, and any client-system admin panels.
- [ ] No shared/reused passwords across these accounts.
- [ ] API keys treated as secrets — never committed to git (see [`Security.md`](../Security.md) for what's already in place on this codebase specifically).
- [ ] Access to a client's systems limited to what's needed, revoked when a project ends.

## Contact
Aegishealthai@outlook.com
