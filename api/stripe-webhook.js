// Vercel serverless function — auto-detected from this /api directory.
// Receives Stripe webhook events and is the one place code is allowed to
// treat a payment as real. Per docs/PaymentSystem.md: ownership transfer,
// deployment, and code handover are gated on this webhook firing
// (payment_intent.succeeded / invoice.paid) — never on an invoice merely
// being sent, and never on a client's own claim that they paid.
//
// Setup once this is deployed:
// 1. Stripe Dashboard → Developers → Webhooks → Add endpoint
//    URL: https://aegishealthai.co.uk/api/stripe-webhook
// 2. Select events: payment_intent.succeeded, invoice.paid,
//    customer.subscription.created, customer.subscription.updated,
//    customer.subscription.deleted
// 3. Copy the signing secret Stripe shows you and add it to Vercel as
//    STRIPE_WEBHOOK_SECRET (Project Settings → Environment Variables).
// 4. STRIPE_SECRET_KEY must already be set (used to look up a customer's
//    email when an event doesn't include it directly).

const { verifyStripeSignature } = require("./_lib/stripeSignature");
const { readRawBody } = require("./_lib/readRawBody");
const { sendEmail } = require("./_lib/email");
const { escapeHtml, sanitizeForSubject } = require("./_lib/text");
const { stripeGet } = require("./_lib/stripeApi");

const INTERNAL_INBOX = "Aegishealthai@outlook.com";

async function resolveCustomerEmail(customerId) {
  if (!customerId) return null;
  try {
    const customer = await stripeGet(`/v1/customers/${customerId}`);
    return customer.email || null;
  } catch (err) {
    console.error("Failed to resolve Stripe customer email:", err);
    return null;
  }
}

async function notifyPaymentReceived(kind, obj) {
  const amountMinor = typeof obj.amount_paid === "number" ? obj.amount_paid : obj.amount;
  const currency = (obj.currency || "").toUpperCase();
  const formattedAmount = typeof amountMinor === "number"
    ? (amountMinor / 100).toLocaleString("en-GB", { minimumFractionDigits: 2 })
    : "unknown";
  const email = obj.customer_email || obj.receipt_email || await resolveCustomerEmail(obj.customer);

  await sendEmail({
    to: INTERNAL_INBOX,
    subject: sanitizeForSubject(`Payment received (${kind}): ${currency} ${formattedAmount}`),
    html: `
      <p><strong>${escapeHtml(kind)}</strong> succeeded.</p>
      <ul>
        <li><strong>Amount:</strong> ${escapeHtml(currency)} ${escapeHtml(formattedAmount)}</li>
        <li><strong>Customer email:</strong> ${escapeHtml(email || "unknown — check Stripe Dashboard")}</li>
        <li><strong>Stripe object ID:</strong> ${escapeHtml(obj.id)}</li>
      </ul>
      <p>Per docs/PaymentSystem.md, this webhook is the authoritative signal to proceed with deployment/handover for whichever milestone this payment covers — cross-check which project/client it's for in the Stripe Dashboard before acting, since this notification alone doesn't carry that context.</p>
    `
  });
}

async function notifySubscriptionEvent(eventType, subscription) {
  const email = await resolveCustomerEmail(subscription.customer);
  await sendEmail({
    to: INTERNAL_INBOX,
    subject: sanitizeForSubject(`Subscription ${eventType.split(".").pop()}: ${email || subscription.id}`),
    html: `
      <p>Stripe event: <strong>${escapeHtml(eventType)}</strong></p>
      <ul>
        <li><strong>Customer email:</strong> ${escapeHtml(email || "unknown — check Stripe Dashboard")}</li>
        <li><strong>Subscription ID:</strong> ${escapeHtml(subscription.id)}</li>
        <li><strong>Status:</strong> ${escapeHtml(subscription.status)}</li>
      </ul>
    `
  });
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set — refusing to process an unverifiable webhook");
    res.status(500).json({ ok: false, error: "Webhook not configured" });
    return;
  }

  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch {
    res.status(400).json({ ok: false, error: "Failed to read request body" });
    return;
  }

  try {
    verifyStripeSignature(rawBody, req.headers["stripe-signature"], secret);
  } catch (err) {
    // Never trust an unverified event — see docs/PaymentSystem.md's rule
    // that only a verified server-side webhook is authoritative, extended
    // here to mean "never trust an unverified webhook request" either.
    console.error("Stripe webhook signature verification failed:", err.message);
    res.status(400).json({ ok: false, error: "Signature verification failed" });
    return;
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString("utf8"));
  } catch {
    res.status(400).json({ ok: false, error: "Invalid JSON payload" });
    return;
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await notifyPaymentReceived("Payment Intent", event.data.object);
        break;
      case "invoice.paid":
        await notifyPaymentReceived("Invoice", event.data.object);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await notifySubscriptionEvent(event.type, event.data.object);
        break;
      default:
        // Acknowledged but intentionally not acted on — only the event
        // types above are wired to a notification per docs/PaymentSystem.md.
        break;
    }
  } catch (err) {
    // The event itself was verified and real — a downstream notification
    // failing shouldn't make Stripe retry indefinitely. Log and still
    // acknowledge, same non-fatal-notification philosophy as api/enquiry.js.
    console.error(`Failed to process Stripe event ${event.type}:`, err);
  }

  res.status(200).json({ ok: true, received: true });
}

handler.config = { api: { bodyParser: false } };

module.exports = handler;
