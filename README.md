# Games at the table

Phone-friendly pocket field guides for game night, built with React 19, HeroUI 3, Tailwind CSS 4, TypeScript, and Vite.

Includes a game selection menu and quick references for **Lovecraft Letter (classic 2016)**, **Clank! Catacombs (base game)**, and **Citadels (original eight characters, 4–7 players)**. Citadels includes a selector for modern seven-district and original eight-district completion rules. Share either page using a QR code, copy its link, or download its QR as a PNG. QR codes use the current site's origin, so a deployment or domain change needs no source changes.

## Run locally

```sh
npm ci --include=dev
npm run dev
```

## Check and build

```sh
npm run build
npm run preview
```

The build runs TypeScript checks and emits `dist/`, including real documents at `/lovecraft-letter/`, `/clank-catacombs/`, and `/citadels/` for direct links and page refreshes. There is no backend or database. Set `SITE_URL=https://your-domain.example` when building to also emit static PNG endpoints at `/qr/games.png`, `/qr/lovecraft-letter.png`, `/qr/clank-catacombs.png`, and `/qr/citadels.png`. The on-page QR downloads work without this setting.

## Theme

`src/theme.css` defines the **HeroUI-inspired light** theme using HeroUI's semantic CSS variables. Soft gray backgrounds, near-black text, muted gray secondary headings, self-hosted Inter typography, pill-shaped controls, shared spacing, and rounded white surfaces apply to the menu, rules, and sharing UI. HeroUI supplies Cards, Buttons, Links, Chips, and the accessible Accordion. Reduced-motion preferences and keyboard focus are supported.

`src/catalog.ts` holds menu metadata; `src/main.tsx` and `src/ExtraGuide.tsx` hold the guides. `src/ShareCard.tsx` supplies the shared QR, copy, and PNG download flow. Add games to the catalog and emit their documents in `scripts/pages.mjs`.

## Cloudflare Drop

Run `npm run build`, then upload the contents of `dist/` (or a ZIP containing those contents) at https://www.cloudflare.com/drop/. Only production assets belong in that upload; never include `.vercel/`, local deployment receipts, credentials, or the repository folder. The site generates share QR codes using its current browser origin.

Drop can publish without an account. Claim its deployment before the deadline returned by Cloudflare to retain it. The claim URL is an ownership credential and must stay out of this public repository. `public/_headers` carries the static security headers for Cloudflare hosting.

## Vercel deployment

Import this repository into Vercel. The tracked `vercel.json` selects Vite and `dist/`; `npm run build` is the build command. This static personal project needs no paid services, secrets, or environment variables. Hosting account access and plan selection are managed in Vercel.

The initial deployment was anonymous and temporary. Its claim credentials and CLI state are intentionally excluded from this public repository. Connect an owned Vercel project to this repository for persistent hosting and automatic deploys.

## Rules and attribution

Unofficial play aid; not affiliated with the game's publisher. The game name belongs to its respective owner. This repository contains original reference text and decorative CSS, not card scans or publisher artwork.

Reference: [classic Lovecraft Letter rulebook](https://paperzz.com/doc/7164266/lovecraft-letter-rulebook---alderac-entertainment-group). The Lovecraft Letter guide covers the classic 2016 game, not the later Arkham Horror edition.

Additional primary sources: [Clank! Catacombs rulebook](https://www.direwolfdigital.com/clank/resources/cata_rules/), [Citadels 2016 rulebook](https://images-cdn.zmangames.com/us-east-1/filer_public/57/62/576229ab-7747-4cda-9946-cc4b6514dc32/wr02_citadels_rules.pdf), and [Citadels Classic rulebook](https://images-cdn.asmodee.us/filer_public/80/1f/801fe309-65ab-4d5c-b7fd-609d3d8a2015/wr01_citadels_classic_rulebook_web.pdf).
