// Shared sanitization helpers used by every serverless function that builds
// an HTML email from attacker-controlled input (form submissions, webhook
// payloads). Extracted from api/enquiry.js once api/stripe-webhook.js needed
// the exact same two functions — see docs/Architecture.md's shared-asset
// pattern for why duplication gets extracted once a second consumer exists.

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
// body an email provider receives — strip control characters instead of
// escaping them.
function sanitizeForSubject(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

module.exports = { escapeHtml, sanitizeForSubject };
