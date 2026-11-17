/* Copie le contenu publié de Dashility dans content/<langue>/<type>.json (architecture technique §4),
   les images dans public/medias/<id>/ et le book dans public/book/book-<langue>.pdf.
   Lancé à la main (`npm run contenu`, clé dans .env.local) et à chaque mise en ligne (clé dans un secret GitHub). */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { loadEnv } from 'vite'
import { LANGUES } from '../src/router/pages.ts'
import { localiserMedias, ORIGIN, TYPES } from './medias.ts'

async function telecharger(url: string, chemin: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} : HTTP ${res.status}`)
  mkdirSync(dirname(chemin), { recursive: true })
  writeFileSync(chemin, Buffer.from(await res.arrayBuffer()))
}

const cle = process.env.DASHILITY_KEY || loadEnv('development', process.cwd(), '').DASHILITY_KEY
if (!cle) throw new Error("DASHILITY_KEY manquant : la clé de lecture de l'espace, dans .env.local")

const medias = new Map<string, string>()
rmSync('content', { recursive: true, force: true })
for (const langue of LANGUES) {
  mkdirSync(`content/${langue}`, { recursive: true })
  for (const type of TYPES) {
    const res = await fetch(`${ORIGIN}/api/v1/content/${type}?locale=${langue}`, {
      headers: { Authorization: `Bearer ${cle}` },
    })
    // 404 : page unique pas encore publiée, ou incomplète en anglais. Le fichier manque, la page n'est pas pré-rendue
    if (res.status === 404) continue
    if (!res.ok) throw new Error(`${type} (${langue}) : HTTP ${res.status}`)
    const data = (await res.json()) as { fields?: { fichier?: { url: string } | null } }
    if (type === 'book' && data.fields?.fichier) {
      await telecharger(data.fields.fichier.url, `public/book/book-${langue}.pdf`)
      data.fields.fichier.url = `/book/book-${langue}.pdf`
    }
    const { texte, fichiers } = localiserMedias(JSON.stringify(data, null, 2))
    for (const [chemin, url] of fichiers) medias.set(chemin, url)
    writeFileSync(`content/${langue}/${type}.json`, `${texte}\n`)
  }
}

// Un nouveau fichier a toujours un nouvel id dans Dashility : un fichier déjà là n'a pas changé
for (const [chemin, url] of medias)
  if (!existsSync(`public${chemin}`)) await telecharger(url, `public${chemin}`)
const utilises = new Set([...medias.keys()].map((chemin) => chemin.split('/')[2]))
for (const id of existsSync('public/medias') ? readdirSync('public/medias') : [])
  if (!utilises.has(id)) rmSync(`public/medias/${id}`, { recursive: true })

console.log(`Contenu copié : ${TYPES.length} types, ${medias.size} médias.`)
