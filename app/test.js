const path = require("path")
const { musicRootFolder, backupFolder, allFiles } = require("./global")


for (file of allFiles) {
  let fileRelativeToRoot = file.slice(musicRootFolder.length + 1, file.length)
  let dest = path.resolve(backupFolder, fileRelativeToRoot)


  console.log(dest)
}
