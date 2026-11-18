<script setup lang="ts">
// Île de navigation (DA §5, UX §3) : pastille noire flottante en haut au centre, logotype et « ••• ».
// Ouverte, elle s'agrandit et montre les liens et les langues. Menu déroulant non modal : la page reste utilisable,
// l'île se referme avec « × », Échap, un clic ou le focus hors d'elle (et à chaque page, par la mise en page).
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BaseIcon from '../ui/BaseIcon.vue'
import SiteLogo from './SiteLogo.vue'

export interface LienMenu {
  href: string
  label: string
}
export interface Langue extends LienMenu {
  code: string
  courante: boolean
}

defineProps<{
  accueilHref: string
  logoLabel: string
  liens: LienMenu[]
  langues: Langue[]
  ouvrirLabel: string
  fermerLabel: string
  menuLabel: string
  languesLabel: string
}>()

const ouvert = defineModel<boolean>('ouvert', { default: false })
const ile = ref<HTMLElement>()
const bouton = ref<HTMLButtonElement>()
const premierLien = ref<HTMLAnchorElement[]>([])

watch(ouvert, async (estOuvert) => {
  await nextTick()
  if (estOuvert) premierLien.value[0]?.focus()
})

function fermer(rendreLeFocus = false) {
  ouvert.value = false
  if (rendreLeFocus) bouton.value?.focus()
}

// Le focus ou un clic qui quitte l'île la referme
const dehors = (cible: EventTarget | null) => !ile.value?.contains(cible as Node | null)
const perteDeFocus = (e: FocusEvent) => {
  if (ouvert.value && e.relatedTarget && dehors(e.relatedTarget)) fermer()
}
const clic = (e: PointerEvent) => {
  if (ouvert.value && dehors(e.target)) fermer()
}
onMounted(() => document.addEventListener('pointerdown', clic))
onBeforeUnmount(() => document.removeEventListener('pointerdown', clic))
</script>

<template>
  <header
    ref="ile"
    class="ile"
    :class="{ ouverte: ouvert }"
    @keydown.esc="ouvert && fermer(true)"
    @focusout="perteDeFocus"
  >
    <div class="barre">
      <a class="logo" :href="accueilHref"><SiteLogo :label="logoLabel" /></a>
      <button
        ref="bouton"
        class="bouton"
        :aria-expanded="ouvert"
        aria-controls="menu-principal"
        :aria-label="ouvert ? fermerLabel : ouvrirLabel"
        @click="ouvert = !ouvert"
      >
        <BaseIcon :nom="ouvert ? 'fermer' : 'plus'" />
      </button>
    </div>

    <!-- Fermé, le tiroir reste dans la page pour s'animer, mais inerte : ses liens ne sont pas atteignables -->
    <div class="tiroir" :inert="!ouvert">
      <nav id="menu-principal" class="menu" :aria-label="menuLabel">
        <ul class="liens">
          <li v-for="lien in liens" :key="lien.href">
            <a ref="premierLien" :href="lien.href">{{ lien.label }}</a>
          </li>
        </ul>
        <ul class="langues" :aria-label="languesLabel">
          <li v-for="langue in langues" :key="langue.code">
            <a
              :href="langue.href"
              :hreflang="langue.code"
              :lang="langue.code"
              :aria-current="langue.courante ? 'page' : undefined"
            >
              {{ langue.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.ile {
  position: fixed;
  z-index: 20;
  top: var(--ile-haut);
  left: 50%;
  transform: translateX(-50%);
  width: var(--ile-largeur);
  max-width: calc(100vw - 2 * var(--ile-haut));
  display: grid;
  grid-template-rows: auto 0fr;
  border-radius: calc(var(--ile-hauteur) / 2);
  background: var(--noir);
  color: var(--blanc);
  transition:
    width var(--duree-standard) var(--ease-sortie),
    grid-template-rows var(--duree-standard) var(--ease-sortie);
}

.ouverte {
  width: var(--ile-largeur-ouverte);
  grid-template-rows: auto 1fr;
  transition-duration: var(--duree-lente);
  transition-timing-function: var(--ease-signature);
}

.barre {
  height: var(--ile-hauteur);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espace-3);
  padding: 0 var(--espace-2) 0 var(--espace-4);
}

.logo {
  --hauteur-logo: var(--ile-logo);
  color: var(--blanc);
}

.bouton {
  display: grid;
  place-items: center;
  width: var(--ile-bouton);
  height: var(--ile-bouton);
  border-radius: 50%;
  font-size: var(--espace-3);
}

.bouton:hover {
  background: var(--gris-sur-noir-fond);
}

/* Contour de focus en blanc sur l'île noire */
.ile :focus-visible {
  outline-color: var(--blanc);
}

.tiroir {
  overflow: hidden;
  min-height: 0;
}

.menu {
  display: grid;
  gap: var(--espace-4);
  padding: var(--espace-3) var(--espace-4) var(--espace-4);
  opacity: 0;
  transition: opacity var(--duree-rapide) var(--ease-sortie);
}

.ouverte .menu {
  opacity: 1;
  transition: opacity var(--duree-standard) var(--ease-signature) var(--decalage-ile);
}

.liens,
.langues {
  list-style: none;
  padding: 0;
}

.liens {
  display: grid;
  gap: var(--espace-2);
}

.liens a {
  font-size: var(--taille-lien-ile);
  font-weight: var(--graisse-intertitre);
  line-height: var(--interligne-titre);
  text-decoration: none;
}

.liens a:hover {
  text-decoration: underline;
}

.langues {
  display: flex;
  gap: var(--espace-4);
  font-weight: var(--graisse-intertitre);
}

.langues a {
  text-decoration: none;
  color: var(--gris-sur-noir);
}

.langues a[aria-current='page'] {
  color: var(--blanc);
  text-decoration: underline;
}

/* Mouvement réduit : pas de changement de forme progressif, seulement le fondu du contenu */
@media (prefers-reduced-motion: reduce) {
  .ile,
  .ouverte {
    transition: none;
  }
}
</style>
