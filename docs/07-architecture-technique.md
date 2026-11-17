# Architecture technique — Mandolina, graphiste

Version 0.1 — 17/11/2026 — **statut : à valider**

S'appuie sur le PRD v0.3 (bilingue, Dashility, partage, WCAG AA, Lighthouse ≥ 90), l'architecture UX v0.1 (adresses, modèle de contenu, états, SEO), le design system v0.2 et les maquettes v0.1. Reprend les choix éprouvés de Portfolio (même serveur, même CMS, même chaîne de mise en ligne) quand rien ne justifie de faire autrement.

---

## 1. Stack

| Besoin | Choix | Pourquoi |
|---|---|---|
| Interface | Vue 3 + Vite + TypeScript (en place) | Stack du projet ; composants et pages déjà écrits |
| Adresses FR/EN | **Vue Router 4** | Pages et adresses de l'UX §1 ; liens natifs des composants interceptés par le routeur |
| Pré-rendu | **vite-ssg** | Une page HTML complète par adresse : titres, descriptions et aperçus lus par les moteurs et les réseaux (UX §8), site lisible sans JavaScript. Déjà utilisé par Portfolio |
| Balises `<head>` | `@unhead/vue` (fourni avec vite-ssg) | Titre, description, Open Graph, `hreflang` par page |
| État partagé | **Aucune librairie** | Le seul état commun est le dernier projet vu (retour au carrousel) : une `ref` dans un composable suffit. Pas de Pinia |
| Libellés FR/EN | Dictionnaire typé `src/content/textes.ts` (en place) | ~20 chaînes, ni pluriel ni format : pas de vue-i18n |
| Contenu | **Dashility**, copié au build | Mandolina publie seule ; le site reste statique |
| Mesure d'audience | `@dashility/client` | Sans cookies, déjà en place sur Portfolio |
| Qualité | ESLint + Prettier, Vitest (en place), **Playwright** + axe | Stack par défaut ; parcours critiques et accessibilité vérifiés en CI |

Nouvelles dépendances : `vue-router`, `vite-ssg`, `@dashility/client` ; en développement : `eslint` (+ config Vue/TS), `prettier`, `@playwright/test`, `@axe-core/playwright`.

---

## 2. Structure des dossiers

```
src/
  components/{site,projets,ui}/   composants du design system (en place)
  pages/                          HomePage, ProjectPage, AboutPage, TextPage (en place)
  pages/design-system/            vitrine, développement seulement (conservée)
  router/                         routes FR/EN, chemins à pré-rendre
  content/                        textes.ts + lecture du contenu copié (contenu.ts)
  composables/                    useDernierProjet, useSeo
  styles/ utils/                  en place
content/<langue>/*.json           contenu copié de Dashility (non versionné, §4)
public/medias/<id>/               images copiées de Dashility (non versionnées)
public/book/book-<langue>.pdf     book copié de Dashility (non versionné)
scripts/                          contenu.ts (copie), contenu-demo.ts, check-content.ts, csp.ts, sitemap.ts
tests/unit/ tests/e2e/            Vitest, Playwright
docker/                           nginx.conf, compose.yml (en place)
```

**Nettoyage** : `App.vue`, `style.css`, `HelloWorld.vue`, `src/assets/{hero.png,vite.svg,vue.svg}`, `public/icons.svg` et le favicon Vite partent ; le banc `/maquettes.html` aussi, une fois les vraies pages servies par le routeur (ses données deviennent le contenu de démonstration, §4). Favicon : dérivé du logotype (« M »), à valider avec la cliente.

---

## 3. Routes

| Adresse | Page | Pré-rendue |
|---|---|---|
| `/fr`, `/en` | `HomePage` | oui |
| `/fr/projets/:slug`, `/en/projects/:slug` | `ProjectPage` | une par projet publié dans la langue |
| `/fr/a-propos`, `/en/about` | `AboutPage` | oui |
| `/fr/mentions-legales`, `/en/legal-notice` | `TextPage` | oui |
| `/fr/404`, `/en/404` | `TextPage` (introuvable) | oui ; servie par Nginx pour toute adresse inconnue de la langue |
| `/` | — | non : Nginx redirige vers `/en` si le navigateur demande l'anglais en premier, sinon `/fr` |

- Le routeur est la seule source des chemins : vite-ssg pré-rend la liste qu'il fournit (projets lus dans `content/`).
- `SiteLayout` reçoit la langue, les liens du menu et l'adresse équivalente dans l'autre langue depuis la route.
- Défilement remis en haut à chaque page ; le carrousel retrouve le dernier projet vu (`useDernierProjet`).

---

## 4. Données : Dashility

### Espace et types

Un espace **Mandolina** dans Dashility, créé par le super-admin ; Mandolina y est **membre** (invitation par lien). Types, d'après l'UX §4 :

