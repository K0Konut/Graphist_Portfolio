<script setup lang="ts">
// Vitrine du design system (docs/05-design-system.md) : chaque composant et ses états, avec les vraies données de la cliente.
import { ref } from 'vue'
import AppHeader from '../../components/site/AppHeader.vue'
import ProjectCarousel from '../../components/projets/ProjectCarousel.vue'
import ProjectImage from '../../components/projets/ProjectImage.vue'
import ProjectPager from '../../components/projets/ProjectPager.vue'
import BaseIcon from '../../components/ui/BaseIcon.vue'
import { aplat } from '../../utils/aplat'
import imageDemo from './image-demo.svg'
import { projets } from './projets'

const menuOuvert = ref(false)
const actif = ref(1)
const aplats = projets.map((p) => ({ ...p, ...aplat(p.couleur) }))
const image = {
  src: imageDemo,
  alt: 'Image de démonstration à rayures',
  largeur: 1200,
  hauteur: 1500,
}
const cartes = projets.map((p, i) => ({ ...p, href: `#projet-${i + 1}`, image }))
const icones = ['menu', 'fermer', 'precedent', 'suivant'] as const
const durees = [
  ['Rapide', '--duree-rapide', '150 ms'],
  ['Standard', '--duree-standard', '250 ms'],
  ['Lente', '--duree-lente', '500 ms'],
]
</script>

<template>
  <AppHeader
    v-model:ouvert="menuOuvert"
    accueil-href="#"
    logo-label="Mandolina, retour à l'accueil"
    :liens="[
      { href: '#', label: 'À propos' },
      { href: '#', label: 'Mentions légales' },
    ]"
    :langues="[
      { href: '#', label: 'FR', code: 'fr', courante: true },
      { href: '#', label: 'EN', code: 'en', courante: false },
    ]"
    ouvrir-label="Ouvrir le menu"
    fermer-label="Fermer le menu"
    menu-label="Menu principal"
    langues-label="Langue"
  />

  <main class="vitrine">
    <div>
      <h1 class="titre-vitrine">Design system</h1>
      <p class="note">
        Header ci-dessus : logotype et menu (ouvrez-le). Survolez la carte centrale, ou atteignez-la
        avec Tab.
      </p>
    </div>

    <section>
      <h2>Carrousel</h2>
      <p class="note">
        Les 17 projets en boucle. Clic sur une voisine : elle vient au centre ; survol de la carte
        centrale : calque. Molette, flèches du clavier, Tab, glisser au doigt. Projet
        {{ actif + 1 }} sur {{ projets.length }}.
      </p>
      <div class="cartes">
        <ProjectCarousel
          v-model:actif="actif"
          :projets="cartes"
          label="Projets"
          voir-label="voir le projet"
          :annonce="(position, total) => `Projet ${position} sur ${total}`"
        />
      </div>
    </section>

    <section>
      <h2>Aplats des 17 projets</h2>
      <p class="note">
        Couleur du texte et opacité du calque calculées par <code>aplat()</code>, comme sur le site.
      </p>
      <ul class="aplats">
        <li v-for="p in aplats" :key="p.nom" :style="{ background: p.couleur, color: p.texte }">
          <strong>{{ p.discipline }}</strong>
          <span>{{ p.client }}</span>
          <small>{{ p.couleur }} · calque {{ p.opacite * 100 }} %</small>
        </li>
      </ul>
    </section>

    <section>
      <h2>Neutres</h2>
      <ul class="neutres">
        <li class="blanc">Blanc · fond</li>
        <li class="noir">Noir · texte, logotype</li>
        <li class="gris">Gris · texte secondaire</li>
      </ul>
    </section>

    <section class="typo">
      <h2>Typographie : Chivo</h2>
      <p class="t-projet">Identité visuelle et événementiel</p>
      <p class="legende">Titre de projet · 800</p>
      <p class="t-menu">À propos</p>
      <p class="legende">Lien du menu · 700</p>
      <p class="t-intertitre">Intertitre</p>
      <p class="legende">Intertitre · 700</p>
      <div class="texte-riche">
        <p>
          Je suis Mandolina, graphiste. Voici une sélection de mes projets : identités visuelles,
          packaging, édition et scénographie, pour des clubs sportifs, des marques et des studios.
        </p>
        <p>
          Pour un projet, écrivez-moi : <a href="mailto:adresse@exemple.fr">adresse@exemple.fr</a>
        </p>
      </div>
      <p class="legende">Texte riche · 400, 65 caractères au plus</p>
    </section>

    <section>
      <h2>Image de projet</h2>
      <p class="note">
        Entière, à son format ; puis absente ou en chargement : l'aplat du projet tient sa place.
      </p>
      <div class="images">
        <ProjectImage v-bind="image" couleur="#ef6f96" />
        <ProjectImage
          src="/introuvable.jpg"
          alt="Image introuvable"
          couleur="#ef6f96"
          :largeur="1200"
          :hauteur="1500"
        />
      </div>
    </section>

    <section>
      <h2>Navigation entre projets</h2>
      <ProjectPager
        :precedent="{ href: '#', nom: 'Jenlain' }"
        :suivant="{ href: '#', nom: 'PSWC' }"
        label="Autres projets"
        precedent-label="Projet précédent"
        suivant-label="Projet suivant"
      />
    </section>

    <section>
      <h2>Icônes</h2>
      <ul class="icones">
        <li v-for="nom in icones" :key="nom"><BaseIcon :nom="nom" /> {{ nom }}</li>
      </ul>
    </section>

    <section>
      <h2>Mouvement</h2>
      <p class="note">
        Survolez : même distance, trois durées, courbe signature. Réduites à 150 ms sans déplacement
        si le système demande moins d'animations.
      </p>
      <div v-for="[nom, jeton, valeur] in durees" :key="jeton" class="duree">
        <span>{{ nom }} · {{ valeur }}</span>
        <span class="rail"><i :style="{ transitionDuration: `var(${jeton})` }" /></span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.vitrine {
  padding: var(--espace-5) var(--marge) var(--espace-6);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--espace-6);
}

