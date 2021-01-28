const {
  fs,
  allFiles,
  getExtension,
  getCertinFiles,
  imagesFilesFormat
} = require("./global")

let images = getCertinFiles(allFiles, imagesFilesFormat)

function renameImages () {

  let renamedSuccessfully = 0

  for (let [index, image] of images.entries()) {
    let ext = getExtension(image)
    let imageParentFolderAbsDir = image.slice(0, image.lastIndexOf("\\"))
    let imageParentFolder = image.slice(imageParentFolderAbsDir.lastIndexOf("\\") + 1, imageParentFolderAbsDir.length)
    let fileName = image.slice(image.indexOf(imageParentFolder) + imageParentFolder.length + 1, image.length)
    let renameTo = `${imageParentFolder}.${ext}`
    let dest = `${imageParentFolderAbsDir}\\${renameTo}`

    // FIXME: Will delete the image if there there is more than an image in the same folder.
    process.stdout.write(`  ${Math.round((index/images.length) * 100)} %   Renaming: ${fileName}\r`)
    fs.renameSync(image, dest)
    renamedSuccessfully++

  }
  
  console.log(`\n\n  Renamed ${renamedSuccessfully} files.\n`)
}


module.exports = renameImages