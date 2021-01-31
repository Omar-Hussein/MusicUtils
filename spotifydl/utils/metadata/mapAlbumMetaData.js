const mapTrackMetaData = require("./mapTrackMetaData")

function mapAlbumMetaData(albumBody, tracks) {
  return {
    total_tracks: albumBody.total_tracks,
    tracks: tracks.map(track => ({
      label: albumBody.label,
      ...mapTrackMetaData({ ...track, album: albumBody }, tracks, albumBody.album_type),
    })),
  }
}

module.exports = mapAlbumMetaData
