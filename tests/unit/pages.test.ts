import { describe, expect, it } from 'vitest'
import { chemin, cheminsAPreRendre } from '../../src/router/pages'

describe('chemin', () => {
  it('donne l’adresse de chaque page dans chaque langue', () => {
    expect(chemin('projet', 'fr', 'jenlain')).toBe('/fr/projets/jenlain')
    expect(chemin('projet', 'en', 'jenlain')).toBe('/en/projects/jenlain')
    expect(chemin('mentions', 'en')).toBe('/en/legal-notice')
  })
})

describe('cheminsAPreRendre', () => {
  it('pré-rend les projets publiés et seulement les pages uniques qui existent dans la langue', () => {
    const chemins = cheminsAPreRendre({
      slugs: (l) => (l === 'fr' ? ['a', 'b'] : ['a']),
      existe: (l, type) => !(l === 'en' && type === 'a-propos'),
    })
    expect(chemins).toEqual([
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
    ])
  })
})
