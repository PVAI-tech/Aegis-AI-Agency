// Vercel serverless function — auto-detected from this /api directory, no
// vercel.json needed. Receives the enquiry form POST from
// assets/enquiry-form.js, validates it, and hands off to notifyChannels().
//
// Nothing here is wired to a real provider yet (no API keys, no .env) —
// this is deliberately just the clean seam described in the project plan.
// Each TODO below is an independent integration point; wiring one in later
// shouldn't require touching the others.

const REQUIRED_FIELDS = [
  "fullName",
  "businessName",
  "email",
  "phone",
  "industry",
  "businessSize",
  "budget",
  "projectDescription",
  "urgency"
];

// Documented shape of the enquiry object every downstream integration
// below receives. Keep this in sync with the <form> fields in enquiry.html.
// {
//   fullName: string,
//   businessName: string,
//   email: string,
//   phone: string,
//   website: string,              // optional
//   industry: string,
//   businessSize: string,
//   budget: string,
//   servicesInterested: string[], // checkbox values
//   projectDescription: string,
//   preferredContact: string,
//   preferredMeetingTime: string,  // optional
//   urgency: string,
//   submittedAt: string           // ISO timestamp, added server-side
// }

function validate(body) {
  const errors = REQUIRED_FIELDS.filter(field => !body || !String(body[field] || "").trim());
  if (body && body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push("email");
  }
  return errors;
}

async function notifyChannels(enquiry) {
  // TODO: Client confirmation email — send `enquiry` a "we've got your
  // enquiry" email (e.g. via Resend/Postmark/SendGrid). Template should
  // restate what they asked for and the "within 1 hour" response promise
  // shown on thank-you.html.
  // await sendClientConfirmationEmail(enquiry);

  // TODO: Internal notification email — alert the team inbox with the
  // full enquiry payload so someone can action it within the hour.
  // await sendInternalNotificationEmail(enquiry);

  // TODO: CRM push — create/update a contact + deal in whichever CRM is
  // adopted (HubSpot/GoHighLevel/etc.), tagged with servicesInterested.
  // await pushToCrm(enquiry);

  // TODO: Jarvis dashboard logging — once the Jarvis backend (see
  // case-study-jarvis-ai.html) has a real API, log the enquiry there so
  // it shows up as an "Aegis Workspace" event.
  // await logToJarvisDashboard(enquiry);

  // TODO: Google Sheets logging — append a row to a shared enquiries
  // sheet for quick non-technical visibility.
  // await appendToGoogleSheet(enquiry);

  return true;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ ok: false, error: "Invalid JSON body" });
      return;
    }
  }

  const errors = validate(body);
  if (errors.length) {
    res.status(400).json({ ok: false, error: "Missing or invalid fields", fields: errors });
    return;
  }

  const enquiry = { ...body, submittedAt: new Date().toISOString() };

  try {
    await notifyChannels(enquiry);
  } catch (err) {
    // Even if a downstream integration fails once real ones are added, the
    // enquiry itself was valid — don't fail the whole request over a
    // notification hiccup. Log for now; replace with real error tracking
    // (e.g. Sentry) once available.
    console.error("notifyChannels failed:", err);
  }

  res.status(200).json({ ok: true });
};
