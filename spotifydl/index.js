const { exec } = require("child_process")
const { musicRootFolder } = require("../global")
const { startDialog } = require("../utils")
const logObject = require("../utils/logObject")
const Spotify = require("./lib/Spotify")

function spotifydl() {
  startDialog({ question: `Enter Spotify link you want to download.` })
  process.stdin.on("data", async data => {
    const inputURL = data.toString().trim()
    if (!inputURL.match(/open.spotify.com/)) return
    const spotify = new Spotify()
    const urlMusicData = await spotify.getMusic(inputURL)
    logObject(urlMusicData)

    // console.log("\n  Downloading...")
    // exec(`spotifydl ${answer} -o ${musicRootFolder}`, (error, stdout, stderr) => {
    //   if (error) return console.log("error", error)

    //   console.log(stderr)
    //   console.log("Downloaded successfully!")
    //   console.log("Moving to root folder...")
    //   console.log("Moved to root folder!")
    //   require("../rearrange")()
    // })
  })
}

module.exports = spotifydl