.titre-vitrine {
  font-size: var(--taille-titre-projet);
  font-weight: var(--graisse-titre);
  line-height: var(--interligne-serre);
}

h2 {
  font-size: var(--taille-intertitre);
  font-weight: var(--graisse-intertitre);
  line-height: var(--interligne-titre);
  margin-bottom: var(--espace-3);
}

.note,
.legende {
  color: var(--gris);
  font-size: var(--taille-legende);
  line-height: var(--interligne-legende);
  max-width: var(--mesure);
}

.titre-vitrine + .note {
  margin-top: var(--espace-3);
}

section > .note {
  margin-bottom: var(--espace-4);
}

.cartes {
  display: grid;
  height: 70vh;
  margin: 0 calc(var(--marge) * -1);
}

.aplats,
.neutres,
.icones {
  list-style: none;
  padding: 0;
}

.aplats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.aplats li {
  aspect-ratio: 4 / 5;
  padding: var(--espace-3);
  display: flex;
  flex-direction: column;
  gap: var(--espace-1);
}

.aplats strong {
  font-weight: var(--graisse-titre);
  line-height: var(--interligne-titre);
}

.aplats small {
  margin-top: auto;
  font-size: var(--taille-legende);
}

.neutres {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.neutres li {
  padding: var(--espace-3);
  min-height: 120px;
  font-size: var(--taille-legende);
}

.blanc {
  background: var(--blanc);
  outline: 1px solid var(--gris);
  outline-offset: -1px;
}
.noir {
  background: var(--noir);
  color: var(--blanc);
}
.gris {
  background: var(--gris);
  color: var(--blanc);
}

.typo > * + * {
  margin-top: var(--espace-2);
}
.typo .legende {
  margin-bottom: var(--espace-4);
}

.t-projet {
  font-size: var(--taille-titre-projet);
  font-weight: var(--graisse-titre);
  line-height: var(--interligne-serre);
}
.t-menu {
  font-size: var(--taille-menu);
  font-weight: var(--graisse-intertitre);
  line-height: var(--interligne-titre);
}
.t-intertitre {
  font-size: var(--taille-intertitre);
  font-weight: var(--graisse-intertitre);
  line-height: var(--interligne-titre);
}

.images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--espace-4);
  max-width: 900px;
}

.icones {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espace-5);
  font-size: var(--taille-legende);
}
.icones li {
  display: flex;
  align-items: center;
  gap: var(--espace-2);
}
.icones :deep(.icone) {
  font-size: 40px;
}

.duree {
  display: grid;
  grid-template-columns: 180px 1fr;
  align-items: center;
  gap: var(--espace-3);
  font-size: var(--taille-legende);
  margin-top: var(--espace-3);
}
.rail {
  position: relative;
  height: 32px;
  background: var(--blanc);
  outline: 1px solid var(--gris);
}
.rail i {
  position: absolute;
  left: 0;
  width: 32px;
  height: 32px;
  background: var(--noir);
  transition-property: left;
  transition-timing-function: var(--ease-signature);
}
section:hover .rail i {
  left: calc(100% - 32px);
}

@media (max-width: 700px) {
  .neutres,
  .images {
    grid-template-columns: 1fr;
  }
  .cartes {
    height: 60vh;
  }
}
</style>
