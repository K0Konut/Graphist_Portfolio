<script setup lang="ts">
// Navigation entre projets en bas de la page projet (UX §3), en boucle : les deux liens sont toujours présents dès 2 projets.
import BaseIcon from '../ui/BaseIcon.vue'

interface Cible {
  href: string
  nom: string
}

defineProps<{
  precedent?: Cible
  suivant?: Cible
  label: string
  precedentLabel: string
  suivantLabel: string
}>()
</script>

<template>
  <nav v-if="precedent || suivant" class="pager" :aria-label="label">
    <a v-if="precedent" class="lien precedent" :href="precedent.href" rel="prev">
      <BaseIcon nom="precedent" />
      <span>
        <span class="sens">{{ precedentLabel }}</span>
        <span class="nom">{{ precedent.nom }}</span>
      </span>
    </a>
    <a v-if="suivant" class="lien suivant" :href="suivant.href" rel="next">
      <span>
        <span class="sens">{{ suivantLabel }}</span>
        <span class="nom">{{ suivant.nom }}</span>
      </span>
      <BaseIcon nom="suivant" />
    </a>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  justify-content: space-between;
  gap: var(--espace-4);
  padding: var(--espace-5) var(--marge);
}

.lien {
  display: flex;
  align-items: center;
  gap: var(--espace-3);
  font-size: var(--taille-intertitre);
  text-decoration: none;
}

.suivant {
  margin-left: auto;
  text-align: right;
}

.sens,
.nom {
  display: block;
}

.sens {
  font-size: var(--taille-legende);
  line-height: var(--interligne-legende);
  color: var(--gris);
}

.nom {
  font-weight: var(--graisse-intertitre);
  line-height: var(--interligne-titre);
}

.lien:hover .nom {
  text-decoration: underline;
  text-decoration-thickness: var(--soulignement);
  text-underline-offset: var(--soulignement-decalage);
}
</style>
