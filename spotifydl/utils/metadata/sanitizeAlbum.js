const sanitizeArtists = require("./sanitizeArtists")

function sanitizeAlbum(album) {
  return {
    album: album.album_type === "single" ? `${album.name} - Single` : album.name,
    album_artist: sanitizeArtists(album.artists),
    date: album.release_date,
    artwork_url: album.images[0].url,
  }
}

module.exports = sanitizeAlbum
