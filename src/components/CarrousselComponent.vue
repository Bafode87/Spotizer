<script setup>

const props = defineProps({
    data: {
        type: Object,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

</script>

<template>
    <section class="carroussel">
        <div class="carroussel__container">
            <div class="carroussel__items" v-for="item in props.data" :key="item.id">
                <div class="item">
                    <RouterLink :to="`${path}${item.id}`">
                        <slot name="image" :item="item">
                            <img :src="item.image" alt="Image de l'item" width="100" height="100">
                        </slot>
                        <slot name="name" :item="item">
                            <p>{{ item.title }}</p>
                        </slot>
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>