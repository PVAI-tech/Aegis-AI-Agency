# Accessibility

Internal technical reference. The public-facing summary lives at `accessibility-statement.html` — keep both in sync when either changes.

## What's implemented, and where in the code

- **Focus trapping in modals** — `assets/modal.js`: Tab/Shift-Tab cycles within the open modal, Escape closes it, focus returns to the triggering element on close.
- **Keyboard-operable custom controls** — service cards (`data-service` divs in `index.html`) use `role="button" tabindex="0"` plus a `keydown` handler for Enter/Space, not just a mouse `click` listener.
- **ARIA on dynamic widgets** — the Jarvis launcher button carries `aria-haspopup="dialog"` and `aria-expanded`; the chat panel and shared modal carry `role="dialog"` and `aria-modal`.
- **Alt text** on every `<img>` — descriptive, not filenames.
- **Color contrast** — checked manually against the rebrand palette (see git history for the calculation): body text and muted text both pass WCAG AA on the site's background colors; the brand accent color is deliberately never used for small body text since it falls just short of AA at that size — only for buttons, icons, and large headings.

## What's not done yet

- No automated audit (axe-core or a full Lighthouse accessibility pass) has been run against the live deployed site — see [`Roadmap.md`](Roadmap.md).
- No testing with an actual screen reader by someone who uses one daily — the ARIA attributes follow standard practice, not verified first-hand assistive-technology use.
- No skip-to-content link for keyboard users to bypass the nav on every page load.

## How to actually verify this (next time, don't just assume)

1. Run Lighthouse's Accessibility category against the live URL (Chrome DevTools → Lighthouse, or `npx lighthouse <url> --only-categories=accessibility` if Node tooling is ever added) and capture a baseline score.
2. Tab through every page using only the keyboard — confirm focus order is logical and nothing is unreachable.
3. If budget allows, a short paid session with an actual screen-reader user is worth more than any automated tool for catching real friction.
