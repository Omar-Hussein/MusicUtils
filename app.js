const { startDialog } = require("./utils")
const APP_FUNCTIONS = [
  { functionDescription: "Rearrange the music files.", functionPath: "./rearrange" },
  { functionDescription: "Download via Spotify link.", functionPath: "./spotifydl" },
]

main()
async function main() {
  const answer = await startDialog(`What to do?`, {
    defaultAnswer: 1,
    options: APP_FUNCTIONS.map(x => x.functionDescription),
  })
  const answerIndex = APP_FUNCTIONS.findIndex(x => x.functionDescription === answer)
  require(APP_FUNCTIONS[answerIndex].functionPath)()
}
