const { readdirSync, renameSync } = require("fs")
const { musicRootFolder, audioFilesFormat } = require("../global")
const { startDialog, removeAllEmptyFolders, scanFiles, getCertainFiles, mkDirByPathSync } = require("../utils")
const { backup, getCurrentProcessPercentage, removeNonAudioFiles, extractFileData, setDestFolder } = require("./utils")

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
    console.log(err.message)
  }

  spinner.text = "Removing empty folders..."
  removeAllEmptyFolders(musicRootFolder) // Delete the empty folders

  spinner.succeed(`Rearranged ${musicRootFolder}`)
  console.log("")
}

module.exports = rearrange
