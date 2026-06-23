# Architecture

## Vue d'ensemble

Site **statique** généré par Astro. Une seule page (`index.astro`) qui assemble
11 sections + 3 modals. Aucun runtime serveur ; tout est pré-rendu en HTML/CSS,
le JS client se limite aux interactions (scroll, carrousel, accordéon, modals).

```
Navigateur
   │
   ├── index.html (pré-rendu)         ← assemblé depuis les composants Astro
   ├── _astro/*.css                   ← styles scopés bundlés (Tailwind buildé inclus)
   ├── _astro/*.js                    ← scripts client (par composant + modals.ts)
   └── /fonts/*.woff2                 ← polices self-hostées
```

## Couches

| Couche        | Dossier              | Rôle |
|---------------|----------------------|------|
| **Layout**    | `src/layouts`        | coquille HTML : `<head>`, meta, import unique des styles, halos de fond, `<slot>` |
| **Page**      | `src/pages`          | `index.astro` — ordre des sections + montage des modals + init JS global |
| **Sections**  | `src/components/<section>` | une section = un dossier auto-contenu (markup + style scopé + script) |
| **Briques UI**| `src/components/ui`  | composants partagés réutilisables (CtaPill, SectionHeader, BrandPill) |
| **Modals**    | `src/components/modals` | coquille générique + Fillout + Programme |
| **Styles**    | `src/styles`         | tokens, fonts, reset global (seuls fichiers à portée globale) |
| **Scripts**   | `src/scripts`        | logique client transverse (`modals.ts`) |

## Principe « un composant = un dossier »

Chaque section a son dossier dédié pour une lecture immédiate et une maintenance
isolée. Modifier les témoignages = ouvrir `src/components/temoignages/` et rien
d'autre. Aucun import croisé entre sections ; les seuls imports partagés sont les
briques `ui/` et le layout.

## Scoping des styles

- Astro **scope automatiquement** le `<style>` de chaque composant (hash de classe).
- Les composants issus des annexes gardent leur préfixe de classe d'origine
  (`.nc-`, `.sio-`→`.nc-`, etc.) — double sécurité contre les collisions.
- **Interdit** : sélecteurs `html` / `body` / `*` non scopés dans un composant.
  Ces sélecteurs n'existent que dans `src/styles/global.css`.

## Flux JS (client)

| Script                         | Déclenché par | Rôle |
|--------------------------------|---------------|------|
| `scripts/modals.ts`            | `index.astro` | délègue les clics `[data-nc-modal]`, ouvre/ferme, injecte l'embed Fillout au 1er clic, reset l'anim iMessage |
| `<script>` de chaque section   | au chargement | scroll engines (Inclus, Témoignages, Étapes), accordéon (FAQ), switcher (Programme), marquee (Logos), burger (Navbar) |

Tous les scrolls utilisent `addEventListener('scroll', …, {passive:true})` +
`requestAnimationFrame` (pas de calcul lourd par frame), et se neutralisent sous
`prefers-reduced-motion: reduce`.

## Câblage des CTA → modals

```
[ CtaPill modal="fillout" filloutId="cnYDjzJD2bus" ]  ──┐
[ CtaPill modal="fillout" filloutId="ieyhzBxLQkus" ]  ──┤  data-nc-modal / data-fillout-id
[ CtaPill modal="programme" ]                          ──┘
                         │ (clic délégué)
                         ▼
                 scripts/modals.ts
                         │
        ┌────────────────┼─────────────────────┐
        ▼                ▼                       ▼
 #modal-fillout-      #modal-fillout-       #modal-programme
  cnYDjzJD2bus         ieyhzBxLQkus         (coquille + anim iMessage + form 3 champs)
```

Détail des CTA dans [`SECTIONS.md`](SECTIONS.md).

## Build & déploiement

- `npm run build` → `.vercel/output/static/` (adapter `@astrojs/vercel/static`).
- Déploiement Vercel direct (preset Astro détecté automatiquement).
- `output: 'static'` car la page n'a aucun besoin SSR. Passer en `server`/`hybrid`
  seulement si un endpoint dynamique devient nécessaire.
