const ROUTES = {
    ALBUM: 'https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums',
    ARTIST: 'https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists',
    SONG: 'https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs',
    PLAYLIST: 'https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists'
}

const URI_BASE = 'https://mmi.unilim.fr/';

const URI_YOUTUBE_THUMBNAIL = 'https://img.youtube.com/vi/'

const DETAIL_PATH = {
    ALBUM: '/albums/',
    ARTIST: '/artists/',
    SONG: '/songs/',
    PLAYLIST: '/playlists/'
}

const SEARCH_PARAMETERS = {
    ALBUM: 'title',
    ARTIST: 'name',
    SONG: 'title'
}
const CREATE_PLAYLIST_PATH = 'create-playlist'
const ADD_SONG_TO_PLAYLIST_PATH = '/add-song-to-playlist/'

const state = {
    albumsMostRecent: [],
    artistsToDiscover: [],
    artistDetail: new Map(),
    albumDetail: new Map(),
    songDetail: new Map(),
    detailPath: {
        album: DETAIL_PATH.ALBUM,
        artist: DETAIL_PATH.ARTIST,
        song: DETAIL_PATH.SONG,
        playlist: DETAIL_PATH.PLAYLIST
    },
    createPlaylistPath: CREATE_PLAYLIST_PATH,
    addSongToPlaylistPath: ADD_SONG_TO_PLAYLIST_PATH

}

