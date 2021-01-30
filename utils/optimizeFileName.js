function optimizeFileName(fileName) {
  return fileName.replace(/(\\|\/|\||\?|\*|<|>|:|"|\.$)/g, "")
}

module.exports = optimizeFileName
