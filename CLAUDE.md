# maxexe-website — Project CLAUDE.md

> This file extends the global CLAUDE.md. Read that first.

## Project

**MAX.EXE marketing website** — Type A StoryBrand marketing site.
The company's own homepage and diagnostic tool at [maximumexecution.com](https://maximumexecution.com).

## Current Phase

**QA complete, pre-launch.** Next up: Email automation (MailerLite) + official launch.

## Stack

Astro 5 · Tailwind CSS v4 (CSS-first, `@theme` directive) · DaisyUI 5 · Cloudflare Pages · Plausible · Sentry (server-side only)

## Deployment

```bash
npm run build && npx wrangler pages deploy dist
```

- **Production branch:** `main`
- **Cloudflare Pages project:** `maxexe-website`
- **GitHub:** `Maximum-Execution/maxexe-website` (public)
- If build fails with EBUSY, Dropbox is locking `.astro/` cache — retry immediately

## Section Order (Current)

```
Hero → Problem → ValueProp → Guide → Process → SuccessVision → About → Diagnostic → CostOfWaiting → FAQ → Footer
```

These section components exist but are **not rendered** in `index.astro`: `AIFearSection`, `StakesSection`, `TimeReceiptSection`, `ContactSection`, `SystemScanSection`.

## Architecture

- **Flat component structure:** `src/components/` (shared) + `src/components/sections/` (page sections)
- **Diagnostic tool:** Vanilla JS in a single `src/pages/diagnostic.astro` page. No framework island.
  - Fixed scaffold pattern: progress bar + phase title + percentage stay pinned at top
  - `getPhaseTitle(screenId)` maps screen IDs to numbered phase labels
  - Content area (`#diagnostic-root`) swaps on transitions
  - Sticky header offset: `calc(100dvh - 52px)`
- **Typography:** Fluid scale using `--step-` CSS custom properties (Geist Sans / Mono / Pixel)
- **Spacing:** Consistent `--space-` tokens from the brutalist design system
- **Animations:** CSS transitions + Intersection Observer only. `prefers-reduced-motion` respected.

## Copy Source of Truth

**Code is authoritative.** Copy doc v11 (`../copy/maxexe-landing-page-copy-v11.md`) matches the deployed site. v10 is archived.

## Key Files

| Purpose | File |
|---------|------|
| Page composition | `src/pages/index.astro` |
| Diagnostic tool | `src/pages/diagnostic.astro` |
| Base layout + fonts | `src/layouts/BaseLayout.astro` |
| Design tokens | `src/styles/global.css` |
| Creative brief | `../maxexe-website-creative-brief-v3.md` |
| Copy doc | `../copy/maxexe-landing-page-copy-v11.md` |

## Links

- **Live site:** https://maximumexecution.com
- **Diagnostic:** https://maximumexecution.com/diagnostic
- **GitHub:** https://github.com/Maximum-Execution/maxexe-website
- **Cloudflare Pages:** maxexe-website project
- **Plausible:** maximumexecution.com property
- **Sentry:** maxexe-website project
