const SpotifyWebApi = require("spotify-web-api-node")
const mapMetaData = require("../utils/metadata/mapMetaData")

class SpotifyAPI {
  constructor() {
    this.clientId = "acc6302297e040aeb6e4ac1fbdfd62c3"
    this.clientSecret = "0e8439a1280a43aba9a5bc0a16f3f009"

    this.spotifyApi = new SpotifyWebApi({ clientId: this.clientId, clientSecret: this.clientSecret })
  }

  async setup() {
    return this.spotifyApi.clientCredentialsGrant().then(
      data => data.body["access_token"],
      error => console.error("Something went wrong when retrieving an access token:", error.message)
    )
  }

  async setToken(token) {
    this.spotifyApi.setAccessToken(token)
  }

  async extractTrack(trackId) {
    const trackData = await this.spotifyApi.getTrack(trackId)
    return mapMetaData(trackData)
  }

  async extractAlbum(albumId, extractedTracks = []) {
    const albumData = await this.spotifyApi.getAlbum(albumId)
    const albumTracks = await this.spotifyApi.getAlbumTracks(albumId, { offset: extractedTracks.length, limit: 50 })
    extractedTracks = [...extractedTracks, ...albumTracks.body.items]
    if (albumTracks.body.next) return this.extractAlbum(albumId, extractedTracks)

    return mapMetaData(albumData, extractedTracks)
  }

  async extractPlaylist(playlistId, extractedTracks = []) {
    const playlistData = await this.spotifyApi.getPlaylist(playlistId)
    const playlistTracks = await this.spotifyApi.getPlaylistTracks(playlistId, {
      offset: extractedTracks.length,
      limit: 50,
    })
    extractedTracks = [...extractedTracks, ...playlistTracks.body.items.map(item => item.track)]
    if (playlistTracks.body.next) return this.extractPlaylist(playlistId, extractedTracks)

    return mapMetaData(playlistData, extractedTracks)
  }
}

module.exports = SpotifyAPI
