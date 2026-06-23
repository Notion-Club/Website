# Notion Club — Landing page

Reconstruction **full-custom** de la landing page Notion Club (anciennement 9 blocs HTML collés dans System.io), réimplémentée proprement en **Astro + TypeScript + Tailwind buildé**, fidèle à l'identique au visuel et aux animations d'origine.

> Objectif : un site propre, léger, fluide — zéro glue System.io, zéro dépendance dupliquée, zéro CDN runtime.

---

## 🚀 Démarrage

```bash
npm install        # installe les dépendances
npm run dev        # serveur de dev → http://localhost:4321
npm run build      # build statique de production → .vercel/output/
npm run preview    # prévisualise le build
```

Node ≥ 18 requis (testé sur Node 22).

---

## 🧱 Stack

| Brique        | Choix                                   | Pourquoi |
|---------------|-----------------------------------------|----------|
| Framework     | **Astro** (static)                      | HTML/CSS natif, zéro JS superflu |
| Langage       | **TypeScript**                          | typage des scripts/props |
| Styles        | **Tailwind** via `@astrojs/tailwind` (buildé) | jamais le Play CDN |
| Animations    | **CSS natif + IntersectionObserver**    | zéro dépendance d'animation |
| Icônes        | **SVG inline**                          | pas de runtime iconify |
| Polices       | **Self-hostées** (`/public/fonts`)      | pas de Google Fonts runtime |
| Déploiement   | **Vercel** (`@astrojs/vercel/static`)   | la page est statique |
| VSL           | Embed **Vidalytics** (inchangé)         | — |
| Vidéos        | **MP4 sur Cloudflare R2**, `preload="none"` | 0 octet vidéo au load |

---

## 📁 Structure du repo

Chaque **section** de la page vit dans **son propre dossier** sous `src/components/`
— une lecture, un dossier, une responsabilité.

```
.
├── README.md                  ← ce fichier
├── docs/                      ← documentation détaillée (commence par ARCHITECTURE.md)
│   ├── ARCHITECTURE.md        ← arborescence, conventions, flux de données
│   ├── SECTIONS.md            ← table : section ↔ dossier ↔ annexe ↔ ancre ↔ CTA
│   ├── DESIGN-SYSTEM.md       ← tokens, typo, patterns, courbes d'animation
│   ├── MEDIA.md               ← médias à fournir (placeholders), R2, Vidalytics
│   └── TODO-THEO.md           ← points à valider / fournir par Théo ⚠️
│
├── public/
│   ├── fonts/                 ← polices woff2 self-hostées (Inter, Instrument Serif, Kalam)
│   └── favicon.svg
│
└── src/
    ├── layouts/
    │   └── BaseLayout.astro   ← <head>, meta, import styles, halos de fond
    ├── pages/
    │   └── index.astro        ← assemble les 11 sections + les modals (ordre §6)
    ├── styles/
    │   ├── tokens.css         ← design tokens (couleurs, rayons, courbes)
    │   ├── fonts.css          ← @font-face self-hostés
    │   └── global.css         ← reset léger + halos (seuls styles globaux)
    ├── scripts/
    │   └── modals.ts          ← moteur d'ouverture/fermeture des modals + CTA
    └── components/
        ├── navbar/            ← Navbar.astro        (annexe 1)
        ├── hero/              ← Hero.astro          (reconstruit, spec 9.1)
        ├── vsl/               ← Vsl.astro           (embed Vidalytics)
        ├── inclus/            ← Inclus.astro        (annexe 2 — cartes scroll)
        ├── temoignages/       ← Temoignages.astro   (annexe 3 — carrousel)
        ├── programme/         ← Programme.astro     (annexe 4 — switcher 6 modules)
        ├── qui-suis-je/       ← QuiSuisJe.astro     (reconstruit, spec 9.2)
        ├── logos/             ← Logos.astro         (annexe 5 — marquee)
        ├── etapes/            ← Etapes.astro        (annexe 6 — timeline)
        ├── faq/               ← Faq.astro           (annexe 7 — accordéon)
        ├── cta-certif/        ← CtaCertif.astro     (reconstruit, spec 9.3)
        ├── footer/            ← Footer.astro        (reconstruit, spec 9.4)
        ├── modals/            ← Modal, ModalFillout, ModalProgramme
        └── ui/                ← CtaPill, SectionHeader, BrandPill (briques partagées)
```

**Alias d'import** (cf. `tsconfig.json`) : `@components`, `@layouts`, `@styles`, `@scripts`, `@data`.

---

## 🎨 Conventions

- **Un composant = un dossier = une responsabilité.** Chaque section est auto-contenue : son markup, ses styles **scopés** (Astro `<style>`), son script client.
- **Aucun sélecteur global qui fuit** : seuls `tokens.css` / `fonts.css` / `global.css` touchent `html`/`body`/`*`.
- **Tokens d'abord** : couleurs/rayons/courbes via `var(--…)` (cf. `src/styles/tokens.css`).
- **Fidélité d'abord** : les composants issus des annexes reprennent les valeurs exactes (timings, cubic-bezier, transforms) du code source.
- **`prefers-reduced-motion`** respecté dans chaque composant animé.

---

## ⚠️ À fournir / valider par Théo

Voir **[`docs/TODO-THEO.md`](docs/TODO-THEO.md)** — notamment : code verbatim des opt-ins Louis (annexes 8 & 9), vérification du funnel systeme.io `40626154`, snippet Vidalytics, et tous les médias `PLACEHOLDER_*`.
