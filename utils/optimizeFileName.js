function optimizeFileName(fileName) {
  return fileName.replace(/(\\|\/|\||\?|\*|<|>|:|"|\.$)/g, "")
}
