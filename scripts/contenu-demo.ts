/* Contenu de démonstration (architecture technique §4) : écrit content/<langue>/*.json au format de l'API de Dashility,
   comme `npm run contenu`, sans clé. Vrais noms, disciplines, clients et couleurs des 17 projets (fiche de la cliente) ;
   images et textes PROVISOIRES. Sert à la CI et au développement ; jamais à la mise en ligne (check-content le refuse). */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { projets as fiche } from '../src/pages/design-system/projets.ts'

type Langue = 'fr' | 'en'

const disciplinesEn: Record<string, string> = {
  'Identité visuelle': 'Visual identity',
  'Identité visuelle et événementiel': 'Visual identity and events',
  Communication: 'Communication',
  Édition: 'Publishing',
  Textile: 'Textile',
  Packaging: 'Packaging',
  Illustrations: 'Illustrations',
  'Fichiers techniques': 'Technical files',
  'Identité visuelle et communication': 'Visual identity and communication',
  'Édition et événementiel': 'Publishing and events',
  Scénographie: 'Scenography',
  'Identité visuelle et packaging': 'Visual identity and packaging',
}

const slug = (texte: string) =>
  texte
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Image neutre au format réel attendu, comme une image de Dashility ({ alt, width, height, src })
function image(nom: string, width: number, height: number, l: Langue) {
  const legende = l === 'fr' ? 'Image à venir' : 'Image to come'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#e6e6e6"/><text x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-size="${width / 28}" fill="#595959">${legende} — ${nom}</text></svg>`
  return {
    alt: `${legende} : ${nom}`,
    width,
    height,
    src: `data:image/svg+xml,${encodeURIComponent(svg)}`,
  }
}

const presentation = (client: string, l: Langue) => ({
  html:
    l === 'fr'
      ? `<p><strong>Texte provisoire.</strong> Ici, Mandolina présentera le projet réalisé pour ${client} : la demande de départ, ce qu'elle a conçu et les supports livrés.</p><p>Deux ou trois paragraphes courts suffisent ; les images prennent le relais juste en dessous.</p>`
      : `<p><strong>Placeholder text.</strong> Here, Mandolina will present the project made for ${client}: the initial brief, what she designed and the deliverables.</p><p>Two or three short paragraphs are enough; the images take over just below.</p>`,
})

const publishedAt = '2026-11-17T00:00:00.000Z'

const contenu = (l: Langue) => ({
  projets: fiche.map((p, i) => ({
    slug: slug(p.nom),
    publishedAt,
    fields: {
      nom: p.nom,
      discipline: l === 'fr' ? p.discipline : disciplinesEn[p.discipline],
      client: p.client,
      presentation: presentation(p.client, l),
      couverture: image(p.nom, 1200, 1500, l),
      galerie: [{ image: image(p.nom, 2400, 1600, l) }, { image: image(p.nom, 1200, 1500, l) }],
      couleur: p.couleur,
      ordre: i + 1,
    },
  })),
  'a-propos': {
    publishedAt,
    fields: {
      accroche: l === 'fr' ? 'Je suis Mandolina, graphiste.' : "I'm Mandolina, a graphic designer.",
      presentation: {
        html:
          l === 'fr'
            ? '<p><strong>Texte provisoire.</strong> Je conçois des identités visuelles, des packagings, des éditions, des illustrations et des scénographies, pour des clubs sportifs, des marques et des studios.</p><p>Ce site rassemble une sélection de mes projets.</p>'
            : '<p><strong>Placeholder text.</strong> I design visual identities, packaging, publications, illustrations and scenography for sports clubs, brands and studios.</p><p>This site gathers a selection of my work.</p>',
      },
      email: 'adresse@exemple.fr',
    },
  },
  'mentions-legales': {
    publishedAt,
    fields: {
      contenu: {
        html:
          l === 'fr'
            ? "<p><strong>Texte provisoire, à compléter.</strong></p><h2>Éditrice</h2><p>Mandolina [nom complet, statut], contact : adresse@exemple.fr</p><h2>Hébergement</h2><p>[Nom, adresse et téléphone de l'hébergeur]</p><h2>Propriété intellectuelle</h2><p>Les visuels présentés appartiennent à leurs auteurs et à leurs clients respectifs. Toute reproduction sans autorisation est interdite.</p><h2>Données personnelles</h2><p>Ce site ne dépose aucun cookie et ne collecte aucune donnée personnelle.</p>"
            : '<p><strong>Placeholder text, to be completed.</strong></p><h2>Publisher</h2><p>Mandolina [full name, status], contact: adresse@exemple.fr</p><h2>Hosting</h2><p>[Host name, address and phone number]</p><h2>Intellectual property</h2><p>The visuals shown belong to their authors and their respective clients. Any reproduction without permission is prohibited.</p><h2>Personal data</h2><p>This site sets no cookies and collects no personal data.</p>',
      },
    },
  },
  // Pas de book.json : le lien de téléchargement est masqué (UX §7)
})

rmSync('content', { recursive: true, force: true })
for (const l of ['fr', 'en'] as const) {
  mkdirSync(`content/${l}`, { recursive: true })
  for (const [type, data] of Object.entries(contenu(l)))
    writeFileSync(`content/${l}/${type}.json`, `${JSON.stringify(data, null, 2)}\n`)
}
console.log(`Contenu de démonstration écrit : ${fiche.length} projets, FR et EN.`)
