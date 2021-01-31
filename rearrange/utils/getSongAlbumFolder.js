function getSongAlbumFolder(albumName, songComment) {
  if (!albumName && !songComment) return "No Album"

  const ALBUM_TYPES_DATA = [
    { albumTypeRegexToSearch: /(live|itunes session)/i, albumFolderName: "Live" },
    { albumTypeRegexToSearch: /demos?/i, albumFolderName: "Demos" },
    { albumTypeRegexToSearch: /remix(es)?/i, albumFolderName: "Remixes" },
    { albumTypeRegexToSearch: /unreleased/i, albumFolderName: "Unreleased" },
    {
      albumTypeRegexToSearch: /(compilations|(platinum)? ?collection|best of|essential|greatests? hits|the best|mixtape)/i,
      albumFolderName: "Compilations",
    },
    { albumTypeRegexToSearch: /( |-)?eps?/i, albumFolderName: "EPs" },
    { albumTypeRegexToSearch: /sing(le|el)/i, albumFolderName: "Singles" },
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
