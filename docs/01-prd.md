# PRD — Portfolio de Mandolina, graphiste

Version 0.1 — 17/11/2026 — **statut : à valider**

---

## 1. Contexte et problème

Mandolina est graphiste. Ce site est une **commande client** : elle veut un portfolio en ligne pour montrer son travail.

**Aujourd'hui**, son travail n'a pas de vitrine qui lui appartienne. Les projets existent (fichiers fournis au développeur), mais rien ne permet de les parcourir d'un coup d'œil ni de les partager par un simple lien.

**Le problème à résoudre** : donner à voir ses projets, en grand, dans un site simple qu'elle peut alimenter seule, sans passer par le développeur.

- Brief de la cliente : un **site simple**, une page d'accueil avec un **carrousel plein écran** et un header, une **page par projet** ouverte depuis le carrousel.
- Éléments d'identité imposés par la cliente : la police **Chivo** et une palette de couleurs déjà définie (transmises en phase 3, direction artistique).
- **Pas d'échéance ferme.**

---

## 2. Vision produit

> Le travail de Mandolina d'abord : un site qui s'efface derrière les images et qui se parcourt comme on feuillette un book.

**Ce qu'un visiteur doit retenir en 30 secondes** : le style de Mandolina, et l'envie de voir un projet de plus.

---

## 3. Objectifs et indicateurs

| Objectif | Indicateur | Cible |
|---|---|---|
| Montrer le travail | % de visiteurs qui ouvrent au moins un projet | à fixer après 1 mois de mesure |
| | Projets les plus consultés | suivi (Dashility) |
| Ouvrir des opportunités freelance | Clics sur le lien mail | à fixer après 1 mois de mesure |
| | Téléchargements du book PDF | à fixer après 1 mois de mesure |
| Autonomie de la cliente | Projets publiés sans intervention du développeur | 100 % après la mise en ligne |
| Qualité d'exécution | Score Lighthouse (performance, accessibilité, bonnes pratiques, SEO) | ≥ 90 sur les 4 axes |
| | Accessibilité | WCAG 2.2 niveau AA |

Mesure par les analytics de Dashility : sans cookies ni données personnelles, donc sans bandeau de consentement.

---

## 4. Personas

### P1 — Le visiteur curieux (cible principale)
- **Contexte** : arrive par un lien partagé (réseaux, bouche-à-oreille), souvent sur mobile, sans intention précise.
- **Besoins** : voir des images fortes tout de suite ; passer d'un projet à l'autre sans effort.
- **Freins** : un temps de chargement long, du texte avant les images, une navigation confuse.

### P2 — Le client freelance potentiel (cible secondaire)
- **Contexte** : marque, indépendant ou petite structure qui cherche une graphiste ; compare plusieurs profils.
- **Besoins** : juger le style et la variété des projets ; savoir qui elle est ; la contacter ou récupérer son book.
- **Freins** : ne pas trouver comment la contacter ; un site uniquement en français s'il est étranger.

### P3 — Mandolina, éditrice du contenu
- **Contexte** : non technique ; publie ses projets dans Dashility (CMS auto-hébergé du développeur), dans son propre espace.
- **Besoins** : ajouter, modifier, ordonner et publier un projet seule ; voir quels projets plaisent.
- **Freins** : des champs flous, une mise en ligne qui demande l'intervention du développeur.

---

## 5. User stories principales

**Visiteur (P1, P2)**
- En tant que visiteur, je veux voir les projets en grand dès l'arrivée, afin de saisir son style immédiatement.
- En tant que visiteur, je veux faire défiler le carrousel (souris, clavier, toucher), afin de parcourir les projets.
- En tant que visiteur, je veux ouvrir un projet en cliquant sur sa carte, afin de découvrir son contenu en détail.
- En tant que visiteur, je veux passer au projet suivant ou précédent depuis une page projet, afin de continuer sans revenir à l'accueil.
- En tant que visiteur, je veux choisir entre le français et l'anglais, afin de lire le site dans ma langue.

**Client freelance (P2)**
- En tant que client potentiel, je veux une page À propos, afin de savoir qui elle est et ce qu'elle fait.
- En tant que client potentiel, je veux un lien mail et son book en PDF, afin de la contacter ou de garder une trace de son travail.

