const { startDialog, removeQueryFromLink } = require("../utils")
const Spotify = require("./lib/Spotify")
const ora = require("ora")

async function spotifydl() {
  const ENTER_LINK_METHODS = [
    "Enter a Spotify link directly.",
    "Enter a link to a local JSON file with the urls arrays",
  ]
  const linkMethodAnswer = await startDialog("How do you want to enter the link(s)?", { options: ENTER_LINK_METHODS })
  const linkMethodIndex = ENTER_LINK_METHODS.indexOf(linkMethodAnswer)

  let spotifyLink
  let jsonFilePath

  if (linkMethodIndex === 0)
    spotifyLink = await startDialog("Enter Spotify link you want to download", {
      validator: input => (!input.match(/open.spotify.com/) ? "Enter a valid Spotify link" : true),
      filter: input => removeQueryFromLink(input),
    })
  else if (linkMethodIndex === 1)
    jsonFilePath = await startDialog("Enter the JSON file path", {
      validator: input => (!input.match(/\.json$/i) ? "Enter a valid path to a JSON file" : true),
    })
  else throw new Error("Invalid answer!")

  const spinner = ora("Searching...").start()
  if (spotifyLink) await new Spotify(spotifyLink, spinner).download()
  else if (jsonFilePath) await new Spotify(null, spinner).downloadURLsArray(jsonFilePath)
}

module.exports = spotifydl
