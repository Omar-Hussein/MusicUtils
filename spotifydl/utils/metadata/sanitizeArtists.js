function sanitizeArtists(artists) {
  return artists.map(artist => artist.name).join(", ")
}

module.exports = sanitizeArtists
