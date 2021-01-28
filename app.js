const { startDialog, logBreak } = require("./utils")
const APP_FUNCTIONS = [
  // {
  //   functionDescription: 'Rename the music files to this form: "##. title.extension"',
  //   functionPath: "./app/rename-music-files",
  // },
  // { functionDescription: "Delete the images", functionPath: "./app/delete-images" },
  // { functionDescription: "Delete the ini files", functionPath: "./app/delete-ini" },
  // { functionDescription: "Rename the images to the parent folder", functionPath: "./app/rename-images" },
  // { functionDescription: "[not complete] Move all the files to the root folder", functionPath: "./app/move-to-root" },
  // {
  //   functionDescription: "Rename all the images to numbers and move them to the root folder",
  //   functionPath: "./app/move-images-to-root",
  // },
  // { functionDescription: "Info", functionPath: "./app/info" },
  {
    functionDescription: "Rearrange the music files but will delete the ini and images files.",
    functionPath: "./rearrange",
  },
  { functionDescription: "Download playlist/song from Spotify.", functionPath: "./spotifydl" },
]

startDialog({ question: `What to do? Write the index.`, options: APP_FUNCTIONS.map(x => x.functionDescription) })

let shouldHandleAnswer = true

process.stdin.on("data", data => {
  // Turn off listening to the entered data after selecting what to do.
  if (shouldHandleAnswer) {
    answer = parseInt(data.toString())
    handleAnswer(answer)
    shouldHandleAnswer = false
  }
  // process.exit()
})

function handleAnswer(answer) {
  /* Setting the answers */
  const isValidAnswer = typeof answer === "number" && answer !== NaN

  if (isValidAnswer) {
    logBreak()
    console.log(`Processing: ${APP_FUNCTIONS[answer].functionDescription}...\n`)
    require(APP_FUNCTIONS[answer].functionPath)()
  } else console.log(`  Error: Wrong input`)
}
