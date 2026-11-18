# Journal des décisions

| Date | Décision | Raison |
|---|---|---|
| 17/11/2026 | Stack Vue 3 + Vite + TypeScript, scaffold minimal (sans Router, Pinia ni ESLint au départ) | Ajout des outils au besoin, une fois l'architecture technique définie |
| 17/11/2026 | Déploiement : image Docker sur GHCR à chaque merge sur `main`, récupérée par cron sur `vm-web`, servie par Nginx Proxy Manager sur `mandolina.costamask.dev` | Même schéma que Portfolio et Dashility ; GitHub n'a aucun accès au serveur |
| 17/11/2026 | Site vitrine d'abord, clients freelance en cible secondaire | Brief de la cliente |
| 17/11/2026 | Contenu géré par Mandolina dans Dashility, dans son propre espace | Autonomie de la cliente, CMS déjà en place |
| 17/11/2026 | Accueil : carrousel plein écran, carte centrale mise en avant, voisines visibles | Brief de la cliente, lecture validée |
| 17/11/2026 | Trois pages : accueil, projet, À propos (plus les mentions légales, obligatoires) | À propos ajoutée pour les clients freelance |
| 17/11/2026 | Page projet : titre, texte, galerie, projet précédent / suivant | Choix du propriétaire |
| 17/11/2026 | Contact V1 : lien mail et book PDF ; formulaire en V2 | Pas de back-end ni d'anti-spam à gérer en V1 |
| 17/11/2026 | Site bilingue FR/EN dès la V1 | Clientèle freelance possiblement internationale |
| 17/11/2026 | Police Chivo et palette de la cliente imposées | Identité existante de la cliente ; intégrées en phase 3 |
| 17/11/2026 | Pas d'échéance ferme, 5 à 10 projets au lancement | Choix du propriétaire |
| 17/11/2026 | Pas de pied de page : lien Mentions légales dans le header | Choix du propriétaire |
| 17/11/2026 | Carte du carrousel : image seule ; au survol (et au focus), calque à la couleur du projet avec nom, client et bouton « Voir le projet » | Brief de la cliente ; couleurs fournies par projet |
| 17/11/2026 | Carrousel mobile : même principe, défilement au doigt, calque affiché en permanence sur la carte centrale ; jamais de défilement automatique | Pas de survol au toucher ; laissé au choix du développeur |
| 17/11/2026 | Ordre des projets fixé dans Dashility par un champ nombre « Ordre » | Dashility n'a pas d'ordre manuel des entrées ; le glisser-déposer serait une évolution de Dashility |
| 17/11/2026 | Couleur de survol en champ texte hexadécimal, vérifiée au build | Dashility n'a pas de champ couleur |
| 17/11/2026 | Spécialités de la graphiste non affichées comme telles | Sans importance pour la cliente |
| 17/11/2026 | `mandolina.costamask.dev` = domaine de test ; mentions légales basiques | Domaine définitif à venir |
| 17/11/2026 | Personnalité épurée et éditoriale ; archétype « la Créatrice, en retrait » | Choix du propriétaire ; cohérent avec la vision du PRD (le travail d'abord) |
| 17/11/2026 | Ton : « je » + vouvoiement, sans superlatifs | Elle parle en son nom ; politesse rassurante pour le client freelance |
| 17/11/2026 | Pas de référence nommée : positionnement face aux profils Behance/Instagram, aux portfolios sur modèle et aux sites de studios | Aucune référence fournie ; références visuelles éventuelles en phase 3 |
| 17/11/2026 | Direction « Aplats » : site noir et blanc, la couleur n'arrive qu'avec les projets (aplat au survol) | Territoire (retenue) et maquette de la cliente |
| 17/11/2026 | Carrousel à carte centrale conservé, malgré les 3 colonnes égales de la maquette | Choix du propriétaire, conforme au PRD |
| 17/11/2026 | Pas de bouton « Voir le projet » : toute la carte est le lien ; calque = discipline (titre) + client (sous-titre) | Fidèle à la maquette de la cliente ; remplace le bouton et le « nom du projet » du PRD v0.2 (PRD à ajuster) |
| 17/11/2026 | Texte du calque noir, blanc seulement sur #727272, choisi au build par contraste ; calque à 85 %, opaque si le pire cas passe sous 4,5:1 | WCAG AA ; le blanc de la maquette tombait à 1,9:1 |
| 17/11/2026 | Chivo seule, auto-hébergée ; logotype en SVG fourni par la cliente | Police imposée ; RGPD et CSP ; le logotype est un dessin |
| 17/11/2026 | Navigation par menu (icône à droite du header) : À propos, Mentions légales, FR / EN | Maquette de la cliente |
| 17/11/2026 | Motion posée : 150 / 250 / 500 ms, courbe signature cubic-bezier(0.2, 0, 0, 1), pas de couche d'ambiance ni de défilement automatique | Retenue du territoire de marque |
| 17/11/2026 | 17 projets fournis au lancement (au lieu de 5 à 10) | Liste transmise par la cliente |
| 17/11/2026 | PRD v0.3 : aligné sur la DA (carte cliquable sans bouton, calque discipline + client, menu, 17 projets) | Décisions de la phase 3 du 17/11/2026 |
| 17/11/2026 | Adresses préfixées par la langue (`/fr`, `/en`), `/` redirige selon le navigateur ; même slug de projet dans les deux langues | Changement de langue sur la même page ; même schéma que Portfolio |
| 17/11/2026 | Clic sur une voisine du carrousel = recentrage ; clic sur la carte centrale = ouverture | Choix du propriétaire |
| 17/11/2026 | Calque de survol réservé à la carte centrale | Sur une voisine, il promettrait un lien alors que le clic recentre |
| 17/11/2026 | Carrousel et projet précédent / suivant en boucle | Choix du propriétaire ; toujours deux voisines visibles |
| 17/11/2026 | Page projet : nom, discipline et client, présentation, puis galerie (couverture en tête) | Choix du propriétaire |
| 17/11/2026 | Modèle Dashility : Projet (nom, discipline, client, présentation, couverture, galerie, couleur, ordre), À propos, Mentions légales | Champs déduits du PRD et de la fiche projets de la cliente |
| 17/11/2026 | Image en chargement remplacée par l'aplat du projet ; retour à l'accueil recentré sur le dernier projet vu | Continuité visuelle de la DA ; ne pas perdre sa place |
| 17/11/2026 | Pas de lien « Projets » dans le menu : le logotype seul ramène à l'accueil | Choix du propriétaire |
| 17/11/2026 | Chivo actuelle (variable, 2022) via `@fontsource-variable/chivo` ; le kit Chivo 2012 fourni n'est pas utilisé | Le kit n'a que 400 et 900 ; la DA demande 400/700/800 et la cliente utilise des graisses fines |
| 17/11/2026 | Vitest ajouté, lancé par la CI (`npm test`) | Tester la logique non triviale : aplats, puis carrousel |
| 17/11/2026 | Logotype intégré en composant (tracé seul, `currentColor`), sans les métadonnées C2PA du fichier d'export | Poids divisé par trois ; pas d'informations d'export publiées |
| 17/11/2026 | Libellés passés en props, liens natifs `<a href>` | i18n et routeur décidés en phase 7, sans réécrire les composants |
| 17/11/2026 | Vitrine du design system en page HTML de développement (`/design-system.html`), hors build | Pas encore de routeur ; rien à exclure de la production |
| 17/11/2026 | Carrousel construit sur sa propre branche (`feat/dev/carrousel`) | Volume : gestes, clavier, boucle, annonces, tests |
| 17/11/2026 | Carrousel : toutes les cartes dans le DOM, placées par transform selon leur écart circulaire ; la carte qui fait le tour change de place sans transition | Liste de liens complète pour le clavier et les lecteurs d'écran ; pas de carte qui traverse l'écran |
| 17/11/2026 | Recentrage au focus seulement au clavier (`:focus-visible`), au clic pour la souris | Sinon le focus de la souris recentre la voisine avant le clic, qui ouvrirait le projet |
| 17/11/2026 | Contour de focus de la carte dessiné au-dessus du calque | L'outline était recouvert par le calque : focus invisible (WCAG 2.4.7) |
| 17/11/2026 | Maquettes faites avec des images et textes provisoires ; captures à refaire avec les images de la cliente | Images pas encore disponibles ; valider la structure sans attendre |
| 17/11/2026 | Libellés de l'interface dans un dictionnaire FR/EN typé (`src/content/textes.ts`), sans vue-i18n | ~20 chaînes, ni pluriel ni format ; à confirmer en phase 7 |
| 17/11/2026 | Images de galerie limitées à la hauteur de l'écran, centrées ; 8 px entre elles | Une image en portrait en pleine largeur n'était jamais visible en entier ; images collées confondues |
| 17/11/2026 | Vue Router + vite-ssg (pré-rendu), @unhead/vue pour les balises ; pas de Pinia ni de vue-i18n | Adresses FR/EN pré-rendues pour le SEO et le partage ; état et libellés trop simples pour une librairie ; même socle que Portfolio |
| 17/11/2026 | Contenu de Dashility copié au build, non versionné ; contenu de démonstration (`contenu:demo`) pour la CI et le développement | Dépôt public, images de la cliente, historique léger ; même chemin de code qu'en production |
| 17/11/2026 | Mise en ligne à la publication dans Dashility par `repository_dispatch`, sans relancer les tests ; pas de build nocturne | Autonomie de la cliente (PRD) ; rien ne change sans publication |
| 17/11/2026 | Mesure d'audience Dashility : vues de page et téléchargements du book ; clics mail non mesurés | Limite de Dashility ; écart avec le PRD §3 accepté |
| 17/11/2026 | ESLint + Prettier, Playwright + axe ajoutés | Stack par défaut ; parcours critiques et accessibilité vérifiés en CI |
| 17/11/2026 | Routes construites depuis une table des pages (`src/router/pages.ts`) lue par le routeur, le changement de langue et le pré-rendu ; pages alimentées en props | Une seule source pour les adresses ; pages indépendantes du routeur et de Dashility |
| 17/11/2026 | Liens natifs des composants pris en charge par le routeur via un écouteur de clic global (liens internes `/fr`, `/en` seulement) | Navigation sans rechargement sans réécrire les composants ; la voisine du carrousel garde son comportement |
| 17/11/2026 | Banc `/maquettes.html` retiré ; ses données deviennent `npm run contenu:demo` | Le routeur sert les vraies pages |
| 17/11/2026 | vue-router 5 (dernière version, compatible avec vite-ssg) | Même version majeure que Portfolio |
| 17/11/2026 | `check-content` refuse le contenu provisoire ou de démonstration (marques « Texte provisoire », « Placeholder text », « à compléter », images `data:`) ; une couleur invalide n'est qu'un avertissement | Le contenu de démonstration ne doit jamais partir en ligne ; une couleur fausse ne mérite pas de bloquer une publication |
| 17/11/2026 | Type d'image partagé `ImageProjet` (`ProjectImage`), avec les variantes AVIF/WebP de Dashility | Une seule définition au lieu de trois |
| 17/11/2026 | Couleur de survol acceptée avec ou sans « # » (`RRGGBB`) | La cliente note ses couleurs sans « # » ; le premier projet publié l'a saisie ainsi |
| 17/11/2026 | Documents validés alignés sur le contenu réel : couleur `RRGGBB` avec ou sans « # » (PRD, DA, UX, design system, architecture), type `book` à champ `fichier` | Constaté au branchement de Dashility (PR #16) |
| 17/11/2026 | Balises par page (`useSeo`) : canonical, hreflang vers les seules langues où la page existe + x-default, Open Graph avec la couverture du projet ; mentions légales et 404 en `noindex` | UX §8 ; un projet non traduit ne doit pas pointer vers une page anglaise absente |
| 17/11/2026 | Domaine dans `.env.production` (`VITE_SITE_URL`), versionné | Domaine public ; le changer ne demande qu'une ligne |
| 17/11/2026 | Favicon : le « M » du logotype, noir sur fond blanc ; pas d'apple-touch-icon pour l'instant | Dérivé du logotype (architecture §2) ; lisible sur les onglets sombres |
| 17/11/2026 | Mesure d'audience par `@dashility/client`, clé publique dans `.env.production` ; lien du book marqué `data-dashility-cv` ; CSP `connect-src` ouverte à Dashility | Architecture §7 ; sans clé, le code de mesure est retiré du build |
| 17/11/2026 | Nginx : `/` redirigé selon la langue du navigateur, pages servies depuis leurs dossiers pré-rendus, vraie 404 par langue, cache long pour `/assets` et `/medias`, revalidation du HTML, du book et du sitemap | Architecture §3 et §8 ; vérifié dans un conteneur temporaire sur `vm-web` |
| 17/11/2026 | CSP sans empreintes de scripts : le site pré-rendu n'a aucun script en ligne, `script-src 'self'` suffit | Écart avec l'architecture §6 (`csp.ts` de Portfolio) ; à ajouter si un script en ligne apparaît |
| 17/11/2026 | Mise en ligne aussi à chaque publication dans Dashility (`repository_dispatch`), sans relancer les tests ; contenu copié dans le job, avant l'image | Architecture §5 ; la clé de lecture n'entre jamais dans l'image |
| 17/11/2026 | Tests de bout en bout Playwright + axe (WCAG 2.2 AA) sur ordinateur et mobile, lancés par la CI sur le contenu de démonstration | Architecture §1 ; résultat indépendant de ce que publie la cliente |
| 17/11/2026 | Nom accessible de la carte tiré du texte du calque + « voir le projet » masqué (plus d'`aria-label`) ; image de la carte décorative (alt vide) | Axe : le nom ne contenait pas le texte affiché (WCAG 2.5.3) ; la discipline et le client décrivent déjà l'image |
| 17/11/2026 | Page projet d'après la maquette de la cliente : bandeau « Client — Discipline » à la couleur du projet, fond teinté, présentation sur deux colonnes, galerie en mosaïque | Maquette transmise par le propriétaire ; remplace la page projet de l'UX v0.1 |
| 17/11/2026 | Texte du bandeau en couleur automatique (`aplat()`), pas en blanc | Blanc sur bleu clair : 1,9:1 ; même règle que les calques |
| 17/11/2026 | Mosaïque composée par Mandolina : champ « Largeur » (`pleine`, `moitie`, `tiers`) par image de la galerie | Elle maîtrise la composition ; pas de règle automatique surprenante |
| 17/11/2026 | Présentation sur deux colonnes alignées à gauche, pas justifiée | Le justifié en colonnes étroites crée des trous, gênants à la lecture |
| 17/11/2026 | La couverture sert au carrousel et au partage ; la page projet montre la galerie (la couverture seule si la galerie est vide) | La maquette commence la page par la galerie, pas par la photo du carrousel |
| 17/11/2026 | Documents alignés sur l'intégration : nom accessible des cartes (UX §5, design system §5), CSP sans empreintes et scripts réels (architecture §2, §6, §11) | Écarts constatés pendant la phase 7 |
| 18/11/2026 | Mosaïque : rangées d'images de même hauteur sans recadrage (largeur proportionnelle au format) plutôt que recadrées | Aucun travail de la cliente n'est coupé ; précise la DA §5 (« recadrées à la hauteur de leur rangée ») |
| 18/11/2026 | Île de navigation (sur le modèle de la Dynamic Island) à la place du header pleine largeur et du menu plein écran : encoche noire rattachée au bord haut, au centre, avec des épaules concaves, logotype blanc et « ••• » ; elle s'agrandit pour montrer À propos, Mentions légales et FR / EN | Header jugé trop haut par le propriétaire ; plus de place pour les images |
| 18/11/2026 | Accueil en plein écran sous l'île ; dégagement d'environ 72 px pour le bandeau, les pages de texte et le texte du calque | L'île recouvrirait sinon le début du contenu |
| 18/11/2026 | Menu déroulant non modal (plus de contenu inerte) ; fermeture par « × », Échap, clic ou focus hors de l'île | Le menu ne couvre plus la page |
| 18/11/2026 | Langue non sélectionnée en `#8C8C8C` sur l'île noire | Le gris `#595959` n'aurait que 3:1 sur noir |
