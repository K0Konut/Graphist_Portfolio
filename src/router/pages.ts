/* Table des pages (architecture technique §3), sans dépendance : le routeur, le changement de langue
   et la config du pré-rendu (vite.config.ts) la lisent tous. */

export const LANGUES = ['fr', 'en'] as const
export type Langue = (typeof LANGUES)[number]

export const PAGES = {
  accueil: { fr: '/fr', en: '/en' },
  projet: { fr: '/fr/projets/:slug', en: '/en/projects/:slug' },
  aPropos: { fr: '/fr/a-propos', en: '/en/about' },
  mentions: { fr: '/fr/mentions-legales', en: '/en/legal-notice' },
  introuvable: { fr: '/fr/404', en: '/en/404' },
} as const

export type Page = keyof typeof PAGES

export const chemin = (page: Page, langue: Langue, slug = '') =>
  PAGES[page][langue].replace(':slug', slug)

/** Les adresses à pré-rendre, d'après le contenu copié : une page projet par slug publié dans la langue. */
export function cheminsAPreRendre(contenu: {
  slugs: (l: Langue) => string[]
  existe: (l: Langue, type: string) => boolean
}) {
  return LANGUES.flatMap((l) => [
    chemin('accueil', l),
    ...contenu.slugs(l).map((slug) => chemin('projet', l, slug)),
    ...(contenu.existe(l, 'a-propos') ? [chemin('aPropos', l)] : []),
    ...(contenu.existe(l, 'mentions-legales') ? [chemin('mentions', l)] : []),
    chemin('introuvable', l),
  ])
}
