// shortcut: en attendant le routeur (feat/dev/routeur_et_prerendu), le site sert le banc des maquettes
import { createApp } from 'vue'
import './styles/base.css'
import MaquettesApp from './pages/maquettes/MaquettesApp.vue'

createApp(MaquettesApp).mount('#app')
