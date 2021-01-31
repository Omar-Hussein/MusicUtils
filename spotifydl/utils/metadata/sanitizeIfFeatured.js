const sanitizeArtists = require("./sanitizeArtists")

function sanitizeIfFeatured(artists, trackTitle, albumTitle) {
  const artistsNames = artists.map(artists => artists.name)
  const sanitizedArtists = sanitizeArtists(artists)
  const COLLABORATION_REG_EX = /\(((feat|with)[^\)]+)\)/
  const titleFeaturedArtistMatch = trackTitle.match(COLLABORATION_REG_EX)

  const artistsToDisplay = titleFeaturedArtistMatch
    ? `${sanitizeArtists(
        artistsNames.filter(x => !titleFeaturedArtistMatch[1].includes(x)),
        true
      )} ${titleFeaturedArtistMatch[1]}`
    : sanitizedArtists

  const albumArtist = artistsNames[0]

  const sanitizedTrackTitle = titleFeaturedArtistMatch
    ? trackTitle.replace(COLLABORATION_REG_EX, "").trim()
    : trackTitle

  const sanitizedAlbum = albumTitle.replace(COLLABORATION_REG_EX, "").trim()

  return {
    artistsToDisplay,
    artistsArray: artistsNames,
    joinedArtists: sanitizedArtists,
    albumArtist,
    trackTitle: sanitizedTrackTitle,
    albumTitle: sanitizedAlbum,
  }
}

module.exports = sanitizeIfFeatured
