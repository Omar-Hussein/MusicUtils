const mkDirByPathSync = require("./mkDirByPathSync")
const { musicRootFolder, musicToSetTagsFolder, backupFolder } = require("../global")

function createRootFolders() {
  ;[musicRootFolder, musicToSetTagsFolder, backupFolder].forEach(x => mkDirByPathSync(x))
}

module.exports = createRootFolders
