module.exports = function checkEnum(validValues, enteredValue) {
  validValues.forEach(validValue => {
    if (validValue !== enteredValue) throw new Error(`${enteredValue} is not a valid input.`)
  })
}
