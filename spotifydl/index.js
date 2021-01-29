const { renameSync, unlinkSync } = require("fs")
const { exec } = require("child_process")
const { musicRootFolder } = require("../global")
const { startDialog } = require("../utils")

function spotifydl() {
  startDialog({ question: `Enter Spotify link you want to download.` })
  process.stdin.on("data", data => {
    const answer = data.toString().trim()
    if (!answer.match(/open.spotify.com/)) return
    console.log("\n  Downloading...")
    exec(`spotifydl ${answer} -o ${musicRootFolder}`, (error, stdout, stderr) => {
      if (error) return console.log("error", error)

      console.log(stderr)
      console.log("Downloaded successfully!")
      console.log("Moving to root folder...")
      console.log("Moved to root folder!")
      require("../rearrange")()
    })
  })
}

module.exports = spotifydl
