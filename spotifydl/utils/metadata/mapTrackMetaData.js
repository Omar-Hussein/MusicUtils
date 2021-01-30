const sanitizeArtists = require("./sanitizeArtists")
const getTrackDiscsAndTracksInfo = require("./getTrackDiscsAndTracksInfo")
const sanitizeAlbum = require("./sanitizeAlbum")

function mapTrackMetaData(
  { name, artists, album, track_number: trackNumber, disc_number: discNumber },
  albumTracks,
  albumType
) {
  const sharedData = {
    title: name,
    artist: sanitizeArtists(artists),
    "DISPLAY ARTIST": sanitizeArtists(artists),
  }

  const albumData = album && sanitizeAlbum(album)

  const { tracks, discs } = getTrackDiscsAndTracksInfo(
    albumTracks,
    { trackNumber, discNumber },
    albumType || album?.album_type
  )

  return {
    ...sharedData,
    ...albumData,
    track: `${trackNumber}${tracks ? `/${tracks}` : ""}`,
    disc: `${discNumber}${discs ? `/${discs}` : ""}`,
  }
}
module.exports = mapTrackMetaData