const ARTIST_IMAGE = '/Spotizer/images/user.svg';
const actions = {
    async fetchAlbumsMostRecent() {
        try {
            const response = await fetch(`${ROUTES.ALBUM}?page=1`);
            return await response.json();
        } catch (err) {
            console.log(err);
        }

    },
    async fetchArtistsToDiscover() {
        try {
            const response = await fetch(`${ROUTES.ARTIST}?page=1`);
            const artists = await response.json();
            artists.forEach((artist) => {
                artist.image = ARTIST_IMAGE;
            })

            return artists;
        } catch (err) {
            console.log(err);
        }
    },
    async fetchArtistDetail(id) {
        try {
            const response = await fetch(`${ROUTES.ARTIST}/${id}`)
            const artist = await response.json();
            artist.image = ARTIST_IMAGE;
            const albums = [];
            const songs = [];

            for (const album of artist.albums) {
                albums.push(await this.fetchAlbum(`${URI_BASE}${album}`))
            }

            for (let song of artist.songs.slice(0, 3)) {
                songs.push(await this.fetchSong(`${URI_BASE}${song}`))
            }

            artist.albums = albums
            artist.songs = songs

            return artist;

        } catch (err) {
            console.log(err)
        }
    },
    async fetchAlbumDetail(id) {
        try {
            const response = await fetch(`${ROUTES.ALBUM}/${id}`);
            const album = await response.json();
            const artist = await this.fetchArtistDetail(album.artist.id);

            album.artist.image = ARTIST_IMAGE;
            album.artist.name = artist.name;

            return album;
        } catch (err) {
            console.log(err);
        }

    },
    async fetchSongDetail(id) {
        try {
            const response = await fetch(`${ROUTES.SONG}/${id}`);
            const song = await response.json();

            song.artist = await this.fetchArtist(`${URI_BASE}${song.artist}`);
            if (song.album) {
                song.album = await this.fetchAlbum(`${URI_BASE}${song.album}`);
            }
            return song;
        } catch (err) {
            console.log(err);
        }
    },
    async fetchAlbum(path) {
        try {
            const response = await fetch(path);
            return await response.json()
        } catch (err) {
            console.log(err);
        }
    },
    async fetchArtist(path) {
        try {
            const response = await fetch(path);
            return await response.json()
        } catch (err) {
            console.log(err);
        }
    },
    async fetchSong(path) {
        try {
            const response = await fetch(path);
            const song = await response.json()
            song.image = this.fetchThumbnail(song)
            return song
        } catch (err) {
            console.log(err);
        }
    },
    fetchThumbnail({youtube}) {
        const id = youtube.split('/')[4]
        return `${URI_YOUTUBE_THUMBNAIL}${id}/0.jpg`

    },
    async fetchAutocompletion(event, filter) {
        let currentPage = 1;
        let allResults = [];

        while (true) {
            const response = await fetch(`${ROUTES[filter]}?page=${currentPage}&${SEARCH_PARAMETERS[filter]}=${event.target.value.trim()}`);
            const data = await response.json();

            if (data.length === 0) {
                break;
            }

            if (filter === 'ARTIST') {
                console.log('oui');
                for (const artist in data) {
                    data[artist].image = ARTIST_IMAGE
                    console.log(data[artist]);
                }
            }

            if (filter === 'SONG') {
                for (const song in data) {
                    data[song].image = this.fetchThumbnail(data[song])
                }
            }

            if(allResults.length > 8) {
                break;
            }

            allResults = allResults.concat(data);
            currentPage++;
        }
        return allResults.slice(0,8);
    },
    async createPlaylist(name) {
        try {
            const response = await fetch(`${ROUTES.PLAYLIST}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name})
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },
    async fetchPlaylistDetail(id) {
        try {
            const response = await fetch(`${ROUTES.PLAYLIST}/${id}`)
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    }
}

const store = {
    get albumsMostRecent() {
        return state.albumsMostRecent
    },
    get artistToDiscover() {
        return state.artistsToDiscover
    },
    get detailPath() {
        return state.detailPath;
    },
    get addSongToPlaylistPath() {
        return state.addSongToPlaylistPath;
    },
    get createPlaylistPath() {
        return state.createPlaylistPath;
    },
    getArtistDetail({id}) {
        return state.artistDetail.get(id);
    },
    getAlbumDetail({id}) {

        return state.albumDetail.get(id)
    },
    getSongDetail({id}) {

        return state.songDetail.get(id)
    },
    getAutocompletion(event, filter) {
        return actions.fetchAutocompletion(event, filter)
    },
    async INITIALIZE_HOME() {

        if (state.albumsMostRecent.length === 0) {
            await Promise.all([
                actions.fetchAlbumsMostRecent().then((albums) => {
                    state.albumsMostRecent = albums;
                }),
                actions.fetchArtistsToDiscover().then((artists) => {
                    state.artistsToDiscover = artists;
                })
            ])
        }
    },
    async INITIALIZE_ARTIST_DETAIL({id}) {
        if (!state.artistDetail.has(id)) {
            state.artistDetail.set(id, await actions.fetchArtistDetail(id));
        }

    },
    async INITIALIZE_ALBUM_DETAIL({id}) {
        if (!state.albumDetail.has(id)) {
            state.albumDetail.set(id, await actions.fetchAlbumDetail(id));
        }

    },
    async INITIALIZE_SONG_DETAIL({id}) {
        if (!state.songDetail.has(id)) {
            state.songDetail.set(id, await actions.fetchSongDetail(id));
        }
    },
    async createPlaylist(value) {
        try {
            const playlist = await actions.createPlaylist(value);
            const playlistsIdsFromLocalStorage = JSON.parse(localStorage.getItem('playlists')) || [];
            playlistsIdsFromLocalStorage.push(playlist.id);
            localStorage.setItem('playlists', JSON.stringify(playlistsIdsFromLocalStorage));
        } catch (error) {
            console.error(error);
        }
    },
    getPlaylists() {
        const playlistsIdsFromLocalStorage = JSON.parse(localStorage.getItem('playlists'));

        if (!playlistsIdsFromLocalStorage) {
            return [];
        } else {
            const playlists = playlistsIdsFromLocalStorage.map(async (id) => {
                return await actions.fetchPlaylistDetail(id);
            });

            return Promise.all(playlists);
        }
    }
}

export default store;
