const { readdirSync } = require("fs")

module.exports = readdirSync(__dirname)
  .filter(util => util !== "index.js")
  .map(util => util.replace(/\.js$/, ""))
  .reduce((acc, util) => ({ ...acc, [util]: require(`./${util}`) }), {})
