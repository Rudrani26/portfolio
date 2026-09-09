# Rudrani Chavarkar — Portfolio

An interactive, AI-systems-flavored personal portfolio. Built with Vite, React 19, TypeScript, Tailwind CSS v4, and Framer Motion (the "Motion for React" library).

Every project, internship, and education entry is drawn directly from the résumé — there are no placeholder or template cards in this codebase by design.

## Stack notes

- **Vite + React + TypeScript**, not Next.js. The repo already had a working static SPA deployed to GitHub Pages via the `gh-pages` package, so the redesign kept that setup rather than migrating to Next.js App Router/SSR, which would need a static-export reconfiguration for no benefit on a single-page site.
- **Tailwind CSS v4** using the CSS-first `@theme`/`@custom-variant` config in [src/index.css](src/index.css) — there's no `@config` wiring needed; `tailwind.config.js` only supplies the `content` globs.
- **Framer Motion** (`framer-motion` package) — this is the same project as "Motion for React" after its rebrand, so no separate `motion` package was added.
- **lucide-react** for icons. Note: lucide-react v1 dropped brand/logo icons (GitHub, LinkedIn, etc.), so those two marks are small standalone SVGs in [src/components/ui/BrandIcons.tsx](src/components/ui/BrandIcons.tsx).
- **No contact form / no email service dependency.** Contact is a mailto `Email me` button plus a `Copy email` button — no backend, no form service, nothing to configure.
- **No company logo assets.** Internship cards use a text-monogram badge ([src/components/ui/CompanyMonogram.tsx](src/components/ui/CompanyMonogram.tsx)) instead of official logos, to avoid bundling unverified or hotlinked brand assets. Swap in real logo files under `public/logos/` and update `monogram`/render logic if you'd rather show official marks.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
npm run build    # production build to dist/
npm run lint      # eslint
```

## Editing content

Everything personal — profile, links, hero copy, projects, internships, education, skills, and the "Currently" panel — lives in one file:

**[src/data/portfolio.ts](src/data/portfolio.ts)**

Types for all of the above are in [src/types/index.ts](src/types/index.ts).

### Adding a project

Add to the `projects` array. Every field must be traceable to the résumé or other real, existing content — `description` and `highlights` should be near-verbatim from source material, not invented metrics or narrative. Omit a field entirely if there isn't real information for it (there's no placeholder convention here).

### Adding an internship or education entry

Internships live in the `internships` array, education (including publications) in the `education` array — both use the same `TimelineEntry` shape and are rendered by the shared [TimelineList](src/components/ui/TimelineList.tsx) component. Entries are sorted by `sortKey` (newest first).

## Deployment

Unchanged from the original setup:

```bash
npm run deploy   # builds and publishes dist/ to the gh-pages branch
```

This redesign was built on a separate branch and was **not** deployed to production as part of this work — deploying stays a manual, separate step.

## Remaining items

See the assistant's final summary in the PR description for what still needs your input (real company logos, if desired).
