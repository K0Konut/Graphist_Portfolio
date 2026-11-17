<script setup lang="ts">
// Accueil (UX §3) : le carrousel plein écran sous le header, rien d'autre.
import ProjectCarousel, { type ProjetCarte } from '../components/projets/ProjectCarousel.vue'
import type { Textes } from '../content/textes'

defineProps<{ t: Textes; projets: ProjetCarte[]; aProposHref: string }>()
const actif = defineModel<number>('actif', { default: 0 })
</script>

<template>
  <h1 class="visuellement-masque">{{ t.titreAccueil }}</h1>
  <div v-if="projets.length" class="accueil">
    <ProjectCarousel v-model:actif="actif" :projets="projets" :label="t.projets" :voir-label="t.voir" :annonce="t.annonce" />
  </div>
  <p v-else class="vide">
    {{ t.aucunProjet }} <a :href="aProposHref">{{ t.aPropos }}</a>
  </p>
</template>

<style scoped>
.accueil {
  height: calc(100svh - var(--hauteur-header));
  min-height: 420px;
}

.vide {
  padding: var(--espace-6) var(--marge);
  font-size: var(--taille-intertitre);
}
</style>
