<script setup lang="ts">
// Racine du site : la mise en page commune autour de la page de la route, le titre de l'onglet et la langue du document.
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteLayout from './components/site/SiteLayout.vue'
import { projets } from './content/contenu'
import { textes } from './content/textes'
import { chemin, LANGUES, type Langue } from './router/pages'

const route = useRoute()
const langue = computed(() => route.meta.langue ?? 'fr')
const t = computed(() => textes[langue.value])
const slug = computed(() => String(route.params.slug ?? ''))

// Même page dans l'autre langue ; un projet absent de l'autre langue mène à son accueil (UX §1)
function equivalent(l: Langue) {
  const { page } = route.meta
  if (page === 'projet')
    return projets(l).some((p) => p.slug === slug.value)
      ? chemin('projet', l, slug.value)
      : chemin('accueil', l)
  return page && page !== 'introuvable' ? chemin(page, l) : chemin('accueil', l)
}

const titre = computed(() => {
  const site = langue.value === 'fr' ? 'Mandolina, graphiste' : 'Mandolina, graphic designer'
  const page = {
    projet: projets(langue.value).find((p) => p.slug === slug.value)?.nom,
    aPropos: t.value.aPropos,
    mentions: t.value.mentions,
    introuvable: t.value.introuvable,
    accueil: undefined,
  }[route.meta.page ?? 'accueil']
  return page ? `${page} · ${site}` : site
})

useHead({ title: titre, htmlAttrs: { lang: langue } })
</script>

<template>
  <SiteLayout
    :t="t"
    :page="route.path"
    :accueil-href="chemin('accueil', langue)"
    :liens="[
      { href: chemin('aPropos', langue), label: t.aPropos },
      { href: chemin('mentions', langue), label: t.mentions },
    ]"
    :langues="
      LANGUES.map((l) => ({
        href: equivalent(l),
        label: l.toUpperCase(),
        code: l,
        courante: l === langue,
      }))
    "
  >
    <!-- Clé par adresse : une page projet se recrée d'un projet à l'autre -->
    <RouterView :key="route.path" />
  </SiteLayout>
</template>
