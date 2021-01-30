const { readdirSync } = require("fs")

const utils = readdirSync("./utils")
  .filter(util => util !== "index.js")
  .map(util => util.replace(/\.js$/, ""))

module.exports = utils.reduce((acc, util) => ({ ...acc, [util]: require(`./${util}`) }), {})