| Clé | Nature | Champs |
|---|---|---|
| `projets` | Collection | `nom` (texte court, trad.), `discipline` (texte court, trad.), `client` (texte court), `presentation` (texte riche, trad., facultatif), `couverture` (image), `galerie` (groupe répétable : `image`, `largeur` liste de choix `pleine` / `moitie` / `tiers`), `couleur` (texte court `RRGGBB`, avec ou sans `#`), `ordre` (nombre) |
| `a-propos` | Page unique | `accroche` (texte court, trad.), `presentation` (texte riche, trad.), `email` (texte court) |
| `book` | Page unique | `fichier` (PDF, un par langue : fonction CV de Dashility) |
| `mentions-legales` | Page unique | `contenu` (texte riche, trad.) |

Tri des projets : `ordre` croissant ; à égalité, l'ordre de l'API (dernier publié d'abord) est conservé.

### Copie au build (`npm run contenu`)

Comme Portfolio : un script lit l'API publique de Dashility (clé de lecture `DASHILITY_KEY`, dans `.env.local` en local, dans un secret GitHub en CI), écrit `content/<langue>/<type>.json`, télécharge les images dans `public/medias/<id>/` et le book dans `public/book/`, et réécrit les adresses des médias en chemins locaux. Le site ne parle jamais à l'API depuis le navigateur.

**Différence avec Portfolio : le contenu n'est pas versionné.** Le dépôt est public et les images appartiennent à la cliente ; les versionner alourdirait l'historique à chaque projet. En contrepartie :
- **`npm run contenu:demo`** écrit dans `content/` le contenu de démonstration (les 17 projets réels, images et textes provisoires des maquettes). La CI des PR et le développement sans clé l'utilisent : même chemin de code que la production.
- **La mise en ligne** copie toujours le contenu réel juste avant le build.

### Vérification (`npm run check-content`)

Avant chaque build de production : au moins un projet en français ; champs obligatoires présents ; `couleur` au format `RRGGBB`, avec ou sans `#` (sinon avertissement, et le site applique le gris par défaut, UX §7) ; aucun texte marqué provisoire. Un projet incomplet en anglais est déjà absent de l'API anglaise (règle de Dashility) : il n'est simplement pas pré-rendu en anglais.

### Images

Dashility renvoie pour chaque image `{ alt, width, height, src, srcset: { webp, avif } }`. `ProjectImage` passe à `<picture>` (sources AVIF puis WebP, `sizes` selon la place : `56vw`/`80vw` pour la carte centrale, `100vw` pour la galerie), garde `width`/`height` pour réserver la place, et l'aplat pendant le chargement.

### Texte riche

Dashility produit le HTML avec `@tiptap/html` : balises limitées à celles de l'éditeur, texte échappé. Il est affiché tel quel (`v-html`) dans `.texte-riche`. Garde-fous : la source est l'espace de la cliente, accessible à elle et au super-admin seulement ; la CSP interdit tout script en ligne non prévu (§6).

---

## 5. Mise en ligne

Chaîne en place (PR #3), complétée :

| Déclencheur | Ce qui se passe |
|---|---|
| PR vers `dev` ou `main` | `ci.yml` : `npm ci`, lint, types, tests unitaires, `contenu:demo`, build, Playwright (parcours + axe) |
| Merge sur `main` (release) | `deploiement.yml` : CI, puis `contenu` (réel) + `check-content`, build, image Docker publiée sur GHCR (`latest` + empreinte du commit) |
| **Publication dans Dashility** | Dashility appelle `repository_dispatch` (`dashility-publish`) ; même chemin que la release, **sans relancer les tests** (le code de `main` les a passés). Objectif : en ligne moins de 5 minutes après « Publier » |
| Serveur | Inchangé : cron toutes les 5 minutes sur `vm-web`, `docker compose up -d --pull always` ; retour arrière par `IMAGE_TAG` |

Réglages à faire une fois :
1. Secret GitHub `DASHILITY_KEY` (clé de lecture de l'espace Mandolina).
2. Dans Dashility (super-admin) : URL de déploiement `https://api.github.com/repos/K0Konut/Graphist_Portfolio/dispatches` et un jeton GitHub à grain fin limité à ce dépôt, permission « Contents » en écriture (la seule qui autorise `repository_dispatch`).
3. Pas de tâche planifiée la nuit : contrairement à Portfolio, rien ne change sans publication.

Le cron du serveur peut passer de 5 minutes à 1 minute si « en ligne moins de 5 minutes » ne tient pas (le build prend environ 2 minutes).

---

## 6. Sécurité

- **Aucune authentification sur le site** : statique, aucune donnée saisie par le visiteur (pas de formulaire en V1).
- **CSP** (Nginx) : `script-src 'self'` + l'empreinte SHA-256 de chaque script en ligne du pré-rendu, calculée après le build (`scripts/csp.ts`, repris de Portfolio) ; `img-src 'self' data:` (images copiées dans le site) ; `connect-src 'self' https://dashility.costamask.dev` (mesure d'audience) ; `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`.
- **Secrets** : `DASHILITY_KEY` (lecture seule) en secret GitHub, jamais dans l'image Docker (copie faite dans le job, avant le build de l'image) ; jeton de `repository_dispatch` limité au dépôt. Clé publique de mesure d'audience dans le code (identifiant public, pas un secret).
- **GitHub n'a aucun accès au serveur** (le serveur va chercher l'image).

