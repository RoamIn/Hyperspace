const typeOf = require('../../utils/type-of')
const { proxyCheckerEmit: emit } = require('../../utils/event')
const service = require('../../db/service')
const checkProxyUseful = require('./check-proxy-useful')

async function rawProxyChecker () {
    const [err, proxyStr] = await service.RawProxy.pop()

    if (err) return emit.error(`[service.RawProxy.pop] \t ${err.message}`)
    if (typeOf(proxyStr) === 'Null') return emit.done(`[RawProxy]`)

    const [failed] = await checkProxyUseful(JSON.parse(proxyStr))

    if (failed) {
        emit.delete(`[${proxyStr}`)
    } else {
        const [saveErr] = await service.Proxy.put(proxyStr)

        if (saveErr) return emit.error(`[ervice.Proxy.put] \t ${saveErr.message}`)

        emit.insert(`[${proxyStr}`)
    }

    rawProxyChecker()
}

async function proxyChecker () {
    const [err, proxyStrList] = await service.Proxy.getAll()

    if (err) return emit.error(`[service.Proxy.pop] \t ${err.message}`)

    proxyCheckerTask(proxyStrList)
}

function checkProxy (proxyStr) {
    return new Promise(async resolve => {
        const [failed] = await checkProxyUseful(JSON.parse(proxyStr))

        if (failed) {
            const [delErr] = await service.Proxy.delete(proxyStr)

            if (delErr) {
                emit.error(`[service.Proxy.delete] \t ${delErr.message}`)

                return resolve([delErr])
            }

            emit.delete(`[${proxyStr}`)
        }

        resolve([null, true])
    })
}

async function proxyCheckerTask (proxyStrList) {
    const queue = proxyStrList.splice(0, 10)
    const promises = []

    for (let i = 0; i < queue.length; i++) {
        promises.push(checkProxy(queue[i]))
    }

    await Promise.all(promises)

    if (proxyStrList.length === 0) return emit.done(`[Proxy]`)

    proxyCheckerTask(proxyStrList)
}

module.exports = {
    rawProxyChecker,
    proxyChecker
}
