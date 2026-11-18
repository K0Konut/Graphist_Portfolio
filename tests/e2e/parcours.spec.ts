import { expect, test, type Page } from '@playwright/test'

// Parcours critiques (UX §2 et §5) avec le contenu de démonstration : 1er projet Lutèce — Logo, 2e PSWC, 17e Jenlain
const centrale = (page: Page) => page.locator('.carte.centrale')

test.describe('ordinateur', () => {
  test.skip(({ isMobile }) => isMobile, 'gestes de souris et de clavier')

  test('feuilleter, ouvrir un projet, continuer, revenir au même endroit', async ({ page }) => {
    await page.goto('/fr')
    await expect(centrale(page)).toHaveAttribute('href', '/fr/projets/lutece-logo')
    // Le nom du lien contient le texte affiché par le calque (WCAG 2.5.3)
    await expect(
      page.getByRole('link', { name: 'Identité visuelle Lutèce Destroyeuses — voir le projet' }),
    ).toHaveAttribute('href', '/fr/projets/lutece-logo')

    // Clic sur la voisine de droite : elle vient au centre, sans ouvrir le projet
    const carrousel = (await page.locator('.carrousel').boundingBox())!
    await page.mouse.click(carrousel.x + carrousel.width * 0.9, carrousel.y + carrousel.height / 2)
    await expect(centrale(page)).toHaveAttribute('href', '/fr/projets/pswc')
    await expect(page).toHaveURL(/\/fr\/?$/)

    // Clic sur la carte centrale : le projet s'ouvre
    await centrale(page).click()
    await expect(page).toHaveURL('/fr/projets/pswc')
    await expect(page.locator('h1')).toHaveText('PSWC — Identité visuelle et événementiel')
    await expect(page).toHaveTitle('PSWC · Mandolina, graphiste')

    // Projet suivant, puis retour à l'accueil par le logotype : recentré sur le dernier projet vu
    await page.getByRole('link', { name: /Projet suivant/ }).click()
    await expect(page.locator('h1')).toHaveText('FR Skates — Communication')
    await page.getByRole('link', { name: "Mandolina, retour à l'accueil" }).click()
    await expect(page).toHaveURL('/fr')
    await expect(centrale(page)).toHaveAttribute('href', '/fr/projets/fr-skates-mise-en-page')
  })

  test('au clavier, le carrousel boucle et Entrée ouvre le projet', async ({ page }) => {
    await page.goto('/fr')
    await centrale(page).focus()
    await page.keyboard.press('ArrowLeft')
    await expect(centrale(page)).toHaveAttribute('href', '/fr/projets/jenlain')
    await expect(centrale(page)).toBeFocused()
    await expect(page.getByText('Projet 17 sur 17')).toBeAttached()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/fr/projets/jenlain')
  })
})

test('le menu s’ouvre, garde le focus, se ferme avec Échap et change de langue', async ({
  page,
}) => {
  await page.goto('/fr/projets/jenlain')
  const bouton = page.getByRole('button', { name: 'Ouvrir le menu' })
  await bouton.click()
  await expect(page.getByRole('link', { name: 'À propos' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Ouvrir le menu' })).toBeFocused()

  await bouton.click()
  await page.getByRole('link', { name: 'EN', exact: true }).click()
  await expect(page).toHaveURL('/en/projects/jenlain')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
})

test('une adresse inconnue affiche la page introuvable de sa langue', async ({ page }) => {
  await page.goto('/en/nothing/here')
  await expect(page.locator('h1')).toHaveText("This page doesn't exist.")
  await page.goto('/fr/projets/inconnu')
  await expect(page.locator('h1')).toHaveText("Cette page n'existe pas.")
})

test('sur mobile, glisser change de projet et la carte centrale garde son calque', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'geste tactile')
  await page.goto('/fr')
  await expect(centrale(page).locator('.calque')).toHaveCSS('opacity', '0.85')
  const zone = (await page.locator('.carrousel').boundingBox())!
  const y = zone.y + zone.height / 2
  await page.locator('.carrousel').evaluate(
    (el, [x0, x1, y]) => {
      const toucher = (x: number) =>
        new Touch({ identifier: 1, target: el, clientX: x, clientY: y })
      el.dispatchEvent(
        new TouchEvent('touchstart', { changedTouches: [toucher(x0)], bubbles: true }),
      )
      el.dispatchEvent(new TouchEvent('touchend', { changedTouches: [toucher(x1)], bubbles: true }))
    },
    [300, 100, y],
  )
  await expect(centrale(page)).toHaveAttribute('href', '/fr/projets/pswc')
})

test('la mosaïque aligne les images de chaque rangée sur une même hauteur', async ({ page }) => {
  await page.goto('/fr/projets/jenlain')
  const hauteurs = await page
    .locator('.rangee')
    .evaluateAll((rangees) =>
      rangees.map((r) =>
        [...r.querySelectorAll('.image')].map((i) => Math.round(i.getBoundingClientRect().height)),
      ),
    )
  // Contenu de démonstration : 1, 1, 2 et 3 images
  expect(hauteurs.map((r) => r.length)).toEqual([1, 1, 2, 3])
  for (const rangee of hauteurs) expect(new Set(rangee).size).toBe(1)
})

test('l’île se referme sur un clic ailleurs, et la page reste utilisable pendant qu’elle est ouverte', async ({
  page,
}) => {
  await page.goto('/fr/projets/jenlain')
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
  await expect(page.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  await page.locator('.presentation').click()
  await expect(page.getByRole('button', { name: 'Ouvrir le menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  // Fermée, l'île garde ses liens hors d'atteinte du clavier
  await expect(page.locator('.tiroir')).toHaveAttribute('inert', '')
})
