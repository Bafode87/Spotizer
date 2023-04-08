<template>
  <BackButtonComponent/>
  <header :class="{ 'blur-content': open, 'header__playlist': true }">
    <h2 class="addSongToPlaylist__title">Vos playlists</h2>

    <button @click="open = true">
      <svg width="36" height="36" class="playlistAddIcon">
        <use xlink:href="#playlistAddIcon"/>
      </svg>
      Créer une nouvelle playlist
    </button>
  </header>

  <main :class="{ 'blur-content': open, 'main__playlist': true}">
    <CardListComponent :data="playlists" :detailPath="pathOfPlaylist" orientation="vertical" emit
                       @select="selectPlaylist"/>
  </main>
  <symbol style="display: none;">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 96 960 960" id="playlistAddIcon">
      <path
          d="M120 726v-60h300v60H120Zm0-165v-60h470v60H120Zm0-165v-60h470v60H120Zm530 500V726H480v-60h170V496h60v170h170v60H710v170h-60Z"/>
    </svg>
  </symbol>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <CreatePlaylistModalComponent @close="open = false" @confirm="createPlaylist"/>
    </div>
  </Teleport>


  <NavbarComponent/>
</template>

<script setup>
import store from "@/store";
import NavbarComponent from "@/components/NavbarComponent.vue";
import CardListComponent from "@/components/CardListComponent.vue"
import {ref} from "vue";
import CreatePlaylistModalComponent from "@/components/CreatePlaylistModalComponent.vue";
import {useRoute} from "vue-router";
import BackButtonComponent from "@/components/BackButtonComponent.vue";

const route = useRoute()

const songId = route.params.id

let open = ref(false)
await store.INITIALIZE_PLAYLISTS();

const playlists = ref()
playlists.value = store.playlists;


const pathOfPlaylist = store.detailPath.playlist;

const createPlaylist = async (playlistName) => {
  const playlistCreated = await store.createPlaylist(playlistName);
  await store.updatePlaylist(playlistCreated.id, songId);
  open.value = false;
  await store.INITIALIZE_PLAYLISTS();
  playlists.value = store.playlists;
  alert('La chanson a bien été ajoutée à la playlist créée')
};

const selectPlaylist = async (playlistId) => {
  await store.updatePlaylist(playlistId, songId);
  open.value = false;
  await store.INITIALIZE_PLAYLISTS();
  playlists.value = store.playlists;
  alert('La chanson a bien été ajoutée à la playlist')
};


window.addEventListener('click', (e) => {
  if (open.value) {
    if (e.target.className === 'app') {
      open.value = false;
    }
  }

})
</script>

