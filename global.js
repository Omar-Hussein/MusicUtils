const { resolve } = require("path")

module.exports = {
  globalSourceFolderName: "src_files",
  musicRootFolder: resolve(__dirname, "src_files", "run"),
  musicToSetTagsFolder: resolve(__dirname, "src_files", "set_tags"),
  backupFolder: resolve(__dirname, "src_files", "backup"),

  mainMusicFolder: resolve(__dirname, "..", ".."),

  audioFilesFormat: /(ac3|m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|m3u|ra|ram|ogg|vorbis|wav|flac)$/i,
  imagesFilesFormat: /(gif|jpe?g|tiff|png)$/i,
}
