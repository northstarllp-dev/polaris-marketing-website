# Polaris

Marketing site for **Polaris** , the parent company building purpose-built software for real business niches. **PrintOMS** is the first live product: order management for signage and fabrication shops.

## Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4**
- **React Router 7**
- **Motion** (`motion/react`) for scroll / hover / 3D animations
- **shadcn/ui** (New York / Radix) for UI primitives
- **Lucide** icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build   # production build → dist/
```

## Site map

| Route | Page |
|-------|------|
| `/` | Polaris home , brand hero, problem story, how we work, PrintOMS spotlight, ecosystem, why Polaris, founders, CTA |
| `/products/printoms` | PrintOMS product page , showcase mockup, pain points, workflow, roles, pricing, FAQ |

Nav links smooth-scroll to section hashes (`#how-we-work`, `#why`, `#about`, `#pricing`, `#contact`). **Book a Demo** dials `+91 8189999998`.

## Project structure

```
src/
  main.tsx
  app/
    App.tsx                 # Routes
    layout/                 # NavBar, Footer, RootLayout
    pages/                  # HomePage, PrintOMSPage
    sections/
      home/                 # Home sections
      printoms/             # PrintOMS sections
      shared/               # FinalCTA, etc.
    content/                # Copy + data (polaris.ts, printoms.ts)
    components/
      motion/               # FadeIn, Stagger, StickySteps, Tilt3D, …
      ui/                   # shadcn components
      ProductMockup.tsx     # Interactive tabbed product demo
    hooks/                  # useHashScroll
  styles/                   # fonts, tailwind, theme tokens
public/                     # Logos, favicons, hero assets
```

## Brand tokens

Defined in `src/styles/theme.css` and used across sections:

- Navy: `#0f1035`
- Orange accent / CTA: `#ff7043`
- Typography: **Figtree** (UI), **Instrument Serif** (Polaris brand moments)

## shadcn/ui

Config: [`components.json`](components.json)  
Components land in `src/app/components/ui/`.

```bash
npx shadcn@latest add button card dialog
```

`.npmrc` sets `legacy-peer-deps=true` to avoid peer conflicts during CLI installs.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |

## Notes

- Path alias `@/*` → `src/*` (see `tsconfig.json` and `vite.config.ts`).
- Prefer motion primitives under `src/app/components/motion/` for new section animations.
- Keep marketing copy in `src/app/content/` so UI stays thin.
