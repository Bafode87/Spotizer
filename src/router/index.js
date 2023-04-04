import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home'
    },
    {
      path: '/search' ,
      name: 'search'
    },
    {
      path: '/playlist',
      name: 'playlist'
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
    },
    {
      path: '/songs/:id',
      name: 'songDetail',
      component: () => import('./../views/SongDetailView.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
