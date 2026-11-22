# Maquettes — Mandolina, graphiste

Version 0.1 — 17/11/2026 — **statut : à valider (structure)** ; à reprendre avec les images de la cliente.

Maquettes en code : les vraies pages (`src/pages/`) assemblées avec les composants du design system. Faites sur un banc `/maquettes.html`, retiré depuis que le routeur sert les pages (phase 7) : pour les revoir, `npm run contenu:demo && npm run dev`, puis `/fr`. Le contenu de démonstration reprend les données des maquettes.

## Contenu

- **Réel** : noms, disciplines, clients et couleurs des 17 projets (fiche de la cliente), libellés FR/EN de l'interface (`src/content/textes.ts`), logotype.
- **Provisoire**, marqué comme tel à l'écran : images (gris neutre au format attendu : couverture 4:5, galerie 3:2 et 4:5), présentations des projets, texte À propos, adresse mail, poids du book, mentions légales.

## Captures

| Écran | Ordinateur (1440 × 900) | Mobile (390 × 844) |
|---|---|---|
| Accueil, carte centrale survolée | `accueil-ordinateur.png` | `accueil-mobile.png` (calque permanent) |
| Accueil en anglais | `accueil-en-ordinateur.png` | `accueil-en-mobile.png` |
| Menu ouvert | `menu-ordinateur.png` | `menu-mobile.png` |
| Projet (page entière) | `projet-ordinateur.png` | `projet-mobile.png` |
| À propos | `a-propos-ordinateur.png` | `a-propos-mobile.png` |
| Mentions légales (page entière) | `mentions-legales-ordinateur.png` | `mentions-legales-mobile.png` |
| Page introuvable | `introuvable-ordinateur.png` | `introuvable-mobile.png` |

Vérifié à la capture : aucune erreur, aucun défilement horizontal, titre d'onglet par page (UX §8), contenu inerte quand le menu est ouvert.

## Ajustements faits pendant les maquettes

1. **Images de galerie limitées à la hauteur de l'écran**, centrées : en pleine largeur, une image en portrait (4:5) faisait 1 800 px de haut sur ordinateur et n'était jamais visible en entier. Elle est maintenant entière (≈ 640 × 800 px sur un écran de 900 px) ; sur mobile, les images restent en pleine largeur.
2. **8 px entre les images de la galerie** : collées, deux images de fond proche formaient un seul bloc.

## À revoir avec les images

- Le rendu des aplats sur de vraies photos (lisibilité au survol, effet de transparence).
- Les recadrages de couverture dans le carrousel (format 4:5 recadré en colonne).
- Le rythme de la galerie selon les formats réels.

## Carrousels de l'accueil — v0.2, 22/11/2026, à valider

Dix variantes de carrousel, en HTML statique : ouvrir `docs/06-maquettes/carrousels/index.html` dans un navigateur (dossier autonome : la police Chivo, sous licence OFL, y est copiée). Les flèches ‹ et ›, en bas à droite de chaque maquette, passent d'une variante à l'autre. Ajouter `?reduit` à l'adresse pour voir le mouvement réduit.

- **Header** : celui de costamask.dev (barre suspendue au bord haut, coins du bas arrondis, liens soulignés au survol, FR / EN, bouton « Menu » et menu plein écran sur mobile), en noir et blanc avec le logotype. Le trait sous le lien actif prend la couleur du projet affiché.
- **Contenu réel** : noms, disciplines, clients et couleurs des 17 projets. **Provisoire** : les couvertures (compositions grises marquées « image provisoire »).
- **Écarts avec la DA** signalés sur le sommaire : inclinaison (Pile d'épreuves), rotation 3D (Cylindre), élan au glisser (Grille à glisser). Tous retirés en mouvement réduit.
- Captures ordinateur (1440 × 900) et mobile (390 × 844) dans `carrousels/captures/`.
