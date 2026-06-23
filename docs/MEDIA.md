# Médias

État des médias et où ils doivent vivre. Tous les `PLACEHOLDER_*` sont à
remplacer par des fichiers ré-hébergés (les URLs CloudFront actuelles
`d1yei2z3i6k35z.cloudfront.net` appartiennent à System.io).

## Règles

| Type                 | Hébergement            | Pattern technique |
|----------------------|------------------------|-------------------|
| Images (logos, avatars, thumbs, photo Théo, écussons) | `src/assets/` (à terme) | `<Image>` astro:assets (AVIF/WebP + lazy) |
| Vidéos témoignages   | **Cloudflare R2**      | `<video preload="none">` + poster, lecture au clic |
| VSL                  | **Vidalytics**         | embed inchangé |
| Avatar iMessage modal| Cloudinary (Louis)     | garder l'URL telle quelle |

> Tant que les fichiers ne sont pas fournis, les composants utilisent des
> placeholders nommés et/ou les URLs distantes d'origine, balisés par un
> commentaire `<!-- PLACEHOLDER_* -->` et `loading="lazy"`.

## Inventaire des placeholders

| Placeholder              | Composant            | À fournir |
|--------------------------|----------------------|-----------|
| `PLACEHOLDER_LOGO`       | `navbar/Navbar.astro`| logo Notion Club (ré-hébergé) |
| `PLACEHOLDER_AVATARS`    | `hero/Hero.astro`    | 4 photos membres (social proof) |
| `PLACEHOLDER_PHOTO_THEO` | `qui-suis-je/`       | photo N&B détourée de Théo |
| `PLACEHOLDER_CERTIFS`    | `qui-suis-je/`       | 4 écussons de certification |
| `PLACEHOLDER_PARTNERS`   | `qui-suis-je/`       | logos Master IA / X / popmood |
| `PLACEHOLDER_R2_VIDEO`   | `temoignages/`       | MP4 témoignages sur R2 + posters |
| Thumbnails témoignages   | `temoignages/`       | vignettes ré-hébergées |
| Logos marquee (22)       | `logos/Logos.astro`  | 22 logos SVG ré-hébergés |
| `PLACEHOLDER_AVATAR_IMESSAGE` | `modals/ModalProgramme.astro` | avatar iMessage (URL Cloudinary à confirmer) |
| `PLACEHOLDER_OG`         | `layouts/BaseLayout.astro` | image Open Graph (`/og-image.jpg`) |

## Polices (déjà self-hostées ✅)

`public/fonts/` contient déjà : `inter-variable.woff2`,
`instrument-serif-400-italic.woff2`, `kalam-400-normal.woff2`,
`kalam-700-normal.woff2` (sous-ensemble latin, licences OFL).

## Migration recommandée vers `astro:assets`

Une fois les fichiers fournis :
1. déposer les images dans `src/assets/<section>/` ;
2. remplacer `<img src="https://…">` par
   `import img from '@/assets/…'; <Image src={img} alt="…" />` ;
3. retirer le commentaire `PLACEHOLDER_*`.

Cela active l'optimisation au build (formats modernes + dimensions) et supprime
la dépendance aux URLs CloudFront/distantes.
