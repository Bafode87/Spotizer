<template>
    <section class="cardList">
        <div :class="styleOrientation" v-if="props.data.length > 0">
            <div class="cardList__items" v-for="item in props.data" :key="item.id">
                <Suspense>
                    <CardComponent @select="(id) => emit(id)" :item="item" :detailPath="detailPath" />
                    <template #fallback>
                        <div class="loading">Chargement...</div>
                    </template>
                </Suspense>
            </div>
        </div>
        <div v-else class="nodata">
            <p>{{ props.nodata }}</p>
        </div>
    </section>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import { defineEmits } from 'vue';

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
    },
    nodata: {
        type: String
    }
});

let styleOrientation = 'cardList__container';

if (props.orientation) {
    styleOrientation = `cardList__container--${props.orientation}`
}

const emits = defineEmits(['select']);

function emit(id) {
    emits('select', id)
}

</script>
