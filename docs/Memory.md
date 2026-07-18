# Project Memory

Institutional knowledge that isn't obvious from reading the code — for whoever (human or AI assistant) picks this project up next.

## Non-obvious facts

- **The domain is `aegishealthai.co.uk`**, but the site's display brand is "Aegis AI" (not "Aegis Health AI") — the email address, Calendly handle, and domain all use the "healthai" form, while the logo/nav/footer say "Aegis AI." This is intentional, not a bug — don't try to "fix" the mismatch without checking first.
- **The founder is Laiba Sheikh**, mentioned by name in the About section. There is no other team — copy should stay first-person-singular-adjacent ("I build...") even where the brand voice otherwise says "we."
- **DNS is on Wix, not the usual GoDaddy/Cloudflare** — this matters because Wix's DNS panel cannot create MX records on a subdomain, which blocked Resend's sending-domain verification. If email deliverability ever needs revisiting, start there.
- **The site previously had fabricated stats and testimonials** (fake "50+ businesses trust us," fake dashboard metrics, placeholder testimonials with obviously-fake content) which were explicitly identified and removed after the client said "I need originality." Do not reintroduce any stat, testimonial, or client logo that isn't independently verifiable — this was a repeated, explicit instruction, not a one-off preference.
- **The rebrand was driven by an internal audit** (`WEBSITE_AUDIT.md`) that found the original design used the exact generic AI-startup visual language (blue/cyan/violet gradients, animated particle backgrounds, emoji-as-icons, literal robot/circuit-board stock photos). If a future design change reintroduces any of these, that's very likely a regression, not a fresh choice.
- **The client's own logo design has been integrated**, replacing the rebrand-era geometric nested-hexagon SVG mark. The live mark is `assets/logo-icon.png` (a shield icon cropped from the client's full lockup, background removed), used via `<img>` tags in every page's nav/footer/loader/hero, plus `assets/favicon.png` for the favicon and `assets/logo-full-lockup.png` (full shield+wordmark, solid black text — reference/print use only, not used on the dark site UI since the text would be unreadable). The existing white `.nav-logo-text`/`.ft-logo-name` CSS spans still carry the "Aegis AI" wordmark on-site, deliberately kept separate from the image.

## Decisions made under real constraints, not preferences

- HTML injection into enquiry emails and missing rate-limiting were found and fixed as *bugs*, not style choices — see [`Security.md`](Security.md). If similar patterns (unescaped user input going into HTML/emails) show up elsewhere, treat it the same way.
- A pre-existing stray `</div>` in the FAQ section (unrelated to any specific feature work) was found via a proper HTML-parser-based tag-balance check, not visual inspection — worth remembering that naive open/close tag *counting* can miss real mismatches that a parser catches.
