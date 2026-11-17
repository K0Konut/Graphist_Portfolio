<script setup lang="ts">
// Carte du carrousel (UX §5, DA §3) : l'image seule ; le calque coloré (discipline + client) n'apparaît que sur la carte centrale,
// au survol et au focus, ou en permanence sur un écran tactile. Toute la carte est le lien.
// Nom du lien = le texte du calque + « voir le projet » masqué : il contient ce qui est affiché (WCAG 2.5.3).
// L'image est décorative ici (alt vide) : la discipline et le client la décrivent déjà.
import { computed } from 'vue'
import { aplat } from '../../utils/aplat'
import ProjectImage, { type ImageProjet } from './ProjectImage.vue'

const props = withDefaults(
  defineProps<{
    href: string
    image: ImageProjet
    discipline: string
    client: string
    couleur: string
    voirLabel: string
    centrale?: boolean
    chargement?: 'lazy' | 'eager'
  }>(),
  { centrale: false, chargement: 'lazy' },
)

const a = computed(() => aplat(props.couleur))
const style = computed(() => ({
  '--aplat': a.value.couleur,
  '--aplat-texte': a.value.texte,
  '--aplat-opacite': a.value.opacite,
}))
</script>

<template>
  <a class="carte" :class="{ centrale }" :href="href" :style="style">
    <ProjectImage
      :src="image.src"
      alt=""
      :couleur="a.couleur"
      :largeur="image.largeur"
      :hauteur="image.hauteur"
      :srcset="image.srcset"
      :chargement="chargement"
      sizes="(max-width: 700px) 80vw, 56vw"
      remplir
    />
    <span class="calque">
      <span class="discipline">{{ discipline }}</span>
      <span class="client"
        >{{ client }}<span class="visuellement-masque"> — {{ voirLabel }}</span></span
      >
    </span>
  </a>
</template>

<style scoped>
.carte {
  position: relative;
  display: block;
  height: 100%;
  overflow: hidden;
  color: var(--aplat-texte);
  text-decoration: none;
}

/* Contour de focus dessiné au-dessus du calque, qui recouvrirait l'outline */
.carte:focus-visible {
  outline: none;
}
.carte:focus-visible::after {
  content: '';
  position: absolute;
  inset: 0;
  border: var(--contour-focus) solid var(--noir);
}

.calque {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: var(--espace-2);
  padding: var(--marge-calque);
  background: var(--aplat);
  opacity: 0;
  transition: opacity var(--duree-rapide) var(--ease-sortie);
}

.discipline,
.client {
  transform: translateY(var(--deplacement-texte));
  transition: transform var(--duree-rapide) var(--ease-sortie);
}

.discipline {
  font-size: var(--taille-titre-calque);
  font-weight: var(--graisse-titre);
  line-height: var(--interligne-titre);
  text-decoration: underline;
  text-decoration-thickness: var(--soulignement);
  text-underline-offset: var(--soulignement-decalage);
}

.client {
  font-size: var(--taille-legende);
  line-height: var(--interligne-legende);
}

/* Calque visible : carte centrale survolée ou ciblée au clavier */
.centrale:is(:hover, :focus-visible) .calque {
  opacity: var(--aplat-opacite);
  transition: opacity var(--duree-standard) var(--ease-signature);
}
.centrale:is(:hover, :focus-visible) :is(.discipline, .client) {
  transform: none;
  transition: transform var(--duree-standard) var(--ease-signature);
}
.centrale:is(:hover, :focus-visible) .client {
  transition-delay: var(--decalage-cascade);
}

/* Écran tactile : pas de survol, la carte centrale garde son calque */
@media (hover: none) {
  .centrale .calque {
    opacity: var(--aplat-opacite);
  }
  .centrale :is(.discipline, .client) {
    transform: none;
  }
}
</style>
