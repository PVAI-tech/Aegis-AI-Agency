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

// Every enquiry field is attacker-controlled (it's a public form) and gets
// interpolated into HTML email bodies below — escape it the same way a
// templating engine would so a submission can't inject markup/scripts into
// an email a real person opens.
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

// Subject lines don't support HTML, but a newline in a user-controlled
// field could otherwise be used to smuggle extra headers into the request
// body Resend receives — strip control characters instead of escaping.
function sanitizeForSubject(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

const INTERNAL_INBOX = "Aegishealthai@outlook.com";

// Uses Resend's HTTP API directly via fetch rather than their SDK — this
// project has no package.json/build step, so a plain fetch call avoids
// adding a dependency Vercel would need to npm-install.
async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  const from = process.env.RESEND_FROM || "Aegis AI <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from, to, subject, html })
  });
  if (!res.ok) {
    throw new Error(`Resend request failed (${res.status}): ${await res.text()}`);
  }
}

function serviceList(enquiry) {
  const services = Array.isArray(enquiry.servicesInterested)
    ? enquiry.servicesInterested
    : [enquiry.servicesInterested].filter(Boolean);
  return services.length ? services.map(escapeHtml).join(", ") : "Not specified";
}

async function sendClientConfirmationEmail(enquiry) {
  await sendEmail({
    to: enquiry.email,
    subject: "We've received your enquiry — Aegis AI",
    html: `
      <p>Hi ${escapeHtml(enquiry.fullName)},</p>
      <p>Thanks for reaching out to Aegis AI. We've received your enquiry for <strong>${escapeHtml(enquiry.businessName)}</strong> and a member of the team will be in touch within the hour to arrange your discovery call.</p>
      <p>Here's a copy of what you submitted:</p>
      <ul>
        <li><strong>Services interested in:</strong> ${serviceList(enquiry)}</li>
        <li><strong>Project description:</strong> ${escapeHtml(enquiry.projectDescription)}</li>
        <li><strong>Budget:</strong> ${escapeHtml(enquiry.budget)}</li>
      </ul>
      <p>Speak soon,<br/>Aegis AI Agency</p>
    `
  });
}

async function sendInternalNotificationEmail(enquiry) {
  await sendEmail({
    to: INTERNAL_INBOX,
    subject: `New enquiry: ${sanitizeForSubject(enquiry.businessName)} (${sanitizeForSubject(enquiry.urgency)})`,
    html: `
      <p>New enquiry received at ${escapeHtml(enquiry.submittedAt)}</p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(enquiry.fullName)}</li>
        <li><strong>Business:</strong> ${escapeHtml(enquiry.businessName)}</li>
        <li><strong>Email:</strong> ${escapeHtml(enquiry.email)}</li>
        <li><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</li>
        <li><strong>Website:</strong> ${escapeHtml(enquiry.website) || "—"}</li>
        <li><strong>Industry:</strong> ${escapeHtml(enquiry.industry)}</li>
        <li><strong>Business size:</strong> ${escapeHtml(enquiry.businessSize)}</li>
        <li><strong>Budget:</strong> ${escapeHtml(enquiry.budget)}</li>
        <li><strong>Preferred contact:</strong> ${escapeHtml(enquiry.preferredContact)}</li>
        <li><strong>Preferred meeting time:</strong> ${escapeHtml(enquiry.preferredMeetingTime) || "—"}</li>
        <li><strong>Services interested in:</strong> ${serviceList(enquiry)}</li>
        <li><strong>Urgency:</strong> ${escapeHtml(enquiry.urgency)}</li>
        <li><strong>Project description:</strong> ${escapeHtml(enquiry.projectDescription)}</li>
      </ul>
    `
  });
}

async function notifyChannels(enquiry) {
  // Each awaited independently so one failing (e.g. a bad recipient) doesn't
  // stop the other from sending — the caller already treats every failure
  // here as non-fatal to the enquiry submission itself.
  await Promise.allSettled([
    sendClientConfirmationEmail(enquiry),
    sendInternalNotificationEmail(enquiry)
  ]).then(results => {
    results.forEach(r => {
      if (r.status === "rejected") console.error("notifyChannels email failed:", r.reason);
    });
  });

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

// In-memory sliding-window limiter, keyed by client IP. This resets on
// every cold start and isn't shared across concurrent function instances,
// so it's "best effort" rather than a hard guarantee — good enough to stop
// a casual script from hammering the endpoint on a small-business site
// without adding an external dependency (Upstash/Vercel KV) this project
// doesn't otherwise need. If real abuse shows up, that's the upgrade path.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissionsByIp = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  if (isRateLimited(ip)) {
    res.status(429).json({ ok: false, error: "Too many enquiries from this address — please try again later." });
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
