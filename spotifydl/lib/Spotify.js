const spotifyApi = require("../spotify-api")

class Spotify {
  async getID(url) {
    let token = await spotifyApi.setup()
    spotifyApi.setToken(token)
    return url.match(/(album|track|playlist)\/(\w{22})\??/)[2]
  }

  getURLType(url) {
    if (url.match(/\/track\//)) return "Track"
    if (url.match(/\/album\//)) return "Album"
    if (url.match(/\/playlist\//)) return "Playlist"
    if (url.match(/\/artist\//)) return "Artist"

    throw new Error(`Invalid spotify URL`)
  }

  async getMusic(url) {
    const id = await this.getID(url)
    const urlType = this.getURLType(url)
    if (urlType === "Artist") throw new Error("Can't download an artist, yet!")
    return await spotifyApi[`extract${urlType}`](id)
  }
}
module.exports = Spotify
