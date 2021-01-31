const sanitizeIfFeatured = require("./sanitizeIfFeatured")
const getTrackDiscsAndTracksInfo = require("./getTrackDiscsAndTracksInfo")
const sanitizeAlbum = require("./sanitizeAlbum")

function mapTrackMetaData(
  { name, artists, album, track_number: trackNumber, disc_number: discNumber },
  albumTracks,
  albumType
) {
  const { artistsToDisplay, albumArtist, trackTitle, albumTitle } = sanitizeIfFeatured(artists, name, album.name)

  const sharedData = {
    title: trackTitle,
    artist: artistsToDisplay,
    "DISPLAY ARTIST": artistsToDisplay,
  }

  const albumData = sanitizeAlbum(album, albumTitle, albumArtist)

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
