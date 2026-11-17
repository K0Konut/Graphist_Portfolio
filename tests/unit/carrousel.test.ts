import { describe, expect, it } from 'vitest'
import { decalage, faitLeTour, modulo } from '../../src/utils/carrousel'

describe('modulo', () => {
  it('reste positif', () => {
    expect(modulo(-1, 17)).toBe(16)
    expect(modulo(17, 17)).toBe(0)
    expect(modulo(5, 17)).toBe(5)
  })
})

describe('decalage', () => {
  it('place les voisines de part et d’autre de la carte active', () => {
    expect(decalage(5, 5, 17)).toBe(0)
    expect(decalage(6, 5, 17)).toBe(1)
    expect(decalage(4, 5, 17)).toBe(-1)
  })

  it('boucle : le dernier projet précède le premier', () => {
    expect(decalage(16, 0, 17)).toBe(-1)
    expect(decalage(0, 16, 17)).toBe(1)
  })

  it('répartit les 17 cartes de -8 à 8', () => {
    const ecarts = Array.from({ length: 17 }, (_, i) => decalage(i, 0, 17)).sort((a, b) => a - b)
    expect(ecarts).toEqual(Array.from({ length: 17 }, (_, i) => i - 8))
  })

  it('gère les petites listes sans doublon', () => {
    expect(decalage(0, 0, 1)).toBe(0)
    expect(decalage(1, 0, 2)).toBe(1)
    expect([0, 1, 2].map((i) => decalage(i, 1, 3))).toEqual([-1, 0, 1])
    expect([0, 1, 2, 3].map((i) => decalage(i, 0, 4))).toEqual([0, 1, 2, -1])
  })
})

describe('faitLeTour', () => {
  it('repère la seule carte qui passe d’un bord à l’autre', () => {
    // 17 projets, on avance d'un cran : la carte à -8 passe à +8
    const tour = Array.from({ length: 17 }, (_, i) => i).filter((i) => faitLeTour(i, 1, 0, 17))
    expect(tour).toEqual([9])
  })

  it('fait aussi le tour à 5 projets, où la voisine cachée est juste hors écran', () => {
    const tour = [0, 1, 2, 3, 4].filter((i) => faitLeTour(i, 1, 0, 5))
    expect(tour).toEqual([3])
  })

  it('laisse glisser toutes les cartes à 2 projets', () => {
    expect([0, 1].some((i) => faitLeTour(i, 1, 0, 2))).toBe(false)
  })
})
