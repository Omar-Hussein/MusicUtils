const { existsSync, writeFileSync, unlinkSync, mkdirSync, readFileSync } = require("fs")

class Cache {
  constructor(dir) {
    this.filename = ".cache"
    this.dir = dir
    this.file = `${this.dir}\\${this.filename}`
  }

  read() {
    if (!existsSync(this.dir)) {
      mkdirSync(this.dir, { recursive: true })
      return 0
    } else {
      if (existsSync(this.file)) return Number(readFileSync(this.file, "utf-8"))
      return 0
    }
  }

  write(counter) {
    if (existsSync(this.file)) this.remove()
    writeFileSync(this.file, String(counter))
  }

  remove() {
    unlinkSync(this.file)
  }
}

module.exports = Cache
