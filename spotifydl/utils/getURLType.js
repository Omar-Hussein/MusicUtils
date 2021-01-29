function getURLType(url) {
  if (url.match(/\/track\//)) return "Track"
  if (url.match(/\/album\//)) return "Album"
  if (url.match(/\/playlist\//)) return "Playlist"
  if (url.match(/\/artist\//)) return "Artist"

  throw new Error(`Invalid spotify URL`)
}

module.exports = getURLType
