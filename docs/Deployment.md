# Deployment

## How it works

Push to `main` on GitHub (`PVAI-tech/Aegis-AI-Agency`) → Vercel auto-deploys. No manual deploy step, no build command (Vercel serves the static files as-is and auto-detects `api/enquiry.js` as a serverless function).

## Pre-push checklist

Since there's no CI, do this manually before pushing anything that touches shared files (`assets/site.css`, `assets/site.js`, or anything loaded on every page):
1. Check for console errors on at least the homepage and one other page.
2. If you touched HTML structure, verify tag balance — a naive `<div>`/`</div>` count can miss real issues; a proper `html.parser`-based check (see git history for the exact script used to catch a real stray `</div>` during the rebrand) is more reliable.
3. If you touched `api/enquiry.js`, run it locally via a mocked Node script (see `Testing.md`) — the local static server can't exercise it directly.
4. If you touched anything CSP-relevant (added a new external script/font/embed), update `vercel.json`'s `Content-Security-Policy` — otherwise the resource will silently fail to load in production only (CSP isn't enforced locally without the header, so this class of bug won't show up until deployed).

## Post-push verification

- `curl -I https://aegishealthai.co.uk/` — confirm security headers are present (see `Security.md` for the expected list).
- Load the live site and check the browser console for CSP violation errors — these won't appear locally.
- If `api/enquiry.js` changed, submit a real test enquiry against the live URL and check Vercel's function logs (Project → Logs, filterable by time/path) for the actual server-side outcome — the client only ever sees a generic success/failure, not the underlying reason.

## Domain / DNS

Domain (`aegishealthai.co.uk`) is registered and DNS-managed through Wix, pointed at Vercel via an A record + CNAME (added manually in Wix's DNS panel, not through Vercel's automated flow, since Wix requires domain records to be entered by hand). See `SRD.md` for the DNS limitation that's currently blocking full Resend sending-domain verification.

## Rollback

Vercel keeps every deployment; rolling back means selecting a previous deployment in the Vercel dashboard and promoting it to production, or reverting the relevant commit(s) on `main` and pushing — there's no automated rollback script.
