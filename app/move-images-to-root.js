const {
  fs,
  allFiles,
  getExtension,
  getCertinFiles,
  musicRootFolder,
  imagesFilesFormat
} = require("./global")

let images = getCertinFiles(allFiles, imagesFilesFormat)

// Moving all the files to the root folder
function moveToRoot () {
  let movedSuccessfuly = 0

  for (let [index, image] of images.entries()) {
    let ext = getExtension(image)
    let fileName = image.slice(image.lastIndexOf("\\") + 1, image.length)
    
    let renameTo
    // if (index + 1 < 10) renameTo =  `(000${index + 1}).${ext}`
    // else if (index + 1 < 100) renameTo =  `(00${index + 1}).${ext}`
    // else if (index + 1 < 1000) renameTo =  `(0${index + 1}).${ext}`
    // else renameTo =  `(${index + 1}).${ext}`

    if (index + 1 < 10) renameTo =  `(00${index + 1}).${ext}`
    else if (index + 1 < 100) renameTo =  `(0${index + 1}).${ext}`
    else renameTo =  `(${index + 1}).${ext}`
    
    let dest = `${musicRootFolder}\\${renameTo}`

    process.stdout.write(`  ${Math.round((index/images.length) * 100)} %   Renaming: ${fileName}\r`)
    fs.renameSync(image, dest)
    movedSuccessfuly++
  }
  
  console.log(`\n\n  Renamed ${movedSuccessfuly} files.\n`)
}


module.exports = moveToRoot