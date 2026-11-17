// Dernier projet vu, pour recentrer le carrousel au retour à l'accueil (UX §5). Mis à jour dans le navigateur
// seulement (main.ts) : pendant le pré-rendu, l'accueil reste centré sur le premier projet.
import { ref } from 'vue'

export const dernierProjet = ref(0)
