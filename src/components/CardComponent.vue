<template>
    <div class="item">
        <router-link :to="`${props.detailPath}${props.item.id}`" v-if="!props.emit">
            <img :src="props.item.image" alt="Image de l'item" width="100" height="100">
            <p v-if="props.item.title">{{ props.item.title }}</p>
            <p v-else>{{ props.item.name }}</p>
        </router-link>
        <a v-else @click="$emit('select', props.item.id)">
            <img :src="props.item.image" alt="Image de l'item" width="100" height="100">
            <p v-if="props.item.title">{{ props.item.title }}</p>
            <p v-else>{{ props.item.name }}</p>
        </a>
    </div>
</template>

<script setup>
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


</script>
