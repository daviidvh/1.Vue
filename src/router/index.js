import InicioVue from '@/components/Inicio.vue'
import UsuariosVue from '@/components/Usuarios.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: InicioVue
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: UsuariosVue
    },

  ]
})

export default router
