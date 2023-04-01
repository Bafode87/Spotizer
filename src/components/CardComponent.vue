<script setup>
const props = defineProps({
    detailPath: {
        type: String
    },
    item: {
        type: Object,
        required: true
    }
});

</script>

<template>
    <div class="item">
        <RouterLink :to="`${props.detailPath}${props.item.id}`">
            <slot name="image" :item="props.item">
                <img :src="props.item.image" alt="Image de l'item" width="100" height="100">
            </slot>
            <slot name="name" :item="props.item">
                <p v-if="props.item.title">{{ props.item.title }}</p>
                <p v-else>{{ props.item.name }}</p>
            </slot>
        </RouterLink>
    </div>
</template>