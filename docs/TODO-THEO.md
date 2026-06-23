# ⚠️ À fournir / valider par Théo

Points où la reconstruction s'est écartée de la source faute d'élément, ou qui
demandent une décision/un fichier. Classés par priorité.

## 🔴 Bloquants fonctionnels

### 1. Code verbatim des opt-ins Louis (annexes 8 & 9)
Les annexes 8 et 9 du `.md` source sont des **placeholders** (« À INSÉRER PAR
THÉO ») — le code réel n'a pas été fourni.

- **Annexe 8** (opt-in #1) : moteur du **dropdown pays** (drapeaux SVG inline,
  recherche, liste complète des pays, validation stricte FR/BE/CH, concaténation
  préfixe → champ caché `phone_number`).
- **Annexe 9** (opt-in #2) : coquille popup + **timings exacts** de l'animation
  iMessage « écriture ».

➡️ `src/components/modals/ModalProgramme.astro` contient une **reconstruction
fonctionnelle** d'après la spec (FR/BE/CH, anim iMessage typing→bulle→texte).
**À remplacer par le code verbatim** dès réception (la spec demande de ne pas
réécrire le moteur — risque de corruption des données drapeaux/préfixes).

### 2. Funnel systeme.io `40626154` — à confirmer
Le modal programme poste vers `https://systeme.io/embedded/40626154/subscription`
+ script distant `…/406261541c78a21f2a0a1a462ebe78f58edea69f.js`.
Ce funnel est **celui de l'étude de cas (partagé avec Louis)**. Si le programme
doit aller dans un **funnel/séquence distinct**, l'endpoint **et** le script sont
à changer dans `ModalProgramme.astro`. Le script distant est **commenté** par
défaut — à décommenter une fois le funnel confirmé.

### 3. Snippet Vidalytics
`src/components/vsl/Vsl.astro` utilise le pattern officiel Vidalytics avec l'id
`vidalytics_embed_wogNQVAXm52FAml1`. Si Théo possède le **snippet exact** fourni
par Vidalytics (loader spécifique), le coller tel quel à la place.

## 🟠 Médias (placeholders)

Voir [`MEDIA.md`](MEDIA.md) pour l'inventaire complet des `PLACEHOLDER_*`
(logo, photo Théo, écussons, avatars, vidéos R2, 22 logos marquee, image OG…).

## 🟡 Écarts mineurs signalés

| Composant            | Écart | Détail |
|----------------------|-------|--------|
| `etapes/Etapes.astro`| **Confetti retiré** | La célébration confetti de l'annexe 6 (canvas plein écran `z-index:9999`) a été retirée car elle « fuit » hors du scope de la section. La timeline + barre de progression + reveal sont fidèles. ➡️ Peut être réintégrée en effet scopé sur demande. |
| `temoignages/`       | Pas de marquee auto | La source n'a **pas** d'auto-scroll ~24s (motion = flèches + swipe tactile). Rien n'a été inventé. |
| `temoignages/`       | Cartes iMessage/chiffres | La spec mentionnait des cartes screenshot iMessage / cartes chiffres ; **absentes du code source** de l'annexe 3 → non fabriquées. À ajouter si voulu. |
| Inclus `nc-card`     | Anim Slack & Folder | L'annexe 2 contenait en réalité 4 anims (iMessage, Progress, **Slack**, **Folder**) — toutes reproduites verbatim. |

## ✅ Vérifs avant mise en ligne

- [ ] Remplacer tous les `PLACEHOLDER_*` (cf. MEDIA.md).
- [ ] Coller le code verbatim annexes 8 & 9 dans `ModalProgramme.astro`.
- [ ] Confirmer le funnel `40626154` (ou changer endpoint + script).
- [ ] Vérifier le rendu à 375 / 768 / 1440px.
- [ ] Lighthouse perf ≥ 90 mobile, zéro CLS.
- [ ] Aligner les tokens sur les repos design system (Infrastructure / sales-call / funnel) si accès.
