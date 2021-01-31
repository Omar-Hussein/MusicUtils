const sanitizeArtists = require("./sanitizeArtists")

function sanitizeAlbum(album, albumTitle, albumArtist) {
  albumTitle = albumTitle || album.name

  const isSingle = album.album_type === "single" && (!album.tracks || album.tracks.items.length === 1)
  const isEP = albumTitle.match(/\bEP\b/i) || (album.album_type === "single" && album.tracks?.items.length > 1)
  return {
    album: isSingle ? `${albumTitle} - Single` : isEP ? `${albumTitle} - EP` : albumTitle,
    album_artist: albumArtist || sanitizeArtists(album.artists),
    date: album.release_date,
    artwork_url: album.images[0].url,
  }
}

module.exports = sanitizeAlbum
