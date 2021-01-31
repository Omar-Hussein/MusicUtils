const { statSync } = require("fs")

function createdDate(file) {
  return statSync(file).birthtime
}

module.exports = createdDate
