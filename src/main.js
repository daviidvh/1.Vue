
import vuetify from '../vuetify/vuetify'
import router from './router'



import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'




createApp(App).use(router).use(vuetify).mount('#app')