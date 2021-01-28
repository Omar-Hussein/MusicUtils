const {
  // fs,
  mm,
  NodeID3,
  // path,
  allFiles,
  // notFileNameFormat,
  // musicRootFolder,
  // backupFolder,
  audioFilesFormat,
  getCertinFiles,
  // getExtension,
  // mkDirByPathSync,
  // deleteEmpty
} = require("./global")


// Filter the music files and set it as an object to shoot the problems.
let musicFiles = getCertinFiles(allFiles, audioFilesFormat).map(file => ({
  file,
  problems: {
    missingArtist: false,
    missingAlbumArtist: false,
    missingAlbum: false,
    missingDiskNo: false,
    missingDiskOf: false,
    // missingTrackNo: false,
    missingTrackOf: false,
    deleteComment: false,
  },
}))

  
let missingData = 0
let errorMesseges = []


async function parseMissingData () {

  try {

    for (let [index, musicFileInfo] of musicFiles.entries()) {
      
      let metadata    = await (mm.parseFile(musicFileInfo.file))
      let tags        = metadata.common

      let albumTrackNum = parseInt(tags.track.of)
      let disk        = parseInt(tags.disk.no)
      let albumDisks  = parseInt(tags.disk.of)

      // Parse the missing data.
      if (!tags.artist || tags.artist === '') { musicFileInfo.problems.missingArtist = true; missingData++ }
      if (!tags.albumartist || tags.albumartist === '') { musicFileInfo.problems.missingAlbumArtist = true; missingData++ }
      if (!tags.album || tags.album === '' || tags.album.match(/billboard hot 100 singles chart/i)) { musicFileInfo.problems.missingAlbum = true; missingData++ }
      if (tags.comment) if (!tags.comment[0] || tags.comment[0] !== '' && !tags.comment[0].match(/sing(le|el)s?|demos?|remix(es)|mash ?up|eps?|unreleased|live|itunes session|(compilations|(platinum)? ?collection|best of|essential|greatests? hits|the best|this is |mixtape)/i)) { musicFileInfo.problems.deleteComment = true; missingData++ }
      if (!disk || disk === '') { musicFileInfo.problems.missingDiskNo = true; missingData++ }
      if (!albumDisks || albumDisks === '') { musicFileInfo.problems.missingDiskOf = true; missingData++ }
      if (!albumTrackNum || albumTrackNum === '') { musicFileInfo.problems.missingTrackOf = true; missingData++ }

    }
    
    
    
  } catch (err) { errorMesseges.push(err.message) }
  
  
  
  

}

async function setEmptyData () {
  try {

    for (let [index, musicFileInfo] of musicFiles.entries()) {
      
      let metadata    = await (mm.parseFile(musicFileInfo.file))
      let parsedTags        = metadata.common

      let writeTags = {}
      
      // process.stdout.write(`  Proccessing ${index+1} out of ${musicFiles.length} files\r`)
      
      // Fix the comment
      if (musicFileInfo.problems.deleteComment) writeTags.comment = { language: 'eng', text: '' }

      // Fix the album to single
      if (musicFileInfo.problems.missingAlbum) writeTags.album = `${parsedTags.title} - Signle`

      // Fix the album artist
      if (musicFileInfo.problems.missingAlbumArtist) writeTags.performerInfo = parsedTags.artist

      // console.log(writeTags)

      // Check if the write tags has properties first then start writing
      if(Object.keys(writeTags).length > 0){
        
        // let ID3FrameBuffer = await NodeID3.create(writeTags)
        
        let successWrite = await NodeID3.write(writeTags, musicFileInfo.file)

        // let successUpdate = await NodeID3.update(writeTags, musicFileInfo.file)
        
        console.log(successWrite)
        // console.log(successUpdate)
      }

        
    }

  } catch (err) { errorMesseges.push(err.message) }

}


// Start parsing and writing the missing data
async function start () {
  
  await parseMissingData()

  console.log(missingData)
  // console.log(musicFiles)


  if (missingData > 0)
    await setEmptyData()



  // console.log(`\r

  //   \r  Done:
  //   \r    Moved ${movedSuccessfully} files

  //   \r    Had missing data: ${hadMissingData}
    
  //   \r    Errors: ${errorsCount}

  // \r`)
  
  
  if (errorMesseges.length > 0) {
    console.error(`  Error:\n`)
    errorMesseges.forEach(errMsg => console.error(`    ${errMsg}\n`))
  }

}

start()


module.exports = start