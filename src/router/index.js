import EditarVue from '@/components/Editar.vue'
import FavoritosVue from '@/components/Favoritos.vue'
import InicioVue from '@/components/Inicio.vue'
import UsuariosVue from '@/components/Usuarios.vue'
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
      path: '/favortios',
      name: 'Favoritos',
      component: FavoritosVue
    },
     {
      path: '/editar',
      name: 'Editar',
      component: EditarVue
    },

  ]
})

export default router
