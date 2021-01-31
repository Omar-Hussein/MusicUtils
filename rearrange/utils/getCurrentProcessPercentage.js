function getCurrentProcessPercentage(index, arrayLength) {
  return Math.ceil(((index + 1) / arrayLength) * 100)
}

module.exports = getCurrentProcessPercentage
