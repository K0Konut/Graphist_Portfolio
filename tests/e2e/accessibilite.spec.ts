import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// WCAG 2.2 AA (PRD §7) sur chaque page, dans les deux langues, sur ordinateur et sur mobile
const pages = [
  '/fr',
  '/en',
  '/fr/projets/jenlain',
  '/en/projects/luminous-fichiers-techniques',
  '/fr/a-propos',
  '/en/legal-notice',
  '/fr/404',
]

const analyser = (page: Parameters<Parameters<typeof test>[1]>[0]['page']) =>
  new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()

for (const chemin of pages) {
  test(`${chemin} n'a aucune violation WCAG AA détectée`, async ({ page }) => {
    await page.goto(chemin)
    expect((await analyser(page)).violations).toEqual([])
  })
}

test("le menu ouvert n'a aucune violation WCAG AA détectée", async ({ page }) => {
  await page.goto('/fr')
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
  await expect(page.getByRole('link', { name: 'À propos' })).toBeVisible()
  // Après l'entrée en cascade des liens : pendant l'animation, leur opacité partielle fausse le contraste.
  // Attendre l'état final, pas la fin des animations (elles peuvent ne pas avoir encore démarré)
  await page.waitForFunction(
    () => getComputedStyle(document.querySelector('#menu-principal')!).opacity === '1',
  )
  expect((await analyser(page)).violations).toEqual([])
})

test('la carte centrale survolée garde un texte lisible (contraste AA)', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'pas de survol au toucher')
  await page.goto('/fr')
  await page.locator('.carte.centrale').hover()
  await expect(page.locator('.carte.centrale .calque')).toHaveCSS('opacity', '0.85')
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'))
  expect((await analyser(page)).violations).toEqual([])
})
