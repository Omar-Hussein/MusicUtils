const { readdirSync, statSync } = require("fs")
const { join } = require("path")

const scanFiles = (dir, fileList = []) => {
  readdirSync(dir).forEach(file => {
    fileList = statSync(join(dir, file)).isDirectory()
      ? scanFiles(join(dir, file), fileList)
      : fileList.concat(join(dir, file))
  })
  return fileList
}

module.exports = scanFiles
