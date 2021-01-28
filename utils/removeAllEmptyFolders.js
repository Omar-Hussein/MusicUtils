const deleteEmpty = require("delete-empty")
const { resolve } = require("path")

function removeAllEmptyFolders(path = resolve(__dirname, "../")) {
  deleteEmpty.sync(path)
}

module.exports = removeAllEmptyFolders
