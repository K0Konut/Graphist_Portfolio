<script setup lang="ts">
// À propos (UX §3) : présentation, adresse mail, book PDF de la langue courante.
import type { Textes } from '../content/textes'

defineProps<{
  t: Textes
  accroche: string
  presentation: string // HTML du texte riche de Dashility
  email: string
  book?: { href: string; poids: string }
}>()
</script>

<template>
  <article class="page">
    <h1 class="titre">{{ t.aPropos }}</h1>
    <p class="accroche">{{ accroche }}</p>
    <!-- Texte riche saisi par la cliente dans Dashility -->
    <div class="texte-riche" v-html="presentation" />

    <p class="contact">
      {{ t.contact }}<br />
      <a :href="`mailto:${email}`">{{ email }}</a>
    </p>
    <p v-if="book">
      <a :href="book.href" download>{{ t.book }}</a> <span class="poids">(PDF, {{ book.poids }})</span>
    </p>
  </article>
</template>

<style scoped>
.page {
  padding: var(--espace-5) var(--marge) var(--espace-6);
}

.page > * + * {
  margin-top: var(--espace-4);
}

.titre {
  font-size: var(--taille-titre-projet);
  font-weight: var(--graisse-titre);
  line-height: var(--interligne-serre);
}

.accroche {
  font-size: var(--taille-intertitre);
  font-weight: var(--graisse-intertitre);
  line-height: var(--interligne-titre);
  max-width: var(--mesure);
  margin-top: var(--espace-5);
}

.contact {
  margin-top: var(--espace-5);
  font-size: var(--taille-intertitre);
  line-height: var(--interligne-titre);
}

.poids {
  color: var(--gris);
}
</style>
