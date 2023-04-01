<script setup>
import HomeView from './views/HomeView.vue';

</script>

<template>
    <Suspense>
        <div v-if="$route.path === '/'">
            <HomeView />
        </div>
    </Suspense>
</template>

