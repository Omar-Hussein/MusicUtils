function getSongAlbumFolder(albumName, songComment) {
  if (!albumName && !songComment) return "No Album"

  const ALBUM_TYPES_DATA = [
    { albumTypeRegexToSearch: /\b(live|itunes session)\b/i, albumFolderName: "Live" },
    { albumTypeRegexToSearch: /\bdemos?\b/i, albumFolderName: "Demos" },
    { albumTypeRegexToSearch: /\bremix(es)?\b/i, albumFolderName: "Remixes" },
    { albumTypeRegexToSearch: /\bunreleased\b/i, albumFolderName: "Unreleased" },
    {
      albumTypeRegexToSearch: /\b(compilations|(platinum)? ?collection|best of|essential|greatests? hits|the best|mixtape)\b/i,
      albumFolderName: "Compilations",
    },
    { albumTypeRegexToSearch: /\b( |-)?eps?\b/gi, albumFolderName: "EPs" },
    { albumTypeRegexToSearch: /\bsing(le|el)\b/i, albumFolderName: "Singles" },
  ]

  const matchedTypeData = ALBUM_TYPES_DATA.find(albumTypeData =>
    songComment
      ? songComment.match(albumTypeData.albumTypeRegexToSearch)
      : albumName.match(albumTypeData.albumTypeRegexToSearch)
  )
  if (matchedTypeData) return matchedTypeData.albumFolderName
  else return "Albums"
}

module.exports = getSongAlbumFolder
