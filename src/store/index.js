const API_URLS = {
    // PLAYLISTS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/",
    ALBUMS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums",
    // SONGS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs",
    ARTISTS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists",
};

const store = { 
    state: {
        mostListenedAlbums: {
            pathOfDetails: '/albums/',
            items: [],
            title: 'Albums les plus écoutés'
        },
        mostStreamedTitles: {
            pathOfDetails: '/songs/',
            items: [],
            title: 'Titres les plus streamés'
        },
        artistsToDiscover: {
            pathOfDetails: '/artists/',
            items: [],
            title: 'Artistes à découvrir'
        }
    },
    async initialize() {
        
    },
    async getMostListenedAlbums() {
        try {
            const response = await fetch(`${API_URLS.ALBUMS}?page=1`);
            let albums = await response.json();
            albums.forEach((album) => {
                album.details 
            })
            
        }
        return fetch(`${API_URLS.ALBUMS}?page=1`) .then((albums) => {
            return albums.json();
        }).catch((error) => {
            console.log(error);
        });
    },
    // async getArtistsToDiscover() {
    //     return fetch(`${API_URLS.ARTISTS}?page=1`).then((artists) => {
    //         return artists.json();
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // },
    // async getSongs() {
    //     return fetch('https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs').then((songs) => {
    //         return songs.json();
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }
    
}

export default store;