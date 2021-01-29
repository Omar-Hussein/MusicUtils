const spotifyApi = require("../spotify-api")
const getURLType = require("../utils/getURLType")

class Spotify {
  async getID(url) {
    let token = await spotifyApi.setup()
    spotifyApi.setToken(token)
    return url.match(/(album|track|playlist)\/(\w{22})\??/)[2]
  }

  async getMusic(url) {
    const id = await this.getID(url)
    const urlType = getURLType(url)
    if (urlType === "Artist") throw new Error("Can't download an artist, yet!")
    return await spotifyApi[`extract${urlType}`](id)
  }
}
module.exports = Spotify
