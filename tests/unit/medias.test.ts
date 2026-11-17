import { describe, expect, it } from 'vitest'
import { localiserMedias, ORIGIN } from '../../scripts/medias'

describe('localiserMedias', () => {
  it('réécrit les adresses de Dashility en chemins du site et liste les fichiers à télécharger', () => {
    const id = '2fbe3cff-a236-4fbd-83cf-e6260955f566'
    const json = JSON.stringify({
      src: `${ORIGIN}/api/media/${id}/1440.webp`,
      srcset: {
        avif: `${ORIGIN}/api/media/${id}/640.avif 640w, ${ORIGIN}/api/media/${id}/1440.avif 1440w`,
      },
    })
    const { texte, fichiers } = localiserMedias(json)
    expect(JSON.parse(texte)).toEqual({
      src: `/medias/${id}/1440.webp`,
      srcset: { avif: `/medias/${id}/640.avif 640w, /medias/${id}/1440.avif 1440w` },
    })
    expect([...fichiers.keys()]).toEqual([
      `/medias/${id}/1440.webp`,
      `/medias/${id}/640.avif`,
      `/medias/${id}/1440.avif`,
    ])
  })

  it('laisse les autres adresses intactes', () => {
    const { texte, fichiers } = localiserMedias('{"lien":"https://exemple.fr/image.png"}')
    expect(texte).toBe('{"lien":"https://exemple.fr/image.png"}')
    expect(fichiers.size).toBe(0)
  })
})
