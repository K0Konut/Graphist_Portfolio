import { describe, expect, it } from 'vitest'
import { aplat, contraste, estCouleurValide, luminance } from '../../src/utils/aplat'

// Les 17 couleurs fournies par la cliente (DA §3)
const couleurs = [
  '#85c4f9',
  '#ef6f96',
  '#9df7dd',
  '#c1cddd',
  '#ffd975',
  '#c3aefc',
  '#efcf8f',
  '#dbf4d3',
  '#ffdeeb',
  '#c3e2fc',
  '#727272',
  '#d2b3e2',
  '#34b772',
  '#f7e751',
  '#c79b7f',
  '#b9efed',
  '#ffc885',
]

describe('aplat', () => {
  it('met du texte noir sur les couleurs claires, calque à 85 %', () => {
    expect(aplat('#85C4F9')).toEqual({ couleur: '#85c4f9', texte: '#000000', opacite: 0.85 })
  })

  it('met du texte blanc et un calque opaque sur le gris', () => {
    expect(aplat('#727272')).toEqual({ couleur: '#727272', texte: '#ffffff', opacite: 1 })
  })

  it('remplace une couleur invalide par le gris par défaut', () => {
    expect(aplat('rouge').couleur).toBe('#727272')
    expect(aplat('#fff').couleur).toBe('#727272')
    expect(aplat(' #34b772 ').couleur).toBe('#34b772')
    expect(aplat('2AF4DE').couleur).toBe('#2af4de')
  })

  it('garde un contraste AA pour toutes les couleurs de la cliente, au pire cas', () => {
    for (const c of couleurs) {
      const { texte, opacite } = aplat(c)
      const rgb = [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
      for (const fond of [0, 255]) {
        const melange = rgb.map((v) => opacite * v + (1 - opacite) * fond) as [
          number,
          number,
          number,
        ]
        expect(
          contraste(luminance(melange), texte === '#000000' ? 0 : 1),
          `${c} sur fond ${fond}`,
        ).toBeGreaterThanOrEqual(4.5)
      }
    }
  })
})

describe('estCouleurValide', () => {
  it('accepte RRGGBB, avec ou sans #', () => {
    expect(estCouleurValide('#AbCdEf')).toBe(true)
    expect(estCouleurValide('abcdef')).toBe(true)
    expect(estCouleurValide('##abcdef')).toBe(false)
    expect(estCouleurValide('#abcdeg')).toBe(false)
  })
})
