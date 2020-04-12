const fs = require('fs')
const path = require('path')

function scanDir (dir) {
    const results = []

    fs.readdirSync(dir).forEach((filename) => {
        const file = path.join(dir, filename)
        const stats = fs.lstatSync(file)

        if (stats.isFile()) {
            results.push(file)
        } else if (stats.isDirectory()) {
            results.push(...scanDir(file))
        }
    })

    return results
}

function getFiles (dir) {
    try {
        const files = scanDir(dir).map(file => require(path.resolve(file)))

        return [null, files]
    } catch (err) {
        return [err]
    }
}

module.exports = getFiles