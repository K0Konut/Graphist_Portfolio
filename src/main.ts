import { initAnalytics } from '@dashility/client'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { dernierProjet } from './composables/useDernierProjet'
import { projets } from './content/contenu'
import { routes } from './router/routes'
import './styles/base.css'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior: (_to, _from, saved) => saved ?? { top: 0 } },
  ({ router, isClient }) => {
    if (!isClient) return

    // Vues de page et téléchargements du book, sans cookies (architecture technique §7) ; rien pendant le pré-rendu
    const cle = import.meta.env.VITE_DASHILITY_ANALYTICS_KEY
    if (cle) initAnalytics({ key: cle, endpoint: 'https://dashility.costamask.dev/api/e' })

    // Le carrousel retrouve le dernier projet vu au retour à l'accueil (UX §5)
    router.afterEach((to) => {
      if (to.meta.page !== 'projet') return
      const i = projets(to.meta.langue).findIndex((p) => p.slug === to.params.slug)
      if (i >= 0) dernierProjet.value = i
    })

    // Les composants rendent des liens natifs (design system §1) : le routeur prend les liens internes du site,
    // sauf ceux qu'un composant a déjà traités (voisine du carrousel) et ceux que le navigateur doit ouvrir lui-même
    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return
      const lien = (e.target as Element).closest('a')
      if (!lien || lien.target || lien.hasAttribute('download') || lien.origin !== location.origin)
        return
      if (!/^\/(fr|en)(\/|$)/.test(lien.pathname)) return
      e.preventDefault()
      router.push(lien.pathname + lien.search + lien.hash)
    })
  },
)
