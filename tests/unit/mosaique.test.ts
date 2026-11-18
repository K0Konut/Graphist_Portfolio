import { describe, expect, it } from 'vitest'
import { largeur, rangees, type Largeur } from '../../src/utils/mosaique'

const galerie = (...largeurs: Largeur[]) => largeurs.map((l, i) => ({ id: i, largeur: l }))
const ids = (r: { id: number }[][]) => r.map((rangee) => rangee.map((e) => e.id))

describe('rangees', () => {
  it('compose la mosaïque de la maquette : 1, 1, 2, 3', () => {
    expect(
      ids(rangees(galerie('pleine', 'pleine', 'moitie', 'moitie', 'tiers', 'tiers', 'tiers'))),
    ).toEqual([[0], [1], [2, 3], [4, 5, 6]])
  })

  it('ouvre une nouvelle rangée quand la précédente est pleine', () => {
    expect(ids(rangees(galerie('moitie', 'moitie', 'moitie')))).toEqual([[0, 1], [2]])
    expect(ids(rangees(galerie('tiers', 'tiers', 'tiers', 'tiers')))).toEqual([[0, 1, 2], [3]])
  })

  it('ferme une rangée incomplète quand la largeur change', () => {
    expect(ids(rangees(galerie('tiers', 'tiers', 'moitie', 'pleine')))).toEqual([[0, 1], [2], [3]])
  })

  it('rend une galerie vide vide', () => {
    expect(rangees([])).toEqual([])
  })
})

describe('largeur', () => {
  it('lit la clé de Dashility, pleine largeur par défaut', () => {
    expect(largeur('tiers')).toBe('tiers')
    expect(largeur(undefined)).toBe('pleine')
    expect(largeur('quart')).toBe('pleine')
    expect(largeur('toString')).toBe('pleine')
  })
})
