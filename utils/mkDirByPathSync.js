const { mkdirSync } = require("fs")
const { sep, isAbsolute, resolve } = require("path")

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const initDir = isAbsolute(targetDir) ? sep : ""
  const baseDir = isRelativeToScript ? __dirname : "."

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = resolve(baseDir, parentDir, childDir)

    try {
      mkdirSync(curDir)
    } catch (err) {
      if (err.code === "EEXIST") return curDir

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === "ENOENT") {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`)
      }

      const caughtErr = ["EACCES", "EPERM", "EISDIR"].indexOf(err.code) > -1
      if (!caughtErr || (caughtErr && targetDir === curDir)) throw err
    }

    return curDir
  }, initDir)
}

module.exports = mkDirByPathSync
