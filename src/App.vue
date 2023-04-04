<template>
    <Suspense>
        <router-view></router-view>
        <template #fallback>
            <div class="loading">Chargement...</div>
        </template>
    </Suspense>
</template>