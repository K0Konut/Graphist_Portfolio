<script setup lang="ts">
// Page projet (UX §3, DA §5, maquette de la cliente) : bandeau à la couleur du projet, présentation sur deux colonnes,
// galerie en mosaïque, puis précédent / suivant. Chaque rangée de la mosaïque aligne ses images sur une même hauteur,
// sans les recadrer : chacune prend une largeur proportionnelle à son format.
import ProjectImage, { type ImageProjet } from '../components/projets/ProjectImage.vue'
import ProjectPager from '../components/projets/ProjectPager.vue'
import type { Textes } from '../content/textes'
import { aplat } from '../utils/aplat'
import { rangees, type Largeur } from '../utils/mosaique'

export interface ImageGalerie {
  image: ImageProjet
  largeur: Largeur
}

export interface Projet {
  nom: string
  discipline: string
  client: string
  couleur: string
  presentation?: string // HTML du texte riche de Dashility
  couverture: ImageProjet // carrousel et partage
  galerie: ImageGalerie[]
}

interface Cible {
  href: string
  nom: string
}

const props = defineProps<{ t: Textes; projet: Projet; precedent?: Cible; suivant?: Cible }>()

// La page est recréée d'un projet à l'autre (App.vue) : pas besoin de réactivité ici
const a = aplat(props.projet.couleur)
const mosaique = rangees<ImageGalerie>(
  props.projet.galerie.length
    ? props.projet.galerie
    : [{ image: props.projet.couverture, largeur: 'pleine' }],
)
// Largeur affichée d'une image selon sa rangée, pour choisir la variante (largeur de contenu : 1100 px au plus)
const sizes: Record<Largeur, string> = {
  pleine: '(max-width: 1100px) 100vw, 1100px',
  moitie: '(max-width: 1100px) 50vw, 550px',
  tiers: '(max-width: 1100px) 33vw, 370px',
}
const format = (i: ImageProjet) => (i.largeur && i.hauteur ? i.largeur / i.hauteur : 1)
</script>

<template>
  <div class="page" :style="{ '--aplat': a.couleur, '--aplat-texte': a.texte }">
    <article>
      <header class="bandeau">
        <h1 class="titre">{{ projet.client }} — {{ projet.discipline }}</h1>
      </header>

      <div class="contenu">
        <!-- texte riche de Dashility : HTML de tiptap, balises limitées, texte échappé (architecture §4) -->
        <!-- eslint-disable vue/no-v-html -->
        <div
          v-if="projet.presentation"
          class="texte-riche presentation"
          v-html="projet.presentation"
        />
        <!-- eslint-enable vue/no-v-html -->

        <div class="galerie">
          <div v-for="(rangee, r) in mosaique" :key="r" class="rangee">
            <div
              v-for="{ image } in rangee"
              :key="image.src"
              class="case"
              :style="{ flexGrow: format(image) }"
            >
              <ProjectImage
                v-bind="image"
                :couleur="a.couleur"
                :sizes="sizes[rangee[0]!.largeur]"
                :chargement="r === 0 ? 'eager' : 'lazy'"
              />
            </div>
          </div>
        </div>
      </div>
    </article>

    <ProjectPager
      :precedent="precedent"
      :suivant="suivant"
      :label="t.autresProjets"
      :precedent-label="t.precedent"
      :suivant-label="t.suivant"
    />
  </div>
</template>

<style scoped>
/* Fond teinté de la couleur du projet : la page lui appartient sans gêner la lecture */
.page {
  min-height: 100svh;
  background: color-mix(in srgb, var(--aplat) var(--teinte-fond), var(--blanc));
}

.bandeau {
  padding: var(--degagement-ile) var(--marge) var(--espace-5);
  background: var(--aplat);
  color: var(--aplat-texte);
  text-align: center;
}

.titre {
  font-size: var(--taille-titre-bandeau);
  font-weight: var(--graisse-titre);
  line-height: var(--interligne-titre);
}

.contenu {
  width: min(100% - 2 * var(--marge), var(--largeur-contenu));
  margin-inline: auto;
  padding-top: var(--espace-5);
}

/* Deux colonnes alignées à gauche sur ordinateur (DA §5), une seule sur mobile */
.presentation {
  max-width: none;
  margin-bottom: var(--espace-5);
}

@media (min-width: 701px) {
  .presentation {
    columns: 2;
    column-gap: var(--espace-5);
  }
}

.galerie,
.rangee {
  display: flex;
  gap: var(--espace-2);
}

.galerie {
  flex-direction: column;
}

/* Largeur de base nulle et croissance proportionnelle au format : toutes les images d'une rangée ont la même hauteur */
.case {
  flex-basis: 0;
  min-width: 0;
}
</style>
