const { musicRootFolder } = require("../global")
const { startDialog } = require("../utils")
const Spotify = require("./lib/Spotify")
const ora = require("ora")

async function spotifydl() {
  const answer = await startDialog("Enter Spotify link you want to download.", {
    validator: input => (!input.match(/open.spotify.com/) ? "Enter a valid Spotify link" : true),
  })

  const spinner = ora("Searching...").start()
  const spotify = new Spotify(answer, spinner)
  await spotify.download(musicRootFolder)

  spotifydl()
}

module.exports = spotifydl
