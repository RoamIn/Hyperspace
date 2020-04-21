const httpGet = require('../../utils/http-get')
const sleep = require('../../utils/sleep')

async function task (url, handler, name) {
    const [err, $] = await httpGet(url) // get page

    // check error
    if (err) {
        return console.error(`[httpGet] \t ${err.message}`)
    }

    // catch error while parsing HTML
    try {
        const { next, proxies } = handler($)

        if (proxies.length > 0) {
            console.log(proxies)
        }

        if (next) {
            await sleep(1000)
            return task(next, handler, name)
        }

        console.log(`DONE [${name}]`)
    } catch (e) {
        return console.error(`[handler] \t ${e.message}`)
    }
}

async function init () {
    // const source = require('./sources/www.xicidaili.com')
    // const source = require('./sources/www.goubanjia.com')
    // const source = require('./sources/www.kuaidaili.com')
    // const source = require('./sources/www.ip3366.net')
    const source = require('./sources/www.89ip.cn')

    task(source.url, source.handler, source.name)
}

init()