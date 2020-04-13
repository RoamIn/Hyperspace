const path = require('path')
const httpGet = require('../../utils/http-get')
const getFiles = require('../../utils/get-files')
const sleep = require('../../utils/sleep')
const service = require('../../db/service')

async function task (url, handler, name) {
    const [err, $] = await httpGet(url) // get page

    // check error
    if (err) return console.error(err)

    // catch error while parsing HTML
    try {
        const { next, ips } = handler($)

        console.log(url)

        const [saveErr] = await service.RawProxy.put(ips)
        if (saveErr) return console.error(saveErr)

        const [saveSetErr] = await service.RawProxySet.put(ips)
        if (saveSetErr) return console.error(saveSetErr)

        if (next) {
            await sleep(1000)
            return task(next, handler, name)
        }

        console.log(`DONE\t[${name}]`)
    } catch (e) {
        return console.error(e)
    }
}

async function init () {
    const [err, sources] = getFiles(path.join(__dirname, './sources'))

    if (err) throw console.error(err)

    sources.forEach(source => {
        task(source.url, source.handler, source.name)
    })
}

module.exports = init
