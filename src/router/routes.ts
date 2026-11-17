/* Routes FR/EN (architecture technique §3), construites depuis la table des pages. Les pages reçoivent leur
   contenu en props : elles ne savent rien du routeur ni de Dashility. */
import type { RouteRecordRaw } from 'vue-router'
import { aPropos, book, mentions, projets } from '../content/contenu'
import { textes } from '../content/textes'
import { modulo } from '../utils/carrousel'
import { chemin, LANGUES, PAGES, type Langue } from './pages'

declare module 'vue-router' {
  interface RouteMeta {
    langue: Langue
    page: keyof typeof PAGES
  }
}

const AboutPage = () => import('../pages/AboutPage.vue')
const HomePage = () => import('../pages/HomePage.vue')
const ProjectPage = () => import('../pages/ProjectPage.vue')
const TextPage = () => import('../pages/TextPage.vue')

const indexProjet = (langue: Langue, slug: unknown) =>
  projets(langue).findIndex((p) => p.slug === slug)

function routesDe(l: Langue): RouteRecordRaw[] {
  const t = textes[l]
  const introuvable = {
    titre: t.introuvable,
    lien: { href: chemin('accueil', l), label: t.retour },
  }
  const versIntrouvable = { path: chemin('introuvable', l), replace: true }

  return [
    {
      path: PAGES.accueil[l],
      component: HomePage,
      meta: { langue: l, page: 'accueil' },
      props: () => ({
        t,
        aProposHref: chemin('aPropos', l),
        projets: projets(l).map((p) => ({
          ...p,
          href: chemin('projet', l, p.slug),
          image: p.images[0],
        })),
      }),
    },
    {
      path: PAGES.projet[l],
      component: ProjectPage,
      meta: { langue: l, page: 'projet' },
      beforeEnter: (to) => indexProjet(l, to.params.slug) >= 0 || versIntrouvable,
      props: (to) => {
        const liste = projets(l)
        const i = indexProjet(l, to.params.slug)
        const voisin = (pas: number) => {
          const p = liste[modulo(i + pas, liste.length)]!
          return { href: chemin('projet', l, p.slug), nom: p.nom }
        }
        return liste.length > 1
          ? { t, projet: liste[i], precedent: voisin(-1), suivant: voisin(1) }
          : { t, projet: liste[i] }
      },
    },
    {
      path: PAGES.aPropos[l],
      component: AboutPage,
      meta: { langue: l, page: 'aPropos' },
      beforeEnter: () => !!aPropos(l) || versIntrouvable,
      props: () => ({
        t,
        ...aPropos(l),
        presentation: aPropos(l)?.presentation?.html ?? '',
        book: book(l),
      }),
    },
    {
      path: PAGES.mentions[l],
      component: TextPage,
      meta: { langue: l, page: 'mentions' },
      beforeEnter: () => !!mentions(l) || versIntrouvable,
      props: () => ({ titre: t.mentions, contenu: mentions(l) }),
    },
    {
      path: PAGES.introuvable[l],
      component: TextPage,
      meta: { langue: l, page: 'introuvable' },
      props: introuvable,
    },
    // Adresse inconnue dans la langue : la page introuvable, sans changer l'adresse
    {
      path: `/${l}/:inconnue(.*)*`,
      component: TextPage,
      meta: { langue: l, page: 'introuvable' },
      props: introuvable,
    },
  ]
}

export const routes: RouteRecordRaw[] = [
  // En production, Nginx redirige « / » selon la langue du navigateur (§3) ; ici, le français par défaut
  { path: '/', redirect: chemin('accueil', 'fr') },
  ...LANGUES.flatMap(routesDe),
  { path: '/:inconnue(.*)*', redirect: chemin('introuvable', 'fr') },
]
