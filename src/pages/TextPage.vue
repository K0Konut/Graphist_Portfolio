<script setup lang="ts">
// Page de texte simple : mentions légales (texte riche de Dashility) et page introuvable (UX §3).
defineProps<{ titre: string; contenu?: string; lien?: { href: string; label: string } }>()
</script>

<template>
  <article class="page">
    <h1 class="titre">{{ titre }}</h1>
    <!-- Texte riche saisi par la cliente dans Dashility -->
    <div v-if="contenu" class="texte-riche" v-html="contenu" />
    <p v-if="lien" class="lien"><a :href="lien.href">{{ lien.label }}</a></p>
  </article>
</template>

<style scoped>
.page {
  padding: var(--espace-5) var(--marge) var(--espace-6);
}

.titre {
  font-size: var(--taille-titre-projet);
  font-weight: var(--graisse-titre);
  line-height: var(--interligne-serre);
  margin-bottom: var(--espace-5);
  max-width: 16ch;
}

.lien {
  font-size: var(--taille-intertitre);
}
</style>
