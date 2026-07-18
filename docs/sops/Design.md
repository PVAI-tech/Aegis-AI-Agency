# SOP — Design

Part of [`AegisOperatingSystem.md`](../AegisOperatingSystem.md). Covers visual/UX decisions both for client work and for the Aegis site itself.

## Who does this today
Laiba Sheikh, solo. No dedicated designer — design decisions are made directly by whoever is building, guided by the standards below rather than a separate design handoff step.

## Design standards currently in force (Aegis's own site)
- Dark UI, restrained color palette (blue/cyan/indigo accents on a near-black background) — see the CSS custom properties at the top of [`../../assets/site.css`](../../assets/site.css).
- **No generic AI-startup visual clichés**: no literal robot/circuit-board stock photography, no emoji-as-icon, no gratuitous particle/gradient animation for its own sake. This was an explicit corrective finding from an internal audit (`WEBSITE_AUDIT.md`) early in this project — treat any reintroduction of these patterns as a regression, not a fresh stylistic choice.
- Accessibility baseline: visible `:focus-visible` states on all interactive elements, `aria-label`/`role` on anything that isn't self-explanatory from visible text alone (badges, toggles, accordions) — see [`Accessibility.md`](../Accessibility.md).

## Process for client design work
1. Confirm the client's actual brand assets exist (logo, colors, fonts) during Discovery — don't invent a brand identity the client didn't ask for.
2. Reuse the shared component patterns already proven on the Aegis site (card layouts, modal engine, comparison-table/accordion pattern) rather than building a bespoke pattern per client project unless the brief specifically calls for something different — consistency here is what keeps delivery timelines realistic.
3. Test every client deliverable at three widths minimum: ~375px (mobile), ~768px (tablet), ~1280px (desktop) before calling a design "done."
4. Check contrast and focus-visibility on any new interactive component — don't assume it inherits acceptable contrast just because it reuses existing color tokens; verify it the same way [`Accessibility.md`](../Accessibility.md) documents for the pricing page components.

## Common failure mode to avoid
Approving a design only at desktop width and discovering mobile problems after the client has already seen it — verification order should always include the narrowest supported width, not just the width the builder happens to be looking at.

## Handoff notes for a future hire
Needs a copy of this SOP plus direct access to `assets/site.css`'s token block (colors, spacing, radius, easing) as the single source of visual truth — new components should draw from these tokens, not introduce new ad-hoc values.
