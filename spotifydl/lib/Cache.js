const { existsSync, writeFileSync, unlinkSync, mkdirSync, readFileSync } = require("fs")

class Cache {
  write(dir, counter) {
    if (existsSync(dir)) unlinkSync(dir)
    writeFileSync(dir, String(counter))
  }

  read(dir) {
    dir = `${dir}\\.cache`

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
      return 0
    } else {
      return Number(readFileSync(dir, "utf-8"))
    }
  }
}

module.exports = Cache
