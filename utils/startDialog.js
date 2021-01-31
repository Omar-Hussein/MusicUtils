const inquirer = require("inquirer")

async function startDialog(question, { defaultAnswer, options, validator }) {
  const enterSpotifyLinkQuestion = {
    type: options ? "list" : "input",
    name: "question",
    message: question,
    choices: options,
    default: defaultAnswer,
    validate: validator,
  }

  const { question: answer } = await inquirer.prompt([enterSpotifyLinkQuestion])
  return answer
}

module.exports = startDialog
