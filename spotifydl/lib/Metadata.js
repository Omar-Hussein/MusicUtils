const ffmetadata = require("ffmetadata")
const { createWriteStream, unlinkSync, renameSync } = require("fs")
const axios = require("axios")
const ffmpeg = require("fluent-ffmpeg")

class Metadata {
  constructor(metadata, songFileName) {
    this.metadata = metadata
    this.songFileName = songFileName
    this.coverFileName = this.songFileName.replace(/\.mp3/, ".jpg")
  }

  downloadCover() {
    return new Promise(async (resolve, reject) => {
      try {
        const writer = createWriteStream(this.coverFileName)
        const response = await axios.get(this.metadata.artwork_url, {
          responseType: "stream",
        })
        response.data.pipe(writer)
        writer.on("close", resolve)
      } catch (e) {
        reject(e)
      }
    })
  }

  write() {
    return new Promise((resolve, reject) => {
      const self = this

      ffmetadata.write(this.songFileName, { ...this.metadata, attachments: [this.coverFileName] }, {}, function (err) {
        if (err) return reject(err)
        const tempPath = self.songFileName.replace(/\.mp3$/, ".temp.mp3")
        const stream = ffmpeg(self.songFileName)
          .addOutputOptions("-i", self.coverFileName, "-map", "0:0", "-map", "1:0", "-c", "copy", "-id3v2_version", "3")
          .save(tempPath)

        stream.on("end", () => {
          unlinkSync(self.songFileName)
          renameSync(tempPath, self.songFileName)
          unlinkSync(self.coverFileName)

          return resolve()
        })
      })
    })
  }

  async merge() {
    await this.downloadCover()
    await this.write()
  }
}

module.exports = Metadata
