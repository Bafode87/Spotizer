<script setup>
import HomeView from './views/HomeView.vue';

import ArtistDetailView from './views/ArtistDetailView.vue';
import AlbumDetailView from './views/AlbumDetailView.vue';

</script>

<template>
    <div v-if="$route.path === '/'">
        <Suspense>
            <HomeView />
             <template #fallback>
                <div class="loading">Chargement...</div>
            </template>            
        </Suspense>
    </div>
    <div v-if="$route.path.includes('/artists')">
        <Suspense>
            <ArtistDetailView />

            <template #fallback>
                <div class="loading">Chargement...</div>
            </template>            
        </Suspense>
    </div>
    <div v-if="$route.path.includes('/albums')">
        <Suspense>
            <AlbumDetailView />

            <template #fallback>
                <div class="loading">Chargement...</div>
            </template>            
        </Suspense>
    </div>
</template>

