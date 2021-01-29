const mapTrackMetaData = require("./mapTrackMetaData")
const mapAlbumMetaData = require("./mapAlbumMetaData")
const mapPlaylistMetaData = require("./mapPlaylistMetaData")

function mapMetaData(linkData, tracks) {
  const body = linkData.body
  const linkType = body.type // track|album|playlist
  if (linkType === "track") return mapTrackMetaData(body)
  if (linkType === "album") return mapAlbumMetaData(body, tracks)
  if (linkType === "playlist") return mapPlaylistMetaData(body, tracks)
}

module.exports = mapMetaData
