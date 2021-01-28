const {
  fs,
  allFiles,
  getCertinFiles,
} = require("./global")

function deleteIni () {
  console.log(`If you're sure you want to delete all the ini files, please go uncomment the function in the "delete-ini.js" file`)
  
  // let iniFiles = getCertinFiles(allFiles, "ini") // Filter the ini files
  // iniFiles.forEach((iniFile, index, self) => {
  //   process.stdout.write(`  ${Math.round((index/self.length) * 100)} %   Deleting: ${iniFile}\r`)
  //   fs.unlinkSync(iniFile)
  // })
  // console.log(`\n  Deleted ${iniFiles.length} files.\n`)
}
module.exports = deleteIni
