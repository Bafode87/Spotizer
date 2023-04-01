<script setup>
import CardListComponent from '../components/CardListComponent.vue';
import NavbarComponent from './../components/NavbarComponent.vue'

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

const image = './src/assets/user.svg'


</script>

<template>
    <header>
        <h1>Spoti<span>zer</span></h1>
    </header>
    <main class="main__home">
        <h2>Accueil</h2>
        <h3>Albums</h3>
        <CardListComponent :data="albums" :detailPath="pathOfAlbums" />
        <h3>Artistes</h3>
        <CardListComponent :data="artists" :detailPath="pathOfArtists" :image="image" />
        <h3>Playlists</h3>
    </main>
    <NavbarComponent />
</template>