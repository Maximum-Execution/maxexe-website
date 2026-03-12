# maxexe-website

Marketing website for [Maximum Execution](https://maximumexecution.com) — web design, apps, and AI tools for small businesses. Based in Richmond, Virginia.

## Stack

Astro 5 / Tailwind CSS v4 / DaisyUI 5 / Cloudflare Pages / Plausible / Sentry

## Development

```sh
npm install
npm run dev        # localhost:4321
npm run build      # production build → ./dist/
```

## Deployment

```sh
npm run build && npx wrangler pages deploy dist --project-name maxexe-website --branch main
```

Production: Cloudflare Pages, auto-deploy from `main`.

## Project Structure

```
src/
  components/         Shared components (Button, SectionWrapper, Topbar)
  components/sections/ Page sections (Hero, Problem, ValueProp, etc.)
  layouts/            BaseLayout with fonts, meta, analytics
  pages/              index.astro (homepage), diagnostic.astro
  styles/             global.css (design tokens, theme classes)
public/
  fonts/              Geist Sans, Mono, Pixel (woff2)
```

## Theme System

Per-section theming via CSS classes: `.theme-dark`, `.theme-light`, `.theme-amber`. Each class sets the full token palette (background, text, border, semantic colors). CRT shell effects (scanlines + vignette) scoped to `.theme-dark` only.

Distribution: 60% light / 30% dark / 10% amber.
