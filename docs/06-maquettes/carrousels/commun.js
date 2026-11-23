// Maquettes des carrousels : données des 17 projets (fiche de la cliente), couvertures provisoires,
// header repris de costamask.dev, gestes communs. Script classique : les modules ne se chargent pas en file://.
;(() => {
  const VARIANTES = [
    ['carte-centrale.html', 'Carte centrale', 'Le carrousel actuel, pour comparer : la carte du centre est la plus large, ses voisines se resserrent.'],
    ['bande.html', 'Bande', 'Toutes les couvertures en ligne, à la même hauteur, légendées dessous. On fait défiler comme une planche contact.'],
    ['accordeon.html', 'Accordéon', 'Dix-sept lames aux couleurs des projets ; celle qu’on survole s’ouvre sur sa couverture.'],
    ['pile.html', 'Pile d’épreuves', 'Les couvertures empilées comme des tirages sur une table ; celle du dessus part en dessous.'],
    ['index-image.html', 'Index et image', 'La liste des projets à gauche, la couverture du projet survolé à droite.'],
    ['index-plein.html', 'Index typographique', 'Les noms des projets en très grand ; le fond prend la couleur du projet survolé.'],
    ['cylindre.html', 'Cylindre', 'Les couvertures sur un anneau en perspective, qu’on fait tourner.'],
    ['rail-vertical.html', 'Rail vertical', 'Un projet par écran, en défilement vertical, avec un repère de position sur le côté.'],
    ['grille-infinie.html', 'Grille à glisser', 'Un mur de couvertures sans bord, qu’on déplace dans tous les sens.'],
    ['aplat-plein.html', 'Aplat plein écran', 'Un projet à la fois ; tout l’écran prend sa couleur.'],
  ]

  const PAGES = [
    ['projet-bandeau.html', 'Bandeau', 'La page prévue par la DA, enrichie : bandeau à la couleur du projet, fiche, présentation en deux colonnes, mosaïque.'],
    ['projet-colonne-fixe.html', 'Colonne fixe', 'Le texte et la fiche restent à gauche pendant que les images défilent à droite.'],
    ['projet-alternance.html', 'Alternance', 'Le récit en quatre temps, chaque paragraphe face à une image, d’un côté puis de l’autre.'],
    ['projet-long-format.html', 'Long format', 'Une couverture plein écran avec son aplat, puis une lecture de magazine où les images coupent le texte.'],
    ['projet-chapitres.html', 'Chapitres', 'Une étude de cas en quatre chapitres, avec un sommaire qui suit la lecture.'],
    ['projet-legendes.html', 'Images légendées', 'Les images d’abord, chacune avec sa légende à côté, comme dans un catalogue d’exposition.'],
    ['projet-aplat.html', 'Page en aplat', 'Toute la page prend la couleur du projet ; le texte et les images se posent dessus.'],
    ['projet-accroche.html', 'Grande accroche', 'Une phrase en très grand pour commencer, la fiche en une ligne, puis le détail.'],
    ['projet-planche.html', 'Planche horizontale', 'Le texte puis les images sur une seule ligne, qu’on parcourt de gauche à droite.'],
    ['projet-diaporama.html', 'Diaporama', 'Une image à la fois en grand, avec sa légende ; la présentation reste à côté.'],
  ]

  const PROJETS = [
    ['Lutèce — Logo', 'Identité visuelle', 'Lutèce Destroyeuses', '85c4f9'],
    ['PSWC', 'Identité visuelle et événementiel', 'PSWC', 'ef6f96'],
    ['FR Skates — Mise en page', 'Communication', 'FR Skates', '9df7dd'],
    ['Luminous — Catalogues', 'Édition', 'Luminous', 'c1cddd'],
    ['Lutèce — Maillots', 'Textile', 'Lutèce Destroyeuses', 'ffd975'],
    ['FR Skates — Packaging', 'Packaging', 'FR Skates', 'c3aefc'],
    ['Universkate — Logos', 'Identité visuelle', 'Universkate', 'efcf8f'],
    ['FR Skates — Illustration', 'Illustrations', 'FR Skates', 'dbf4d3'],
    ['Luminous — Packaging', 'Packaging', 'Luminous', 'ffdeeb'],
    ['Lutèce — Merchandising', 'Communication', 'Lutèce Destroyeuses', 'c3e2fc'],
    ['Luminous — Fichiers techniques', 'Fichiers techniques', 'Luminous', '727272'],
    ['FR Skates — Fichiers techniques', 'Fichiers techniques', 'FR Skates', 'd2b3e2'],
    ['Blé Noir', 'Identité visuelle et communication', 'Blé Noir', '34b772'],
    ['Psycom', 'Édition et événementiel', 'Psycom', 'f7e751'],
    ['Studio Mustard', 'Identité visuelle', 'Studio Mustard', 'c79b7f'],
    ['Scénographie de diplôme', 'Scénographie', 'Diplôme Supcréa', 'b9efed'],
    ['Jenlain', 'Identité visuelle et packaging', 'Jenlain', 'ffc885'],
  ]

  // Règle des aplats du site (src/utils/couleur.ts) : texte noir ou blanc, calque opaque si le contraste manque
  const lin = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  const ctr = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  function aplat(hex) {
    const rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
    const l = lum(rgb)
    const noir = ctr(l, 0) >= ctr(l, 1)
    const pire = Math.min(...[0, 255].map((f) => ctr(lum(rgb.map((v) => 0.85 * v + 0.15 * f)), noir ? 0 : 1)))
    return { couleur: '#' + hex, texte: noir ? '#000000' : '#ffffff', opacite: pire < 4.5 ? 1 : 0.85 }
  }

  // Couvertures provisoires 4:5 : compositions en gris, différentes d'un projet à l'autre
  const alea = (s) => () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const FONDS = ['#ececec', '#d6d6d6', '#bdbdbd', '#f5f5f5', '#2a2a2a', '#a3a3a3']
  function couverture(i, l = 1200, h = 1500) {
    const r = alea(i * 97 + 13)
    const fond = FONDS[i % FONDS.length]
    const sombre = fond === '#2a2a2a'
    const a = sombre ? '#f0f0f0' : '#141414'
    const b = sombre ? '#6e6e6e' : '#8a8a8a'
    const n = (min, max) => Math.round(min + r() * (max - min))
    let f = ''
    switch (i % 5) {
      case 0:
        f = `<circle cx="${n(380, 820)}" cy="${n(520, 900)}" r="${n(290, 420)}" fill="${a}"/><rect x="${n(80, 500)}" y="${n(1180, 1300)}" width="${n(300, 620)}" height="44" fill="${b}"/>`
        break
      case 1:
        for (let k = 0; k < 7; k++) f += `<rect x="0" y="${180 + k * 155}" width="${n(380, 1200)}" height="${n(36, 96)}" fill="${k % 2 ? b : a}"/>`
        break
      case 2:
        f = `<rect x="${n(120, 320)}" y="${n(160, 360)}" width="${n(560, 760)}" height="${n(680, 880)}" fill="${a}"/><circle cx="${n(640, 900)}" cy="${n(860, 1100)}" r="${n(200, 300)}" fill="none" stroke="${b}" stroke-width="30"/>`
        break
      case 3:
        for (let x = 0; x < 8; x++)
          for (let y = 0; y < 10; y++) f += `<circle cx="${110 + x * 140}" cy="${130 + y * 140}" r="${n(4, 44)}" fill="${(x + y) % 3 ? a : b}"/>`
        break
      default:
        f = `<polygon points="0,${n(300, 1100)} 1200,${n(200, 700)} 1200,1500 0,1500" fill="${a}"/><rect x="${n(100, 700)}" y="${n(120, 300)}" width="${n(160, 360)}" height="${n(160, 360)}" fill="${b}"/>`
    }
    // Composition dessinée en 4:5, recadrée au centre pour les autres formats
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${l} ${h}"><rect width="${l}" height="${h}" fill="${fond}"/><svg width="${l}" height="${h}" viewBox="0 0 1200 1500" preserveAspectRatio="xMidYMid slice">${f}</svg><text x="${l - h / 30}" y="${h - h / 37.5}" text-anchor="end" font-family="sans-serif" font-size="${h / 47}" fill="${b}">image provisoire</text></svg>`
    return 'data:image/svg+xml,' + encodeURIComponent(svg)
  }

  const slug = (s) =>
    s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const projets = PROJETS.map(([nom, discipline, client, hex], i) => {
    const ap = aplat(hex)
    return {
      i, nom, discipline, client, slug: slug(nom), couverture: couverture(i), ...ap,
      style: `--aplat:${ap.couleur};--aplat-texte:${ap.texte};--aplat-opacite:${ap.opacite}`,
    }
  })

  const carte = (p, { classe = '', degage = false, attributs = '' } = {}) =>
    `<a class="carte ${classe}" href="#${p.slug}" style="${p.style}" data-i="${p.i}" ${attributs}>` +
    `<img src="${p.couverture}" alt="" width="1200" height="1500" draggable="false">` +
    `<span class="calque${degage ? ' haut-degage' : ''}"><span class="discipline">${p.discipline}</span>` +
    `<span class="client">${p.client}<span class="visuellement-masque"> — voir le projet</span></span></span></a>`

  const LOGO = `<svg class="logo" viewBox="0 0 1974 297" role="img" aria-label="Mandolina"><path fill="currentColor" fill-rule="evenodd" d="M1805.4 23.5L1805.21 25.11L1858.55 181.88L1799.88 181.88L1799.88 224.75L1873.58 224.75L1891.77 273.88L1950.71 273.88L1950.87 273.35L1860.46 24.25L1859.71 23.5L1805.4 23.5ZM800.88 23.5L800.12 24.29L800.62 68.25C807.78 68.28 814.96 68.37 822.12 68.37C838.7 68.37 852.36 68.3 866.12 79.19C874.35 85.7 879.81 94.36 882.74 104.38C886.72 117.95 885.5 133.32 885.5 147.38C885.5 163.28 887.06 180.83 881.73 196C878.16 206.19 871.43 214.84 862.37 220.75C848.92 229.53 835.29 228.87 820 228.87C814.42 228.87 807.69 228.33 802.25 228.84C801.81 228.88 800.41 229.25 800.25 229.25L800.12 273.38C800.37 273.38 801.85 273.84 802.5 273.87C808.64 274.2 815.19 273.88 821.38 273.88C827.52 273.88 834.02 274.11 840.13 273.71C862.61 272.22 883.91 266.07 902.38 252.78C925.8 235.92 939.84 209.94 943.65 181.63C945.08 171 944.87 160.44 944.87 149.75C944.87 138.39 945.23 126.9 943.67 115.63C939.26 83.57 922.34 55.68 894.12 39.09C863.87 21.3 834.39 23.5 800.88 23.5ZM1715.53 23.5L1715 23.99L1715 171.19L1713.5 170.66L1693.62 138.75L1615.27 23.5L1567.12 23.5L1567.12 273.88L1618.88 273.88L1618.88 127.3L1619.77 126.53L1620.88 127.12C1626.09 135.56 1630.94 144.26 1636.3 152.62C1652.14 177.3 1669.39 201.52 1685.96 225.75C1692.92 235.94 1699.86 246.16 1706.79 256.37C1710.48 261.82 1714.69 269.39 1719.25 273.88L1766.75 273.88L1766.75 23.5L1715.53 23.5ZM1411.2 23.5L1410.5 24.15L1410.5 68.38L1439.45 68.38L1440 68.93L1440 228.14L1439.5 228.88L1399.19 228.88L1405.19 273.88L1525.88 273.88L1525.88 228.88L1497.22 228.88L1496.75 227.99L1496.75 69.2L1497.17 68.38L1525.88 68.38L1525.88 23.5L1411.2 23.5ZM1227.12 23.5L1227.12 273.88L1370.59 273.88L1364.35 227L1283.88 227L1283.88 24.07L1283.4 23.5L1227.12 23.5ZM568.31 23.5L567.88 24.22L567.88 273.88L619.38 273.88L619.38 127.5L620.25 126.5C624.63 130.9 628.88 139.8 632.28 145.38C636.99 153.1 642.04 160.53 647.13 168C671.18 203.31 695.29 238.61 719.38 273.88L767 273.88L767 23.5L716.2 23.5L715.5 24.15L715.5 170.02L714.25 171C693.12 137.01 670.69 104.15 648.09 71.13C640.67 60.27 633.35 49.35 625.92 38.5C622.51 33.51 619.24 27.87 615.25 23.38L568.31 23.5ZM394.11 23.5L303.23 273.88L357.77 273.88L375.24 224.75L474.74 224.75L476.75 229.62L492.98 273.88L551.72 273.88L552.01 273.19L461.39 23.5L394.11 23.5ZM424.55 83.63L426.4 84.13L457.88 175.75L459.54 181.14L459.04 181.88L390.63 181.88L423 87.75L424.55 83.63ZM232.13 23.5L173.89 188.39L172.67 189.15L171.12 185.25L114.39 24.09L113.54 23.5L23.12 23.5L23.12 273.88L73.8 273.88L74.38 273.4L74.38 90.19L75.38 89.47L76.32 90.29L141.02 273.88L200.17 273.88L265 89.95L266.15 89.61L266.88 90.45L266.88 249.23L267.38 249.75L322.88 97.38L322.88 23.88L232.13 23.5ZM1080.5 19.86C1069.49 20.43 1059.59 21.35 1048.88 24.25C1010.37 34.66 982.51 64.17 974.21 103.12C971.04 118.03 971.5 133.23 971.5 148.37C971.5 166.81 971.1 184.18 976.22 202.12C990.43 251.91 1037.93 280.17 1088.25 277.37C1138.26 274.58 1180.16 247.18 1191.69 196.25C1195.27 180.41 1194.87 165.1 1194.87 149C1194.87 131.16 1195.38 114.3 1190.65 96.88C1178.96 53.79 1143.28 25.74 1099.5 20.82C1093.32 20.13 1086.72 19.53 1080.5 19.86ZM1078.12 64.96C1105.02 62.83 1127.89 77.6 1133.8 104.62C1136.82 118.39 1135.88 133.92 1135.88 148C1135.88 160.8 1136.65 174.75 1134.79 187.37C1130.68 215.25 1111.59 231.54 1083.75 232.49C1073.19 232.85 1061.41 229.57 1052.75 223.54C1027.21 205.74 1030.75 176.28 1030.75 149.12C1030.75 122.61 1027.06 92.99 1051.13 74.88C1059.09 68.88 1068.22 65.74 1078.12 64.96Z"/></svg>`
  const MENU_ICONE = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`
  const LIENS = [['Projets', true], ['À propos'], ['Mentions légales']]

  function entete() {
    const nav = LIENS.map(([t, c]) => `<a href="#"${c ? ' aria-current="page"' : ''}><span class="trace">${t}</span></a>`).join('')
    const langues = (trace) =>
      `<div class="langues" role="group" aria-label="Langue"><a href="#" lang="fr" aria-current="true"><span class="${trace}">FR</span></a><span class="sep" aria-hidden="true">/</span><a href="#" lang="en"><span class="${trace}">EN</span></a></div>`
    document.body.insertAdjacentHTML(
      'afterbegin',
      `<a class="evitement" href="#contenu">Aller aux projets</a>
      <header class="entete"><div class="barre">
        <a class="nom" href="index.html">${LOGO}</a>
        <nav aria-label="Navigation principale">${nav}</nav>
        ${langues('trace')}
        <button class="bouton-menu" type="button" aria-expanded="false" aria-controls="menu">${MENU_ICONE}Menu</button>
      </div>
      <dialog id="menu" class="menu" aria-label="Menu">
        <div class="haut">${LOGO}<button class="bouton-menu" type="button" style="display:inline-flex" autofocus>Fermer</button></div>
        <ul>${LIENS.map(([t, c]) => `<li><a href="#"${c ? ' aria-current="page"' : ''}>${t}</a></li>`).join('')}</ul>
        ${langues('')}
      </dialog></header>
      <p class="visuellement-masque" aria-live="polite" id="annonce"></p>`,
    )
    const dialogue = document.getElementById('menu')
    const ouvrir = document.querySelector('.barre .bouton-menu')
    ouvrir.addEventListener('click', () => {
      dialogue.showModal()
      ouvrir.setAttribute('aria-expanded', 'true')
    })
    dialogue.querySelector('.bouton-menu').addEventListener('click', () => dialogue.close())
    dialogue.addEventListener('close', () => ouvrir.setAttribute('aria-expanded', 'false'))
  }

  function banc() {
    const ici = location.pathname.split('/').pop()
    const liste = [VARIANTES, PAGES].find((l) => l.some(([f]) => f === ici))
    if (!liste) return
    const k = liste.findIndex(([f]) => f === ici)
    const n = liste.length
    const [prec] = liste[(k + n - 1) % n]
    const [suiv] = liste[(k + 1) % n]
    document.body.insertAdjacentHTML(
      'beforeend',
      `<nav class="banc" aria-label="Maquettes"><a href="${prec}" aria-label="Maquette précédente">‹</a><a class="titre" href="index.html">${k + 1}/${n} ${liste[k][1]}</a><a href="${suiv}" aria-label="Maquette suivante">›</a></nav>`,
    )
  }

  const reduit = new URLSearchParams(location.search).has('reduit') || matchMedia('(prefers-reduced-motion: reduce)').matches

  // Mouvement réduit : le changement se fait par un fondu court au lieu d'un glissement (DA §7)
  const fondu = (el) => reduit && el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: 'ease-out' })

  const annonce = (texte) => (document.getElementById('annonce').textContent = texte)
  const trace = (couleur) => document.documentElement.style.setProperty('--trace', couleur)

  const modulo = (i, n) => ((i % n) + n) % n
  const decalage = (i, actif, n) => {
    const d = modulo(i - actif, n)
    return d > n / 2 ? d - n : d
  }

  // Gestes communs : flèches du clavier, molette (un pas par geste), glissement du doigt ou de la souris
  let glisse = false
  function pilote(cible, pas, { axe = 'x' } = {}) {
    const avant = axe === 'x' ? ['ArrowRight', 'ArrowDown'] : ['ArrowDown', 'ArrowRight']
    const arriere = axe === 'x' ? ['ArrowLeft', 'ArrowUp'] : ['ArrowUp', 'ArrowLeft']
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('menu').open || e.altKey || e.metaKey || e.ctrlKey) return
      if (avant.includes(e.key)) (e.preventDefault(), pas(1))
      if (arriere.includes(e.key)) (e.preventDefault(), pas(-1))
    })
    let cumul = 0
    let bloque = 0
    cible.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault()
        if (performance.now() < bloque) return
        cumul += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
        if (Math.abs(cumul) < 40) return
        pas(Math.sign(cumul))
        cumul = 0
        bloque = performance.now() + 450
      },
      { passive: false },
    )
    let depart = null
    cible.addEventListener('pointerdown', (e) => (depart = [e.clientX, e.clientY]))
    cible.addEventListener('pointerup', (e) => {
      if (!depart) return
      const dx = e.clientX - depart[0]
      const dy = e.clientY - depart[1]
      depart = null
      const d = axe === 'x' ? dx : dy
      if (Math.abs(d) < 40 || Math.abs(d) < Math.abs(axe === 'x' ? dy : dx)) return
      glisse = true
      setTimeout(() => (glisse = false), 60)
      pas(-Math.sign(d))
    })
    // Un glissement ne doit pas ouvrir le projet sous le doigt
    cible.addEventListener('click', (e) => glisse && e.preventDefault(), true)
  }

  window.M = { VARIANTES, PAGES, projets, couverture, carte, entete, annonce, trace, modulo, decalage, pilote, fondu, reduit }
  entete()
  banc()
})()
