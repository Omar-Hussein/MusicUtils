const spotifyApi = require("../spotifyApi")
const YouTube = require("./YouTube")
const Metadata = require("./Metadata")
const Cache = require("./Cache")

const { optimizeFileName } = require("../../utils")
const getURLType = require("../utils/getURLType")

class Spotify {
  constructor(url) {
    this.url = url
    this.urlType = getURLType(url)
    this.musicData = null
  }

  async getID() {
    let token = await spotifyApi.setup()
    spotifyApi.setToken(token)
    return this.url.match(/(album|track|playlist|artist)\/(\w{22})\??/)[2]
  }

  async getMusicData() {
    const id = await this.getID(this.url)
    this.musicData = await spotifyApi[`extract${this.urlType}`](id)
  }

  async downloadTrack(outputDir, externalTrack) {
    const songName = externalTrack
      ? `${externalTrack.album_artist} - ${externalTrack.title}`
      : `${this.musicData.album_artist} - ${this.musicData.title}`
    const output = `${outputDir}\\${optimizeFileName(songName)}.mp3`

    const youtube = new YouTube()
    await youtube.downloadAudio(songName, output)

    const metadata = new Metadata(externalTrack || this.musicData, output)
    await metadata.merge()
  }

  async downloadAlbumAndPlaylist(rootOutputDir) {
    const outputDir = `${rootOutputDir}\\${optimizeFileName(
      this.urlType === "Album"
        ? `${this.musicData.tracks[0].album_artist} - ${this.musicData.tracks[0].album}`
        : this.musicData.playlist
    )}`

    const cache = new Cache(outputDir)
    let cacheCounter = cache.read()
    const totalTracks = this.musicData.total_tracks

    for (let i = cacheCounter; i < totalTracks; i++) {
      await this.downloadTrack(outputDir, this.musicData.tracks[i])
      cache.write(++cacheCounter)
    }
  }

  async download(outputDir) {
    if (this.urlType.match(/Track|Playlist|Album/)) await this.getMusicData()
    try {
      // Download single tracks
      if (this.urlType === "Track") await this.downloadTrack(outputDir)
      else if (this.urlType.match(/Album|Playlist/)) await this.downloadAlbumAndPlaylist(outputDir)
      else if (this.urlType === "Artist")
        throw new Error("To download an artist add their work to playlist and download it.")
      else throw new Error("Invalid URL type")

      console.log("finished!")
    } catch (e) {
      console.log(`\n  ${e.message}\n`)
      process.exit()
    }
  }
}
module.exports = Spotify