**Mandolina (P3)**
- En tant que graphiste, je veux créer un projet (titre, texte, images) en FR et en EN dans Dashility, afin de le publier sans le développeur.
- En tant que graphiste, je veux choisir l'ordre des projets dans le carrousel, afin de mettre en avant mes meilleurs travaux.
- En tant que graphiste, je veux que le site se mette à jour quelques minutes après « Publier », afin de voir mon travail en ligne tout de suite.

---

## 6. Périmètre

### MVP (V1)
- **Header** sur toutes les pages : nom de Mandolina (retour à l'accueil), lien vers À propos, choix de la langue.
- **Accueil** : carrousel plein écran sous le header ; une carte centrale mise en avant, les cartes voisines visibles sur les côtés ; clic sur une carte → page du projet.
- **Page projet** : titre, texte de présentation, galerie d'images, liens projet précédent / suivant.
- **Page À propos** : présentation, lien mail, téléchargement du book PDF (un fichier par langue).
- **Bilingue FR/EN** dès la V1, traduction manuelle saisie dans Dashility.
- **Contenu géré dans Dashility** : projets (collection), À propos (page unique), book PDF ; mise en ligne automatique à chaque publication.
- **Mentions légales** (obligation légale en France) : lien discret en pied de page.
- Partage : chaque projet a sa propre adresse, avec titre et image d'aperçu (Open Graph) pour les réseaux.
- Analytics Dashility (sans cookies).

### Plus tard (V2)
- Formulaire de contact.
- Filtres ou catégories de projets.
- Liens vers les réseaux (Instagram, Behance…), si la cliente le souhaite.

### Hors périmètre
- Boutique, vente d'œuvres ou de prestations en ligne.
- Blog ou actualités.
- Autres langues que le français et l'anglais.
- Vidéos (Dashility ne gère que des images et des fichiers PDF par langue).

---

## 7. Contraintes

- **Identité imposée** : police Chivo, palette de la cliente. La DA (phase 3) part de ces éléments, elle ne les remplace pas.
- **CMS** : Dashility, espace dédié à Mandolina ; c'est le développeur qui crée les types de contenu et leurs champs. Les capacités nécessaires (images avec texte alternatif, groupe répétable pour la galerie, fichier PDF par langue, déclenchement de la mise en ligne à la publication) sont à confirmer en phase 7.
- **Ordre des projets** : Dashility laisse l'ordre d'affichage au site ; un champ d'ordre (ou une règle de tri) est à prévoir dans le type « Projet ».
- **Technique** : Vue 3 + Vite + TypeScript ; image Docker publiée sur GHCR et récupérée par le serveur (déjà en place). Le partage avec aperçu et le SEO demandent des pages pré-rendues (à trancher en phase 7).
- **Hébergement** : serveur auto-hébergé du développeur, derrière Nginx Proxy Manager ; domaine actuel `mandolina.costamask.dev`.
- **Accessibilité** : WCAG 2.2 AA. Le carrousel doit être utilisable au clavier et au lecteur d'écran, et respecter `prefers-reduced-motion` ; aucun défilement automatique sans bouton pause.
- **Images** : nombreuses et lourdes ; formats modernes et tailles adaptées à l'écran pour tenir la performance, en particulier sur mobile.
- **Légal** : mentions légales (éditrice : Mandolina ; hébergeur : à préciser). Pas de cookies, donc pas de bandeau de consentement.
- **Budget** : aucun service payant prévu.

---

## 8. Questions ouvertes

1. **Spécialités de Mandolina** (identité visuelle, affiche, illustration, édition…) : à déduire des projets fournis, à confirmer avec elle.
2. **Contenu d'une carte du carrousel** : image seule, ou image + titre ? (phase 4)
3. **Carrousel sur mobile** : même principe ou défilement vertical ? Défilement automatique ou non ? (phase 4)
4. **Ordre des projets** : ordre manuel choisi par Mandolina, ou du plus récent au plus ancien ?
5. **Domaine définitif** : `mandolina.costamask.dev` reste-t-il, ou un domaine à son nom est-il prévu ?
6. **Informations des mentions légales** : identité légale de l'éditrice (nom, statut, SIRET éventuel).
