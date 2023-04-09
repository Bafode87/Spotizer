<template>
    <section class="list">
        <div class="list__items" v-for="item in props.songs" :key="item.id">
            <div class="item">
                <router-link :to="`${pathOfSong}${item.id}`">
                <div>
                    <p>{{item.title}}</p>
                    <p v-if="props.artist" class="item__subtitle">{{ props.artist }}</p>
                    <p v-else class="item__subtitle">{{ item.name }}</p>
                </div>
                </router-link>
                <div>
                    <router-link :to='`${addSongToPlaylistPath}${item.id}`'>
                    <svg width="36" height="36" class="playlistAddIcon">
                        <use xlink:href="#playlistAddIcon" />
                    </svg>
                  </router-link>
                    <svg width="36" v-if="props.removeItem" height="36" @click="removeItem(item.id)" class="playlistRemoveIcon">
                        <use xlink:href="#playlistRemoveIcon"/>
                    </svg>
                </div>
            </div>
        </div>
    </section>
    <symbol style="display: none;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="green" id="playlistAddIcon" ><path d="M610 766h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm-320-70h100v-70H290v70Zm0-130h260v-60H290v60Zm0-120h260v-60H290v60Zm190.266 530q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="red" id="playlistRemoveIcon">
            <path d="M280 603h400v-60H280v60Zm200 373q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/>
        </svg>
    </symbol>

    <symbol style="display: none;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="green" id="playlistAddIcon">
            <path d="M610 766h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm-320-70h100v-70H290v70Zm0-130h260v-60H290v60Zm0-120h260v-60H290v60Zm190.266 530q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/>
        </svg>
    </symbol>

</template>

<script setup>
    import store from "@/store";
    import { defineEmits } from "vue";

    const props = defineProps({
        songs : {
            type: Object,
            required: true
        },
        artist : {
            type: String
        },
        detailPath: {
            type: String
        },
        removeItem: {
            type: Boolean
        }
    })

    const pathOfSong = store.detailPath.song;
    const addSongToPlaylistPath = store.editPath.playlist.addSongToPlaylist;

    const emits = defineEmits(['remove'])

    function removeItem (id) {
        emits('remove', id)
    }

</script>
