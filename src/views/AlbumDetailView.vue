<template>
    <header class="header__albumDetail">
        <div class="image__albumDetail">
            <img :src="album.image" width="200" height="200"> 
        </div>
        <div class="info__albumDetail">
            <RouterLink :to='`${pathOfArtist}${album.artist.id}`'>
                <img :src="album.artist.image" width="45" height="45">
            </RouterLink>
            
            <div>
                <p><strong>{{ album.title }}</strong> - {{ album.artist.name }}</p>
            </div>
        </div>
        <p>Album &bull; {{ album.albumtype.name }} &bull; {{ album.songs.length }} titres</p>
    </header>
    <main class="main__album">
        <ListComponent :songs="album.songs" :artist="album.artist.name"/>
    </main>
    <BackButtonComponent />
    <UpwardButtonComponent :show-position="160"/>
</template>

<script setup>
import { useRoute } from 'vue-router';
import BackButtonComponent from '../components/BackButtonComponent.vue';
import store from '../store';
import UpwardButtonComponent from '../components/UpwardButtonComponent.vue';
import ListComponent from '../components/ListComponent.vue';
const route = useRoute()

await store.INITIALIZE_ALBUM_DETAIL(route.params);
const album = store.getAlbumDetail(route.params);

const pathOfArtist = store.detailPath.artist;

</script>