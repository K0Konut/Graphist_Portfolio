/* Ce que la copie du contenu (contenu.ts) sait de Dashility, sans dépendance à Node : testé dans tests/unit. */

export const ORIGIN = 'https://dashility.costamask.dev'

/** Les types de l'espace Mandolina, par leur clé dans Structure (architecture technique §4) */
export const TYPES = ['projets', 'a-propos', 'mentions-legales', 'book'] as const

/** Remplace les adresses des médias de Dashility par leur chemin dans le site (`/medias/<id>/<fichier>`) :
    la CSP reste en `img-src 'self'`. Renvoie aussi les fichiers à télécharger, chemin local → adresse. */
export function localiserMedias(texte: string) {
  const fichiers = new Map<string, string>()
  const local = texte.replace(
    new RegExp(`${ORIGIN}/api/media/([0-9a-f-]+)/([\\w.-]+)`, 'g'),
    (url, id: string, fichier: string) => {
      fichiers.set(`/medias/${id}/${fichier}`, url)
      return `/medias/${id}/${fichier}`
    },
  )
  return { texte: local, fichiers }
}

/** Ce qui trahit un contenu de démonstration ou provisoire : jamais en ligne (check-content.ts) */
export const MARQUES_PROVISOIRES = [
  'Texte provisoire',
  'Placeholder text',
  'à compléter',
  'data:image/svg+xml',
]
