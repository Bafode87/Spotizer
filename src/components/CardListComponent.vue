<template>
    <section class="cardList">
        <div :class="styleOrientation">
            <div class="cardList__items" v-for="item in props.data" :key="item.id">
                <Suspense>
                    <CardComponent :item="item" :detailPath="detailPath" />
                    <template #fallback>
                        <div class="loading">Chargement...</div>
                    </template>
                </Suspense>
            </div>
        </div>
    </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';


const CardComponent = defineAsyncComponent(() => import('./CardComponent.vue'))

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    detailPath: {
        type: String
    },
    image: {
        type: String
    },
    orientation: {
        type: String
    }
});


let styleOrientation = 'cardList__container';

if (props.orientation) {
    styleOrientation = `cardList__container--${props.orientation}`
}

</script>