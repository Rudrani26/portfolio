# Rudrani Chavarkar — Portfolio

An interactive, AI-systems-flavored personal portfolio. Built with Vite, React 19, TypeScript, Tailwind CSS v4, and Framer Motion (the "Motion for React" library).

## Stack notes

- **Vite + React + TypeScript**, not Next.js. The repo already had a working static SPA deployed to GitHub Pages via the `gh-pages` package, so the redesign kept that setup rather than migrating to Next.js App Router/SSR, which would need a static-export reconfiguration for no benefit on a single-page site.
- **Tailwind CSS v4** using the CSS-first `@theme`/`@custom-variant` config in [src/index.css](src/index.css) — there's no `@config` wiring needed; `tailwind.config.js` only supplies the `content` globs.
- **Framer Motion** (`framer-motion` package) — this is the same project as "Motion for React" after its rebrand, so no separate `motion` package was added.
- **lucide-react** for icons. Note: lucide-react v1 dropped brand/logo icons (GitHub, LinkedIn, etc.), so those two marks are small standalone SVGs in [src/components/ui/BrandIcons.tsx](src/components/ui/BrandIcons.tsx).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
npm run build    # production build to dist/
npm run lint      # eslint
```

## Editing content

Everything personal — profile, links, hero copy, projects, experience/education timeline, skills, "Currently" panel, and contact config — lives in one file:

**[src/data/portfolio.ts](src/data/portfolio.ts)**

Search that file for `PLACEHOLDER` to find every entry that still needs real input. Types for all of the above are in [src/types/index.ts](src/types/index.ts).

### Adding a real project

Edit or replace an entry in the `projects` array. Each project has `technicalChallenge`, `engineeringDecision`, and `measurableResult` fields that power the "hardest decision" expandable panel on each card. Three entries (`placeholder-backend`, `placeholder-fullstack`, `placeholder-security`) are intentionally empty templates — not fabricated case studies — so the category filters have coverage; replace them with real work and they'll stop showing the "Template — edit me" badge once `isPlaceholder` is set to `false`.

### Adding a timeline entry

Add to the `timeline` array in the same file — entries are sorted by `sortKey` (newest first) and rendered as an expandable vertical timeline.

## Deployment

Unchanged from the original setup:

```bash
npm run deploy   # builds and publishes dist/ to the gh-pages branch
```

This redesign was built on a separate branch and was **not** deployed to production as part of this work — deploying stays a manual, separate step.

## Remaining placeholders

See the assistant's final summary in the PR description for the up-to-date list of what still needs real content (résumé PDF, SentinelMCP repo link, and the three template project cards).
