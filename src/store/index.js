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

const ARTIST_IMAGE = '/Spotizer/images/user.svg';
const PLAYLIST_IMAGE = '/Spotizer/images/playlist.svg';

const ADD_SONG_TO_PLAYLIST_PATH = '/add-song-to-playlist/'

const state = {
    albumsMostRecent: [],
    artistsToDiscover: [],
    playlists: [],
    artistDetail: new Map(),
    albumDetail: new Map(),
    songDetail: new Map(),
    detailPath: {
        album: DETAIL_PATH.ALBUM,
        artist: DETAIL_PATH.ARTIST,
        song: DETAIL_PATH.SONG,
        playlist: DETAIL_PATH.PLAYLIST
    },
    addSongToPlaylistPath: ADD_SONG_TO_PLAYLIST_PATH,
    playlistDetail: new Map(),
}


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
    async fetchPlaylist() {
        const localStoragePlaylist = JSON.parse(localStorage.getItem('playlists'));

        if (!localStoragePlaylist) {
            return [];
        } else {
            const reversedPlaylist = localStoragePlaylist.reverse(); // Reverse the order
            const playlists = reversedPlaylist.map(async (id) => {
                return await actions.fetchPlaylistDetail(id);
            });

            return Promise.all(playlists);
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

            if (allResults.length > 8) {
                break;
            }

            allResults = allResults.concat(data);
            currentPage++;
        }
        return allResults.slice(0, 8);
    },
    async fetchPlaylistDetail(id) {
        try {
            const response = await fetch(`${ROUTES.PLAYLIST}/${id}`)
            const playlist = await response.json();
            playlist.image = PLAYLIST_IMAGE;
            playlist.songs = await Promise.all(playlist.songs.map(async (song) => {
                return await this.fetchSongDetail(song.id)
            }))
            return playlist;
        } catch (err) {
            console.log(err)
        }
    },
    async fetchCreatePlaylist(name) {
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
    async updatePlaylist(playlistId, songId) {
        try {
            const playlist = await this.fetchPlaylistDetail(playlistId);
            const songIds = playlist.songs.map(song => song.id);
            songIds.push(songId);

            return await fetch(`${ROUTES.PLAYLIST}/${playlistId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    songs: songIds.map(id => `/~morap01/L250/public/index.php/api/songs/${id}`)
                })
            });
        } catch (err) {
            console.error(err);
        }
    },
    async removeSongFromPlaylist(playlistId, songId) {
        try {
            const playlist = await this.fetchPlaylistDetail(playlistId);
            const songIds = playlist.songs.map(song => song.id);
            const index = songIds.indexOf(songId);
            songIds.splice(index, 1);

            return await fetch(`${ROUTES.PLAYLIST}/${playlistId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    songs: songIds.map(id => `/~morap01/L250/public/index.php/api/songs/${id}`)
                })
            });
        } catch (err) {
            console.error(err);
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
    get playlists() {
        return state.playlists;
    },
    get addSongToPlaylistPath() {
        return state.addSongToPlaylistPath;
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
    async INITIALIZE_PLAYLISTS() {
        state.playlists = await actions.fetchPlaylist();
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
            const playlist = await actions.fetchCreatePlaylist(value);
            const playlistsIdsFromLocalStorage = JSON.parse(localStorage.getItem('playlists')) || [];
            playlistsIdsFromLocalStorage.push(playlist.id);
            localStorage.setItem('playlists', JSON.stringify(playlistsIdsFromLocalStorage));
            return playlist;
        } catch (error) {
            console.error(error);
        }
    },
    updatePlaylist(playlistId, songId) {
        return actions.updatePlaylist(playlistId, songId);

    },
    async INITIALIZE_PLAYLIST_DETAIL({id}) {
        state.playlistDetail.set(id, await actions.fetchPlaylistDetail(id));
    },
    getPlaylistDetail({id}) {
        return state.playlistDetail.get(id);
    },
    removeSongFromPlaylist(id, songId) {
        return actions.removeSongFromPlaylist(id, songId);
    }
}

export default store;
