const fs = require("fs")

function createdDate(file) {
  return fs.statSync(file).birthtime
}

module.exports = createdDate
