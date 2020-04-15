function getFullUrl (uri, path) {
    return new URL(path, uri).href
}

module.exports = getFullUrl