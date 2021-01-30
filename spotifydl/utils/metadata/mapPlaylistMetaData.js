const mapTrackMetaData = require("./mapTrackMetaData")

function mapPlaylistMetaData(playlistBody, tracks) {
  return {
    playlist: playlistBody.name,
    total_tracks: playlistBody.tracks.total,
    tracks: tracks.map(track => mapTrackMetaData(track, tracks, "playlist")),
  }
}

module.exports = mapPlaylistMetaData
