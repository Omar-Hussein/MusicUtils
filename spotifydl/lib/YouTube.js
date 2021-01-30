const ytdl = require("ytdl-core")
const youtubeSearch = require("yt-search")
const ffmpeg = require("fluent-ffmpeg")

class YouTube {
  buildYTUrl(searchResult) {
    return searchResult.url.match("https://youtube.com")
      ? searchResult.url
      : `https://youtube.com/watch?v=${searchResult.videoId}`
  }

  async getLink(query) {
    try {
      const result = await youtubeSearch(query)
      return this.buildYTUrl(result.videos[0])
    } catch (error) {
      return error
    }
  }

  downloadAudio(query, output) {
    return new Promise(async (resolve, reject) => {
      const youtubeLink = await this.getLink(query)
      const download = ytdl(youtubeLink, { quality: "highestaudio" })

      console.log("started...")

      ffmpeg(download)
        .audioBitrate(256)
        .save(`${output}`)
        .format("mp3")
        .on("end", () => {
          console.log("downloaded")
          resolve()
        })
    })
  }
}

module.exports = YouTube
