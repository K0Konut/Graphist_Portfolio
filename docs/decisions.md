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
