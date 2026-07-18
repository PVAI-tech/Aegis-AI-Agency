# API Reference

There is exactly one API endpoint in this project.

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
