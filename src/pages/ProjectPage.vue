<script setup lang="ts">
// Page projet (UX §3) : nom, discipline et client, présentation, puis la galerie en pleine largeur, puis précédent / suivant.
import ProjectImage from '../components/projets/ProjectImage.vue'
import ProjectPager from '../components/projets/ProjectPager.vue'
import type { Textes } from '../content/textes'
import { aplat } from '../utils/aplat'

export interface Projet {
  nom: string
  discipline: string
  client: string
  couleur: string
  presentation?: string // HTML du texte riche de Dashility
  images: { src: string; alt: string; largeur?: number; hauteur?: number }[] // couverture en premier
}

interface Cible {
  href: string
  nom: string
}

const props = defineProps<{ t: Textes; projet: Projet; precedent?: Cible; suivant?: Cible }>()
const couleur = aplat(props.projet.couleur).couleur
</script>

<template>
  <article>
    <header class="entete">
      <h1 class="nom">{{ projet.nom }}</h1>
      <p class="discipline">{{ projet.discipline }}</p>
      <p class="client">{{ projet.client }}</p>
      <!-- texte riche de Dashility : HTML de tiptap, balises limitées, texte échappé (architecture §4) -->
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-if="projet.presentation"
        class="texte-riche presentation"
        v-html="projet.presentation"
      />
      <!-- eslint-enable vue/no-v-html -->
    </header>

    <div class="galerie">
      <ProjectImage
        v-for="(image, i) in projet.images"
        :key="image.src"
        v-bind="image"
        :couleur="couleur"
        :chargement="i === 0 ? 'eager' : 'lazy'"
      />
    </div>
  </article>

  <ProjectPager
    :precedent="precedent"
    :suivant="suivant"
    :label="t.autresProjets"
    :precedent-label="t.precedent"
    :suivant-label="t.suivant"
  />
</template>

<style scoped>
.entete {
  padding: var(--espace-5) var(--marge) var(--espace-6);
}

.nom {
  font-size: var(--taille-titre-projet);
  font-weight: var(--graisse-titre);
  line-height: var(--interligne-serre);
  max-width: 20ch;
}

.discipline {
  margin-top: var(--espace-4);
  font-weight: var(--graisse-intertitre);
}

.client {
  color: var(--gris);
}

.presentation {
  margin-top: var(--espace-5);
}

.galerie {
  display: grid;
  gap: var(--espace-2);
}
</style>
