<script setup lang="ts">
// Mise en page de toutes les pages : header + contenu. Le contenu devient inerte tant que le menu est ouvert (DS §5, AppHeader),
// et le menu se referme quand la page change.
import { ref, watch } from 'vue'
import type { Textes } from '../../content/textes'
import AppHeader, { type Langue, type LienMenu } from './AppHeader.vue'

const props = defineProps<{
  t: Textes
  page: string // identifiant de la page affichée : le menu se ferme quand il change
  accueilHref: string
  liens: LienMenu[]
  langues: Langue[]
}>()

const menuOuvert = ref(false)
watch(
  () => props.page,
  () => (menuOuvert.value = false),
)
</script>

<template>
  <AppHeader
    v-model:ouvert="menuOuvert"
    :accueil-href="accueilHref"
    :logo-label="t.logo"
    :liens="liens"
    :langues="langues"
    :ouvrir-label="t.ouvrirMenu"
    :fermer-label="t.fermerMenu"
    :menu-label="t.menu"
    :langues-label="t.langue"
  />
  <main :inert="menuOuvert">
    <slot />
  </main>
</template>
