<script setup lang="ts">
// Header de toutes les pages (UX §3) : logotype vers l'accueil, bouton menu, et le menu plein écran qu'il ouvre.
// La page derrière le menu ouvert doit recevoir `inert` : c'est la mise en page qui s'en charge (phase 7).
import { nextTick, ref, watch } from 'vue'
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
const bouton = ref<HTMLButtonElement>()
const premierLien = ref<HTMLAnchorElement[]>([])

watch(ouvert, async (estOuvert) => {
  await nextTick()
  if (estOuvert) premierLien.value[0]?.focus()
  else bouton.value?.focus()
})

function fermerSurEchap(e: KeyboardEvent) {
  if (e.key === 'Escape' && ouvert.value) ouvert.value = false
}
</script>

<template>
  <header class="header" @keydown="fermerSurEchap">
    <a class="logo" :href="accueilHref"><SiteLogo :label="logoLabel" /></a>
    <button
      ref="bouton"
      class="bouton-menu"
      :aria-expanded="ouvert"
      aria-controls="menu-principal"
      :aria-label="ouvert ? fermerLabel : ouvrirLabel"
      @click="ouvert = !ouvert"
    >
      <BaseIcon :nom="ouvert ? 'fermer' : 'menu'" />
    </button>

    <Transition name="menu">
      <nav v-show="ouvert" id="menu-principal" class="menu" :aria-label="menuLabel">
        <ul class="liens">
          <li v-for="(lien, i) in liens" :key="lien.href" :style="{ '--rang': i }">
            <a ref="premierLien" :href="lien.href">{{ lien.label }}</a>
          </li>
        </ul>
        <ul class="langues" :aria-label="languesLabel" :style="{ '--rang': liens.length }">
          <li v-for="langue in langues" :key="langue.code">
            <a :href="langue.href" :hreflang="langue.code" :lang="langue.code" :aria-current="langue.courante ? 'page' : undefined">
              {{ langue.label }}
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  z-index: 10;
  height: var(--hauteur-header);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--marge);
  background: var(--blanc);
}

.logo {
  position: relative;
  z-index: 1;
  color: var(--noir);
}

.bouton-menu {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: var(--espace-5);
  height: var(--espace-5);
  font-size: 40px;
  margin-right: calc(var(--espace-1) * -1);
}

/* Panneau plein écran sous le header (DA §5) */
.menu {
  position: fixed;
  inset: 0;
  padding: calc(var(--hauteur-header) + var(--espace-5)) var(--marge) var(--espace-5);
  background: var(--blanc);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.liens,
.langues {
  list-style: none;
  padding: 0;
}

.liens a {
  font-size: var(--taille-menu);
  font-weight: var(--graisse-intertitre);
  line-height: var(--interligne-titre);
  text-decoration: none;
}

.liens a:hover {
  text-decoration: underline;
}

.liens li + li {
  margin-top: var(--espace-3);
}

.langues {
  display: flex;
  gap: var(--espace-4);
  font-weight: var(--graisse-intertitre);
}

.langues a {
  text-decoration: none;
  color: var(--gris);
}

.langues a[aria-current='page'] {
  color: var(--noir);
  text-decoration: underline;
}

/* Le panneau se dévoile depuis le haut, les liens suivent en cascade (DA §7) */
.menu-enter-active {
  transition: clip-path var(--duree-lente) var(--ease-signature);
}
.menu-leave-active {
  transition: clip-path var(--duree-standard) var(--ease-sortie);
}
.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0);
}
.menu-enter-to,
.menu-leave-from {
  clip-path: inset(0);
}

.menu-enter-active .liens li,
.menu-enter-active .langues {
  transition:
    opacity var(--duree-lente) var(--ease-signature),
    transform var(--duree-lente) var(--ease-signature);
  transition-delay: calc(var(--decalage-cascade) * (var(--rang, 0) + 1));
}
.menu-enter-from .liens li,
.menu-enter-from .langues {
  opacity: 0;
  transform: translateY(calc(var(--deplacement-texte) * 2));
}
</style>
