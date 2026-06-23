/*
 * modals.ts — Moteur d'ouverture/fermeture des modals + câblage des CTA.
 *
 * Comportement :
 *  - Clic sur [data-nc-modal] → ouvre la modal cible.
 *      data-nc-modal="fillout" + data-fillout-id="XXX" → modal Fillout #modal-fillout-XXX
 *      data-nc-modal="programme"                       → #modal-programme (+ reset anim iMessage)
 *  - Fermeture : bouton .nc-modal__close, clic overlay, touche Escape.
 *  - Fillout : l'embed est injecté au PREMIER ouverture seulement (0 octet au load).
 *    Le script Fillout (server.fillout.com/embed/v1/) est chargé une seule fois.
 *
 * Aucune dépendance. Importé une fois depuis index.astro.
 */

const FILLOUT_SCRIPT = 'https://server.fillout.com/embed/v1/';
let filloutScriptLoaded = false;

function loadFilloutScript(): void {
  if (filloutScriptLoaded) return;
  filloutScriptLoaded = true;
  const s = document.createElement('script');
  s.src = FILLOUT_SCRIPT;
  s.async = true;
  document.body.appendChild(s);
}

function openModal(modal: HTMLElement): void {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Injection paresseuse de l'embed Fillout au premier ouverture.
  const mount = modal.querySelector<HTMLElement>('[data-fillout-mount]');
  if (mount && !mount.dataset.mounted) {
    mount.dataset.mounted = 'true';
    const id = mount.dataset.filloutId!;
    const embed = document.createElement('div');
    embed.setAttribute('data-fillout-id', id);
    embed.setAttribute('data-fillout-embed-type', 'standard');
    embed.setAttribute('data-fillout-inherit-parameters', '');
    embed.setAttribute('data-fillout-dynamic-resize', '');
    embed.style.width = '100%';
    embed.style.height = '100%';
    mount.appendChild(embed);
    loadFilloutScript();
  }

  // Reset de l'animation iMessage de la modal programme à chaque ouverture.
  if (modal.id === 'modal-programme') {
    resetProgrammeAnimation(modal);
  }

  // Focus sur le bouton close pour l'accessibilité clavier.
  modal.querySelector<HTMLElement>('.nc-modal__close')?.focus();
}

function closeModal(modal: HTMLElement): void {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * Reset de l'animation d'écriture iMessage : on clone le nœud animé pour
 * forcer le navigateur à rejouer les keyframes depuis le début (technique de
 * l'annexe 9 — remplacement du nœud).
 */
function resetProgrammeAnimation(modal: HTMLElement): void {
  const anim = modal.querySelector<HTMLElement>('[data-imessage-anim]');
  if (!anim) return;
  const clone = anim.cloneNode(true) as HTMLElement;
  anim.replaceWith(clone);
}

function getOpenModals(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('.nc-modal.is-open'));
}

export function initModals(): void {
  // Ouverture via les CTA.
  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-nc-modal]');
    if (!trigger) return;
    e.preventDefault();

    const kind = trigger.dataset.ncModal;
    let modal: HTMLElement | null = null;

    if (kind === 'fillout') {
      const id = trigger.dataset.filloutId;
      modal = document.getElementById(`modal-fillout-${id}`);
    } else if (kind === 'programme') {
      modal = document.getElementById('modal-programme');
    }

    if (modal) openModal(modal);
  });

  // Fermeture : bouton close + overlay.
  document.querySelectorAll<HTMLElement>('.nc-modal').forEach((modal) => {
    modal.querySelector('.nc-modal__close')?.addEventListener('click', () => closeModal(modal));
    modal.querySelector('.nc-modal__overlay')?.addEventListener('click', () => closeModal(modal));
  });

  // Fermeture : touche Escape (ferme la modal ouverte la plus récente).
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = getOpenModals();
    if (open.length) closeModal(open[open.length - 1]);
  });
}
