import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import { router } from './router'
import '@fontsource-variable/schibsted-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/newsreader/400.css'
import './assets/main.css'
import './assets/illus.css'

createApp(App).use(i18n).use(router).mount('#app')
