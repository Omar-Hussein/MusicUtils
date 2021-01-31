const sanitizeArtists = require("./sanitizeArtists")

function sanitizeAlbum(album) {
  const isSingle = album.album_type === "single" && album.tracks.items.length === 1
  const isEP = album.name.match(/\bEP\b/i) || (album.album_type === "single" && album.tracks.items.length > 1)
  return {
    album: isSingle ? `${album.name} - Single` : isEP ? `${album.name} - EP` : album.name,
    album_artist: sanitizeArtists(album.artists),
    date: album.release_date,
    artwork_url: album.images[0].url,
  }
}

module.exports = sanitizeAlbum
