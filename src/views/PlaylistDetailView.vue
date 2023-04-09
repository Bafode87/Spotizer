<template>
	<BackButtonComponent />
	<header class="header__playlistDetail">
		<div class="image__playlistDetail">
			<img :src="playlist.image" width="200" height="200" alt="Image de la playlist">
		</div>
		<div class="info__playlistDetail">
			<div>
				<h3 class="playlist__title">{{ playlist.name }}</h3>
				{{ playlist.songs.length }} titres
			</div>
		</div>
	</header>
	<main class="main__playlistDetail">
		<ListComponent @remove="(id) => removeSongInPlaylist(id)" :songs="playlist.songs" :remove-item="true" />
	</main>
	<UpwardButtonComponent :show-position="160" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import BackButtonComponent from '../components/BackButtonComponent.vue';
import store from '../store';
import UpwardButtonComponent from '../components/UpwardButtonComponent.vue';
import ListComponent from '../components/ListComponent.vue';
import { ref } from "vue";

const route = useRoute()

let playlist = ref();
await store.INITIALIZE_PLAYLIST_DETAIL(route.params);
playlist.value = await store.getPlaylistDetail(route.params);

async function removeSongInPlaylist (songId) {
    await store.updatePlaylist(playlist.value.id, songId, 'remove');
    await store.INITIALIZE_PLAYLIST_DETAIL(route.params);
    playlist.value = await store.getPlaylistDetail(route.params);
}

</script>
