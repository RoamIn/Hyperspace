const path = require('path')
const httpGet = require('../../utils/http-get')
const getFiles = require('../../utils/get-files')
const sleep = require('../../utils/sleep')
const { proxyGetterEmit: emit } = require('../../utils/event')
const service = require('../../db/service')

async function task (url, handler, name) {
    const [err, $] = await httpGet(url) // get page

    // check error
    if (err) {
        return emit.error(`[httpGet] \t ${err.message}`)
    }

    // catch error while parsing HTML
    try {
        const { next, proxies } = handler($)

        if (proxies.length > 0) {
            const [saveErr] = await service.RawProxy.put(proxies.map(proxy => JSON.stringify(proxy)))
            if (saveErr) return emit.error(`service.[RawProxy.put] \t ${saveErr.message}`)

            emit.insert(`${proxies.length} proxies from ${url}`)
        }

        if (next) {
            await sleep(1000)
            return task(next, handler, name)
        }

        emit.done(`[${name}]`)
    } catch (e) {
        return emit.error(`[handler] \t ${e.message}`)
    }
}

async function init () {
    const [err, sources] = getFiles(path.join(__dirname, './sources'))

    if (err) {
        return emit.error(`[getFiles] \t ${err.message}`)
    }

    sources.forEach(source => {
        task(source.url, source.handler, source.name)
    })
}

module.exports = init