// Données des maquettes (phase 6) : vrais noms, disciplines, clients et couleurs de la fiche de la cliente ;
// images et textes PROVISOIRES en attendant les fichiers de Mandolina. En production, tout vient de Dashility.
import type { Langue } from '../../content/textes'
import { projets as fiche } from '../design-system/projets'

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
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Image de remplacement neutre, au format réel attendu (pour juger la mise en page sans les fichiers)
function imageProvisoire(nom: string, largeur: number, hauteur: number, langue: Langue) {
  const legende = langue === 'fr' ? 'Image à venir' : 'Image to come'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largeur} ${hauteur}"><rect width="100%" height="100%" fill="#e6e6e6"/><text x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-size="${largeur / 28}" fill="#595959">${legende} — ${nom}</text></svg>`
  return { src: `data:image/svg+xml,${encodeURIComponent(svg)}`, alt: `${legende} : ${nom}`, largeur, hauteur }
}

function presentation(client: string, langue: Langue) {
  return langue === 'fr'
    ? `<p><strong>Texte provisoire.</strong> Ici, Mandolina présentera le projet réalisé pour ${client} : la demande de départ, ce qu'elle a conçu et les supports livrés.</p><p>Deux ou trois paragraphes courts suffisent ; les images prennent le relais juste en dessous.</p>`
    : `<p><strong>Placeholder text.</strong> Here, Mandolina will present the project made for ${client}: the initial brief, what she designed and the deliverables.</p><p>Two or three short paragraphs are enough; the images take over just below.</p>`
}

export function projets(langue: Langue) {
  return fiche.map((p) => ({
    ...p,
    slug: slug(p.nom),
    discipline: langue === 'fr' ? p.discipline : disciplinesEn[p.discipline],
    presentation: presentation(p.client, langue),
    images: [
      imageProvisoire(p.nom, 1200, 1500, langue),
      imageProvisoire(p.nom, 2400, 1600, langue),
      imageProvisoire(p.nom, 1200, 1500, langue),
    ],
  }))
}

export const aPropos = {
  fr: {
    accroche: 'Je suis Mandolina, graphiste.',
    presentation:
      "<p><strong>Texte provisoire.</strong> Je conçois des identités visuelles, des packagings, des éditions, des illustrations et des scénographies, pour des clubs sportifs, des marques et des studios.</p><p>Ce site rassemble une sélection de mes projets.</p>",
  },
  en: {
    accroche: "I'm Mandolina, a graphic designer.",
    presentation:
      '<p><strong>Placeholder text.</strong> I design visual identities, packaging, publications, illustrations and scenography for sports clubs, brands and studios.</p><p>This site gathers a selection of my work.</p>',
  },
  email: 'adresse@exemple.fr',
}

export const mentions = {
  fr: `<p><strong>Texte provisoire, à compléter.</strong></p>
<h2>Éditrice</h2><p>Mandolina [nom complet, statut], contact : adresse@exemple.fr</p>
<h2>Hébergement</h2><p>[Nom, adresse et téléphone de l'hébergeur]</p>
<h2>Propriété intellectuelle</h2><p>Les visuels présentés appartiennent à leurs auteurs et à leurs clients respectifs. Toute reproduction sans autorisation est interdite.</p>
<h2>Données personnelles</h2><p>Ce site ne dépose aucun cookie et ne collecte aucune donnée personnelle.</p>`,
  en: `<p><strong>Placeholder text, to be completed.</strong></p>
<h2>Publisher</h2><p>Mandolina [full name, status], contact: adresse@exemple.fr</p>
<h2>Hosting</h2><p>[Host name, address and phone number]</p>
<h2>Intellectual property</h2><p>The visuals shown belong to their authors and their respective clients. Any reproduction without permission is prohibited.</p>
<h2>Personal data</h2><p>This site sets no cookies and collects no personal data.</p>`,
}
