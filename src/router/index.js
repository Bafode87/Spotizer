import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/views/SearchView.vue')
        },
        {
            path: '/playlist',
            name: 'playlist',
            component: () => import('@/views/PlaylistView.vue')
        },
        {
            path: '/albums/:id',
            name: 'albumDetail',
            component: () => import('@/views/AlbumDetailView.vue')
        },
        {
            path: '/artists/:id',
            name: 'artistDetail',
            component: () => import('@/views/ArtistDetailView.vue')
        },
        {
            path: '/songs/:id',
            name: 'songDetail',
            component: () => import('@/views/SongDetailView.vue')
        },
        {
            path: '/create-playlist',
            name: 'createPlaylist',
            component: () => import('@/views/CreatePlaylistView.vue')
        },
        {
            path: '/playlists/:id',
            name: 'playlistDetail',
            component: () => import('@/views/PlaylistDetailView.vue')
        }
    ]
})

export default router;
