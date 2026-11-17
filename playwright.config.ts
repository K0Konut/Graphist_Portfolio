import { defineConfig, devices } from '@playwright/test'

// Les tests tournent sur la version construite avec le contenu de démonstration (npm run contenu:demo && npm run build) :
// 17 projets connus, le résultat ne dépend pas de ce que la cliente publie
export default defineConfig({
  testDir: 'tests/e2e',
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173/fr/',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'ordinateur', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
})
