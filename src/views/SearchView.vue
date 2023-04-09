<template>
    <header class="search__header">
        <h2>Recherche</h2>
        <input v-on:keyup="search" type="text" id="search"  placeholder="Artistes, playlists, albums ou titres...">
        <div class="filters">
            <label class="button__filters">
                <input  type="radio" @click="setFilter" name="filters" value="ALBUM" checked> Albums   
            </label>
            <label class="button__filters">
              <input type="radio" @click="setFilter" name="filters" value="ARTIST"> Artistes  
            </label>
            <label class="button__filters">
              <input type="radio" @click="setFilter" name="filters" value="SONG"> Titres  
            </label>
        </div>
    </header>

    <main class="main__search">
        <Suspense>
            <CardListComponent :nodata="`Aucun résultat.`" :data="data" orientation="vertical" :detailPath="path"/>
            <template #fallback>
                    <div class="loading">Chargement...</div>
            </template>
        </Suspense>
    </main>
    <NavbarComponent />
</template>

<script setup>
    import store from '../store';
    import { defineAsyncComponent, ref } from 'vue';
    import NavbarComponent from './../components/NavbarComponent.vue'


    const CardListComponent = defineAsyncComponent(() => import('./../components/CardListComponent.vue'))

    let filter = 'ALBUM';
    let path = ref('/albums/')
    let data = ref(new Object)

    function setFilter() {
        const selectedButton = document.querySelector('input[name="filters"]:checked')
        filter = selectedButton.value;
        document.querySelector('#search').value = ''
        data.value = []
        path.value = store.detailPath[filter.toLocaleLowerCase()] ;
    }
    
 
    async function search(event) {

        data.value = await store.getAutocompletion(event, filter);

        if (event.target.value === "") {
            data.value = [];
        } 

        return data;
    }





</script>