const httpGet = require('../../utils/http-get')
const sleep = require('../../utils/sleep')
const service = require('../../db/service')
const checkProxyUseful = require('./check-proxy-useful')

function popOneProxy () {
    return new Promise(async resolve => {
        const [setPopErr, proxyKey] = await service.RawProxySet.pop()

        if (setPopErr) return resolve([setPopErr])

        const [popErr, proxyStr] = await service.RawProxy.pop(proxyKey)

        if (popErr) return resolve([popErr])

        resolve([null, {
            proxyKey,
            proxy: JSON.parse(proxyStr)
        }])
    })

}

function saveOneProxy (proxy) {
    return new Promise(async resolve => {
        const [saveErr] = await service.Proxy.put(proxy)
        if (saveErr) return resolve([saveErr])

        const [saveSetErr] = await service.ProxySet.put(proxy)
        if (saveSetErr) return resolve([saveSetErr])

        resolve([null, true])
    })

}

async function task () {
    const [err, res] = await popOneProxy()

    if (err) return console.error(err)
    if (!res) return console.log('DONE')

    const { proxyKey, proxy } = res
    const [failed] = await checkProxyUseful(proxy)

    if (!failed) {
        console.log('get', proxyKey)
        await saveOneProxy(proxy)
    }

    task()
}

task()

module.exports = task
