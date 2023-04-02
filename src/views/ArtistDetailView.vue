<template>
    <header>
        <div class="artist__header">
            <div class="artist__image">
                <img :src="artist[0].image" alt="Image de l'artiste" width="100" height="100">
            </div>
            <div class="artist__info">
                <p>{{ artist[0].name }}</p>
                <p>{{ artist[0].albums.length }} albums</p>
                <p>{{ artist[0].songs.length }} chansons</p>
            </div>
        </div>
    </header>
    <main class="main__artist">
        <h3>Meilleurs titres</h3>
        <CardListComponent :data="artist[0].songs" />
        <h3>Albums</h3>
        <CardListComponent :data="artist[0].albums" orientation="vertical" />
        <BackButtonComponent />
        <UpwardButtonComponent :show-position="160"/>
    </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import store from '../store/index.js';
import { defineAsyncComponent, onMounted } from 'vue';
import BackButtonComponent from '../components/BackButtonComponent.vue';
import UpwardButtonComponent from '../components/UpwardButtonComponent.vue';

const CardListComponent = defineAsyncComponent(() => import('./../components/CardListComponent.vue'))

const route = useRoute()

await store.INITIALIZE_ARTIST_DETAIL(route.params.id);
const artist = store.artistDetail;


</script>