<template>
    <header class="search__header">
        <h2>Recherche</h2>
        <input
                v-model="searchQuery"
                v-on:keyup="search"
                type="text"
                id="search"
                placeholder="Artistes, albums ou titres..."
        />
        <div class="filters">
            <label v-for="(option, index) in filterOptions" :key="index" class="button__filters">
                <input
                        type="radio"
                        v-model="selectedFilter"
                        :value="option.value"
                        @change="search"
                        name="filters"
                />
                {{ option.label }}
            </label>
            <button class="clearFilterBtn" v-if="selectedFilter" @click="clearFilter">Effacer le filtre</button>
        </div>
    </header>
    <main class="main__search">
        <Suspense>
            <div v-if="selectedFilter && searchData.length > 0">
                <CardListComponent
                        :data="searchData"
                        :nodata="`Aucun résultat.`"
                        orientation="vertical"
                        :detailPath="detailPath"
                />
            </div>
            <div v-else class="search__results">
                <div v-for="search in searchResults">
                    <div v-if="search.data.length > 0">
                        <h3 class="search__results__title">{{ search.title }}</h3>
                        <Suspense>
                            <CardListComponent :data="search.data" :detailPath="search.path"
                                               :nodata="search.nodata"/>
                            <template #fallback>
                                <div class="loading">Chargement...</div>
                            </template>
                        </Suspense>
                    </div>
                </div>
                <div v-if="!searchResults.length" class="search__noresults">Aucun résultat.</div>
            </div>
            <template #fallback>
                <div class="loading">Chargement...</div>
            </template>
        </Suspense>
    </main>
    <NavbarComponent/>
</template>
<script setup>
import store from "../store";
import {ref, computed} from "vue";
import NavbarComponent from "./../components/NavbarComponent.vue";
import CardListComponent from "./../components/CardListComponent.vue";

const filterOptions = [
    {label: "Albums", value: "ALBUM"},
    {label: "Artistes", value: "ARTIST"},
    {label: "Titres", value: "SONG"},
    {label: "Playlists", value: "PLAYLIST"}
];

let searchQuery = ref("");
let selectedFilter = ref("");
let searchData = ref([]);
let searchResults = ref([]);

// Calcul de la propriété detailPath avec computed()
const detailPath = computed(() => {
    if (selectedFilter.value) {
        return store.detailPath[selectedFilter.value.toLowerCase()];
    } else {
        return "";
    }
});

async function search() {
    if (!searchQuery.value) {
        searchResults.value = [];
        searchData.value = [];
        return;
    }
    if (selectedFilter.value) {
        if (selectedFilter.value === "PLAYLIST") {
            searchData.value = store.getPlaylists(searchQuery.value);
        } else {
            searchData.value = await store.getAutocompletion(searchQuery.value, selectedFilter.value);
        }
        searchResults.value = [];
    } else {
        // Recherche globale
        const results = await Promise.all([
            store.getAutocompletion(searchQuery.value, "ALBUM"),
            store.getAutocompletion(searchQuery.value, "ARTIST"),
            store.getAutocompletion(searchQuery.value, "SONG"),
            store.getPlaylists(searchQuery.value)
        ]);
        searchResults.value = [
            {title: "Albums", data: results[0], path: store.detailPath.album, nodata: "Aucun album trouvé."},
            {title: "Artistes", data: results[1], path: store.detailPath.artist, nodata: "Aucun artiste trouvé."},
            {title: "Titres", data: results[2], path: store.detailPath.song, nodata: "Aucun titre trouvé."},
            {title: "Playlists", data: results[3], path: store.detailPath.playlist, nodata: "Aucune playlist trouvée."}
        ];
        searchData.value = [];
    }
}

function clearFilter() {
    selectedFilter.value = "";
    searchQuery.value = "";
}

</script>
