const ROUTES = {
    ALBUM: 'https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums',
    ARTIST: 'https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists',
    SONG: 'https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs',
    PLAYLIST: 'https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists'
}

const URI_BASE = 'https://mmi.unilim.fr/';

const URI_YOUTUBE_THUMBNAIL = 'http://img.youtube.com/vi/'

const DETAIL_PATH = {
    ALBUM: '/albums/',
    ARTIST: '/artists/',
    SONG: '/songs/',
    PLAYLIST: '/playlists/'
}

const state = {
    albumsMostRecent: {
        detailPath: DETAIL_PATH.ALBUM,
        items: []
    },
    artistsToDiscover: {
        detailPath: DETAIL_PATH.ARTIST,
        items: []
    },
    artistDetail: []

}

const actions = {
    async fetchAlbumsMostRecent() {
        try {
            const response = await fetch(`${ROUTES.ALBUM}?page=1`);
            const albums = await response.json();
            return albums;
        }
        catch (err) {
            console.log(err);
        }

    },
    async fetchArtistsToDiscover() {
        try {
            const response = await fetch(`${ROUTES.ARTIST}?page=1`);
            const artists = await response.json();
            artists.forEach((artist) => {
                artist.image = './src/assets/user.svg';
            })

            return artists;
        }
        catch (err) {
            console.log(err);
        }
    },
    async fetchArtistDetail(id) {
        try {
            const response =  await fetch(`${ROUTES.ARTIST}/${id}`)
            const artist = await response.json();
            artist.image = '/src/assets/user.svg';
            const albums = []
            const songs = []

            for (const album of artist.albums) {
                albums.push(await this.fetchAlbum(`${URI_BASE}${album}`))
            }

            for(let song of artist.songs.slice(0, 3)) {
                songs.push(await this.fetchSong(`${URI_BASE}${song}`))
            }
    
            artist.albums = albums
            artist.songs = songs

            return artist;

        }
        catch (err) {
            console.log(err)
        }
    },
    async fetchAlbum(path) {
        try {
            const response = await fetch(path);
            const album = await response.json()
            return album
        }
        catch (err) {
            console.log(err);
        }
    },
    async fetchSong(path) {
        try {
            const response = await fetch(path);
            const song = await response.json()
            song.image = await this.fetchThumbnail(song)
            return song
        }
        catch (err) {
            console.log(err);
        }
    },
    async fetchThumbnail({youtube}) {
        const id = youtube.split('/')[4]
        const response = await fetch(`${URI_YOUTUBE_THUMBNAIL}${id}/0.jpg`)
        const uri_thumbnail =  response.url;
        return uri_thumbnail

    }
}

const store = {
    get albumsMostRecent () {
        return state.albumsMostRecent 
    },
    get artistToDiscover () { 
        return state.artistsToDiscover 
    },
    get artistDetail () {
        return state.artistDetail;
    },
    async INITIALIZE_HOME() {

        if (state.albumsMostRecent.items.length === 0) {
            await Promise.all([
                actions.fetchAlbumsMostRecent().then((albums) => {
                    state.albumsMostRecent.items = albums;
                }),
                actions.fetchArtistsToDiscover().then((artists) => {
                    state.artistsToDiscover.items = artists;
                })
            ])
        }
    },
    async INITIALIZE_ARTIST_DETAIL(id) {
        console.log(id, state.artistDetail[0]?.id);
        if (id !== state.artistDetail[0]?.id) {
          state.artistDetail = [];
        state.artistDetail.push(await actions.fetchArtistDetail(id));  
        }
        
    }
}

export default store;