<script setup lang="ts">
// Image de projet (UX §7) : l'aplat du projet occupe la place pendant le chargement et reste si l'image manque.
// Variantes AVIF puis WebP de Dashility (architecture technique §4) : le navigateur prend la plus légère qui suffit à `sizes`.
import { ref } from 'vue'

export interface ImageProjet {
  src: string
  alt: string
  largeur?: number
  hauteur?: number
  srcset?: { avif?: string; webp?: string }
}

withDefaults(
  defineProps<{
    src: string
    alt: string
    couleur: string
    largeur?: number
    hauteur?: number
    remplir?: boolean // true : recadrée pour remplir son parent (carte) ; false : entière, pleine largeur (page projet)
    chargement?: 'lazy' | 'eager'
    srcset?: { avif?: string; webp?: string }
    sizes?: string // largeur affichée, pour choisir la variante
  }>(),
  {
    remplir: false,
    chargement: 'lazy',
    largeur: undefined,
    hauteur: undefined,
    srcset: () => ({}),
    sizes: '100vw',
  },
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
    <picture v-if="!erreur">
      <source v-if="srcset.avif" type="image/avif" :srcset="srcset.avif" :sizes="sizes" />
      <source v-if="srcset.webp" type="image/webp" :srcset="srcset.webp" :sizes="sizes" />
      <img
        :src="src"
        :alt="alt"
        :width="largeur"
        :height="hauteur"
        :loading="chargement"
        decoding="async"
        @error="erreur = true"
      />
    </picture>
  </div>
</template>

<style scoped>
/* Entière : pleine largeur, mais jamais plus haute que l'écran sous le header (une image en portrait reste visible en entier) */
.image {
  width: 100%;
  aspect-ratio: var(--ratio);
  max-width: calc((100svh - var(--degagement-ile)) * var(--ratio, 100));
  margin-inline: auto;
}

.image picture {
  display: contents;
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
