const {
  fs,
  mm,
  allFiles,
  notFileNameFormat,
  audioFilesFormat,
  getCertinFiles,
  getExtension
} = require("./global")


async function renameMusicFiles () {
  let musicFiles = getCertinFiles(allFiles, audioFilesFormat) // Filter the music files
  let renamedSuccessfully = 0
  let errorsCount = 0
  let filesWErrors = []
  let errorMesseges = []
  
  try {
    for (let [index, file] of musicFiles.entries()) {
      let fileName = file.slice(file.lastIndexOf("\\") + 1, file.length)
      let metadata = await mm.parseFile(file)
      let ext = getExtension(file)
      let title = metadata.common.title
      let artist = metadata.common.artist
      let track = metadata.common.track.no || 1; if (0 < track && track < 10) track = `0${track}`
      let fileFolder = file.slice(0, file.lastIndexOf("\\"))
      let renameTo = `${track}. ${title}.${ext}`
      let dest = `${fileFolder}\\${renameTo}`

      process.stdout.write(`  ${Math.round((index/musicFiles.length) * 100)} %   Renaming: ${fileName}\r`)

      if (!title || !artist) {
        filesWErrors.push(file)
        errorsCount++
        throw new Error (`\n Error: The file "${file}" doesn't have a title or artist attributes.\n`)
      } else if (renameTo.match(notFileNameFormat)) {
        renameTo = renameTo.replace(notFileNameFormat, "_")
        dest = `${fileFolder}\\${renameTo}`
        fs.renameSync(file, dest)
        renamedSuccessfully++
      } else {
        fs.renameSync(file, dest)
        renamedSuccessfully++
      }
    }
  } catch (err) { errorsCount++; errorMesseges.push(err.message) }

  console.log(`\n\n  Renamed ${renamedSuccessfully} files. | Errors: ${errorsCount}\n`)
  if (filesWErrors.length > 0) {
    console.error(`  Files with errors:\n`)
    filesWErrors.forEach(filesWError => console.error(`    ${filesWError}\n`))
  }
  if (errorMesseges.length > 0) {
    console.error(`  Error:\n`)
    errorMesseges.forEach(errMsg => console.error(`    ${errMsg}\n`))
  }
}
renameMusicFiles()

module.exports = renameMusicFiles