# Design system — Mandolina, graphiste

Version 0.2 — 17/11/2026 — **statut : à valider** (v0.2 : carrousel ; contour de focus de la carte au-dessus du calque)

S'appuie sur la DA v0.1 (« Aplats » : tokens de couleur, typographie, motion) et l'architecture UX v0.1 (pages, carrousel, états). Vitrine : `npm run dev`, puis `/design-system.html` (développement seulement, absente du build).

---

## 1. Principes

- **Tokens seulement** : aucun composant n'écrit de valeur en dur ; tout passe par `src/styles/tokens.css`.
- **Textes en props** : chaque libellé (menu, boutons, noms accessibles) est passé par le parent, pour que l'i18n (phase 7) reste hors des composants.
- **Liens natifs** : les composants rendent des `<a href>`. Le routeur (phase 7) pourra les intercepter sans changer leur forme.
- **Mouvement réduit par les tokens** : sous `prefers-reduced-motion`, les durées passent à 150 ms et les déplacements à 0 ; les composants n'ont rien à gérer.

---

## 2. Tokens (`src/styles/tokens.css`)

| Famille | Jetons | Source |
|---|---|---|
| Couleurs | `--blanc`, `--noir`, `--gris` ; l'aplat de chaque projet, son texte et son opacité viennent de `aplat()` (seule source de l'opacité 0,85 et du gris par défaut) | DA §3, UX §7 |
| Police et graisses | `--police` (Chivo Variable), `--graisse-texte` 400, `--graisse-intertitre` 700, `--graisse-titre` 800 | DA §4 |
| Tailles | `--taille-legende`, `--taille-texte`, `--taille-intertitre`, `--taille-titre-calque`, `--taille-menu`, `--taille-titre-projet` | DA §4 |
| Interlignes | `--interligne-serre`, `--interligne-titre`, `--interligne-legende`, `--interligne-texte` | DA §4 |
| Texte | `--mesure` (65ch), `--soulignement` (2 px), `--soulignement-decalage` (0,2em) | DA §4 |
| Espacements | `--espace-1` à `--espace-6` (4 → 96 px), `--marge`, `--marge-calque` | DA §5 |
| Mise en page | `--hauteur-header`, `--hauteur-logo`, `--largeur-centrale`, `--largeur-voisine`, `--contour-focus` | DA §5 |
| Mouvement | `--duree-rapide` / `-standard` / `-lente`, `--decalage-cascade`, `--deplacement-texte`, `--ease-signature`, `--ease-sortie` | DA §7 |

Les largeurs du carrousel et la hauteur du header changent sous 700 px (mobile).

**Police** : Chivo variable (version 2022, licence OFL) par `@fontsource-variable/chivo`, importée dans `base.css` ; le navigateur ne télécharge que les sous-ensembles utiles (latin, latin étendu). Pas d'appel à Google Fonts.

---

## 3. Styles de base (`src/styles/base.css`)

