const { inspect } = require("util")

function logObject(toLog) {
  return console.log(inspect(toLog, { showHidden: true, depth: null, colors: true }))
}
module.exports = logObject
