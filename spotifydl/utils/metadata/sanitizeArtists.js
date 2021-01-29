function sanitizeArtists(artists) {
  return artists.map(artist => artist.name)
}

module.exports = sanitizeArtists
