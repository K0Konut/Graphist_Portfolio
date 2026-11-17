import vue from '@vitejs/plugin-vue'
import { existsSync, readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import type {} from 'vite-ssg'
import { cheminsAPreRendre, type Langue } from './src/router/pages.ts'

const fichier = (l: Langue, type: string) => `content/${l}/${type}.json`

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Un dossier par page (fr/projets/lutece-logo/index.html) : Nginx sert les adresses sans « .html »
    dirStyle: 'nested',
    beastiesOptions: false,
    // Les pages viennent du contenu copié (architecture technique §3) : sans contenu, le build échoue ici
    includedRoutes: () => {
      if (!existsSync(fichier('fr', 'projets')))
        throw new Error('content/ vide : lancer `npm run contenu` (réel) ou `npm run contenu:demo`')
      return cheminsAPreRendre({
        existe: (l, type) => existsSync(fichier(l, type)),
        slugs: (l) =>
          existsSync(fichier(l, 'projets'))
            ? (JSON.parse(readFileSync(fichier(l, 'projets'), 'utf8')) as { slug: string }[]).map(
                (p) => p.slug,
              )
            : [],
      })
    },
  },
})
