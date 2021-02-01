const { renameSync } = require("fs")
const { resolve } = require("path")
const { musicRootFolder, audioFilesFormat } = require("../global")
const {
  startDialog,
  getCurrentProcessPercentage,
  removeAllEmptyFolders,
  scanFiles,
  getCertainFiles,
  mkDirByPathSync,
  optimizeFileName,
} = require("../utils")
const { backup, removeNonAudioFiles, extractFileData, setDestFolder } = require("./utils")

const ora = require("ora")

async function rearrange() {
  const shouldBackup = await startDialog("Backup the files first?", { type: "confirm", defaultAnswer: false })

  const spinner = ora("Scanning files").start()
  const allFiles = scanFiles(musicRootFolder)
  if (shouldBackup) backup(allFiles, spinner)

  removeNonAudioFiles(allFiles, spinner)

  let musicFiles = getCertainFiles(allFiles, audioFilesFormat)

  spinner.stop()
  console.log("")
  spinner.info(`Rearranging ${musicFiles.length} music files`)
  spinner.start("Rearranging the files...")

  try {
    for (let [index, file] of musicFiles.entries()) {
      const fileData = ({ fileName, artist, track, title, ext } = await extractFileData(file))
      spinner.text = `${getCurrentProcessPercentage(index, musicFiles.length)}%   Moving: ${fileName}`

      const destFolder = setDestFolder(fileData)
      const renameFileTo = optimizeFileName(`${track}. ${title}.${ext}`)
      const destFile = resolve(destFolder, renameFileTo)

      // Checks first if the file already is in the right path
      if (file !== destFile) {
        mkDirByPathSync(destFolder) // Create all the full path if it doesn't exist
        renameSync(file, destFile) // Move the files to their folders
      }
    }

    spinner.text = "Removing empty folders..."
    removeAllEmptyFolders(musicRootFolder) // Delete the empty folders

    // Recreate the music root folder if it got deleted
    mkDirByPathSync(musicRootFolder)

    spinner.succeed(`Rearranged ${musicRootFolder}\n`)
  } catch (err) {
    console.log(err)
    spinner.fail(`${err.message}\n`)
  }
}

module.exports = rearrange
