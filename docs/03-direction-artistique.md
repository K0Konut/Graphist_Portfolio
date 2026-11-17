# Direction artistique — Mandolina, graphiste

Version 0.1 — 17/11/2026 — **statut : à valider**

S'appuie sur le PRD v0.2 (carrousel à carte centrale, survol coloré par projet, WCAG 2.2 AA) et le territoire de marque v0.1 (retenue, clarté, soin du détail ; « le site s'efface derrière les images »). Planche de tendance : `docs/06-maquettes/moodboard.html`.

---

## 1. Direction : « Aplats »

Un book éditorial en noir et blanc, où **chaque projet apporte son propre aplat de couleur**. Le site n'a pas de couleur à lui : le blanc du papier, le noir de l'encre et le logotype. La couleur n'arrive qu'avec le travail de Mandolina, au survol d'un projet, comme un aplat posé sur l'image.

Pourquoi : c'est la traduction directe de la retenue et de la promesse du territoire (« chaque projet, en grand, à sa juste place »), et c'est ce que montre la maquette de la cliente.

**Le moment mémorable** (un seul) : l'aplat de couleur qui recouvre l'image au survol, avec la discipline et le client. Tout le reste est silencieux.

---

## 2. Référence visuelle

Une seule, fournie par la cliente : sa maquette de l'accueil (header blanc, logotype « MANDOLINA » à gauche, menu à droite ; projets pleine hauteur bord à bord ; calque coloré semi-transparent avec titre souligné et sous-titre). On en retient :
- le **header blanc** et le **logotype noir**, qui sont les seuls éléments de marque permanents ;
- les **images bord à bord**, sans marge, sans coin arrondi, sans ombre ;
- le **calque semi-transparent** qui laisse deviner l'image ;
- la **hiérarchie du calque** : discipline en gras soulignée, client en dessous, en petit.

Écarts assumés avec la maquette :
- **Carrousel à carte centrale** (PRD) au lieu de trois colonnes égales : la carte du centre est plus large.
- **Texte noir sur les aplats** (blanc seulement sur le gris) au lieu du blanc de la maquette, illisible sur les couleurs claires (contraste 1,9:1 sur le bleu de Lutèce).
- **Pas de bouton « Voir le projet »** : toute la carte est le lien (choix du 17/11/2026).

---

## 3. Couleurs

### Neutres du site

| Jeton | Valeur | Rôle | Contraste |
|---|---|---|---|
| `--blanc` | `#FFFFFF` | Fond de toutes les pages, header | — |
| `--noir` | `#000000` | Texte, logotype, icône de menu, focus | 21:1 sur blanc |
| `--gris` | `#595959` | Texte secondaire (légendes, mentions) | 7:1 sur blanc |

Noir pur, comme le logotype de la maquette : pas de noir teinté.

Pas de couleur d'état : la V1 n'a ni formulaire ni message d'erreur hormis la page introuvable, traitée en noir sur blanc.

### Aplats des projets

Saisis dans Dashility (champ texte `RRGGBB`, avec ou sans `#`, PRD §7). Couleur du texte choisie automatiquement au build par contraste : noir si le noir contraste mieux, sinon blanc.

| Projet | Aplat | Texte | Contraste (aplat plein) |
|---|---|---|---|
| Lutèce — Logo | `#85C4F9` | noir | 11,3:1 |
| PSWC | `#EF6F96` | noir | 7,4:1 |
| FR Skates — Mise en page | `#9DF7DD` | noir | 16,8:1 |
| Luminous — Catalogues | `#C1CDDD` | noir | 13,0:1 |
| Lutèce — Maillots | `#FFD975` | noir | 15,4:1 |
| FR Skates — Packaging | `#C3AEFC` | noir | 10,8:1 |
| Universkate — Logos | `#EFCF8F` | noir | 14,0:1 |
| FR Skates — Illustration | `#DBF4D3` | noir | 17,9:1 |
| Luminous — Packaging | `#FFDEEB` | noir | 16,9:1 |
| Lutèce — Merchandising | `#C3E2FC` | noir | 15,6:1 |
| Luminous — Fichiers techniques | `#727272` | blanc | 4,8:1 |
| FR Skates — Fichiers techniques | `#D2B3E2` | noir | 11,3:1 |
| Blé Noir | `#34B772` | noir | 8,2:1 |
| Psycom | `#F7E751` | noir | 16,5:1 |
| Studio Mustard | `#C79B7F` | noir | 8,4:1 |
| Scénographie de diplôme | `#B9EFED` | noir | 16,6:1 |
| Jenlain | `#FFC885` | noir | 13,9:1 |

**Opacité du calque : 85 %**, comme la maquette. Vérifié dans le pire cas (image toute noire ou toute blanche sous le calque) : le texte reste au-dessus de 4,5:1 pour toutes les couleurs **sauf `#727272`** (3,6:1). Règle : si le pire cas passe sous 4,5:1, le calque devient **opaque** pour ce projet. Même calcul au build que pour la couleur du texte.

---

## 4. Typographie

