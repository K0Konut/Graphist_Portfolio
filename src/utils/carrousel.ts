// Position des cartes dans le carrousel en boucle (UX §5).

/** Reste toujours positif : modulo(-1, 17) = 16. */
export const modulo = (i: number, n: number) => ((i % n) + n) % n

/**
 * Écart circulaire de la carte `i` par rapport à la carte active : 0 au centre, 1 à droite, -1 à gauche…
 * Dans ]-n/2, n/2] : avec 17 projets, de -8 à 8 ; avec 2 projets, l'autre carte est à droite (1).
 */
export function decalage(i: number, actif: number, n: number) {
  const d = modulo(i - actif, n)
  return d > n / 2 ? d - n : d
}

/**
 * Vrai si la carte doit changer de place sans glisser : elle passe d'un bord à l'autre en faisant le tour,
 * ce qui la ferait traverser l'écran. Une carte qui suit le mouvement bouge au plus de n/2 places.
 */
export const faitLeTour = (i: number, actif: number, precedent: number, n: number) =>
  Math.abs(decalage(i, actif, n) - decalage(i, precedent, n)) > n / 2
