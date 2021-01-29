const SpotifyWebApi = require("spotify-web-api-node")
const mapMetaData = require("./utils/metadata/mapMetaData")

var spotifyApi = new SpotifyWebApi({
  clientId: "acc6302297e040aeb6e4ac1fbdfd62c3",
  clientSecret: "0e8439a1280a43aba9a5bc0a16f3f009",
})

module.exports = {
  spotifyApi,

  async setup() {
    return spotifyApi.clientCredentialsGrant().then(
      data => data.body["access_token"],
      err => {
        console.error("Something went wrong when retrieving an access token:", err.message)
        process.exit(-1)
      }
    )
  },

  async setToken(token) {
    spotifyApi.setAccessToken(token)
  },

  async extractTrack(trackId) {
    const trackData = await spotifyApi.getTrack(trackId)
    return mapMetaData(trackData)
  },

  async extractPlaylist(playlistId, extractedTracks = []) {
    const playlistData = await spotifyApi.getPlaylist(playlistId)
    const playlistTracks = await spotifyApi.getPlaylistTracks(playlistId, { offset: extractedTracks.length, limit: 50 })
    extractedTracks = [...extractedTracks, ...playlistTracks.body.items.map(item => item.track)]
    if (playlistTracks.body.next) return this.extractPlaylist(playlistId, extractedTracks)

    return mapMetaData(playlistData, extractedTracks)
  },

  async extractAlbum(albumId, extractedTracks = []) {
    const albumData = await spotifyApi.getAlbum(albumId)
    const albumTracks = await spotifyApi.getAlbumTracks(albumId, { offset: extractedTracks.length, limit: 50 })
    extractedTracks = [...extractedTracks, ...albumTracks.body.items]
    if (albumTracks.body.next) return this.extractAlbum(albumId, extractedTracks)

    return mapMetaData(albumData, extractedTracks)
  },
}
