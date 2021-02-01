const { startDialog } = require("./utils")
const APP_FUNCTIONS = [
  { description: "Download via Spotify link", path: "./spotifydl" },
  { description: "Rearrange music files", path: "./rearrange" },
  { description: "Move files to music folder", path: "./move" },
]

;(async function main() {
  const answer = await startDialog(`What to do?`, {
    options: APP_FUNCTIONS.map(x => x.description),
  })
  const answerIndex = APP_FUNCTIONS.findIndex(x => x.description === answer)
  await require(APP_FUNCTIONS[answerIndex].path)()

  main()
})()
