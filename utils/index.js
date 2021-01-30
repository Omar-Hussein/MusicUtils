const { readdirSync } = require("fs")

module.exports = readdirSync("./utils")
  .filter(util => util !== "index.js")
  .map(util => util.replace(/\.js$/, ""))
  .reduce((acc, util) => ({ ...acc, [util]: require(`./${util}`) }), {})
