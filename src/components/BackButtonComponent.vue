<template>

    <svg @click="back" width="32" height="32" class="backIcon">
        <use xlink:href="#backIcon" />
    </svg>

    <symbol style="display: none;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 96 960 960" id="backIcon">
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z"/>
        </svg>
    </symbol>
</template>

<script setup>
import router from '@/router/index' ;

function back() {
    router.go(-1)
}
</script>
