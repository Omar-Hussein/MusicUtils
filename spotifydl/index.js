const { exec } = require("child_process")
const { musicRootFolder } = require("../global")
const { startDialog, optimizeFileName } = require("../utils")
const logObject = require("../utils/logObject")
const Spotify = require("./lib/Spotify")
const ora = require("ora")

function spotifydl() {
  startDialog({ question: `Enter Spotify link you want to download.` })
  process.stdin.on("data", async data => {
    console.log("\n")
    const inputURL = data.toString().trim()
    if (!inputURL.match(/open.spotify.com/)) return

    const spinner = ora("Searching...").start()

    const spotify = new Spotify(inputURL, spinner)

    await spotify.download(musicRootFolder)
    await require("../rearrange")()
    process.exit()
  })
}

module.exports = spotifydl
