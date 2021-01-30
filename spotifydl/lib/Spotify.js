const spotifyApi = require("../spotifyApi")
const YouTube = require("./YouTube")
const Metadata = require("./Metadata")

const { optimizeFileName } = require("../../utils")
const getURLType = require("../utils/getURLType")

class Spotify {
  constructor(url) {
    this.url = url
    this.urlType = getURLType(url)
    this.urlMusicData = null
  }

  async getID() {
    let token = await spotifyApi.setup()
    spotifyApi.setToken(token)
    return this.url.match(/(album|track|playlist|artist)\/(\w{22})\??/)[2]
  }

  async getMusicData() {
    const id = await this.getID(this.url)
    if (this.urlType === "Artist") throw new Error("Can't download an artist, yet!")
    this.urlMusicData = await spotifyApi[`extract${this.urlType}`](id)
  }

  /* Download */
  async download(outputDir) {
    await this.getMusicData()

    // Download single tracks
    if (this.urlType === "Track") {
      const songName = `${this.urlMusicData.artists[0]} - ${this.urlMusicData.name}`
      const output = `${outputDir}\\${optimizeFileName(songName)}.mp3`

      const youtube = new YouTube()
      await youtube.downloadAudio(songName, output)

      const metadata = new Metadata(this.urlMusicData, output)
      await metadata.merge()
    }
    process.exit()
  }
}
module.exports = Spotify
