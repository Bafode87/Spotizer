<template>
    <BackButtonComponent />
    <div class="container__songDetail">

        <div class="song__videoPlayer">
            <iframe :src="song.youtube" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>
        <div class="song__info">

            <p>{{ song.title }}</p>

            <svg width="36" height="36" class="playlistAddIcon">
                <use xlink:href="#playlistAddIcon" />
            </svg>
        </div>
    </div>
    <symbol style="display: none;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 96 960 960" id="playlistAddIcon">
            <path
                d="M120 726v-60h300v60H120Zm0-165v-60h470v60H120Zm0-165v-60h470v60H120Zm530 500V726H480v-60h170V496h60v170h170v60H710v170h-60Z" />
        </svg>
    </symbol>
</template>

<script setup>

import BackButtonComponent from "@/components/BackButtonComponent.vue";

import { useRoute } from 'vue-router';
import store from '../store';

const route = useRoute()

console.log(route.params);

await store.INITIALIZE_SONG_DETAIL(route.params);
const song = store.getSongDetail(route.params);


</script>