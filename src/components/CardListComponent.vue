<template>
    <section class="cardList">
        <div :class="styleOrientation" >
            <div class="cardList__items" v-for="item in props.data" :key="item.id">
                <CardComponent :item="item" :detailPath="detailPath" />
            </div>
        </div>
    </section>
</template>

<script setup>

import CardComponent from './CardComponent.vue';

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