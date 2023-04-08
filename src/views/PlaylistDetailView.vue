<template>
    <BackButtonComponent/>
    <div class="playlistDetail__container">
        <div class="playlist__image">
            <img :src="playlist.image" width="200" height="200" alt="Image de la playlist">
        </div>
        <div class="playlist__details">

            <h2 class="playlist__title">{{ playlist.name }}</h2>
            <div class="playlist__info">
                {{ playlist.songs.length }} titres
            </div>

            <div class="playlist__songs">
                <ListComponent :songs="playlist.songs" remove-song @removeSong="removeSong"/>
            </div>
        </div>
    </div>
    <UpwardButtonComponent :show-position="160"/>
</template>

<script setup>
import {useRoute} from 'vue-router';
import BackButtonComponent from '../components/BackButtonComponent.vue';
import store from '../store';
import UpwardButtonComponent from '../components/UpwardButtonComponent.vue';
import ListComponent from '../components/ListComponent.vue';
import {ref} from "vue";

const route = useRoute()

let playlist = ref();
await store.INITIALIZE_PLAYLIST_DETAIL(route.params);
playlist.value = await store.getPlaylistDetail(route.params);

const removeSong = async (songId) => {
    await store.removeSongFromPlaylist(playlist.value.id, songId);
    await store.INITIALIZE_PLAYLIST_DETAIL(route.params);
    playlist.value = await store.getPlaylistDetail(route.params);
}

</script>
