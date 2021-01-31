const getExtension = require("./getExtension")

function getCertainFiles(files, extension) {
  return files.filter(file => getExtension(file).match(extension))
}

module.exports = getCertainFiles
