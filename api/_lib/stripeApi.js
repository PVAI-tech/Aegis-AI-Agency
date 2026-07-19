// Minimal Stripe REST API client — a plain fetch wrapper, same rationale as
// api/_lib/email.js: no `stripe` npm package, so no build step is needed.
// Stripe's API authenticates via HTTP Basic Auth with the secret key as the
// username and an empty password.

async function stripeGet(path) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("STRIPE_SECRET_KEY is not set");

  const auth = Buffer.from(`${secretKey}:`).toString("base64");
  const res = await fetch(`https://api.stripe.com${path}`, {
    headers: { Authorization: `Basic ${auth}` }
  });
  if (!res.ok) {
    throw new Error(`Stripe API request failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

module.exports = { stripeGet };
