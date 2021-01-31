const ytdl = require("ytdl-core")
const youtubeSearch = require("yt-search")
const ffmpeg = require("fluent-ffmpeg")

class YouTube {
  buildYTUrl(searchResult) {
    return searchResult.url.includes("https://youtube.com")
      ? searchResult.url
      : `https://youtube.com${searchResult.url}`
  }

  async getLink(query) {
    try {
      const result = await youtubeSearch(query)
      return this.buildYTUrl(result.videos[0])
    } catch (_) {
      try {
        const result = await youtubeSearch(query.replace(/-/, " "))
        return this.buildYTUrl(result.videos[0])
      } catch (error) {
        return error
      }
    }
  }

  downloadAudio(query, output, spinner) {
    return new Promise(async (resolve, reject) => {
      console.log("")
      spinner.start(`Retrieving data for ${query}...`)
      const youtubeLink = await this.getLink(query)
      const download = ytdl(youtubeLink, { quality: "highestaudio" })

      download.on("progress", (_, downloaded, total) => {
        spinner.text = `Downloading ${query} (${(downloaded / 1024 / 1024).toFixed(2)}MB/${(
          total /
          1024 /
          1024
        ).toFixed(2)}MB)\n`
      })

      ffmpeg(download)
        .audioBitrate(256)
        .save(`${output}`)
        .format("mp3")
        .on("end", () => {
          resolve()
        })
    })
  }
}

module.exports = YouTube
