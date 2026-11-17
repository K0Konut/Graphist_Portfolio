<script setup lang="ts">
// Racine du site : la mise en page commune autour de la page de la route, et les balises <head> (useSeo).
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteLayout from './components/site/SiteLayout.vue'
import { useSeo } from './composables/useSeo'
import { textes } from './content/textes'
import { chemin, LANGUE_PAR_DEFAUT, LANGUES } from './router/pages'

const route = useRoute()
const langue = computed(() => route.meta.langue ?? LANGUE_PAR_DEFAUT)
const t = computed(() => textes[langue.value])
const { dans } = useSeo()
</script>

<template>
  <SiteLayout
    :t="t"
    :page="route.path"
    :accueil-href="chemin('accueil', langue)"
    :liens="[
      { href: chemin('aPropos', langue), label: t.aPropos },
      { href: chemin('mentions', langue), label: t.mentions },
    ]"
    :langues="
      LANGUES.map((l) => ({
        // Même page dans l'autre langue ; une page qui n'y existe pas mène à son accueil (UX §1)
        href:
          route.meta.page === 'introuvable'
            ? chemin('accueil', l)
            : (dans(l) ?? chemin('accueil', l)),
        label: l.toUpperCase(),
        code: l,
        courante: l === langue,
      }))
    "
  >
    <!-- Clé par adresse : une page projet se recrée d'un projet à l'autre -->
    <RouterView :key="route.path" />
  </SiteLayout>
</template>
