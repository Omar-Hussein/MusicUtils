const mapTrackMetaData = require("./mapTrackMetaData")
const sanitizeAlbum = require("./sanitizeAlbum")

function mapAlbumMetaData(albumBody, tracks) {
  return {
    label: albumBody.label,
    ...sanitizeAlbum(albumBody),
    tracks: tracks.map(track => mapTrackMetaData(track, tracks, albumBody.album_type)),
  }
}

module.exports = mapAlbumMetaData
