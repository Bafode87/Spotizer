<template>
  <div class="createPlaylist__container">

    <h3>Donnez un nom à votre playlist</h3>
    <input type="text" placeholder="Nom de la playlist" v-model="playlistName">
    <div class="createPlaylist__button">
      <button @click="$emit('close')">Close</button>
      <button @click="confirmModal">Créer</button>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, ref} from "vue";

const {emit} = getCurrentInstance();
const playlistName = ref('');

const confirmModal = () => {
  if (playlistName.value !== '') {
    emit('confirm', playlistName.value);
    playlistName.value = '';
  }
};

</script>
