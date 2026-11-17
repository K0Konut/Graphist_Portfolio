<script setup lang="ts">
// Image de projet (UX §7) : l'aplat du projet occupe la place pendant le chargement et reste si l'image manque.
import { ref } from 'vue'

withDefaults(
  defineProps<{
    src: string
    alt: string
    couleur: string
    largeur?: number
    hauteur?: number
    remplir?: boolean // true : recadrée pour remplir son parent (carte) ; false : entière, pleine largeur (page projet)
    chargement?: 'lazy' | 'eager'
  }>(),
  { remplir: false, chargement: 'lazy', largeur: undefined, hauteur: undefined },
)

const erreur = ref(false)
</script>

<template>
  <div
    class="image"
    :class="{ remplir }"
    :style="{
      backgroundColor: couleur,
      '--ratio': !remplir && largeur && hauteur ? largeur / hauteur : undefined,
    }"
    :role="erreur ? 'img' : undefined"
    :aria-label="erreur ? alt : undefined"
  >
    <img
      v-if="!erreur"
      :src="src"
      :alt="alt"
      :width="largeur"
      :height="hauteur"
      :loading="chargement"
      decoding="async"
      @error="erreur = true"
    />
  </div>
</template>

<style scoped>
/* Entière : pleine largeur, mais jamais plus haute que l'écran sous le header (une image en portrait reste visible en entier) */
.image {
  width: 100%;
  aspect-ratio: var(--ratio);
  max-width: calc((100svh - var(--hauteur-header)) * var(--ratio, 100));
  margin-inline: auto;
}

.image img {
  width: 100%;
  height: auto;
}

.remplir {
  position: absolute;
  inset: 0;
}

.remplir img {
  height: 100%;
  object-fit: cover;
}
</style>
