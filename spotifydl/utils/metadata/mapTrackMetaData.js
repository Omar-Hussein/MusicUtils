const sanitizeArtists = require("./sanitizeArtists")
const getTrackDiscsAndTracksInfo = require("./getTrackDiscsAndTracksInfo")
const sanitizeAlbum = require("./sanitizeAlbum")

function mapTrackMetaData(
  { name, artists, album, track_number: trackNumber, disc_number: discNumber },
  albumTracks,
  albumType
) {
  const sharedData = {
    name,
    artists: sanitizeArtists(artists),
  }

  const albumData = album && sanitizeAlbum(album)

  const trackCountData = getTrackDiscsAndTracksInfo(
    albumTracks,
    { trackNumber, discNumber },
    albumType || album?.album_type
  )

  return {
    ...sharedData,
    ...albumData,
    ...trackCountData,
  }
}
module.exports = mapTrackMetaData
