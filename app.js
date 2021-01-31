const { startDialog } = require("./utils")
const APP_FUNCTIONS = [
  { functionDescription: "Download via Spotify link.", functionPath: "./spotifydl" },
  { functionDescription: "Rearrange the music files.", functionPath: "./rearrange" },
]

;(async function main() {
  const answer = await startDialog(`What to do?`, {
    options: APP_FUNCTIONS.map(x => x.functionDescription),
  })
  const answerIndex = APP_FUNCTIONS.findIndex(x => x.functionDescription === answer)
  await require(APP_FUNCTIONS[answerIndex].functionPath)()

  main()
})()
