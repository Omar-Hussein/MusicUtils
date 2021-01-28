const path = require("path")
/**
 * Get a file extension
 * @param {String} file File to get the extinsion
 */
function getExtension(file) {
  let ext = path.extname(file || "").split(".")
  return ext[ext.length - 1]
}

module.exports = getExtension
