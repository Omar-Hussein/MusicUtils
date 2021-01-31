const { readdirSync, renameSync } = require("fs")
const { musicRootFolder, audioFilesFormat } = require("../global")
const { removeAllEmptyFolders, scanFiles, getCertainFiles, mkDirByPathSync } = require("../utils")
const { backup, getCurrentProcessPercentage, removeNonAudioFiles, extractFileData, setDestFolder } = require("./utils")

const ora = require("ora")
const spinner = ora("Scanning files").start()

async function rearrange() {
  const allFiles = scanFiles(musicRootFolder)

  // backup(allFiles, spinner)
  removeNonAudioFiles(allFiles, spinner)

  let musicFiles = getCertainFiles(allFiles, audioFilesFormat)

  spinner.info(`Rearranging ${musicFiles.length} music files`)
  spinner.start("Rearranging the files...")

  try {
    for (let [index, file] of musicFiles.entries()) {
      const fileData = ({ fileName, artist, track, title, ext } = await extractFileData(file))
      spinner.text = `${getCurrentProcessPercentage(index, musicFiles.length)}%   Moving: ${fileName}`

      const destFolder = setDestFolder(fileData)
      const renameFileTo = `${track}. ${title}.${ext}`
      const destFile = `${destFolder}\\${renameFileTo}`

      // Checks first if the file already is in the right path
      if (file !== destFile) {
        mkDirByPathSync(`\\${destFolder}`) // Create all the full path if it doesn't exist
        const existingFile = readdirSync(destFolder).filter(fileToCheck => fileToCheck === renameFileTo)
        if (existingFile.length > 0) renameFileTo = `${track}. ${title} - [${index}].${ext}`
        renameSync(file, destFile) // Move the files to their folders
      }
    }
  } catch (err) {
    console.log(err)
  }

  spinner.text = "Removing empty folders..."
  removeAllEmptyFolders(musicRootFolder) // Delete the empty folders

  spinner.succeed(`Rearranged ${musicRootFolder}`)
}

module.exports = rearrange
