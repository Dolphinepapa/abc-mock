# XNURTA Brand Operations Agent — UI Mock

High-fidelity UI mock for the XNURTA Brand Operations Agent canvas. Single-page React app built with Vite + Tailwind. Intended for stakeholder review (PRFAQ Appendix A9).

**Live:** https://abc-mock.vercel.app — deploys automatically on push to `main`.

## Quick start (local)

```bash
pnpm install     # or: npm install
pnpm dev         # opens at http://localhost:5173
```

For a production build:

```bash
pnpm build       # outputs to dist/
pnpm preview     # preview the built output locally
```

## Deploy — pick one

### Option A · Vercel CLI (recommended · best link)

```bash
npm install -g vercel
vercel           # follow prompts; first run creates account if needed
```

You'll get a URL like `https://xnurta-brand-ops-mock-xxx.vercel.app`. Each subsequent `vercel` deploys an update. Free tier is generous and the link is stable.

### Option B · Vercel drag-and-drop (no CLI)

1. Run `pnpm build` locally to generate `dist/`.
2. Go to https://vercel.com/new and drag the project folder (not `dist/` — the whole project). Vercel auto-detects Vite.
3. Done. URL appears.

### Option C · Netlify drop (no account needed)

1. Run `pnpm build` locally.
2. Go to https://app.netlify.com/drop and drag the `dist/` folder.
3. You get an instant URL. (Account optional, but needed for a custom subdomain.)

### Option D · CodeSandbox (no local install)

1. Go to https://codesandbox.io
2. Click "Create" → "Import project from your computer" → drag this whole folder.
3. CodeSandbox runs it in the browser; share the URL.

## Project structure

```
abc-mock/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                  ← React entry, mounts App
    ├── index.css                 ← Tailwind directives
    └── BrandOperationsAgent.jsx  ← the full mock (single component)
```

## Notes

- The mock is locked to a fixed sample conversation (5 chat messages, 5 canvases). The chat input is intentionally disabled — this is a stakeholder review demo, not a live product.
- Tailwind CSS v3, React 18, Recharts, Lucide React. Geist + Geist Mono fonts loaded from Google Fonts (see `index.html`).
- Single-file component (~3,400 lines). If you want to split into a proper project structure (`src/stages/`, `src/components/`, `src/data/`), the file is already organized by section comments — splitting is mechanical.
