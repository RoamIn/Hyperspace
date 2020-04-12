const httpGet = require('../utils/http-get')
const getFiles = require('../utils/get-files')
const sleep = require('../utils/sleep')
const service = require('../db/service')
const result = []

async function task (url, handler) {
    const [err, $] = await httpGet(url)

    if (err) {
        return console.error(err)
    }

    try {
        const { next, ips } = handler($)

        console.log(url)

        result.push(...ips)
        const [saveErr] = db.hmset('ips', ips)

        if (next) {
            await sleep(1000)
            task(next, handler)
        } else {
            console.log(JSON.stringify(result, null, 2))
        }
    } catch (e) {
        return console.error(e)
    }
}

function run () {
    const [err, sources] = getFiles('./sources')

    if (err) throw console.error(err)

    sources.forEach(source => {
        task(source.url, source.handler)
    })
}

// run()

async function test () {
    const proxy = [
        {
            protocol: 'http',
            hostname: '182.16.183.113',
            port: '80'
        },
        {
            protocol: 'http',
            hostname: '170.16.183.113',
            port: '8800'
        }
    ]

    const [err, res] = await service.RawProxy.put(proxy)

    if (err) console.error(err)
    else console.log(res)
}


test()