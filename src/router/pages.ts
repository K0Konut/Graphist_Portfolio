/* Table des pages (architecture technique §3), sans dépendance : le routeur, le changement de langue, les balises
   hreflang et la config du pré-rendu et du sitemap (vite.config.ts) la lisent tous. */

export const LANGUES = ['fr', 'en'] as const
export type Langue = (typeof LANGUES)[number]
export const LANGUE_PAR_DEFAUT: Langue = 'fr'

export const PAGES = {
  accueil: { fr: '/fr', en: '/en' },
  projet: { fr: '/fr/projets/:slug', en: '/en/projects/:slug' },
  aPropos: { fr: '/fr/a-propos', en: '/en/about' },
  mentions: { fr: '/fr/mentions-legales', en: '/en/legal-notice' },
  introuvable: { fr: '/fr/404', en: '/en/404' },
} as const

export type Page = keyof typeof PAGES

/** Pages hors des moteurs de recherche et du sitemap (UX §8) */
export const NON_INDEXEES: Page[] = ['mentions', 'introuvable']

export const chemin = (page: Page, langue: Langue, slug = '') =>
  PAGES[page][langue].replace(':slug', slug)

/** Ce que la table doit savoir du contenu publié, au build (fichiers) comme dans le navigateur (contenu.ts) */
export interface ContenuPublie {
  slugs: (l: Langue) => string[]
  existe: (l: Langue, type: 'a-propos' | 'mentions-legales') => boolean
}

/** L'adresse de la page dans la langue, si elle y existe : un projet ou une page unique peut manquer en anglais. */
export function cheminDansLangue(contenu: ContenuPublie, page: Page, l: Langue, slug = '') {
  const existe = {
    accueil: true,
    projet: contenu.slugs(l).includes(slug),
    aPropos: contenu.existe(l, 'a-propos'),
    mentions: contenu.existe(l, 'mentions-legales'),
    introuvable: true,
  }[page]
  return existe ? chemin(page, l, slug) : undefined
}

/** Chaque page, avec son adresse dans chaque langue où elle existe */
function instances(contenu: ContenuPublie) {
  const slugs = [...new Set(LANGUES.flatMap((l) => contenu.slugs(l)))]
  const pages: [Page, string][] = [
    ...(Object.keys(PAGES) as Page[])
      .filter((p) => p !== 'projet')
      .map((p): [Page, string] => [p, '']),
    ...slugs.map((slug): [Page, string] => ['projet', slug]),
  ]
  return pages.map(([page, slug]) => ({
    page,
    chemins: LANGUES.map((l) => [l, cheminDansLangue(contenu, page, l, slug)] as const).filter(
      (c): c is readonly [Langue, string] => !!c[1],
    ),
  }))
}

/** Les adresses à pré-rendre, d'après le contenu copié : une page projet par slug publié dans la langue. */
export const cheminsAPreRendre = (contenu: ContenuPublie) =>
  instances(contenu).flatMap((i) => i.chemins.map(([, c]) => c))

/** sitemap.xml : chaque page indexable dans chaque langue, liée à ses équivalents (hreflang, x-default). */
export function sitemapXml(site: string, contenu: ContenuPublie) {
  const lien = (hreflang: string, href: string) =>
    `<xhtml:link rel="alternate" hreflang="${hreflang}" href="${site}${href}"/>`
  const urls = instances(contenu)
    .filter((i) => !NON_INDEXEES.includes(i.page))
    .flatMap(({ chemins }) => {
      const parDefaut = chemins.find(([l]) => l === LANGUE_PAR_DEFAUT)
      const liens = [
        ...chemins.map(([l, c]) => lien(l, c)),
        ...(parDefaut ? [lien('x-default', parDefaut[1])] : []),
      ].join('')
      return chemins.map(([, c]) => `<url><loc>${site}${c}</loc>${liens}</url>`)
    })
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}