Remise à zéro, police et couleurs du `body`, liens soulignés au trait des tokens, contour de focus noir de 3 px sur tout élément (`:focus-visible`), classe `.visuellement-masque` (h1 de l'accueil), classe `.texte-riche` (contenu de Dashility : 65 caractères, intertitres, listes).

---

## 4. Inventaire

| Composant | Famille | Pages | État |
|---|---|---|---|
| `SiteLogo` | site | toutes (header) | fait |
| `AppHeader` (avec le menu) | site | toutes | fait |
| `BaseIcon` | ui | header, page projet | fait |
| `ProjectCard` | projets | accueil | fait |
| `ProjectImage` | projets | accueil (dans la carte), projet | fait |
| `ProjectPager` | projets | projet | fait |
| `ProjectCarousel` | projets | accueil | fait |
| `aplat()` | utils | carte, image | fait, testé |
| `decalage()`, `faitLeTour()`, `modulo()` | utils | carrousel | fait, testé |

Pas de composant pour le texte riche ni pour les titres de page : une classe ou les tokens suffisent.

---

## 5. Spécifications

### `aplat(couleur)` — `src/utils/aplat.ts`

Règle de la DA §3, testée sur les 17 couleurs de la cliente (`tests/unit/aplat.test.ts`).
- Entrée : la valeur saisie dans Dashility. Une valeur qui n'est pas `#RRGGBB` donne `#727272`.
- Sortie : `couleur`, `texte` (noir ou blanc, le plus contrasté), `opacite` (0,85, ou 1 si le pire cas — image toute noire ou toute blanche sous le calque — passe sous 4,5:1).

### `SiteLogo`

- Rôle : logotype de la cliente, tracé seul (sans les métadonnées d'export), couleur héritée.
- Props : `label` (texte alternatif).
- Accessibilité : `role="img"` + `aria-label`.

### `AppHeader`

- Rôle : logotype vers l'accueil, bouton menu, menu plein écran.
- Props : `accueilHref`, `logoLabel`, `liens` (`{ href, label }[]`), `langues` (`{ href, label, code, courante }[]`), `ouvrirLabel`, `fermerLabel`, `menuLabel`, `languesLabel`. `v-model:ouvert`.
- États :

| État | Rendu |
|---|---|
| Fermé | Icône menu ; `aria-expanded="false"` |
| Ouvert | Icône fermer ; panneau blanc plein écran sous le logotype et le bouton ; liens en `--taille-menu`, langues en bas |
| Survol d'un lien | Souligné |
| Focus | Contour noir (base) |
| Langue courante | Noire et soulignée, `aria-current="page"` ; l'autre en gris |

- Clavier : à l'ouverture, le focus va au premier lien ; `Échap` ferme ; à la fermeture, le focus revient au bouton.
- **À faire par la mise en page (phase 7)** : mettre `inert` sur le contenu de la page tant que le menu est ouvert, et fermer le menu à chaque changement de page.
- Motion : le panneau se dévoile du haut (`clip-path`, 500 ms, `--ease-signature`), les liens montent en cascade (40 ms) ; fermeture en 250 ms, `--ease-sortie`.
- Responsive : header de 96 px, 72 px sous 700 px.

### `BaseIcon`

- Props : `nom` (`menu`, `fermer`, `precedent`, `suivant`).
- Taille : `1em`, réglée par la `font-size` du parent ; couleur héritée. Toujours `aria-hidden` : le libellé est sur le bouton ou le lien.

### `ProjectImage`

- Props : `src`, `alt`, `couleur` (aplat), `largeur`, `hauteur`, `remplir` (recadrée dans son parent, pour la carte), `chargement` (`lazy` par défaut).
- États :

| État | Rendu |
|---|---|
| Chargement | Aplat du projet à la taille finale (`aspect-ratio` d'après largeur et hauteur) : pas de saut de mise en page |
| Chargée | L'image recouvre l'aplat |
| Introuvable | L'image est retirée ; l'aplat reste, avec `role="img"` et le texte alternatif |

### `ProjectCard`

- Props : `href`, `image` (`{ src, alt, largeur?, hauteur? }`), `discipline`, `client`, `couleur`, `voirLabel`, `centrale`, `chargement`.
- Nom accessible : « {discipline}, {client} — {voirLabel} » (ex. « Identité visuelle, Lutèce Destroyeuses — voir le projet ») ; le calque est `aria-hidden` (doublon).
- États :

| État | Rendu |
|---|---|
| Voisine | Image seule, pas de calque |
| Centrale, au repos | Image seule |
| Centrale, survol ou focus | Calque à la couleur du projet (opacité de `aplat()`), discipline soulignée en 800, client en 400 |
| Centrale, écran tactile | Calque visible en permanence |
| Focus | Cadre noir de 3 px à l'intérieur de la carte, dessiné au-dessus du calque |

- Motion : calque en 250 ms (`--ease-signature`), texte qui monte de 8 px, client décalé de 40 ms ; disparition en 150 ms (`--ease-sortie`). Mouvement réduit : fondu de 150 ms, sans déplacement.
- La carte remplit son parent : c'est le carrousel qui fixe sa largeur et décide du clic (recentrer ou ouvrir).

### `ProjectPager`

- Props : `precedent?`, `suivant?` (`{ href, nom }`), `label`, `precedentLabel`, `suivantLabel`.
- Rendu : flèche + « Projet précédent » en gris et le nom en gras ; idem à droite pour le suivant. `rel="prev"` / `rel="next"`.
- Survol : le nom se souligne. Sans cible (un seul projet), le composant ne rend rien.

### `ProjectCarousel`

- Rôle : carrousel de l'accueil, en boucle (UX §5). Remplit son parent : la page lui donne la hauteur de l'écran moins le header.
- Props : `projets` (`{ href, image, discipline, client, couleur }[]`, déjà triés par « Ordre »), `label` (« Projets »), `voirLabel`, `annonce(position, total)` (« Projet 3 sur 17 »). `v-model:actif` (index de la carte centrale) : la page s'en sert pour revenir sur le dernier projet vu.
- Structure : une `section` (`aria-roledescription="carrousel"`) contenant une liste `ul` de **toutes** les cartes, dans l'ordre ; chacune est placée par `transform` selon son écart à la carte active (`decalage()`, de -8 à 8 pour 17 projets). Une région `aria-live` annonce la position.
- Gestes :

| Geste | Effet |
|---|---|
| Clic sur une voisine | Elle vient au centre, le lien ne s'ouvre pas |
| Clic sur la carte centrale | Le lien s'ouvre |
| `Tab` / `Maj+Tab` | Carte suivante / précédente dans l'ordre de la liste ; celle qui reçoit le focus vient au centre. Après la dernière, le focus sort du carrousel (pas de piège) |
| `←` `→` | Projet précédent / suivant, en boucle ; le focus suit la carte centrale |
| Molette, pavé tactile | Un projet par geste : l'inertie est ignorée jusqu'à 200 ms sans événement |
| Glisser au doigt (≥ 40 px) | Un projet ; le défilement vertical de la page reste libre (`touch-action: pan-y`) |

- Motion : les cartes glissent et changent de largeur en 500 ms (`--ease-signature`). La carte qui passe d'un bord à l'autre en faisant le tour (`faitLeTour()`) change de place sans transition, pour ne pas traverser l'écran.
- Mouvement réduit : aucun glissement (mouvement de grande ampleur) ; la liste fait un fondu de 150 ms à chaque changement.
- Chargement : images immédiates pour la carte centrale et ses voisines, différées pour les autres.
- Sans JavaScript : la liste s'affiche centrée sur la carte active et tous les liens fonctionnent.
- Petites listes : 1 projet, pas de voisine ni de geste ; 2 projets, l'autre carte à droite.
- Vérifié dans la vitrine (Playwright) : clic voisine / centrale, flèches, Tab, molette (10 événements = 1 projet), boucle, glisser au doigt, mouvement réduit.

---

## 6. Vitrine

`design-system.html` (racine) + `src/pages/design-system/` : header et menu réels, trois cartes (voisine, centrale, voisine), les 17 aplats calculés par `aplat()`, neutres, typographie, image chargée et introuvable, navigation entre projets, icônes, durées. Données réelles de la fiche de la cliente ; image de démonstration à rayures pour voir la transparence du calque. Non incluse dans le build : seul `index.html` l'est.
