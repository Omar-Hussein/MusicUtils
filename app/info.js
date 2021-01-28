const {
  mm,
  scanForFiles,
  // allFiles,
  audioFilesFormat,
  imagesFilesFormat,
  getCertinFiles,
  getExtension
} = require("./global")

const allFiles = scanForFiles(`G:\\My SD Card\\Music`)
// const audioFilesFormat = /(m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|ra|ram|ogg|vorbis|wav|flac)$/i


function getInfo () {
// async function getInfo () {

  console.log(`  This the main music file`)
  console.log(`  Only to console data`)

  let musicFiles = getCertinFiles(allFiles, audioFilesFormat)
  let imagesFiles = getCertinFiles(allFiles, imagesFilesFormat)
  let iniFiles = getCertinFiles(allFiles, "ini")
  
  let otherFiles = allFiles.filter(file => {
    let ext = getExtension(file)
    return (!ext.match(audioFilesFormat) && !ext.match(imagesFilesFormat))
  })


  // for (let [index, file] of musicFiles.entries()) {
  
  //   let metadata = await mm.parseFile(file)
  //   let comment = metadata.common.comment

  //   if (comment) {

  //     if (
  //       comment[0] !== "" &&
  //       !comment[0].match(/^0$/i) &&
  //       !comment[0].match(/\[[0-9]+\] pl/i) &&
  //       !comment[0].match(/(http|https):\/\//i) &&
  //       !comment[0].match(/www\.[a-zA-Z]+\.[a-zA-Z]+/i) &&
  //       !comment[0].match(/\.(com|net|org|co\.uk|pk|cc|info)/i) &&
  //       !comment[0].match(/(\.::|excellent|magical[ ]+sound|by |freak37|amazon mp3|hunter|very good|enjoy|free ringtones|rg apple|releasezone|moderate)/i)
  //     ) { console.log(comment[0]) }
  //   }
  
  // }


  console.log(`   Music files: ${musicFiles.length}`)
  console.log(`   Image files: ${imagesFiles.length}`)
  console.log(`\n   Other files: ${otherFiles.length}`)

  if (otherFiles.length > 0) {
    console.log(`\n The other files extinsions:\n`)
    let uniqueExt = otherFiles
      .map(file => getExtension(file))
      .filter((ext, index, self) => index === self.findIndex(t => t === ext))
      .forEach(ext => console.log(`   ${ext}`))
  }

}

getInfo()

module.exports = getInfo

