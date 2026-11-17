<script setup lang="ts">
// Carrousel de l'accueil (UX §5, DA §5 et §7) : une carte centrale large, ses voisines de part et d'autre, en boucle.
// Toutes les cartes restent dans le DOM, dans l'ordre : c'est une vraie liste de liens, parcourable au clavier et sans JavaScript.
// Clic sur une voisine : elle vient au centre. Clic sur la carte centrale : le lien s'ouvre.
import { computed, nextTick, ref, watch } from 'vue'
import { decalage, faitLeTour, modulo } from '../../utils/carrousel'
import ProjectCard from './ProjectCard.vue'

export interface ProjetCarte {
  href: string
  image: { src: string; alt: string; largeur?: number; hauteur?: number }
  discipline: string
  client: string
  couleur: string
}

const props = defineProps<{
  projets: ProjetCarte[]
  label: string
  voirLabel: string
  annonce: (position: number, total: number) => string
}>()

const actif = defineModel<number>('actif', { default: 0 })
const precedent = ref(actif.value)
const liste = ref<HTMLUListElement>()
const n = computed(() => props.projets.length)

// Avant le rendu : chaque carte connaît son ancienne place pour savoir si elle glisse ou fait le tour
watch(actif, (_, ancien) => (precedent.value = ancien))

const SEUIL_GLISSER = 40 // px parcourus au doigt pour changer de projet
const FIN_DE_GESTE = 200 // ms sans molette : le geste (et son inertie) est terminé

function aller(i: number, focus = false) {
  if (n.value < 2) return
  actif.value = modulo(i, n.value)
  // Mouvement réduit : pas de glissement (désactivé en CSS), un fondu court à la place
  if (liste.value && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const duree = parseFloat(getComputedStyle(liste.value).getPropertyValue('--duree-rapide'))
    liste.value.animate([{ opacity: 0.4 }, { opacity: 1 }], duree)
  }
  if (focus) nextTick(() => liste.value?.children[actif.value]?.querySelector('a')?.focus())
}

function position(i: number) {
  const k = decalage(i, actif.value, n.value)
  const x =
    k === 0
      ? 'calc(50cqw - var(--largeur-centrale) / 2)'
      : k > 0
        ? `calc(50cqw + var(--largeur-centrale) / 2 + ${k - 1} * var(--largeur-voisine))`
        : `calc(50cqw - var(--largeur-centrale) / 2 + ${k} * var(--largeur-voisine))`
  return {
    transform: `translateX(${x})`,
    width: k === 0 ? 'var(--largeur-centrale)' : 'var(--largeur-voisine)',
  }
}

function cliquer(e: MouseEvent, i: number) {
  if (i === actif.value) return
  e.preventDefault()
  aller(i)
}

// Au clavier seulement : la carte qui reçoit le focus vient au centre (à la souris, c'est le clic qui décide)
function focaliser(e: FocusEvent, i: number) {
  if ((e.target as HTMLElement).matches(':focus-visible')) aller(i)
}

function clavier(e: KeyboardEvent) {
  const pas = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!pas) return
  e.preventDefault()
  aller(actif.value + pas, true)
}

// Molette et pavé tactile : un projet par geste, l'inertie qui suit est ignorée
let gesteEnCours = false
let finGeste: ReturnType<typeof setTimeout>
function molette(e: WheelEvent) {
  const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
  if (!delta) return
  e.preventDefault()
  if (!gesteEnCours) aller(actif.value + Math.sign(delta))
  gesteEnCours = true
  clearTimeout(finGeste)
  finGeste = setTimeout(() => (gesteEnCours = false), FIN_DE_GESTE)
}

let departX = 0
const toucher = (e: TouchEvent) => (departX = e.changedTouches[0].clientX)
function lacher(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - departX
  if (Math.abs(dx) >= SEUIL_GLISSER) aller(actif.value - Math.sign(dx))
}
</script>

<template>
  <section
    class="carrousel"
    aria-roledescription="carrousel"
    :aria-label="label"
    @wheel="molette"
    @touchstart.passive="toucher"
    @touchend.passive="lacher"
  >
    <ul ref="liste" class="piste" @keydown="clavier">
      <li
        v-for="(projet, i) in projets"
        :key="projet.href"
        class="emplacement"
        :class="{ 'fait-le-tour': faitLeTour(i, actif, precedent, n) }"
        :style="position(i)"
        @focusin="focaliser($event, i)"
      >
        <ProjectCard
          v-bind="projet"
          :voir-label="voirLabel"
          :centrale="i === actif"
          :chargement="Math.abs(decalage(i, actif, n)) <= 1 ? 'eager' : 'lazy'"
          @click="cliquer($event, i)"
        />
      </li>
    </ul>
    <p class="visuellement-masque" aria-live="polite">{{ annonce(actif + 1, n) }}</p>
  </section>
</template>

<style scoped>
.carrousel {
  position: relative;
  height: 100%;
  overflow: hidden;
  container-type: inline-size;
  touch-action: pan-y; /* le glissement horizontal est pour le carrousel, le vertical pour la page */
}

.piste {
  list-style: none;
  padding: 0;
  height: 100%;
}

.emplacement {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition:
    transform var(--duree-lente) var(--ease-signature),
    width var(--duree-lente) var(--ease-signature);
}

/* La carte qui passe d'un bord à l'autre change de place sans traverser l'écran */
.fait-le-tour {
  transition: none;
}

/* Mouvement réduit : aucun glissement, le composant fait un fondu à la place */
@media (prefers-reduced-motion: reduce) {
  .emplacement {
    transition: none;
  }
}
</style>
