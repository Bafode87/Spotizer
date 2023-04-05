<template>
  <BackButtonComponent/>
  <div class="createPlaylist__container">
      <div class="createPlaylist__title">
        <h2>Donnez un nom à votre playlist</h2>
      </div>
      <div class="createPlaylist__input">
        <input type="text" placeholder="Nom de la playlist" v-model="playlistName">
      </div>
      <div class="createPlaylist__button">
        <button @click="createPlaylist">Créer</button>
      </div>
  </div>


</template>

<script setup>
import BackButtonComponent from "@/components/BackButtonComponent.vue";
import store from "@/store";
import {ref} from "vue";

const playlistName = ref('');

const createPlaylist = async () => {
  try {
    await store.createPlaylist(playlistName.value);
    playlistName.value = '';
    window.location.href = 'playlist';
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped lang="scss">
  .createPlaylist__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    align-self: center;
    height: 100%;
  }

  .createPlaylist__title {
    color: white;
  }

  .createPlaylist__input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .createPlaylist__input input {
    width: 80%;
    height: 2rem;
    border: none;
    border-radius: 0.5rem;
    padding-left: 0.5rem;
  }

  .createPlaylist__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3rem;
  }

  .createPlaylist__button button {
    width: 50%;
    height: 2rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #1ed760;
    color: white;
    font-weight: 600;
  }

</style>
