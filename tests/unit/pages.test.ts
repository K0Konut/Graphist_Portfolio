import { describe, expect, it } from 'vitest'
import {
  chemin,
  cheminDansLangue,
  cheminsAPreRendre,
  sitemapXml,
  type ContenuPublie,
} from '../../src/router/pages'

// Deux projets en français, un seul traduit ; À propos pas encore publié en anglais
const contenu: ContenuPublie = {
  slugs: (l) => (l === 'fr' ? ['a', 'b'] : ['a']),
  existe: (l, type) => !(l === 'en' && type === 'a-propos'),
}

describe('chemin', () => {
  it('donne l’adresse de chaque page dans chaque langue', () => {
    expect(chemin('projet', 'fr', 'jenlain')).toBe('/fr/projets/jenlain')
    expect(chemin('projet', 'en', 'jenlain')).toBe('/en/projects/jenlain')
    expect(chemin('mentions', 'en')).toBe('/en/legal-notice')
  })
})

describe('cheminDansLangue', () => {
  it('ne donne une adresse que si la page existe dans la langue', () => {
    expect(cheminDansLangue(contenu, 'projet', 'en', 'a')).toBe('/en/projects/a')
    expect(cheminDansLangue(contenu, 'projet', 'en', 'b')).toBeUndefined()
    expect(cheminDansLangue(contenu, 'aPropos', 'en')).toBeUndefined()
    expect(cheminDansLangue(contenu, 'accueil', 'en')).toBe('/en')
  })
})

describe('cheminsAPreRendre', () => {
  it('pré-rend les projets publiés et seulement les pages uniques qui existent dans la langue', () => {
    expect(cheminsAPreRendre(contenu).sort()).toEqual(
      [
        '/fr',
        '/fr/projets/a',
        '/fr/projets/b',
        '/fr/a-propos',
        '/fr/mentions-legales',
        '/fr/404',
        '/en',
        '/en/projects/a',
        '/en/legal-notice',
        '/en/404',
      ].sort(),
    )
  })
})

describe('sitemapXml', () => {
  const xml = sitemapXml('https://exemple.fr', contenu)

  it('liste les pages indexables seulement', () => {
    expect(xml).toContain('<loc>https://exemple.fr/fr/projets/b</loc>')
    expect(xml).not.toContain('<loc>https://exemple.fr/fr/404</loc>')
    expect(xml).not.toContain('<loc>https://exemple.fr/fr/mentions-legales</loc>')
  })

  it('relie un projet à ses traductions existantes et à la version par défaut', () => {
    const entree = xml
      .split('\n')
      .find((l) => l.includes('<loc>https://exemple.fr/en/projects/a</loc>'))
    expect(entree).toContain('hreflang="fr" href="https://exemple.fr/fr/projets/a"')
    expect(entree).toContain('hreflang="x-default" href="https://exemple.fr/fr/projets/a"')
    const seul = xml
      .split('\n')
      .find((l) => l.includes('<loc>https://exemple.fr/fr/projets/b</loc>'))
    expect(seul).not.toContain('hreflang="en"')
  })
})
