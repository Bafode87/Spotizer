<template>
    <Teleport to="body">
        <div v-if="props.open" class="modal modal--information">
            <div class="modal__container">
                <p>{{ props.text }}</p>
                <div class="modal__button">
                    <button @click="leave">OK</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>

import { defineEmits } from 'vue';
import router from '@/router';

const props = defineProps ({
    open: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})
const emits = defineEmits(['close'])

function leave () {
    emits('close');
    router.go(-1)
}
</script>
