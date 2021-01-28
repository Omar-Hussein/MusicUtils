const fs = require("fs")
const path = require("path")

/**
 * Gets all the files in a folder without concedering the depth
 * @param {String} dir The root folder to scan
 * @param {[String]} fileList The array of the scaned files
 */
const scanFiles = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    fileList = fs.statSync(path.join(dir, file)).isDirectory()
      ? scanFiles(path.join(dir, file), fileList)
      : fileList.concat(path.join(dir, file))
  })
  return fileList
}

module.exports = scanFiles
