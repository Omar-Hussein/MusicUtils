const path = require("path")

module.exports = {
  globalSourceFolderName: "src_files",
  musicRootFolder: path.resolve(`${__dirname}`, `.\\${this.globalSourceFolderName}\\run`),
  musicToSetTagsFolder: path.resolve(`${__dirname}`, `.\\${this.globalSourceFolderName}\\set_tags`),
  backupFolder: path.resolve(`${__dirname}`, `.\\${this.globalSourceFolderName}\\backup`),

  notFileNameFormat: /(\\|\||\?|\*|<|>|:|\/|"|\.$)/g,
  audioFilesFormat: /(ac3|m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|m3u|ra|ram|ogg|vorbis|wav|flac)$/i,
  imagesFilesFormat: /(gif|jpe?g|tiff|png)$/i,
}
