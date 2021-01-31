const path = require("path")

function getExtension(file) {
  let ext = path.extname(file || "").split(".")
  return ext[ext.length - 1]
}

module.exports = getExtension
