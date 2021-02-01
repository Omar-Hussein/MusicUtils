const { resolve } = require("path")

const SpotifyAPI = require("./SpotifyAPI")
const YouTube = require("./YouTube")
const Metadata = require("./Metadata")
const Cache = require("./Cache")

const { optimizeFileName, startDialog } = require("../../utils")
const getURLType = require("../utils/getURLType")

class Spotify {
  constructor(url, spinner) {
    this.url = url
    this.urlType = getURLType(url)
    this.musicData = null
    this.spinner = spinner
    this.spotifyApi = new SpotifyAPI()
  }

  async getID() {
    let token = await this.spotifyApi.setup()
    this.spotifyApi.setToken(token)
    return this.url.match(/(album|track|playlist|artist)\/(\w{22})\??/)[2]
  }

  async getMusicData() {
    const id = await this.getID(this.url)
    this.musicData = await this.spotifyApi[`extract${this.urlType}`](id)
  }

  async downloadTrack(outputDir, externalTrack) {
    if (this.urlType === "Track") this.spinner.info(`Saving the song to ${outputDir}`)

    const songName = externalTrack
      ? `${externalTrack.album_artist} - ${externalTrack.title}`
      : `${this.musicData.album_artist} - ${this.musicData.title}`
    const output = resolve(outputDir, `${optimizeFileName(songName)}.mp3`)

    const youtube = new YouTube()
    await youtube.downloadAudio(songName, output, this.spinner)

    const metadata = new Metadata(externalTrack || this.musicData, output)
    await metadata.merge(this.spinner)
    this.spinner.stop()
  }

  async downloadAlbumOrPlaylist(rootOutputDir) {
    const totalTracks = this.musicData.total_tracks
    const outputDir = resolve(
      rootOutputDir,
      optimizeFileName(
        this.urlType === "Album"
          ? `${this.musicData.tracks[0].album_artist} - ${this.musicData.tracks[0].album}`
          : this.musicData.playlist
      )
    )

    if (this.urlType !== "Track" && totalTracks > 1) this.spinner.info(`Total tracks: ${totalTracks}`)
    this.spinner.info(`Saving the ${this.urlType === "Album" ? "album" : "playlist"} to ${outputDir}`)

    const cache = new Cache(outputDir)
    let cacheCounter = cache.read()
    if (cacheCounter > 0) this.spinner.info("Continuing downloading from cache...")

    for (let i = cacheCounter; i < totalTracks; i++) {
      await this.downloadTrack(outputDir, this.musicData.tracks[i])
      cache.write(++cacheCounter)
      if (this.urlType !== "Track" && totalTracks > 1) {
        this.spinner.info(`Downloaded ${cacheCounter}/${totalTracks} tracks.`)
        this.spinner.succeed(`Downloaded ${this.musicData.tracks[i].title}.`)
      }
    }
  }

  async download(outputDir) {
    try {
      if (this.urlType === "Artist")
        return this.spinner.warn("To download an artist add their work to a playlist and download it.")
      if (!this.urlType) return this.spinner.warn("The entered URL is not valid.")

      await this.getMusicData()

      if (this.urlType === "Track") await this.downloadTrack(outputDir)
      else if (this.urlType.match(/Album|Playlist/)) await this.downloadAlbumOrPlaylist(outputDir)

      console.log("")
      this.spinner.succeed(`Downloaded ${this.urlType.toLocaleLowerCase()} to ${outputDir}\n`)
    } catch (e) {
      console.log("")
      this.spinner.fail(`Error while downloading: ${e.message}\n`)
      process.exit()
    }
  }
}

module.exports = Spotify
