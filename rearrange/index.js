const fs = require("fs")
const path = require("path")
const mm = require("music-metadata")

const { notFileNameFormat, musicRootFolder, backupFolder, audioFilesFormat } = require("../global")
const { removeAllEmptyFolders, scanFiles, getExtension, getCertainFiles, mkDirByPathSync } = require("../utils")

const allFiles = scanFiles(musicRootFolder)

function backUpAllFiles() {
  allFiles.forEach((file, index, self) => {
    let fileRelativeToRoot = file.slice(musicRootFolder.length + 1, file.length)
    let dest = path.resolve(backupFolder, fileRelativeToRoot)
    let destParentDir = dest.slice(0, dest.lastIndexOf(`\\`))
    mkDirByPathSync(`\\${destParentDir}`) // Create the folder if it doesn't exist
    process.stdout.write(`  ${getCurrentProcessPercentage(index, self.length)} %  Backing up the files...\r`)
    fs.copyFileSync(file, dest)
  })
  removeAllEmptyFolders(backupFolder)
}
function getMusicFile() {
  return getCertainFiles(allFiles, audioFilesFormat)
}

function getCurrentProcessPercentage(index, arrayLength) {
  return Math.ceil(((index + 1) / arrayLength) * 100)
}

function removeNonAudioFiles() {
  allFiles
    .filter(file => !getExtension(file).match(audioFilesFormat))
    .forEach((file, index, self) => {
      process.stdout.write(`  ${getCurrentProcessPercentage(index, self.length)} %  Deleting none audio files...\r`)
      fs.unlinkSync(file)
    })
}

/* Song Utils */
function getSongAlbumFolder(albumName, songComment) {
  if (!albumName && !songComment) return "No Album"

  const ALBUM_TYPES_DATA = [
    { albumTypeRegexToSearch: /(live|itunes session)/i, albumFolderName: "Live" },
    { albumTypeRegexToSearch: /demos?/i, albumFolderName: "Demos" },
    { albumTypeRegexToSearch: /remix(es)?/i, albumFolderName: "Remixes" },
    { albumTypeRegexToSearch: /unreleased/i, albumFolderName: "Unreleased" },
    {
      albumTypeRegexToSearch: /(compilations|(platinum)? ?collection|best of|essential|greatests? hits|the best|this is |mixtape)/i,
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

function optimizeForFileName(nameToOptimize) {
  if (nameToOptimize && nameToOptimize.match(notFileNameFormat)) return nameToOptimize.replace(notFileNameFormat, "_")
  return nameToOptimize
}

function getDestFolder(currentDirForm, artist, album, year, disk, track, title, ext) {
  let dest = ""
  const singleOrEPRegExp = / ?( |-|\(|\[) ?(ep|sing(le|el)(s|es)?(.+)?)/i

  album = album.replace(singleOrEPRegExp, "") // Delete the `EP`or `Single` strings if exists in the folder name

  if (!currentDirForm.hasAlbumsFolder) dest = `${musicRootFolder}\\${artist}\\${currentDirForm.folder}`
  else if (currentDirForm.disks)
    dest = `${musicRootFolder}\\${artist}\\${currentDirForm.folder}\\[${year}] ${album}\\CD ${disk}`
  else if (!currentDirForm.disks) dest = `${musicRootFolder}\\${artist}\\${currentDirForm.folder}\\[${year}] ${album}`
  return dest
}

async function rearrange() {
  let musicFiles = getMusicFile()

  let movedSuccessfully = 0
  let errorsCount = 0
  let hadMissingData = 0
  let filesWErrors = []
  let errorMessages = []

  // backUpAllFiles()
  removeNonAudioFiles()

  try {
    for (let [index, file] of musicFiles.entries()) {
      let dest
      let ext = getExtension(file)
      let fileName = file.slice(file.lastIndexOf("\\") + 1, file.length)

      let metadata = await mm.parseFile(file)
      let tags = metadata.common
      let title = tags.title ? tags.title.trim() : tags.title
      let artist = tags.albumartist ? tags.albumartist.trim() : tags.artist ? tags.artist.trim() : tags.artist
      let album = tags.album ? tags.album.trim() : tags.album
      let year = parseInt(tags.year)
      let comment = tags.comment
      let track = parseInt(tags.track.no) || 1
      if (0 < track && track < 10) track = `0${track}`
      let albumTrackNum = parseInt(tags.track.of)
      if (albumTrackNum && 0 < albumTrackNum && albumTrackNum < 10) albumTrackNum = `0${albumTrackNum}`
      let disk = parseInt(tags.disk.no) || 1
      let albumDisks = parseInt(tags.disk.of) || 1

      // Setting variables to set the directory
      let currentDirForm = { folder: null, disks: false, hasAlbumsFolder: true }
      if (albumDisks && parseInt(albumDisks) > 1) currentDirForm.disks = true // Set whether you create a folder for the disks or not
      if (!year || year > new Date().getFullYear() + 1 || year < 1800) year = `0000` // Set the year to `0000` if it's not suitable

      process.stdout.write(`  ${getCurrentProcessPercentage(index, musicFiles.length)} %   Processing: ${fileName}\r`)

      // Set The folder
      currentDirForm.folder = getSongAlbumFolder(album, comment && comment[0])

      // Determine if the file needs an album folder or not
      if (currentDirForm.folder.match(/(No Album|Unreleased)/i)) currentDirForm.hasAlbumsFolder = false

      // What to do if the data is not set
      if (!artist || !title || !album) {
        if (!artist) {
          artist = `Unknown`
          currentDirForm.folder = `No Album`
          currentDirForm.hasAlbumsFolder = false
        } else if (!title) title = `No Title`
        hadMissingData++
      }

      // Optimizing the (artist, album and title) to be suitable fot a folder|file name
      artist = optimizeForFileName(artist)
      album = optimizeForFileName(album)
      title = optimizeForFileName(title)

      // If it's more than one artist
      if (artist.match(/\u0000/gi)) artist = artist.replace(/\u0000/gi, " & ")

      // Sets the dest format
      dest = getDestFolder(currentDirForm, artist, album, year, disk, track, title, ext)

      let renameFileTo = `${track}. ${title}.${ext}`

      // Checks first if the file already is in the right path
      if (file !== `${dest}\\${renameFileTo}`) {
        mkDirByPathSync(`\\${dest}`) // Create all the full path if it doesn't extist
        let existingFile = fs.readdirSync(dest).filter(fileToCheck => fileToCheck === renameFileTo)
        if (existingFile.length > 0) renameFileTo = `${track}. ${title} - [${index}].${ext}`
        fs.renameSync(file, `${dest}\\${renameFileTo}`) // Move the files to their folders
      }
      movedSuccessfully++
    }
  } catch (err) {
    console.log(err)
    errorsCount++
    errorMessages.push(err.message)
  }

  removeAllEmptyFolders(musicRootFolder) // Delete the empty folders

  console.log(`\r

    \r  Done:
    \r    Moved ${movedSuccessfully} files

    \r    Had missing data: ${hadMissingData}
    
    \r    Errors: ${errorsCount}

  \r`)

  if (filesWErrors.length > 0) {
    console.error(`  Files with errors:\n`)
    filesWErrors.forEach(filesWError => console.error(`    ${filesWError}\n`))
  }
  if (errorMessages.length > 0) {
    console.error(`  Error:\n`)
    errorMessages.forEach(errMsg => console.error(`    ${errMsg}\n`))
  }
  process.exit()
}

module.exports = rearrange
