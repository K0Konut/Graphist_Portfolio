import vue from '@vitejs/plugin-vue'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import type {} from 'vite-ssg'
import {
  cheminsAPreRendre,
  sitemapXml,
  type ContenuPublie,
  type Langue,
} from './src/router/pages.ts'

const fichier = (l: Langue, type: string) => `content/${l}/${type}.json`

// Le contenu copié, lu comme le site le lit (architecture technique §3) : pré-rendu et sitemap en dérivent
const contenu: ContenuPublie = {
  existe: (l, type) => existsSync(fichier(l, type)),
  slugs: (l) =>
    existsSync(fichier(l, 'projets'))
      ? (JSON.parse(readFileSync(fichier(l, 'projets'), 'utf8')) as { slug: string }[]).map(
          (p) => p.slug,
        )
      : [],
}

export default defineConfig(({ mode }) => {
  const site = (loadEnv(mode, process.cwd()).VITE_SITE_URL ?? '').replace(/\/$/, '')
  return {
    plugins: [vue()],
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      // Un dossier par page (fr/projets/lutece-logo/index.html) : Nginx sert les adresses sans « .html »
      dirStyle: 'nested',
      beastiesOptions: false,
      // Sans contenu, le build échoue ici plutôt que de publier un site vide
      includedRoutes: () => {
        if (!existsSync(fichier('fr', 'projets')))
          throw new Error(
            'content/ vide : lancer `npm run contenu` (réel) ou `npm run contenu:demo`',
          )
        return cheminsAPreRendre(contenu)
      },
      onFinished() {
        if (site) writeFileSync('dist/sitemap.xml', sitemapXml(site, contenu))
        writeFileSync(
          'dist/robots.txt',
          `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${site}/sitemap.xml\n` : ''}`,
        )
      },
    },
  }
})
