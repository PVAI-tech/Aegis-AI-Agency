// Stripe signs the exact raw request bytes it sent — if Vercel's default
// JSON body parser runs first and we re-stringify the parsed object, the
// re-serialized bytes won't necessarily match byte-for-byte (key order,
// whitespace, unicode escaping), which would make every signature fail.
// api/stripe-webhook.js disables the default parser (`config.api.bodyParser
// = false`) and uses this instead to read the untouched raw body.

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

module.exports = { readRawBody };
