const mapTrackMetaData = require("./mapTrackMetaData")

function mapPlaylistMetaData(_, tracks) {
  return {
    tracks: tracks.map(track => mapTrackMetaData(track, tracks, "playlist")),
  }
}

module.exports = mapPlaylistMetaData
