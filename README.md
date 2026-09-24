# Zenvuk

Zenvuk is a fast, local-first SEO and marketing utility website built with Next.js, React, TypeScript, Tailwind CSS, Zod, and Lucide React.

## Included tools

- FAQ Schema Generator — creates valid `FAQPage` JSON-LD, with validation, copy/download, pretty/minified output, and optional script wrapping.
- Product Title Generator — deterministic title suggestions with tone, audience, and feature inputs.
- Meta Description Generator — character-aware description suggestions.
- Product Name Generator — pronounceable local naming suggestions.
- UTM Parameter Builder — creates encoded campaign URLs using the browser URL API.

The generation tools do not call OpenAI, Gemini, Claude, Ollama, or any paid API. Inputs stay in the browser during normal use.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run typecheck
npm test
npm run build
```

## Deployment

### Vercel

Import the repository, choose the Next.js preset, and set `NEXT_PUBLIC_SITE_URL` to the production URL. The default build command is `next build`.

### VPS or Hostinger Node.js

Use Node.js 20+ (Node 22+ recommended), run `npm ci`, then `npm run build` and `npm run start`. Reverse proxy port 3000 through Nginx or the host control panel.

### Cloudflare

Deploy through the Cloudflare Next.js adapter or use a supported Next.js deployment workflow. Keep the app server-side because the project uses App Router metadata, sitemap, and robots route handlers.

## Environment variables

See `.env.example`. `LOCAL_AI_ENABLED` and `OLLAMA_BASE_URL` are reserved for a future private, server-side Ollama integration; the current app does not depend on them.

## Contact

For inquiries or bug reports: `info@zenvuk.com`

