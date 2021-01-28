const path = require("path")
const globalSourceFolderName = "src_files"
const musicRootFolder = path.resolve(`${__dirname}`, `.\\${globalSourceFolderName}\\run`)
const musicToSetTagsFolder = path.resolve(`${__dirname}`, `.\\${globalSourceFolderName}\\set_tags`)
const { scanFiles } = require("./utils")

const allFiles = scanFiles(musicRootFolder)

module.exports = {
  musicRootFolder,
  globalSourceFolderName,
  musicToSetTagsFolder,
  backupFolder: path.resolve(`${this.musicRootFolder}`, `..\\[Backup]`),
  allFiles,
  notFileNameFormat: /(\\|\||\?|\*|<|>|:|\/|"|\.$)/g,
  audioFilesFormat: /(ac3|m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|m3u|ra|ram|ogg|vorbis|wav|flac)$/i,
  imagesFilesFormat: /(gif|jpe?g|tiff|png)$/i,
}
