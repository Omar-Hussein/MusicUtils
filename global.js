const { resolve } = require("path")

const globalSourceFolderName = process.env.SOURCE_FOLDER_NAME || "src_files"

module.exports = {
  globalSourceFolderName,
  musicRootFolder: resolve(__dirname, globalSourceFolderName, process.env.MUSIC_ROOT_FOLDER_NAME || "run"),
  musicToSetTagsFolder: resolve(__dirname, globalSourceFolderName, process.env.SET_TAGS_FOLDER_NAME || "set_tags"),
  backupFolder: resolve(__dirname, globalSourceFolderName, process.env.BACKUP_FOLDER_NAME || "backup"),

  mainMusicFolder: resolve(__dirname, process.env.MAIN_MUSIC_FOLDER || "../.."),

  audioFilesFormat: /(ac3|m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|m3u|ra|ram|ogg|vorbis|wav|flac)$/i,
  imagesFilesFormat: /(gif|jpe?g|tiff|png)$/i,
}
