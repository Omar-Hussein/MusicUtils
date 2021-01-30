const { exec } = require("child_process")
const { musicRootFolder } = require("../global")
const { startDialog, optimizeFileName } = require("../utils")
const logObject = require("../utils/logObject")
const Spotify = require("./lib/Spotify")

function spotifydl() {
  startDialog({ question: `Enter Spotify link you want to download.` })
  process.stdin.on("data", async data => {
    const inputURL = data.toString().trim()
    if (!inputURL.match(/open.spotify.com/)) return
    const spotify = new Spotify(inputURL)
    await spotify.download(musicRootFolder)
    // require("../rearrange")()
  })
}

module.exports = spotifydl
