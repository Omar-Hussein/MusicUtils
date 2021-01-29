function removeQueryFromLink(url) {
  return url.replace(/\?.+/, "")
}

module.exports = removeQueryFromLink
