// Manual Stripe webhook signature verification (HMAC-SHA256), following
// Stripe's publicly documented algorithm exactly:
// https://stripe.com/docs/webhooks/signatures#verify-manually
//
// Implemented by hand instead of pulling in the `stripe` npm package to keep
// this project's zero-dependency architecture intact (see docs/ADR.md,
// docs/TRD.md) — this is the one place that genuinely needs crypto, and
// Node's built-in `crypto` module is enough.
//
// Never skip this check. An unverified webhook endpoint means anyone who
// finds the URL could POST a fake "payment succeeded" event and trigger a
// real deployment/handover — see docs/PaymentSystem.md's explicit warning
// about this exact risk.

const crypto = require("crypto");

function verifyStripeSignature(rawBody, sigHeader, secret, toleranceSeconds = 300) {
  if (!sigHeader) throw new Error("Missing Stripe-Signature header");

  const parts = {};
  for (const kv of sigHeader.split(",")) {
    const [key, value] = kv.split("=");
    if (key && value) parts[key] = value;
  }

  const timestamp = parts.t;
  const providedSig = parts.v1;
  if (!timestamp || !providedSig) throw new Error("Malformed Stripe-Signature header");

  const signedPayload = `${timestamp}.${rawBody.toString("utf8")}`;
  const expectedSig = crypto.createHmac("sha256", secret).update(signedPayload, "utf8").digest("hex");

  const expectedBuf = Buffer.from(expectedSig, "utf8");
  const providedBuf = Buffer.from(providedSig, "utf8");
  if (expectedBuf.length !== providedBuf.length || !crypto.timingSafeEqual(expectedBuf, providedBuf)) {
    throw new Error("Signature verification failed");
  }

  const ageSeconds = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (ageSeconds > toleranceSeconds) {
    throw new Error("Timestamp outside tolerance — possible replay");
  }
}

module.exports = { verifyStripeSignature };
