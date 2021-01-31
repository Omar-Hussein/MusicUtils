const mm = require("music-metadata")
const { getExtension } = require("../../utils")

async function getMetadata(file) {
  const metadata = await mm.parseFile(file)
  const tags = metadata.common
  const track = parseInt(tags.track.no) || 1
  const albumTracks = parseInt(tags.track.of)

  return {
    ext: getExtension(file),
    fileName: file.slice(file.lastIndexOf("\\") + 1, file.length),
    title: tags.title?.trim(),
    artist: tags.albumartist?.trim(),
    album: tags.album?.trim(),
    year: parseInt(tags.year),
    comment: tags.comment,
    track: 0 < track && track < 10 ? `0${track}` : track,
    albumTracks: albumTracks && 0 < albumTracks && albumTracks < 10 ? `0${albumTracks}` : albumTracks,
    disk: parseInt(tags.disk.no) || 1,
    albumDisks: parseInt(tags.disk.of) || 1,
  }
}

module.exports = getMetadata
