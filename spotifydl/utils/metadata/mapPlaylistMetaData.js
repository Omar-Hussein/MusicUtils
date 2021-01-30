const mapTrackMetaData = require("./mapTrackMetaData")

function mapPlaylistMetaData(playlistBody, tracks) {
  return {
    playlist: playlistBody.name,
    tracks: tracks.map(track => mapTrackMetaData(track, tracks, "playlist")),
  }
}

module.exports = mapPlaylistMetaData
