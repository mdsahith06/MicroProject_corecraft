# CoreCraft — Computer Science, Visualised.

A responsive, interactive learning website for B.Tech computer science fundamentals. Built with React, TypeScript, Vite, Tailwind CSS v4, Lucide React, and Recharts.

## Modules

- **COA — Number systems:** Convert a validated non-negative integer between binary, octal, decimal, and hexadecimal. Values are calculated from the same parsed integer; invalid digits and unsafe integer values are rejected.
- **FLAT — Even-ones DFA:** Explore the two-state deterministic finite automaton. Step through a binary string, move backwards, run to completion, or jump to a bit. State A accepts even counts of `1`; state B represents odd counts. `0` leaves the state unchanged and `1` toggles it.
- **DAA — Big O explorer:** Compare illustrative `O(1)`, `O(log n)`, `O(n)`, and `O(n²)` growth functions. Adjust `n` and highlight a curve. The chart is theoretical, not a measured benchmark.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL (typically `http://localhost:5173`).

## Production build and preview

```bash
npm run build
npm run preview
```

The static production site is generated in `dist/`.

## Deploy to Netlify

1. Push this project to a Git repository.
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository.
3. Set **Build command** to `npm run build` and **Publish directory** to `dist`.
4. Deploy. No environment variables or server are required.

Or deploy with the Netlify CLI:

```bash
npm install
npx netlify deploy --build --prod
```

## Deploy to Vercel

1. Import the Git repository into Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`; output directory: `dist`.
4. Deploy. No environment variables or server are required.

Or use the Vercel CLI:

```bash
npm install
npx vercel --prod
```

## Project structure

```text
corecraft/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    └── style.css
```

## Implementation notes

- React local state powers the converter, DFA trace, navigation, and complexity explorer.
- The complexity chart disables animation and uses transparent labels to make clear it represents mathematical growth functions, not runtime measurements.
- The site is client-side only; no API keys, account, or backend are needed.
- Google Fonts are used for Manrope and DM Mono; system fallbacks remain available if fonts cannot load.
