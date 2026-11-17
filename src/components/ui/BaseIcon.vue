<script setup lang="ts">
// Les quatre icônes du site (DA §6), au trait épais de l'icône de menu. Décoratives : le libellé est porté par le bouton ou le lien.
defineProps<{ nom: 'menu' | 'fermer' | 'precedent' | 'suivant' }>()
</script>

<template>
  <svg class="icone" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <g v-if="nom === 'menu'" fill="currentColor">
      <rect y="6" width="48" height="8" />
      <rect y="20" width="48" height="8" />
      <rect y="34" width="48" height="8" />
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
