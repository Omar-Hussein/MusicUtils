function sanitizeArtists(artists, joinOnly = false) {
  const separator = ", "

  if (joinOnly) return artists.join(separator)
  return artists.map(artist => artist.name).join(separator)
}

module.exports = sanitizeArtists
