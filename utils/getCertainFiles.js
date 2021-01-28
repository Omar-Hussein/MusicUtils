const getExtension = require("./getExtension")

/**
 * Filter an array of files to match a certin file extention
 * @param {[String]} files The array to filter from.
 * @param {String|RegExp} extension The file extention to filter to.
 */

function getCertainFiles(files, extension) {
  return files.filter(file => getExtension(file).match(extension))
}

module.exports = getCertainFiles