**Une seule famille : Chivo** (imposée par la cliente), en police variable, auto-hébergée (`woff2`, pas d'appel à Google Fonts : RGPD et CSP `font-src 'self'`).

Chivo est une grotesque au dessin ferme, avec des graisses très lourdes : c'est la graisse, pas une deuxième police, qui crée la hiérarchie.

| Rôle | Graisse | Taille | Interligne |
|---|---|---|---|
| Titre de projet (page projet) | 800 | `clamp(2.5rem, 6vw, 4.5rem)` | 1,05 |
| Titre du calque (discipline) | 800, souligné | `clamp(1.25rem, 1.6vw, 1.5rem)` | 1,15 |
| Sous-titre du calque (client) | 400 | 0,875rem | 1,3 |
| Intertitre (À propos, mentions) | 700 | 1,5rem | 1,2 |
| Texte courant | 400 | 1,0625rem (17 px) | 1,55 |
| Légende, mentions | 400 | 0,875rem | 1,4 |
| Liens du menu | 700 | `clamp(2rem, 5vw, 3.5rem)` | 1,1 |

- Échelle de rapport 1,25 autour de 17 px, avec les titres en `clamp()` pour suivre l'écran.
- **Soulignement** du titre de calque : 2 px d'épaisseur, décalé de 0,2em, comme la maquette. C'est le seul ornement typographique du site.
- Texte en casse normale partout (pas de libellés en capitales). Seul le logotype est en capitales, et c'est un dessin, pas du texte.
- Lignes de texte courant limitées à 65 caractères (page projet, À propos).
- Texte aligné à gauche partout.

**Logotype** : « MANDOLINA » est un dessin propre à la cliente (D inversé, A final sans barre). Il sera intégré en **SVG fourni par la cliente**, jamais recomposé en Chivo. Texte alternatif : « Mandolina, retour à l'accueil ».

---

## 5. Mise en page

```
Ordinateur — accueil
┌─────────────────────────────────────────────────────┐
│ MANDOLINA                                       ≡   │  header blanc, ~96 px
├──────────┬───────────────────────────┬──────────────┤
│          │                           │              │
│  voisine │      carte centrale       │   voisine    │  hauteur : écran − header
│  ~22 %   │          ~56 %            │    ~22 %     │  bord à bord, sans espace
│          │                           │              │
└──────────┴───────────────────────────┴──────────────┘

Mobile — accueil
┌───────────────────────┐
│ MANDOLINA          ≡  │
├──┬─────────────────┬──┤
│  │                 │  │  carte centrale ~80 %,
│v │  carte centrale │ v│  voisines qui dépassent ~10 %
│  │  (calque visible│  │
│  │   en permanence)│  │
└──┴─────────────────┴──┘
```

- **Grille** : marges latérales de 24 px (mobile) à 48 px (ordinateur) pour le header et les pages de texte ; le carrousel et les images sont bord à bord.
- **Coins** : aucun arrondi. **Ombres** : aucune. **Bordures** : aucune, sauf le soulignement du titre de calque et le contour de focus.
- **Page projet** : titre et texte alignés à gauche dans une colonne de 65 caractères, puis galerie d'images en pleine largeur, empilées ; liens projet précédent / suivant en bas.
- **Menu** (icône à droite du header, trois barres épaisses comme la maquette) : panneau blanc plein écran, liens À propos et Mentions légales en grand, choix FR / EN.

---

## 6. Imagerie et icônes

- **Images** : celles des projets, telles que fournies, recadrées en `object-fit: cover` dans les cartes, entières sur la page projet. Aucun filtre, aucun effet (pas de zoom au survol, pas de noir et blanc).
- **Icônes** : trois seulement, dessinées en SVG au même trait épais que l'icône de menu : menu, fermer, flèches précédent / suivant. Noir pur.

---

## 7. Motion

**Personnalité : posée.** Le mouvement est une réponse aux gestes du visiteur, jamais un spectacle : rien ne bouge tant qu'on ne survole, ne clique ou ne fait défiler.

| Jeton | Valeur | Usage |
|---|---|---|
| `--duree-rapide` | 150 ms | Disparition du calque, changement de focus |
| `--duree-standard` | 250 ms | Apparition du calque |
| `--duree-lente` | 500 ms | Recentrage du carrousel, ouverture du menu |
| `--ease-signature` | `cubic-bezier(0.2, 0, 0, 1)` | 80 % des mouvements : départ net, arrivée douce |
| `--ease-sortie` | `cubic-bezier(0.3, 0, 1, 1)` | Disparitions (calque, menu) |

**Ce qui s'anime**
- **Calque de survol** (le moment mémorable) : l'aplat apparaît en opacité (250 ms) ; le titre puis le client montent de 8 px, décalés de 40 ms. Il disparaît plus vite qu'il n'apparaît (150 ms).
- **Carrousel** : la carte choisie glisse au centre et s'élargit, ses voisines se resserrent (500 ms, `--ease-signature`), par transformations (`transform`) pour rester fluide.
- **Menu** : le panneau se dévoile depuis le haut (500 ms), les liens suivent avec un décalage de 50 ms.

**Ce qui ne s'anime jamais** : le défilement automatique du carrousel, les images (ni zoom, ni parallaxe), les apparitions au défilement de la page, le texte courant, les chargements (pas d'écran de chargement).

Écart volontaire avec la règle des trois couches de mouvement : pas de couche d'ambiance. La retenue du territoire l'emporte.

**`prefers-reduced-motion: reduce`**
- Le calque apparaît en fondu court (150 ms), sans déplacement du texte.
- Le carrousel change de carte sans glissement (fondu de 150 ms).
- Le menu s'ouvre sans glissement.

---

## 8. Ce qu'il faut à la cliente

1. Le **logotype en SVG** (noir sur transparent).
2. Les **images des projets** en haute définition (au moins 2400 px sur le grand côté).
3. Confirmation que le **texte noir** sur les aplats lui convient (écart avec sa maquette).
