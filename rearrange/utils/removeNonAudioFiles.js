const { unlinkSync } = require("fs")
const { audioFilesFormat } = require("../../global")
const { getExtension, getCurrentProcessPercentage } = require("../../utils")

function removeNonAudioFiles(files, spinner) {
  const filesToRemove = files.filter(file => !getExtension(file).match(audioFilesFormat))
  if (filesToRemove.length === 0) return

  spinner.info(`Removing ${filesToRemove.length} non audio files`)
  spinner.start("Removing non audio files...")

  filesToRemove.forEach((file, index, self) => {
    spinner.text = `${getCurrentProcessPercentage(index, self.length)}%  Removing ${file}`
    spinner.render()

    unlinkSync(file)
  })

  spinner.succeed("Removed non audio files")
}

module.exports = removeNonAudioFiles
