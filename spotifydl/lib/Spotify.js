const spotifyApi = require("../spotifyApi")
const YouTube = require("./YouTube")
const Metadata = require("./Metadata")
const Cache = require("./Cache")

const { optimizeFileName } = require("../../utils")
const getURLType = require("../utils/getURLType")

class Spotify {
  constructor(url, spinner) {
    this.url = url
    this.urlType = getURLType(url)
    this.musicData = null
    this.spinner = spinner
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
    if (this.urlType === "Track") this.spinner.info(`Saving Song to: ${outputDir}`)

    const songName = externalTrack
      ? `${externalTrack.album_artist} - ${externalTrack.title}`
      : `${this.musicData.album_artist} - ${this.musicData.title}`
    const output = `${outputDir}\\${optimizeFileName(songName)}.mp3`

    const youtube = new YouTube()
    await youtube.downloadAudio(songName, output, this.spinner)

    const metadata = new Metadata(externalTrack || this.musicData, output)
    await metadata.merge(this.spinner)
  }

  async downloadAlbumAndPlaylist(rootOutputDir) {
    const totalTracks = this.musicData.total_tracks
    const outputDir = `${rootOutputDir}\\${optimizeFileName(
      this.urlType === "Album"
        ? `${this.musicData.tracks[0].album_artist} - ${this.musicData.tracks[0].album}`
        : this.musicData.playlist
    )}`

    this.spinner.info(`Total Songs: ${totalTracks}`)
    this.spinner.info(`Saving ${this.urlType === "Album" ? "Album" : "Playlist"}: ${outputDir}`)

    const cache = new Cache(outputDir)
    let cacheCounter = cache.read()

    for (let i = cacheCounter; i < totalTracks; i++) {
      await this.downloadTrack(outputDir, this.musicData.tracks[i])
      cache.write(++cacheCounter)
    }
  }

  async download(outputDir) {
    try {
      if (this.urlType === "Artist") {
        this.spinner.warn("To download an artist add their work to a playlist and download it.")
        process.exit()
      }
      if (!this.urlType) throw new Error("Invalid URL type")

      await this.getMusicData()

      // Download single tracks
      if (this.urlType === "Track") await this.downloadTrack(outputDir)
      else if (this.urlType.match(/Album|Playlist/)) await this.downloadAlbumAndPlaylist(outputDir)

      console.log(`\nFinished.\n`)
    } catch (e) {
      console.log(`\n  ${e.message}\n`)
      process.exit()
    }
  }
}
module.exports = Spotify
