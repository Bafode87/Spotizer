<template>
    <section class="list">
        <div class="list__items" v-for="item in props.songs" :key="item.id">
            <div class="item">
                <router-link :to="`${pathOfSong}${item.id}`">
                <div>
                    <p>{{item.title}}</p>
                    <p class="item__subtitle">{{ props.artist }}</p>
                </div>
                <svg width="36" height="36" class="playlistAddIcon">
                    <use xlink:href="#playlistAddIcon" />
                </svg>
                </router-link>
            </div>
        </div>
    </section>
    <symbol style="display: none;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 96 960 960" id="playlistAddIcon">
            <path d="M120 726v-60h300v60H120Zm0-165v-60h470v60H120Zm0-165v-60h470v60H120Zm530 500V726H480v-60h170V496h60v170h170v60H710v170h-60Z"/>
        </svg>
    </symbol>
</template>

<script setup>
    import store from "@/store";

    const props = defineProps({
        songs : {
            type: Object,
            required: true
        },
        artist : {
            type: String,
            required: true
        },
        detailPath: {
            type: String
        }
    })

    const pathOfSong = store.detailPath.song;

</script>
