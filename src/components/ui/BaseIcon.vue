<script setup lang="ts">
// Les quatre icônes du site (DA §6) : plus (« ••• »), fermer, précédent, suivant. Décoratives : le libellé est porté par le bouton ou le lien.
defineProps<{ nom: 'plus' | 'fermer' | 'precedent' | 'suivant' }>()
</script>

<template>
  <svg class="icone" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <g v-if="nom === 'plus'" fill="currentColor">
      <circle cx="8" cy="24" r="5" />
      <circle cx="24" cy="24" r="5" />
      <circle cx="40" cy="24" r="5" />
    </g>
    <g v-else-if="nom === 'fermer'" stroke="currentColor" stroke-width="8">
      <path d="M7 7l34 34M41 7L7 41" />
    </g>
    <path
      v-else
      :d="nom === 'precedent' ? 'M32 6L14 24l18 18' : 'M16 6l18 18-18 18'"
      fill="none"
      stroke="currentColor"
      stroke-width="7"
    />
  </svg>
</template>

<style scoped>
.icone {
  width: 1em;
  height: 1em;
  flex: none;
}
</style>
