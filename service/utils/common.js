const path = require('path')
const fs = require('fs')

const resolve = (d, ...p) => path.resolve(d, ...p) // Return to absolute path of file

const getFiles = dir => { // Get all files
  let results = []
  fs.readdirSync(dir).forEach(file => {
    file = resolve(dir, file)
    const stat = fs.statSync(file)
    stat.isFile()
      ? results.push(file)
      : results.concat(getFiles(file)) // Is directory [...results,...readFiles(file)]
  })
  return results
}

module.exports = {
  resolve,
  getFiles,
}