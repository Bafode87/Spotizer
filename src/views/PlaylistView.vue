<template>
  <div class="playlist__container">
    <h1>Playlists</h1>

    <a :href="createPlaylistPath" class="playlist__create">
      Créer une playlist
    </a>

    <div class="playlist__list">
      <div v-if="playlists.length > 0" v-for="playlist in playlists" :key="playlist.id" class="playlist__item">
        <router-link :to="`${pathOfPlaylist}${playlist.id}`">
<!--          <img :src="playlist.image" alt="Image de la playlist" width="100" height="100">-->
          <div class="playlist__info">
            <p><strong>{{ playlist.name }}</strong></p>
            <p>{{ playlist.songs.length }} chansons</p>
          </div>
        </router-link>
      </div>
      <div v-else>
        <p class="playlist__nodata">Vous n'avez pas encore de playlist...</p>
      </div>
    </div>
  </div>
  <NavbarComponent/>
</template>

<script setup>
import store from "@/store";
import NavbarComponent from "@/components/NavbarComponent.vue";

const playlists = await store.getPlaylists();
const pathOfPlaylist = store.detailPath.playlist;
const createPlaylistPath = store.createPlaylistPath;
</script>

<style scoped lang="scss">
.playlist__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

.playlist__create {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 3rem;
  margin-top: 1rem;
  background-color: #1db954;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 0.5rem;
}

.playlist__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
}

.playlist__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;

  a {
    display: flex;
    align-items: center;
    width: 90%;
    color: white;
    text-decoration: none;
    font-size: 1rem;
    background-color: #282828;
    border-radius: 0.5rem;
    height: 3rem;
  }
}

.playlist__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 1rem;
}

.playlist__nodata {
  margin-top: 1rem;
  color: white;
  font-size: 1rem;
}


</style>
