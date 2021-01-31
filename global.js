module.exports = {
  globalSourceFolderName: "src_files",
  musicRootFolder: `${__dirname}\\src_files\\run`,
  musicToSetTagsFolder: `${__dirname}\\src_files\\set_tags`,
  backupFolder: `${__dirname}\\src_files\\backup`,

  audioFilesFormat: /(ac3|m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|m3u|ra|ram|ogg|vorbis|wav|flac)$/i,
  imagesFilesFormat: /(gif|jpe?g|tiff|png)$/i,
}
