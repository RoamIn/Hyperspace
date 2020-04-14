const typeOf = require('../../utils/type-of')
const service = require('../../db/service')
const checkProxyUseful = require('./check-proxy-useful')

async function task (serviceName) {
    const [err, proxyStr] = await service[serviceName].pop()

    if (err) return console.error(err)
    if (typeOf(proxyStr) === 'Null') return console.log('DONE')

    const [failed] = await checkProxyUseful(JSON.parse(proxyStr))

    if (!failed) {
        console.log('get', proxyStr)
        await service.Proxy.put(proxyStr)
    }

    task(serviceName)
}

function init (serviceName, taskNum = 10) {
    while (taskNum--) {
        task(serviceName)
    }
}

module.exports = init
