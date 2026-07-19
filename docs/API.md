# API Reference

There are two API endpoints in this project. Both share sanitization/email helpers from `api/_lib/` (`text.js`, `email.js`) rather than duplicating them.

## `POST /api/enquiry`

Validates and processes a submission from `enquiry.html`.

### Request

`Content-Type: application/json`

```json
{
  "fullName": "string, required",
  "businessName": "string, required",
  "email": "string, required, validated as an email format",
  "phone": "string, required",
  "website": "string, optional",
  "industry": "string, required",
  "businessSize": "string, required",
  "budget": "string, required",
  "servicesInterested": ["string", "..."],
  "projectDescription": "string, required",
  "preferredContact": "string, optional",
  "preferredMeetingTime": "string, optional",
  "urgency": "string, required"
}
```

### Responses

| Status | Meaning |
|---|---|
| `200 { ok: true }` | Enquiry validated and accepted. Email notifications attempted (failures are logged server-side, not surfaced — see below). |
| `400 { ok: false, error, fields: [...] }` | Missing/invalid required field(s), or a malformed JSON body. |
| `405 { ok: false, error }` | Non-POST request. |
| `429 { ok: false, error }` | Rate-limited — more than 5 requests from this IP in the last 10 minutes. |

### Behavior notes

- A `200` response does **not** guarantee an email was sent — if `RESEND_API_KEY` is missing or Resend's API rejects the request, `notifyChannels()` logs the error server-side but the enquiry itself is still considered successfully received (the submitted data was valid regardless of downstream notification success).
- Every field is HTML-escaped before being placed into the notification emails — see [`Security.md`](Security.md).
- This function only runs once deployed to Vercel; the local static-file dev server cannot execute it (see [`Testing.md`](Testing.md)).

### Downstream integrations (stubbed, not connected)

`notifyChannels()` in `api/enquiry.js` has commented-out TODO stubs for a CRM push, Jarvis dashboard logging, and Google Sheets logging — each independent, so wiring one in doesn't require touching the others. None are connected as of this writing; only the two email notifications (client confirmation + internal) are live.

## `POST /api/stripe-webhook`

Receives Stripe webhook events. See [`PaymentSystem.md`](PaymentSystem.md) for full setup steps and the events this needs registered in the Stripe Dashboard.

### Request

Sent by Stripe, not by this site's own frontend — no client-side code calls this endpoint. Body is Stripe's raw JSON event payload; the default body parser is disabled (`handler.config = { api: { bodyParser: false } }`) so the raw bytes can be verified against the `Stripe-Signature` header before being trusted.

### Responses

| Status | Meaning |
|---|---|
| `200 { ok: true, received: true }` | Signature verified. Event either handled (notification sent) or acknowledged as an unhandled type — both are a success from Stripe's perspective, so Stripe won't retry. |
| `400 { ok: false, error }` | Missing/malformed/tampered/expired signature, or invalid JSON — Stripe won't retry a `400`, correctly, since the signature will still fail on retry. |
| `405 { ok: false, error }` | Non-POST request. |
| `500 { ok: false, error }` | `STRIPE_WEBHOOK_SECRET` isn't set — refuses to process anything it can't verify rather than trusting an unverified request. |

### Behavior notes

- Handles `payment_intent.succeeded`, `invoice.paid` (sends an internal "payment received" notification email) and `customer.subscription.created`/`.updated`/`.deleted` (sends a subscription-status notification email). Any other event type is acknowledged but not acted on.
- A downstream notification email failing (e.g. `RESEND_API_KEY` missing) does not change the response — the webhook event itself was real and verified; only the non-critical notification failed, logged server-side, same non-fatal philosophy as `/api/enquiry`.
- Tested locally with a mocked `req`/`res` script (signature verification logic, not a real Stripe-signed request) — see [`PaymentSystem.md`](PaymentSystem.md) for exactly what was checked and what still needs a real end-to-end test post-deployment.
