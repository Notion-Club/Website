# Sections — carte de référence

Ordre d'affichage (cf. spec §6) et correspondance composant ↔ source ↔ ancre ↔ CTA.

| #  | Section            | Composant                              | Source        | Ancre           | CTA / action |
|----|--------------------|----------------------------------------|---------------|-----------------|--------------|
| 1  | Navbar (fixe)      | `navbar/Navbar.astro`                  | Annexe 1      | —               | liens d'ancrage |
| 2  | Hero               | `hero/Hero.astro`                      | Spec §9.1     | `#hero`         | « Rejoindre le Notion Club » → Fillout `cnYDjzJD2bus` |
| 3  | VSL                | `vsl/Vsl.astro`                        | Embed Vidalytics | `#vsl`       | — |
| 4  | On inclut tout ça  | `inclus/Inclus.astro`                  | Annexe 2      | `#inclus`       | — |
| 5  | Témoignages        | `temoignages/Temoignages.astro`        | Annexe 3      | `#temoignages`  | lecture vidéo au clic |
| 6  | Contenu programme  | `programme/Programme.astro`            | Annexe 4      | `#contenu`      | « Télécharger le programme complet » → **Modal programme** |
| 7  | Qui suis-je        | `qui-suis-je/QuiSuisJe.astro`          | Spec §9.2     | `#qui-suis-je`  | — |
| 8  | Scroller de logos  | `logos/Logos.astro`                    | Annexe 5      | —               | — |
| 9  | Les 3 étapes       | `etapes/Etapes.astro`                  | Annexe 6      | —               | « Rejoindre le Notion Club » → Fillout `cnYDjzJD2bus` |
| 10 | FAQ                | `faq/Faq.astro`                        | Annexe 7      | `#faq`          | — |
| 11 | CTA final Certif   | `cta-certif/CtaCertif.astro`           | Spec §9.3     | `#certif`       | « Rejoindre le bootcamp » → Fillout `ieyhzBxLQkus` |
| 12 | Footer             | `footer/Footer.astro`                  | Spec §9.4     | —               | liens légaux |

## Liens de navigation (Navbar)

| Libellé        | Ancre cible      |
|----------------|------------------|
| Programme      | `#inclus`        |
| Témoignage     | `#temoignages`   |
| Contenu        | `#contenu`       |
| Qui suis-je ?  | `#qui-suis-je`   |
| FAQ            | `#faq`           |

> Les anciennes ancres SIO (`#row-…`, `#rawhtml-…`, `#section-…`) ont été
> remappées vers ces ancres propres.

## CTA → modals (récapitulatif)

| CTA                                | Emplacement       | Modal                              |
|------------------------------------|-------------------|------------------------------------|
| Rejoindre le Notion Club           | Hero, Étapes      | Fillout `cnYDjzJD2bus`             |
| Télécharger le programme complet   | Après Programme   | Modal programme (fusion Louis #1+#2) |
| Rejoindre le bootcamp              | CTA Certif final  | Fillout `ieyhzBxLQkus`            |

Les modals Fillout héritent des paramètres d'URL (`data-fillout-inherit-parameters`),
ce qui couvre `source_trafic=Landing Page` et `vsl=v3` si présents dans l'URL.

## Composants partagés (`ui/`)

| Composant            | Rôle |
|----------------------|------|
| `CtaPill.astro`      | bouton CTA corail (shine animé + double flèche au hover), câblage modal via props |
| `SectionHeader.astro`| pattern badge pill + titre H2 (réutilisable pour les sections reconstruites) |
| `BrandPill.astro`    | pill noire + dot corail qui clignote (`dot-pulse`) |