---

## 7. Mesure d'audience

`initAnalytics` de `@dashility/client`, côté navigateur seulement, avec la clé publique de l'espace Mandolina : vues de page (avec provenance) et téléchargement du book (événement « CV » de Dashility). Sans cookies ni données personnelles, donc sans bandeau.

**Écart avec le PRD §3** : Dashility ne mesure ni les clics sur le lien mail ni la part des visiteurs qui ouvrent un projet (seulement les vues par page). Les vues des pages projet et les téléchargements du book couvrent l'essentiel ; le reste attend une évolution de Dashility.

---

## 8. Performance et référencement

- Pages pré-rendues, JavaScript chargé ensuite ; aucune police tierce ; Chivo en `woff2` par sous-ensembles.
- Images : AVIF/WebP aux tailles utiles, `width`/`height` déclarés, chargement différé hors de l'écran (déjà en place dans le carrousel et la galerie).
- Cache Nginx déjà réglé : fichiers empreintés `immutable`, HTML `no-cache`.
- Par page : titre, description, `og:title`, `og:description`, `og:image` (couverture du projet, ou du premier projet), `og:locale`, `link rel="alternate" hreflang` FR/EN/x-default, `canonical`. Mentions légales en `noindex`.
- `sitemap.xml` et `robots.txt` générés au build à partir des routes pré-rendues. Adresse absolue du site lue dans `SITE_URL` (aujourd'hui `https://mandolina.costamask.dev`), pour que le changement de domaine ne demande qu'une variable.
- Cible : Lighthouse ≥ 90 sur les 4 axes (PRD §3), vérifiée sur la release.

---

## 9. Environnements

| Environnement | Contenu | Adresse |
|---|---|---|
| Local | `contenu:demo`, ou `contenu` avec la clé dans `.env.local` | `npm run dev` |
| CI | `contenu:demo` | — |
| Production | `contenu` réel | `mandolina.costamask.dev` (test), domaine définitif plus tard |

Pas d'environnement de préproduction : la release est la seule porte vers la production, et Dashility garde les brouillons hors ligne.

---

## 10. Risques

| Risque | Effet | Parade |
|---|---|---|
| Dashility indisponible pendant une mise en ligne | Le job échoue | Le site en ligne n'est pas touché (le serveur garde l'image précédente) ; relancer depuis Dashility (« Relancer ») |
| Contenu publié invalide (couleur, champ manquant) | Build refusé ou aplat gris | `check-content` dit quoi corriger ; couleur invalide tolérée avec avertissement |
| Images très lourdes | Lenteur | Variantes AVIF/WebP de Dashility ; `sizes` justes |
| Jeton `repository_dispatch` exposé | Déclenchement de builds | Jeton limité au dépôt et à « Contents » ; révocable |
| Changement de domaine | Liens absolus erronés | `SITE_URL` unique ; NPM et DNS côté serveur |
| Texte riche détourné | Injection | HTML produit par Dashility (balises limitées, texte échappé) + CSP stricte |

---

## 11. Ordre de construction

Une branche, une PR vers `dev` :

1. `chore/dev/nettoyage_et_outillage` : retrait des fichiers du modèle Vite, ESLint + Prettier, lint en CI.
2. `feat/dev/routeur_et_prerendu` : Vue Router, vite-ssg, routes FR/EN, pages branchées sur `content/` ; `contenu:demo` (données des maquettes) ; retrait du banc `/maquettes.html`.
3. `feat/dev/contenu_dashility` : espace et types créés dans Dashility (super-admin), `contenu`, `check-content`, `<picture>` dans `ProjectImage`.
4. `feat/dev/seo_et_partage` : balises par page, `hreflang`, `sitemap.xml`, `robots.txt`, favicon.
5. `feat/dev/mesure_audience` : `@dashility/client`.
6. `chore/dev/deploiement_contenu` : Nginx (redirection de `/`, 404 par langue, CSP par empreintes), `deploiement.yml` (`repository_dispatch`, copie du contenu), secrets.
7. `test/dev/parcours_e2e` : Playwright (carrousel → projet → précédent / suivant → retour, menu, changement de langue) et axe sur chaque page.

Puis la release (PR `dev` → `main`) à la demande du propriétaire, avec le vrai contenu publié par Mandolina.
