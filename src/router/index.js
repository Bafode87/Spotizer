import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./../views/HomeView.vue')
    },
    {
      path:'/albums/:id',
      name: 'albumDetail',
      component: () => import('./../views/AlbumDetailView.vue')
    },
    {
      path: '/artists/:id',
      name: 'artistDetail',
      component: () => import('./../views/ArtistDetailView.vue')
    }
]
})

export default router
