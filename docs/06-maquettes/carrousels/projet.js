// Maquettes des pages projet : textes et images provisoires, projet choisi par l'adresse (#lutece-logo).
// Les noms, disciplines, clients et couleurs sont réels ; le reste est à remplacer par le contenu de Mandolina.
;(() => {
  const { projets, couverture, modulo, trace } = M

  // Textes provisoires par discipline (premier mot de la discipline)
  const TEXTES = {
    identité: {
      accroche: 'Un signe simple, pensé pour vivre partout où {c} se montre.',
      contexte: '{c} n’avait pas d’identité commune : chaque support était dessiné au cas par cas, avec des couleurs et des lettres qui changeaient d’une fois sur l’autre.',
      demande: 'Il fallait un logo lisible en très petit comme en très grand, et des règles assez claires pour que l’équipe puisse s’en servir seule.',
      reponse: 'Mandolina a dessiné le logo à partir d’une forme simple, puis l’a décliné en version complète, réduite et monochrome. Une palette resserrée et une typographie de titrage complètent l’ensemble.',
      resultat: 'Le logo est utilisé sur tous les supports de {c}, du papier à en-tête aux réseaux sociaux, avec un guide d’utilisation livré en même temps.',
      livrables: ['Logo et déclinaisons', 'Palette et typographies', 'Guide d’utilisation'],
    },
    communication: {
      accroche: 'Des supports qui parlent la même langue, de l’affiche à la publication en ligne.',
      contexte: '{c} communique souvent, mais chaque support repartait de zéro et le ton changeait d’une saison à l’autre.',
      demande: 'Mettre en page une série de supports cohérents, faciles à mettre à jour d’un événement à l’autre.',
      reponse: 'Une grille commune, des gabarits pour les formats imprimés et numériques, et une hiérarchie de texte qui tient même avec beaucoup d’informations.',
      resultat: '{c} décline désormais ses annonces à partir des gabarits, sans repasser par une création complète.',
      livrables: ['Affiches', 'Gabarits pour les réseaux sociaux', 'Flyers'],
    },
    édition: {
      accroche: 'Des pages où le produit reste au premier plan.',
      contexte: '{c} présente une gamme large, avec beaucoup de références et d’informations techniques à faire tenir sur peu de pages.',
      demande: 'Concevoir une maquette claire de la première à la dernière page, qui se met à jour d’une édition à l’autre.',
      reponse: 'Une grille stricte, des repères pour passer d’une gamme à l’autre et des pages d’ouverture qui laissent respirer les visuels.',
      resultat: 'La maquette sert de base aux éditions suivantes ; seules les fiches produit changent.',
      livrables: ['Catalogue imprimé', 'Version PDF', 'Gabarits de fiches produit'],
    },
    textile: {
      accroche: 'Une tenue qu’on reconnaît de loin, sur le terrain comme dans les tribunes.',
      contexte: '{c} voulait renouveler ses maillots sans perdre ce qui fait son identité.',
      demande: 'Dessiner des maillots lisibles à distance, adaptés aux contraintes du fabricant et déclinables en plusieurs coloris.',
      reponse: 'Un motif construit à partir du logo, placé pour rester lisible en mouvement, et des fichiers de fabrication prêts à l’emploi.',
      resultat: 'Les maillots ont été produits et portés toute la saison ; le motif a été repris sur les produits dérivés.',
      livrables: ['Maillots domicile et extérieur', 'Fichiers de fabrication', 'Maquettes de présentation'],
    },
    packaging: {
      accroche: 'Un emballage qui se distingue en rayon et raconte le produit en un regard.',
      contexte: 'La gamme de {c} manquait d’unité : chaque produit avait été emballé à un moment différent.',
      demande: 'Créer un système d’emballage commun à toute la gamme, qui laisse chaque produit se distinguer.',
      reponse: 'Une structure fixe pour les informations, une couleur et une illustration par produit, et des fichiers vérifiés avec l’imprimeur.',
      resultat: 'La gamme est sortie avec ses nouveaux emballages ; ajouter un produit ne demande plus qu’une couleur et une illustration.',
      livrables: ['Emballages de la gamme', 'Fichiers d’impression', 'Rendus en volume'],
    },
    illustrations: {
      accroche: 'Des images dessinées pour donner un caractère à la marque.',
      contexte: '{c} utilisait surtout des photos de produits et voulait un univers plus personnel.',
      demande: 'Créer une série d’illustrations utilisables sur les produits, le site et les réseaux sociaux.',
      reponse: 'Un style au trait, une palette limitée et des motifs qui se combinent entre eux pour couvrir tous les formats.',
      resultat: 'Les illustrations accompagnent la marque sur ses produits comme en ligne.',
      livrables: ['Série d’illustrations', 'Motifs', 'Déclinaisons pour les réseaux sociaux'],
    },
    fichiers: {
      accroche: 'Le travail qu’on ne voit pas, mais sans lequel rien ne sort de l’imprimerie.',
      contexte: 'Les produits de {c} passent par plusieurs fabricants, chacun avec ses contraintes de format et de couleur.',
      demande: 'Préparer des fichiers techniques justes du premier coup : cotes, fonds perdus, couleurs d’impression.',
      reponse: 'Des plans cotés, des fichiers séparés par procédé d’impression et une vérification avec chaque fabricant avant le lancement.',
      resultat: 'Les productions sont sorties sans reprise ; les fichiers servent de référence pour les commandes suivantes.',
      livrables: ['Plans cotés', 'Fichiers d’impression', 'Fiches de fabrication'],
    },
    scénographie: {
      accroche: 'Une exposition pensée comme un parcours, du premier panneau au dernier objet.',
      contexte: 'Projet de fin d’études : présenter un travail de recherche dans un vrai espace d’exposition.',
      demande: 'Organiser l’espace pour qu’un visiteur comprenne le projet sans explication orale.',
      reponse: 'Un parcours en trois temps, des panneaux à hauteur de lecture et une signalétique qui reprend l’identité du projet.',
      resultat: 'L’exposition a été présentée au jury et au public lors de la soutenance.',
      livrables: ['Plan de l’espace', 'Panneaux', 'Signalétique'],
    },
  }

  // Galerie provisoire : formats et largeurs variés (champ « Largeur » de Dashility)
  const GALERIE = [
    [3, 2, 'pleine'],
    [4, 5, 'moitie'],
    [4, 5, 'moitie'],
    [1, 1, 'tiers'],
    [1, 1, 'tiers'],
    [1, 1, 'tiers'],
    [3, 2, 'pleine'],
  ]

  function recit(p) {
    const cle = Object.keys(TEXTES).find((k) => p.discipline.toLowerCase().startsWith(k))
    const t = TEXTES[cle]
    const r = (s) => s.replaceAll('{c}', p.client)
    const legendes = [t.livrables[0], 'Recherches', t.livrables[1], 'Détail', 'Variante', 'Détail', t.livrables[2]]
    const textes = [
      'La version finale, telle qu’elle a été livrée.',
      'Les premières pistes, avant le choix de la forme définitive.',
      'La déclinaison sur un deuxième support.',
      'De près, le soin porté aux finitions.',
      'Une des variantes présentées, écartée ensuite.',
      'Le même détail dans un autre coloris.',
      'Le dernier élément livré, qui complète l’ensemble.',
    ]
    return {
      accroche: r(t.accroche),
      parties: [
        ['Le contexte', r(t.contexte)],
        ['La demande', r(t.demande)],
        ['La réponse', r(t.reponse)],
        ['Le résultat', r(t.resultat)],
      ],
      livrables: t.livrables,
      annee: 2021 + (p.i % 5),
      galerie: GALERIE.map(([l, h, largeur], k) => ({
        src: couverture(p.i * 11 + k + 1, l * 400, h * 400),
        ratio: `${l} / ${h}`,
        largeur,
        legende: legendes[k],
        texte: textes[k],
      })),
    }
  }

  const courant = () => {
    const k = projets.findIndex((p) => '#' + p.slug === location.hash)
    return k < 0 ? 0 : k
  }

  // Fiche du projet ; les années sont provisoires comme les textes
  const fiche = (p, r) =>
    `<dl class="fiche">
      <div><dt>Client</dt><dd>${p.client}</dd></div>
      <div><dt>Discipline</dt><dd>${p.discipline}</dd></div>
      <div><dt>Année</dt><dd>${r.annee}</dd></div>
      <div><dt>Livrables</dt><dd>${r.livrables.join('<br>')}</dd></div>
    </dl>`

  const provisoire = '<p class="provisoire">Textes, année et images provisoires.</p>'

  // Projet précédent / suivant, en boucle (UX §3)
  function suite(k) {
    const n = projets.length
    const prec = projets[modulo(k - 1, n)]
    const suiv = projets[modulo(k + 1, n)]
    return `<nav class="suite" aria-label="Autres projets">
      <a href="#${prec.slug}" rel="prev"><span>Projet précédent</span>${prec.nom}</a>
      <a href="#${suiv.slug}" rel="next"><span>Projet suivant</span>${suiv.nom}</a>
    </nav>`
  }

  const image = (g, attributs = '') =>
    `<img src="${g.src}" alt="${g.legende} (image provisoire)" style="aspect-ratio:${g.ratio}" ${attributs}>`

  // Dessine la page du projet de l'adresse, et la redessine quand on passe à un autre projet
  function page(rendu) {
    const afficher = () => {
      const k = courant()
      const p = projets[k]
      const racine = document.documentElement
      for (const d of p.style.split(';')) racine.style.setProperty(...d.split(':'))
      trace(p.couleur)
      document.title = `${p.nom} — maquette page projet`
      rendu(p, recit(p), k)
    }
    addEventListener('hashchange', () => (afficher(), scrollTo(0, 0)))
    afficher()
  }

  Object.assign(M, { recit, fiche, provisoire, suite, image, page })
})()
