<script setup>
import CarrousselComponent from './CarrousselComponent.vue';

async function getAlbums() {
    return fetch('https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums').then((albums) => {
        return albums.json();
    }).catch((error) => {
        console.log(error);
    });
}

async function getArtists() {
    return fetch('https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists').then((artists) => {
        return artists.json();
    }).catch((error) => {
        console.log(error);
    });
}

const albums = await getAlbums();
const artists = await getArtists();

const pathOfAlbums = '/albums/';
const pathOfArtists = '/artists/';

</script>

<template>
    <header>
        <h1>Spoti<span>zer</span></h1>
    </header>
    <main class="main__home">
        <h2>Accueil</h2>
        <h3>Albums</h3>
        <CarrousselComponent :data="albums" :path="pathOfAlbums" />
        <h3>Artistes</h3>
        <CarrousselComponent :data="artists" :path="pathOfArtists">
            <template #image>
                <img src="./../assets/user.svg" alt="Image de l'artiste" width="100" height="100">
            </template>
            <template #name="{ item }">
                <p class="artist__name">{{ item.name }}</p>
            </template>
        </CarrousselComponent>
        <h3>Playlists</h3>
    </main>
</template>