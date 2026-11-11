import { createApp } from 'vue'
import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/600.css'
import '@fontsource/reem-kufi/500.css'
import '@fontsource/reem-kufi/600.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/600.css'
import './styles/main.css'
import App from './App.vue'
import { router } from './router.js'

createApp(App).use(router).mount('#app')
