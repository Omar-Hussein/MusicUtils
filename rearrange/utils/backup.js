const { copyFileSync } = require("fs")
const { resolve } = require("path")
const { musicRootFolder, backupFolder } = require("../../global")
const { mkDirByPathSync, removeAllEmptyFolders, getCurrentProcessPercentage } = require("../../utils")

function backup(files, spinner) {
  spinner.info(`Backing up ${files.length} files`)
  spinner.start("Starting backing the files...")

  for (const [index, file] of files.entries()) {
    let fileRelativeToRoot = file.slice(musicRootFolder.length + 1, file.length)
    let dest = resolve(backupFolder, fileRelativeToRoot)
    let destParentDir = dest.replace(/(\/|\\)[^\/\\]+$/, "")
    mkDirByPathSync(destParentDir) // Create the folder if it doesn't exist

    spinner.text = `${getCurrentProcessPercentage(index, files.length)}%  Backing up ${file}`
    spinner.render()

    copyFileSync(file, dest)
  }

  removeAllEmptyFolders(backupFolder)
  spinner.succeed("Backed up all files")
}

module.exports = backup
