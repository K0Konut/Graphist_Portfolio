// Règle des aplats (DA §3) : couleur du texte et opacité du calque, calculées une fois par projet.

const OPACITE_CALQUE = 0.85
const CONTRASTE_MINIMUM = 4.5 // WCAG AA, texte courant
const APLAT_DEFAUT = '#727272'

export interface Aplat {
  couleur: string
  texte: '#000000' | '#ffffff'
  opacite: number
}

type Rgb = [number, number, number]

const lineaire = (v: number) => {
  const c = v / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}
export const luminance = ([r, g, b]: Rgb) =>
  0.2126 * lineaire(r) + 0.7152 * lineaire(g) + 0.0722 * lineaire(b)
export const contraste = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)

export const estCouleurValide = (valeur: string) => /^#[0-9a-f]{6}$/i.test(valeur.trim())

export function aplat(valeur: string): Aplat {
  const couleur = estCouleurValide(valeur) ? valeur.trim().toLowerCase() : APLAT_DEFAUT
  const rgb = [1, 3, 5].map((i) => parseInt(couleur.slice(i, i + 2), 16)) as Rgb
  const l = luminance(rgb)
  const noir = contraste(l, 0) >= contraste(l, 1)
  const lTexte = noir ? 0 : 1

  // Pire cas : image toute noire ou toute blanche sous le calque semi-transparent
  const pire = Math.min(
    ...[0, 255].map((fond) =>
      contraste(
        luminance(rgb.map((v) => OPACITE_CALQUE * v + (1 - OPACITE_CALQUE) * fond) as Rgb),
        lTexte,
      ),
    ),
  )

  return {
    couleur,
    texte: noir ? '#000000' : '#ffffff',
    opacite: pire < CONTRASTE_MINIMUM ? 1 : OPACITE_CALQUE,
  }
}
