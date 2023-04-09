<template>
    <BackButtonComponent/>
    <header :class="{ 'blur-content': finish, 'header__playlist': true }">
      <h2 class="addSongToPlaylist__title">Vos playlists</h2>
  
      <button @click="open = true">
        <svg width="36" height="36" class="playlistAddIcon">
          <use xlink:href="#playlistAddIcon"/>
        </svg>
        Créer une nouvelle playlist
      </button>
    </header>
  
    <main :class="{ 'blur-content': finish, 'main__playlist': true}">
      <CardListComponent @select="(id) => updatePlaylist(id)" :data="playlists" orientation="vertical" />
      <ModalInputComponent @confirm="(playlistName) => createPlaylist(playlistName)" @close="open = false" :open="open" :placeholder="`Nom de la playlist`" :label="`Donnez un nom à votre playlist`"/>
      <ModalInformationComponent @close="finish= false" :open="finish" :text="`La chanson a été ajoutée à la playlist.`" />
    </main>
    <symbol style="display: none;">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 96 960 960" id="playlistAddIcon">
        <path
            d="M120 726v-60h300v60H120Zm0-165v-60h470v60H120Zm0-165v-60h470v60H120Zm530 500V726H480v-60h170V496h60v170h170v60H710v170h-60Z"/>
      </svg>
    </symbol>  
  </template>

<script setup>
    import store from "@/store";
    import NavbarComponent from "@/components/NavbarComponent.vue";
    import CardListComponent from "@/components/CardListComponent.vue"
    import {ref} from "vue";
    import BackButtonComponent from "@/components/BackButtonComponent.vue";
    import ModalInputComponent from "@/components/ModalInputComponent.vue";
    import { useRoute } from "vue-router";
    import ModalInformationComponent from "@/components/ModalInformationComponent.vue"

    let open = ref(false)
    await store.INITIALIZE_PLAYLISTS();

    let finish = ref(false)

    const playlists = ref()
    playlists.value = store.playlists;

    async function createPlaylist (playlistName) {
    await store.createPlaylist(playlistName);
    await store.INITIALIZE_PLAYLISTS();
    playlists.value = store.playlists;
    }

    const route = useRoute()

    async function updatePlaylist (playlistId) {
      await store.updatePlaylist(playlistId, route.params.id);
      finish.value = true;
    }



</script>
