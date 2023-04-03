<template>
    <header>
        <div class="artist__header">
            <div class="artist__image">
                <img :src="artist.image" alt="Image de l'artiste" width="100" height="100">
            </div>
            <div class="artist__info">
                <p><strong>{{ artist.name }}</strong></p>
                <p>{{ artist.albums.length }} albums</p>
                <p>{{ artist.songs.length }} chansons</p>
            </div>
        </div>
    </header>
    <main class="main__artist">
        <h3>Meilleurs titres</h3>
        <CardListComponent :data="artist.songs"/>
        <h3>Albums</h3>
        <CardListComponent :data="artist.albums" orientation="vertical" :detailPath="pathOfAlbums"/>
        <BackButtonComponent />
        <UpwardButtonComponent :show-position="160"/>
    </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import store from '../store/index.js';
import { defineAsyncComponent } from 'vue';
import BackButtonComponent from '../components/BackButtonComponent.vue';
import UpwardButtonComponent from '../components/UpwardButtonComponent.vue';

const CardListComponent = defineAsyncComponent(() => import('./../components/CardListComponent.vue'))

const route = useRoute()

await store.INITIALIZE_ARTIST_DETAIL(route.params);
const artist = store.getArtistDetail(route.params);
const pathOfAlbums = store.detailPath.album;


</script>