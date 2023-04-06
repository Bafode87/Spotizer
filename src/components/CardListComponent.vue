<template>
    <section class="cardList">
        <div :class="styleOrientation" v-if="props.data.length > 0">
            <div class="cardList__items" v-for="item in props.data" :key="item.id">
                <Suspense>
                    <CardComponent v-if="!props.emit" :item="item" :detailPath="detailPath"/>
                    <CardComponent v-else :item="item" :detailPath="detailPath" @select="$emit('select', item.id)" emit />
                    <template #fallback>
                        <div class="loading">Chargement...</div>
                    </template>
                </Suspense>
            </div>
        </div>
      <div v-else class="nodata">
        <p>Aucune donnée à afficher...</p>
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
    },
    emit: {
      type: Boolean,
      default: false,
      required: false
    }
});

let styleOrientation = 'cardList__container';

if (props.orientation) {
    styleOrientation = `cardList__container--${props.orientation}`
}

</script>
