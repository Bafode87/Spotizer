<template>
  <BackButtonComponent/>
  <header v-if="song.album" class="header__songDetail">
    ALBUM <p class="albumTitle__songDetail">{{ song.album.title }}</p>
  </header>

  <main class="main__songDetail">
    <iframe :src="song.youtube" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
    <div class="info__songDetail">
      <div>
        <p class="title__songDetail">{{ song.title }}</p>
        <router-link :to='`${pathOfArtist}${song.artist.id}`' class="artist__songDetail">
          <p>{{ song.artist.name }}</p>
        </router-link>
      </div>
      <router-link :to="`${addSongToPlaylistPath}${song.id}`">
        <svg width="36" height="36" class="playlistAddIcon">
          <use xlink:href="#playlistAddIcon"/>
        </svg>
      </router-link>
    </div>
  </main>
  <symbol style="display: none;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="green" id="playlistAddIcon">
      <path
          d="M610 766h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm-320-70h100v-70H290v70Zm0-130h260v-60H290v60Zm0-120h260v-60H290v60Zm190.266 530q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/>
    </svg>
  </symbol>
</template>

<script setup>

import BackButtonComponent from "@/components/BackButtonComponent.vue";

import {useRoute} from 'vue-router';
import store from '../store';

const route = useRoute()

await store.INITIALIZE_SONG_DETAIL(route.params);
const song = store.getSongDetail(route.params);

const addSongToPlaylistPath = store.editPath.playlist.addSongToPlaylist;
const pathOfArtist = store.detailPath.artist;
</script>
