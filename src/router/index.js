import EditarVue from '@/components/Editar.vue'
import FavoritosVue from '@/components/Favoritos.vue'
import InicioVue from '@/components/Inicio.vue'
import PostsVue from '@/components/Posts.vue'


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
      path: '/posts',
      name: 'Posts',
      component: PostsVue
    },
    {
      path: '/favoritos',
      name: 'Favoritos',
      component: FavoritosVue
    },
     {
      path: '/editar/:id',
      name: 'Editar',
      component: EditarVue     },

  ]
})

export default router
