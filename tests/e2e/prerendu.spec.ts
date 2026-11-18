import { expect, test } from '@playwright/test'

// Le HTML brut, sans JavaScript : ce que lisent les moteurs et les réseaux (UX §8)
const pages = [
  {
    chemin: '/fr/',
    lang: 'fr',
    titre: 'Mandolina, graphiste',
    h1: 'Mandolina, graphiste — projets',
  },
  {
    chemin: '/en/',
    lang: 'en',
    titre: 'Mandolina, graphic designer',
    h1: 'Mandolina, graphic designer — projects',
  },
  {
    chemin: '/fr/projets/jenlain/',
    lang: 'fr',
    titre: 'Jenlain · Mandolina, graphiste',
    h1: 'Jenlain — Identité visuelle et packaging',
  },
  {
    chemin: '/en/projects/pswc/',
    lang: 'en',
    titre: 'PSWC · Mandolina, graphic designer',
    h1: 'PSWC — Visual identity and events',
  },
  { chemin: '/fr/a-propos/', lang: 'fr', titre: 'À propos · Mandolina, graphiste', h1: 'À propos' },
]

for (const { chemin, lang, titre, h1 } of pages) {
  test(`${chemin} est pré-rendue avec sa langue, son titre et ses hreflang`, async ({
    request,
  }) => {
    const res = await request.get(chemin)
    expect(res.status()).toBe(200)
    const html = await res.text()
    expect(html).toContain(`<html lang="${lang}"`)
    expect(html).toContain(`<title>${titre}</title>`)
    expect(html).toMatch(new RegExp(`<h1[^>]*>${h1}</h1>`))
    expect(html).toContain('hreflang="x-default"')
  })
}

test('les mentions légales et la page introuvable sont en noindex', async ({ request }) => {
  for (const chemin of ['/fr/mentions-legales/', '/en/404/'])
    expect(await (await request.get(chemin)).text()).toContain('name="robots" content="noindex"')
})

test('sans JavaScript, le carrousel est une liste des 17 liens de projets', async ({ request }) => {
  const html = await (await request.get('/fr/')).text()
  expect(html.match(/<a[^>]*class="carte[^"]*"[^>]*href="\/fr\/projets\//g) ?? []).toHaveLength(17)
})

test('le sitemap liste les projets dans les deux langues', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  expect(xml).toContain('/fr/projets/jenlain</loc>')
  expect(xml).toContain('/en/projects/jenlain</loc>')
  expect(xml).not.toContain('/404</loc>')
})
