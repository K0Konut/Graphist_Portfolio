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
