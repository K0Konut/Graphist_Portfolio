/* Balises <head> de la page courante (UX §8, architecture technique §8) : langue, titre, description, canonical,
   hreflang vers les seules langues où la page existe, Open Graph avec la couverture du projet, noindex. */
import { useHead, useSeoMeta } from '@unhead/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { aPropos, contenuPublie, projets } from '../content/contenu'
import { textes } from '../content/textes'
import {
  cheminDansLangue,
  LANGUE_PAR_DEFAUT,
  LANGUES,
  NON_INDEXEES,
  type Langue,
} from '../router/pages'

const SITE = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

const LONGUEUR_DESCRIPTION = 155
const resume = (html = '') => {
  const texte = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return texte.length > LONGUEUR_DESCRIPTION
    ? `${texte.slice(0, LONGUEUR_DESCRIPTION - 1).replace(/\s+\S*$/, '')}…`
    : texte
}

export function useSeo() {
  const route = useRoute()
  const langue = computed(() => route.meta.langue ?? LANGUE_PAR_DEFAUT)
  const page = computed(() => route.meta.page ?? 'introuvable')
  const slug = computed(() => String(route.params.slug ?? ''))
  const t = computed(() => textes[langue.value])

  /** Adresse de la page courante dans une langue, si elle y existe */
  const dans = (l: Langue) => cheminDansLangue(contenuPublie, page.value, l, slug.value)

  const projet = computed(() => projets(langue.value).find((p) => p.slug === slug.value))
  const titre = computed(() => {
    const nom = {
      accueil: undefined,
      projet: projet.value?.nom,
      aPropos: t.value.aPropos,
      mentions: t.value.mentions,
      introuvable: t.value.introuvable.replace(/\.$/, ''),
    }[page.value]
    return nom ? `${nom} · ${t.value.site}` : t.value.site
  })
  const description = computed(
    () =>
      ({
        accueil: t.value.descriptionAccueil,
        projet: projet.value
          ? resume(
              `${projet.value.discipline}, ${projet.value.client}. ${projet.value.presentation ?? ''}`,
            )
          : undefined,
        aPropos: resume(
          `${aPropos(langue.value)?.accroche ?? ''} ${aPropos(langue.value)?.presentation?.html ?? ''}`,
        ),
        mentions: undefined,
        introuvable: undefined,
      })[page.value],
  )
  // Couverture du projet ; ailleurs, celle du premier projet. Une image de démonstration (data:) n'est pas partageable
  const image = computed(() => {
    const i = (projet.value ?? projets(langue.value)[0])?.couverture
    return i && !i.src.startsWith('data:') ? i : undefined
  })
  const indexee = computed(() => !NON_INDEXEES.includes(page.value))
  const url = (chemin?: string) => (SITE && chemin ? SITE + chemin : undefined)

  useHead({
    htmlAttrs: { lang: langue },
    title: titre,
    link: computed(() => {
      if (!SITE || !indexee.value) return []
      const alternatives = LANGUES.map((l) => [l, dans(l)] as const).filter(([, c]) => c)
      const parDefaut = dans(LANGUE_PAR_DEFAUT)
      return [
        { rel: 'canonical', href: url(dans(langue.value)) },
        ...alternatives.map(([l, c]) => ({ rel: 'alternate', hreflang: l, href: url(c) })),
        ...(parDefaut ? [{ rel: 'alternate', hreflang: 'x-default', href: url(parDefaut) }] : []),
      ]
    }),
  })
  useSeoMeta({
    description,
    robots: computed(() => (indexee.value ? undefined : 'noindex')),
    ogType: 'website',
    ogSiteName: computed(() => t.value.site),
    ogTitle: titre,
    ogDescription: description,
    ogUrl: computed(() => (indexee.value ? url(dans(langue.value)) : undefined)),
    ogLocale: computed(() => (langue.value === 'fr' ? 'fr_FR' : 'en_US')),
    // Sans largeur ni hauteur : `src` est la plus grande variante de Dashility, pas l'original mesuré
    ogImage: computed(() => url(image.value?.src)),
    ogImageAlt: computed(() => image.value?.alt),
    twitterCard: 'summary_large_image',
  })

  return { dans }
}
