/* Refuse une mise en ligne au contenu incomplet (architecture technique §4) : au moins un projet en français,
   champs obligatoires remplis, À propos et mentions légales publiés en français, aucun texte provisoire ni contenu
   de démonstration. L'anglais peut manquer : ce qui n'est pas traduit n'apparaît pas sur le site anglais.
   Une couleur invalide n'arrête pas la mise en ligne : le site applique le gris par défaut (UX §7). */
import { existsSync, readFileSync } from 'node:fs'
import { estCouleurValide } from '../src/utils/aplat.ts'
import { LANGUES } from '../src/router/pages.ts'
import { MARQUES_PROVISOIRES } from './medias.ts'

const problemes: string[] = []
const avertissements: string[] = []
const lire = (chemin: string) =>
  existsSync(chemin) ? (JSON.parse(readFileSync(chemin, 'utf8')) as unknown) : undefined

for (const type of ['projets', 'a-propos', 'mentions-legales'])
  if (!existsSync(`content/fr/${type}.json`))
    problemes.push(
      `content/fr/${type}.json manquant : publier « ${type} » dans Dashility, puis npm run contenu`,
    )

for (const langue of LANGUES) {
  const projets = (lire(`content/${langue}/projets.json`) ?? []) as {
    slug: string
    fields: Record<string, unknown>
  }[]
  if (langue === 'fr' && !projets.length) problemes.push('Aucun projet publié en français')
  for (const { slug, fields } of projets) {
    for (const champ of ['nom', 'discipline', 'client', 'couverture', 'ordre'])
      if (fields[champ] == null || fields[champ] === '')
        problemes.push(`Projet « ${slug} » (${langue}) : champ « ${champ} » vide`)
    if (!estCouleurValide(String(fields.couleur ?? '')))
      avertissements.push(
        `Projet « ${slug} » : couleur « ${fields.couleur} » invalide (#RRGGBB attendu), gris par défaut`,
      )
  }
  for (const type of ['projets', 'a-propos', 'mentions-legales', 'book']) {
    const chemin = `content/${langue}/${type}.json`
    const texte = existsSync(chemin) ? readFileSync(chemin, 'utf8') : ''
    for (const marque of MARQUES_PROVISOIRES)
      if (texte.includes(marque)) problemes.push(`${chemin} : « ${marque} » (contenu provisoire)`)
  }
}

for (const a of avertissements) console.warn(`Attention : ${a}`)
if (problemes.length) {
  console.error(`Contenu incomplet, mise en ligne refusée :\n${problemes.join('\n')}`)
  process.exit(1)
}
console.log('Contenu complet.')
