/* Lecture du contenu copié de Dashility dans content/<langue>/<type>.json (architecture technique §4),
   au format de l'API publique. Écrit par `npm run contenu` (réel) ou `npm run contenu:demo`. */
import type { Projet } from '../pages/ProjectPage.vue'
import type { Langue } from '../router/pages'

interface ImageDashility {
  alt: string
  width: number
  height: number
  src: string
  srcset?: { webp?: string; avif?: string }
}
type TexteRiche = { html: string } | null

interface Entree<F> {
  slug: string
  publishedAt: string
  fields: F
}
interface PageUnique<F> {
  publishedAt: string
  fields: F
}

interface ChampsProjet {
  nom: string
  discipline: string
  client: string
  presentation?: TexteRiche
  couverture: ImageDashility
  galerie?: { image: ImageDashility }[] | null
  couleur: string
  ordre: number
}

const fichiers = import.meta.glob<unknown>('/content/*/*.json', { eager: true, import: 'default' })
const lire = <T>(langue: Langue, type: string) =>
  fichiers[`/content/${langue}/${type}.json`] as T | undefined

const image = (i: ImageDashility) => ({
  src: i.src,
  alt: i.alt,
  largeur: i.width,
  hauteur: i.height,
  srcset: i.srcset,
})

export interface ProjetPublie extends Projet {
  slug: string
}

/** Projets triés par « Ordre » croissant ; à égalité, l'ordre de l'API (dernier publié d'abord) est gardé. */
export function projets(langue: Langue): ProjetPublie[] {
  return [...(lire<Entree<ChampsProjet>[]>(langue, 'projets') ?? [])]
    .sort((a, b) => a.fields.ordre - b.fields.ordre)
    .map(({ slug, fields: f }) => ({
      slug,
      nom: f.nom,
      discipline: f.discipline,
      client: f.client,
      couleur: f.couleur,
      presentation: f.presentation?.html,
      images: [f.couverture, ...(f.galerie ?? []).map((g) => g.image)].map(image),
    }))
}

export const aPropos = (langue: Langue) =>
  lire<PageUnique<{ accroche: string; presentation: TexteRiche; email: string }>>(
    langue,
    'a-propos',
  )?.fields

export const mentions = (langue: Langue) =>
  lire<PageUnique<{ contenu: TexteRiche }>>(langue, 'mentions-legales')?.fields.contenu?.html

const poids = (octets: number, langue: Langue) =>
  new Intl.NumberFormat(langue, {
    style: 'unit',
    unit: 'megabyte',
    maximumFractionDigits: 1,
  }).format(octets / 1e6)

export function book(langue: Langue) {
  const fichier = lire<PageUnique<{ fichier: { url: string; bytes: number } | null }>>(
    langue,
    'book',
  )?.fields.fichier
  return fichier ? { href: fichier.url, poids: poids(fichier.bytes, langue) } : undefined
}
