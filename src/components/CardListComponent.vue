<script setup>

import CardComponent from './CardComponent.vue';

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    detailPath: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});


</script>

<template>
    <section class="carroussel">
        <div class="carroussel__container">
            <div class="carroussel__items" v-for="item in props.data" :key="item.id">
                <CardComponent v-if="!item.image" :item="item" :detailPath="detailPath">
                    <template #image>
                        <img :src="props.image" alt="Image de l'item" width="100" height="100">
                    </template>
                </CardComponent>
                <CardComponent v-else :item="item" :detailPath="detailPath" />
            </div>
        </div>
    </section>
</template>