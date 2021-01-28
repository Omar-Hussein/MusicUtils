const {
  fs,
  NodeID3,
  allFiles,
  notFileNameFormat,
  musicRootFolder,
  audioFilesFormat,
  getCertinFiles,
  getExtension,
  mkDirByPathSync,
  deleteEmpty
} = require("./global")


function rearange () {
  let musicFiles = getCertinFiles(allFiles, audioFilesFormat) // Filter the music files
  
  let movedSuccessfully = 0
  let errorsCount = 0
  let hadMissingData = 0
  let filesWErrors = []
  let errorMesseges = []
 
 
  // Delete the all none audio files
  allFiles
    .filter(file => !getExtension(file).match(audioFilesFormat))
    .forEach((file, index, self) => {
      process.stdout.write(`  Deleting none audio files: ${Math.round((index/self.length) * 100)} %\r`)
      fs.unlinkSync(file)
    })

  try {
    for (let [index, file] of musicFiles.entries()) {
      let dest
      let ext = getExtension(file)
      let fileName = file.slice(file.lastIndexOf("\\") + 1, file.length)
      
      let tags        = NodeID3.read(file)
      let title       = tags.title ? tags.title.trim() : tags.title
      let artist      = tags.performerInfo ? tags.performerInfo.trim() : tags.performerInfo
      let album       = tags.album ? tags.album.trim() : tags.album
      let year        = parseInt(tags.year)
      let comment     = tags.comment
      
      let albumTrackNum = tags.trackNumber && tags.trackNumber.indexOf("/") > -1 ? parseInt(tags.trackNumber.slice(tags.trackNumber.indexOf("/") + 1, tags.trackNumber.length)) : undefined; if (0 < albumTrackNum && albumTrackNum < 10) albumTrackNum = `0${albumTrackNum}`
      let track       = parseInt(tags.trackNumber) || 1; if (0 < track && track < 10) track = `0${track}`
      let disk        = parseInt(tags.partOfSet) || 1
      let albumDisks  = tags.partOfSet && tags.partOfSet.indexOf("/") > -1 ? parseInt(tags.partOfSet.slice(tags.partOfSet.indexOf("/") + 1, tags.partOfSet.length)) : 1
      
      let updateThis  = { fileOwner: "Omar Hussein" }

      
      // Setting variables to set the directory
      let currentDirForm = { folder: null, disks: false, year: false, hasAlbumsFolder: true }
      if (albumDisks && parseInt(albumDisks) > 1) currentDirForm.disks = true // Set whether you create a folder for the disks or not
      if (year) currentDirForm.year = true // Set whether you create an album folder with the date or not
      
      
      process.stdout.write(`  ${Math.round((index/musicFiles.length) * 100)} %   Processing: ${fileName}\r`)
      

      // Set The folder
      if (!album) currentDirForm.folder = `No Album`
      else if ( album.match(/sing(le|el)/i) ) currentDirForm.folder = `Singles`
      else if ( album.match(/demos?/i) ) currentDirForm.folder = `Demos`
      else if ( album.match(/remix(es)?/i) ) currentDirForm.folder = `Remixes`
      else if ( album.match(/unreleased/i) ) currentDirForm.folder = `Unreleased`
      else if ( album.match(/live/i) ) currentDirForm.folder = `Live`
      else if ( album.match(/( |-)eps?/i) ) currentDirForm.folder = `EPs`
      else if ( album.match(/(compilations|(platinum)? ?collection|best of|essential|greatests? hits|the best|this is |mixtape)/i) ) currentDirForm.folder = `Compilations`
      else currentDirForm.folder = `Albums`
      
      if (comment) {
        // If there is a hint for the folder type in the comment it will set it...
        if ( comment.text.match(/demos?/i) ) currentDirForm.folder = `Demos`
        else if ( comment.text.match(/remix(es)?/i) ) currentDirForm.folder = `Remixes`
        else if ( comment.text.match(/unreleased/i) ) currentDirForm.folder = `Unreleased`
        else if ( comment.text.match(/live/i) ) currentDirForm.folder = `Live`
        else if ( comment.text.match(/(compilations|(platinum)? ?collection|best of|essential|greatests? hits|the best|this is |mixtape)/i) ) currentDirForm.folder = `Compilations`
        // Delete the comments that matches these
        if (
          comment.text === "" ||
          comment.text.match(/^0$/i) ||
          comment.text.match(/\[[0-9]+\] pl/i) ||
          comment.text.match(/(http|https):\/\//i) ||
          comment.text.match(/www\.[a-zA-Z]+\.[a-zA-Z]+/i) ||
          comment.text.match(/\.(com|net|org|co\.uk|pk|cc|info)/i) ||
          comment.text.match(/(\.::|excellent|magical[ ]+sound|by |freak37|amazon mp3|hunter|very good|enjoy|free ringtones|rg apple|releasezone|moderate)/i)
        ) { updateThis.comment = undefined }
        // Trims the comment if it doesn't match these
        else { updateThis.comment.text = comment.text.trim() }
      }

      // Determine if the file needs an album folder or not
      if (currentDirForm.folder.match(/(No Album|Unreleased)/i)) currentDirForm.hasAlbumsFolder = false
      
      // What to do if the data is not set
      if ( !artist || !title || !album) {
        if (!artist) { artist = `Unknown`; currentDirForm.folder = `No Album`; currentDirForm.hasAlbumsFolder = false }
        else if (!title) title = `No Title`
        hadMissingData++
      }

      // Optmizing the (artist, album and title) to be suitable fot a folder|file name
      if (artist && artist.match(notFileNameFormat)) artist = artist.replace(notFileNameFormat, "_")
      if (album && album.match(notFileNameFormat)) album = album.replace(notFileNameFormat, "_")
      if (title && title.match(notFileNameFormat)) title = title.replace(notFileNameFormat, "_")


      // Sets the dest format
      if (!currentDirForm.hasAlbumsFolder) dest = `${musicRootFolder}\\${artist}\\${currentDirForm.folder}`
      else if (currentDirForm.disks && currentDirForm.year) dest = `${musicRootFolder}\\${artist}\\${currentDirForm.folder}\\[${year}] ${album}\\CD ${disk}`
      else if (currentDirForm.disks && !currentDirForm.year) dest = `${musicRootFolder}\\${artist}\\${currentDirForm.folder}\\[0000] ${album}\\CD ${disk}`
      else if (!currentDirForm.disks && currentDirForm.year) dest = `${musicRootFolder}\\${artist}\\${currentDirForm.folder}\\[${year}] ${album}`
      else if (!currentDirForm.disks && !currentDirForm.year) dest = `${musicRootFolder}\\${artist}\\${currentDirForm.folder}\\[0000] ${album}`

      let renameFileTo = `${track}. ${title}.${ext}`

      // Checks first if the file already is in the right path
      if (file !== `${dest}\\${renameFileTo}`) {
        mkDirByPathSync (`\\${dest}`) // Create all the full path if it doesn't extist
        let existingFile = fs.readdirSync(dest).filter(fileToCheck => fileToCheck === renameFileTo)
        if (existingFile.length > 0) renameFileTo = `${track}. ${title} - [${index}].${ext}`
        NodeID3.update(updateThis, file) // Update the file data
        fs.renameSync(file, `${dest}\\${renameFileTo}`) // Move the files to thier folders
      }
      movedSuccessfully++    
    }

  } catch (err) { errorsCount++; errorMesseges.push(err.message) }

  deleteEmpty.sync(musicRootFolder) // Delete the empty folders

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
  if (errorMesseges.length > 0) {
    console.error(`  Error:\n`)
    errorMesseges.forEach(errMsg => console.error(`    ${errMsg}\n`))
  }
}
rearange()


module.exports = rearange