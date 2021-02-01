const ora = require("ora")
const { readdirSync, lstatSync, renameSync, copyFileSync, unlinkSync } = require("fs")
const { resolve } = require("path")
const { mainMusicFolder, musicRootFolder } = require("../global")
const {
  startDialog,
  scanFiles,
  removeAllEmptyFolders,
  mkDirByPathSync,
  getCurrentProcessPercentage,
} = require("../utils")

async function move() {
  const scannedMainMusicDir = await readdirSync(mainMusicFolder)
  const foldersToChooseFrom = [
    mainMusicFolder,
    ...scannedMainMusicDir
      .map(x => resolve(mainMusicFolder, x))
      .filter(x => lstatSync(x).isDirectory() && !x.match("Apps")),
  ]

  // Getting info from the user...
  const shouldRearrange = await startDialog(`Do you want to rearrange the files?`, { type: "confirm" })
  if (shouldRearrange) await require("../rearrange")()

  const folderToMoveTo = await startDialog("Select where to move the music files", {
    options: foldersToChooseFrom,
  })
  const confirm = await startDialog(`Are you sure you want to move the files to ${folderToMoveTo}`, { type: "confirm" })
  if (!confirm) return

  // Scanning the root folder to start moving
  console.log("")
  const spinner = ora("Moving files...").start()
  spinner.start("Scanning the folder to start moving...")
  const files = scanFiles(musicRootFolder)
  const filesCount = files.length
  if (filesCount === 0) return spinner.warn("No files found to move\n")

  spinner.info(`Moving ${filesCount} file${filesCount > 1 ? "s" : ""}`)
  spinner.text = "Moving files..."

  for (const [index, file] of files.entries()) {
    spinner.text = `${getCurrentProcessPercentage(index, filesCount)}% moving ${file}`
    spinner.render()

    const renameTo = file.replace(musicRootFolder, folderToMoveTo)

    // Create the full route if it doesn't exist
    mkDirByPathSync(renameTo.replace(/(\/|\\)[^\/\\]+$/, ""))
    try {
      renameSync(file, renameTo)
    } catch (e) {
      console.log({ e })
      console.log({ message: e.message })
      console.log({ code: e.code })
      if (e.code === "EXDEV") {
        copyFileSync(file, renameTo)
        unlinkSync(file)
      }
    }
  }

  spinner.text = "Removing empty folders..."

  // Delete the empty folders
  removeAllEmptyFolders(musicRootFolder)
  // Recreate the music root folder because it'll get deleted
  mkDirByPathSync(musicRootFolder)

  spinner.succeed(`Moved ${filesCount} files successfully`)
  console.log("")
}

module.exports = move
