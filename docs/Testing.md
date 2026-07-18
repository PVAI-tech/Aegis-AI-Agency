# Testing

## Current state: no automated tests

There is no test suite, no CI pipeline, and no test framework installed (consistent with the no-build-tooling constraint — see `ADR.md`). Everything to date has been verified through:
- Manual click-through of every interactive element (nav, CTAs, modals, forms) across all 7 pages
- Direct DOM/computed-style inspection via a browser automation tool during development
- Direct `node --check` syntax validation on every JS file after edits
- Direct execution of `api/enquiry.js`'s handler function in plain Node (mocking `req`/`res`/`fetch`) to verify validation, HTML-escaping, and rate-limiting behavior without needing a live deployment
- `curl` against the live deployment to verify security headers are actually being served

## Known environment quirk: `api/enquiry.js` can't run locally

`python3 -m http.server` (or any plain static file server) cannot execute Vercel serverless functions. Locally, `assets/enquiry-form.js`'s `fetch("/api/enquiry", ...)` call fails with a network error — this is expected and documented in that file's header comment. The form still redirects to `thank-you.html` on any fetch failure, so the client-side flow is testable without a deployment; the actual backend logic can only be exercised either (a) after deploying, via a real HTTP request to the live URL, or (b) locally, by `require()`-ing the handler directly in a Node script with mocked `req`/`res` objects (this is how the HTML-escaping and rate-limiting fixes were verified during development — see git history for the exact test script used).

## Recommended next steps (not yet done)

1. **Smoke tests for `api/enquiry.js`**: a small Node test file that mocks `req`/`res` and asserts on validation, escaping, and rate-limiting — the manual version of this already exists as a one-off script; formalizing it into a real, repeatable test file would catch regressions.
2. **Broken-link checker**: a script that crawls all 7 pages and confirms every internal `href`/`src` resolves — this was done manually (a Python script cross-referencing every anchor against every page's `id` attributes) but isn't saved as a repeatable check.
3. **Lighthouse CI**: no baseline has been captured against the live deployment yet (see `Roadmap.md`). Once captured, wiring it into a CI step (even a manually-triggered one) would catch performance/accessibility regressions.
4. **Visual regression**: given there's no component framework, even simple screenshot diffing on the 7 pages at 2-3 viewport widths would catch unintended layout breaks from CSS changes.
