// Mosaïque de la page projet (DA §5) : la galerie, regroupée en rangées selon le champ « Largeur » de chaque image.
// Une rangée de « moitie » prend 2 images, de « tiers » 3 ; une largeur différente ferme la rangée en cours.

export const LARGEURS = { pleine: 1, moitie: 2, tiers: 3 } as const
export type Largeur = keyof typeof LARGEURS

/** Clé de Dashility → largeur ; vide ou inconnue : pleine largeur */
export const largeur = (cle: unknown): Largeur =>
  typeof cle === 'string' && Object.hasOwn(LARGEURS, cle) ? (cle as Largeur) : 'pleine'

export function rangees<T extends { largeur: Largeur }>(galerie: T[]): T[][] {
  const resultat: T[][] = []
  for (const element of galerie) {
    const courante = resultat.at(-1)
    if (
      courante &&
      courante[0]!.largeur === element.largeur &&
      courante.length < LARGEURS[element.largeur]
    )
      courante.push(element)
    else resultat.push([element])
  }
  return resultat
}
