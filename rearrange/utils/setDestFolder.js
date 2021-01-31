const getSongAlbumFolder = require("./getSongAlbumFolder")
const { optimizeFileName } = require("../../utils")
const { musicRootFolder } = require("../../global")

function setDestFile({ title, artist, album, albumDisks, comment, year }) {
  // Setting variables to set the directory
  const currentDirForm = {
    folder: getSongAlbumFolder(album, comment && comment[0]),
    disks: albumDisks && parseInt(albumDisks) > 1,
    hasAlbumsFolder: true,
  }
  if (!year || year > new Date().getFullYear() + 1 || year < 1000) year = `0000`

  // Determine if the file needs an album folder or not
  if (currentDirForm.folder.match(/(No Album|Unreleased)/i)) currentDirForm.hasAlbumsFolder = false

  // What to do if any data is not set
  if (!artist || !title || !album) {
    if (!artist) {
      artist = `Unknown`
      currentDirForm.folder = `No Album`
      currentDirForm.hasAlbumsFolder = false
    } else if (!title) title = `No Title`
  }

  // Optimizing the (artist, album and title) to be suitable fot a folder|file name
  artist = optimizeFileName(artist)
  album = optimizeFileName(album)
  title = optimizeFileName(title)

  // If it's more than one artist
  artist = artist.replace(/\u0000/gi, " & ")

  // Sets the dest format
  const singleOrEPRegExp = / ?( |-|\(|\[) ?(ep|sing(le|el)(s|es)?(.+)?)/i

  album = album.replace(singleOrEPRegExp, "") // Delete the `EP`or `Single` strings if exists in the folder name

  if (!currentDirForm.hasAlbumsFolder) return `${musicRootFolder}\\${artist}\\${currentDirForm.folder}`
  if (currentDirForm.disks)
    return `${musicRootFolder}\\${artist}\\${currentDirForm.folder}\\[${year}] ${album}\\CD ${disk}`
  if (!currentDirForm.disks) return `${musicRootFolder}\\${artist}\\${currentDirForm.folder}\\[${year}] ${album}`
}

module.exports = setDestFile
