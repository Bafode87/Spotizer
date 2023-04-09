<template>
    <div class="item">
        <router-link :to="path">
            <a :disabled="returnEmit" @click="selectedItem">
                <img :src="props.item.image" alt="Image de l'item" width="100" height="100">
                <p v-if="props.item.title">{{ props.item.title }}</p>
                <p v-else>{{ props.item.name }}</p>
            </a>
        </router-link>
    </div>
</template>

<script setup>

import { useRoute } from 'vue-router'
import { defineEmits } from 'vue';
const props = defineProps({
    detailPath: {
        type: String
    },
    item: {
        type: Object,
        required: true
    },
    emit: {
      type: Boolean,
      default: false,
      required: false
    }
});

const route = useRoute()

let path;
let returnEmit = true

const emits = defineEmits(['select']);

function selectedItem () {
    emits('select', props.item.id)
}

if (props.detailPath) {
    path =  `${props.detailPath}${props.item.id}`
} else {
    path = `${route.fullPath}`
    returnEmit = false;
}



</script>
