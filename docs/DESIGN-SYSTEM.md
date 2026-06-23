# Design system

Source de vérité technique : [`src/styles/tokens.css`](../src/styles/tokens.css).
Tailwind ré-expose ces variables (cf. `tailwind.config.mjs`) → `bg-accent`, `text-muted`, etc.

> Si l'Infrastructure Notion-Club fournit un token équivalent, **c'est lui qui
> fait foi** — les valeurs ci-dessous sont la référence de secours.

## Couleurs

| Token              | Valeur     | Usage |
|--------------------|------------|-------|
| `--accent`         | `#e0625a`  | corail — CTA, badges, checks, points timeline, footer |
| `--accent-strong`  | `#c44a43`  | corail foncé (dégradés, hover) |
| `--accent-soft`    | `#fceceb`  | corail très clair (fonds de pills / visuels) |
| `--page-bg`        | `#f5f2f2`  | blanc cassé chaud (fond global) |
| `--page-bg-cards`  | `#f6f3f3`  | variante section cartes |
| `--card`           | `#ffffff`  | surfaces cartes |
| `--text-primary`   | `#000000`  | texte principal |
| `--text-heading`   | `#1e293b`  | titres H2 (slate) |
| `--text-secondary` | `#52525b`  | texte secondaire |
| `--text-muted`     | `#64748b`  | texte atténué |
| `--border`         | `#e5e7eb`  | bordures |

## Rayons

| Token            | Valeur   |
|------------------|----------|
| `--radius-pill`  | `9999px` |
| `--radius-sm`    | `12px`   |
| `--radius-md`    | `16px`   |
| `--radius-lg`    | `24px`   |

## Courbes d'animation signature

| Token               | Valeur                              | Usage |
|---------------------|-------------------------------------|-------|
| `--ease-signature`  | `cubic-bezier(0.22, 1, 0.36, 1)`    | entrées douces (par défaut) |
| `--ease-overshoot`  | `cubic-bezier(0.34, 1.56, 0.64, 1)` | rebond léger (cœur, checkpoints) |
| `--ease-smooth`     | `cubic-bezier(0.16, 1, 0.3, 1)`     | scroll / barres de progression |

## Typographie

| Police                | Poids     | Usage                                   | Fichier |
|-----------------------|-----------|-----------------------------------------|---------|
| **Inter**             | 300–700 (variable) | corps de texte, UI            | `inter-variable.woff2` |
| **Instrument Serif**  | 400 italic | accents serif du hero (« Consultant Notion ») | `instrument-serif-400-italic.woff2` |
| **Kalam**             | 400 / 700  | manuscrit ponctuel (étapes)            | `kalam-400/700-normal.woff2` |

Toutes self-hostées dans `public/fonts/`, déclarées dans `src/styles/fonts.css`
(`font-display: swap`). Aucune requête Google Fonts au runtime.

## Patterns récurrents

- **Halos corail** : `radial-gradient` diffus dans les 4 coins, fixés en fond
  (`.nc-halos` dans `global.css`, monté par `BaseLayout`).
- **En-tête de section** : badge pill corail clair (texte corail, centré) → titre
  H2 bold sur 2 lignes. Brique : `ui/SectionHeader.astro`.
- **CTA pill corail** : reflet « shine » qui balaie en boucle + double flèche qui
  slide au hover. Brique : `ui/CtaPill.astro`.
- **Brand pill noire** : dot corail qui clignote (`dot-pulse`). Brique : `ui/BrandPill.astro`.

## Accessibilité & mouvement

- `prefers-reduced-motion: reduce` est respecté dans chaque composant animé
  (scroll-jacking désactivé, animations en boucle figées sur leur état final).
- `aria-*` conservés/ajoutés sur accordéon, dropdown pays, modals (`role="dialog"`,
  `aria-modal`), burger (`aria-expanded`). Focus visible via `:focus-visible`.

## Responsive

Mobile-first. Breakpoints repris des sources : **900px**, **767/768px**, **380px**.
À vérifier visuellement à **375 / 768 / 1440px**.
