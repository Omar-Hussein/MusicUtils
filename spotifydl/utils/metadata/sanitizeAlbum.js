const sanitizeArtists = require("./sanitizeArtists")

function sanitizeAlbum(album) {
  return {
    album: album.album_type === "single" ? `${album.name} - Single` : album.name,
    albumArtists: sanitizeArtists(album.artists),
    releaseDate: album.release_date,
    artworkUrl: album.images[0].url,
  }
}

module.exports = sanitizeAlbum
