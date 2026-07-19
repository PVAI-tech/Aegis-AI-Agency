// Shared Resend sender, extracted from api/enquiry.js once api/stripe-webhook.js
// needed to send notification emails too. Uses Resend's HTTP API directly via
// fetch rather than their SDK — this project has no package.json/build step,
// so a plain fetch call avoids adding a dependency Vercel would need to
// npm-install (see docs/ADR.md / docs/TRD.md for the zero-dependency choice).

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

module.exports = { sendEmail };
