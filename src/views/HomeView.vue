<template>
    <header>
        <h1>Spoti<span>zer</span></h1>
    </header>
    <main class="main__home">
        <h2>Accueil</h2>
        <h3>Albums les plus écoutés</h3>
        <Suspense>
            <CardListComponent :data="albums" :detailPath="pathOfAlbums"/>
            <template #fallback>
                <div class="loading">Chargement...</div>
            </template>
        </Suspense>
        
        <h3>Artistes à découvrir</h3>
        <Suspense>
            <CardListComponent :data="artists" :detailPath="pathOfArtists" />
            <template #fallback>
                <div class="loading">Chargement...</div>
            </template>
        </Suspense>
        <h3>Playlists</h3>
        <RefreshButtonComponent />
    </main>
    <NavbarComponent />
</template>


<script setup>
    import { defineAsyncComponent } from 'vue';
    import store from '../store/index.js';
    import RefreshButtonComponent from '../components/RefreshButtonComponent.vue';
    import NavbarComponent from '../components/NavbarComponent.vue';


    const CardListComponent = defineAsyncComponent(() => import('./../components/CardListComponent.vue'))

    await store.INITIALIZE_HOME();

    const albums = store.albumsMostRecent;
    const artists = store.artistToDiscover;

    const pathOfAlbums = store.detailPath.album;
    const pathOfArtists = store.detailPath.artist;

</script>