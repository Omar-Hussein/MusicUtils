const {
  fs,
  imagesFilesFormat,
  allFiles,
  getCertinFiles,
} = require("./global")

function deleteImages () {
  console.log(`If you're sure you want to delete all the images, please go uncomment the function in the "delete-images.js" file`)

  // let imagesFiles = getCertinFiles(allFiles, imagesFilesFormat) // Filter the images files
  // imagesFiles.forEach((imageFile, index, self) => {
  //   process.stdout.write(`  ${Math.round((index/self.length) * 100)} %   Deleting: ${imageFile}\r`)
  //   fs.unlinkSync(imageFile)
  // })
  // console.log(`\n  Deleted ${imagesFiles.length} files.\n`)
}
module.exports = deleteImages