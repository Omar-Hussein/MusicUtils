// const ffmetadata = require("ffmetadata")
const { createWriteStream } = require("fs")
const axios = require("axios")
const ffmpeg = require("fluent-ffmpeg")

// const mergeMetadata = async (output, songdata, spinner, callback) => {
//   const cover = output.slice(0, output.length - 3) + "jpg"
//   getCover(songdata.cover_url, cover, function () {
//     var metadata = {
//       artist: songdata.artists,
//       album: songdata.album_name,
//       title: songdata.name,
//       date: songdata.release_date,
//       attachments: [cover],
//     }

//     // execSync(`ffmpeg -y -i \"${output}\" -i \"${cover}\" -c:a copy -c:v copy -map 0:0 -map 1:0 -id3v2_version 3 -metadata:s:v title="Album cover" -metadata:s:v comment="Cover (front)" \"${output}\"`);
//     ffmetadata.write(output, metadata, {}, function (err) {
//       if (err) {
//         throw new Error("Error writing Metadata!", err)
//       } else {
//         if (spinner) {
//           const tempPath = output.slice(0, output.length - 3) + "temp.mp3"
//           const stream = ffmpeg(output)
//             .addOutputOptions("-i", cover, "-map", "0:0", "-map", "1:0", "-c", "copy", "-id3v2_version", "3")
//             .save(tempPath)
//           stream.on("end", () => {
//             fs.unlinkSync(output)
//             fs.renameSync(tempPath, output)
//             fs.unlinkSync(cover)
//             spinner.succeed("Metadata Merged!")
//             if (typeof callback === "function") callback()
//           })
//         }
//       }
//     })
//   })
// }

class Metadata {
  constructor(metadata, songFileName) {
    this.metadata = metadata
    this.songFileName = songFileName
    this.coverFileName = this.songFileName.replace(/\.mp3/, ".jpg")
  }

  downloadCover() {
    return new Promise(async (resolve, reject) => {
      const writer = createWriteStream(this.coverFileName)
      const response = await axios.get(this.metadata.artworkUrl, {
        responseType: "stream",
      })
      response.data.pipe(writer)
      writer.on("close", resolve)
    })
  }

  async merge() {
    await this.downloadCover()
  }
}

module.exports = Metadata
