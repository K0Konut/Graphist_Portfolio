// Libellés de l'interface en FR et EN (ton : territoire de marque §5). Le contenu éditorial, lui, vient de Dashility.
// shortcut: simple dictionnaire typé, ~20 chaînes ; passer à vue-i18n seulement si les pluriels ou les formats l'exigent.

const fr = {
  logo: "Mandolina, retour à l'accueil",
  ouvrirMenu: 'Ouvrir le menu',
  fermerMenu: 'Fermer le menu',
  menu: 'Menu principal',
  langue: 'Langue',
  aPropos: 'À propos',
  mentions: 'Mentions légales',
  projets: 'Projets',
  titreAccueil: 'Mandolina, graphiste — projets',
  site: 'Mandolina, graphiste',
  descriptionAccueil:
    'Identité visuelle, packaging, édition : une sélection de projets de Mandolina, graphiste.',
  voir: 'voir le projet',
  annonce: (position: number, total: number) => `Projet ${position} sur ${total}`,
  autresProjets: 'Autres projets',
  precedent: 'Projet précédent',
  suivant: 'Projet suivant',
  contact: 'Pour un projet, écrivez-moi :',
  book: 'Télécharger mon book',
  introuvable: "Cette page n'existe pas.",
  retour: 'Retour aux projets',
  aucunProjet: 'Les projets arrivent bientôt.',
}

export type Textes = typeof fr

const en: Textes = {
  logo: 'Mandolina, back to home',
  ouvrirMenu: 'Open menu',
  fermerMenu: 'Close menu',
  menu: 'Main menu',
  langue: 'Language',
  aPropos: 'About',
  mentions: 'Legal notice',
  projets: 'Projects',
  titreAccueil: 'Mandolina, graphic designer — projects',
  site: 'Mandolina, graphic designer',
  descriptionAccueil:
    'Visual identity, packaging, publishing: a selection of projects by Mandolina, graphic designer.',
  voir: 'view project',
  annonce: (position, total) => `Project ${position} of ${total}`,
  autresProjets: 'Other projects',
  precedent: 'Previous project',
  suivant: 'Next project',
  contact: 'For a project, write to me:',
  book: 'Download my portfolio',
  introuvable: "This page doesn't exist.",
  retour: 'Back to projects',
  aucunProjet: 'Projects are coming soon.',
}

export const textes = { fr, en }
export type Langue = keyof typeof textes
