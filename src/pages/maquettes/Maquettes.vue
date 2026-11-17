<script setup lang="ts">
// Banc des maquettes (phase 6) : les vraies pages, servies par une navigation à l'ancre qui reprend les adresses de l'UX §1
// (#/fr, #/fr/projets/:slug, #/fr/a-propos…). En phase 7, le routeur prendra le relais.
import { computed, ref, watch } from 'vue'
import SiteLayout from '../../components/site/SiteLayout.vue'
import { textes, type Langue } from '../../content/textes'
import { modulo } from '../../utils/carrousel'
import AboutPage from '../AboutPage.vue'
import HomePage from '../HomePage.vue'
import ProjectPage from '../ProjectPage.vue'
import TextPage from '../TextPage.vue'
import { aPropos, mentions, projets } from './donnees'

const segments = { fr: { projet: 'projets', aPropos: 'a-propos', mentions: 'mentions-legales' }, en: { projet: 'projects', aPropos: 'about', mentions: 'legal-notice' } }

const ancre = ref(location.hash)
addEventListener('hashchange', () => (ancre.value = location.hash))

const route = computed(() => {
  const [langue = 'fr', section = '', slug] = ancre.value.replace(/^#\/?/, '').split('/') as [Langue, string, string?]
  const s = segments[langue] ?? segments.fr
  const page = !section ? 'accueil' : section === s.projet ? 'projet' : section === s.aPropos ? 'aPropos' : section === s.mentions ? 'mentions' : 'introuvable'
  return { langue: langue in textes ? langue : ('fr' as Langue), page, slug }
})

const t = computed(() => textes[route.value.langue])
const liste = computed(() => projets(route.value.langue))
const href = (langue: Langue, page: string, slug?: string) => {
  const s = segments[langue] as Record<string, string>
  return '#/' + [langue, s[page], slug].filter(Boolean).join('/')
}

const index = computed(() => liste.value.findIndex((p) => p.slug === route.value.slug))
const projet = computed(() => liste.value[index.value])
const voisin = (pas: number) => {
  const p = liste.value[modulo(index.value + pas, liste.value.length)]
  return { href: href(route.value.langue, 'projet', p.slug), nom: p.nom }
}
const cartes = computed(() => liste.value.map((p) => ({ ...p, href: href(route.value.langue, 'projet', p.slug), image: p.images[0] })))

// Retour à l'accueil : le carrousel revient sur le dernier projet vu (UX §5)
const actif = ref(0)
watch(index, (i) => i >= 0 && (actif.value = i))

const titrePage = computed(() => {
  const { page } = route.value
  const nomSite = route.value.langue === 'fr' ? 'Mandolina, graphiste' : 'Mandolina, graphic designer'
  if (page === 'projet' && projet.value) return `${projet.value.nom} · ${nomSite}`
  if (page === 'aPropos') return `${t.value.aPropos} · ${nomSite}`
  if (page === 'mentions') return `${t.value.mentions} · ${nomSite}`
  return nomSite
})
watch(
  [route, titrePage],
  () => {
    document.title = titrePage.value
    document.documentElement.lang = route.value.langue
    scrollTo(0, 0)
  },
  { immediate: true },
)

const autreLangue = (langue: Langue) => {
  const { page, slug } = route.value
  return page === 'accueil' || page === 'introuvable' ? `#/${langue}` : href(langue, page, slug)
}
</script>

<template>
  <SiteLayout
    :t="t"
    :page="ancre"
    :accueil-href="`#/${route.langue}`"
    :liens="[
      { href: href(route.langue, 'aPropos'), label: t.aPropos },
      { href: href(route.langue, 'mentions'), label: t.mentions },
    ]"
    :langues="(['fr', 'en'] as const).map((l) => ({ href: autreLangue(l), label: l.toUpperCase(), code: l, courante: l === route.langue }))"
  >
    <HomePage v-if="route.page === 'accueil'" v-model:actif="actif" :t="t" :projets="cartes" :a-propos-href="href(route.langue, 'aPropos')" />
    <ProjectPage v-else-if="route.page === 'projet' && projet" :key="projet.slug" :t="t" :projet="projet" :precedent="voisin(-1)" :suivant="voisin(1)" />
    <AboutPage
      v-else-if="route.page === 'aPropos'"
      :t="t"
      v-bind="aPropos[route.langue]"
      :email="aPropos.email"
      :book="{ href: '#', poids: route.langue === 'fr' ? 'poids à venir' : 'size to come' }"
    />
    <TextPage v-else-if="route.page === 'mentions'" :titre="t.mentions" :contenu="mentions[route.langue]" />
    <TextPage v-else :titre="t.introuvable" :lien="{ href: `#/${route.langue}`, label: t.retour }" />
  </SiteLayout>
</template>
