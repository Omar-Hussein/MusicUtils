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
    if (this.urlType === "Artist") throw new Error("Can't download an artist, yet!")
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

  async downloadPlaylist(rootOutputDir) {
    const outputDir = `${rootOutputDir}\\${optimizeFileName(this.musicData.playlist)}`
    for (const track of this.musicData.tracks.entries()) {
      await this.downloadTrack(outputDir, track)
    }
  }

  async downloadAlbum() {
    console.log("\n\n  THAT'S AN ALBUM; NOT SET YET.")
  }
  async download(outputDir) {
    await this.getMusicData()

    // Download single tracks
    if (this.urlType === "Track") await this.downloadTrack(outputDir)
    else if (this.urlType === "Playlist") await this.downloadPlaylist(outputDir)
    else if (this.urlType === "Album") await this.downloadAlbum()
  }
}
module.exports = Spotify
