const mapTrackMetaData = require("./mapTrackMetaData")
const sanitizeAlbum = require("./sanitizeAlbum")

function mapAlbumMetaData(albumBody, tracks) {
  return {
    total_tracks: albumBody.total_tracks,
    tracks: tracks.map(track => ({
      label: albumBody.label,
      ...sanitizeAlbum(albumBody),
      ...mapTrackMetaData(track, tracks, albumBody.album_type),
    })),
  }
}

module.exports = mapAlbumMetaData
