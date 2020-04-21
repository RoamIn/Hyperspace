const service = require('../../db/service')

module.exports = {
    async 'get:/api/proxy/list' (ctx) {
        const [err, res] = await service.Proxy.getAll()

        if (err) {
            ctx.body = JSON.stringify({
                status: 'FAIL',
                data: err
            })
        } else {
            ctx.body = JSON.stringify({
                status: 'OK',
                data: res.map(proxyStr => JSON.parse(proxyStr))
            })
        }
    },
    async 'get:/api/proxy/delete' (ctx) {
        const { proxyStr } = ctx.query
        const [err, res] = await service.Proxy.delete(proxyStr)

        if (err) {
            ctx.body = JSON.stringify({
                status: 'FAIL',
                data: err.message
            })
        } else {
            ctx.body = JSON.stringify({
                status: 'OK',
                data: true
            })
        }
    },
    async 'get:/api/proxy/get' (ctx) {
        const [err, res] = await service.Proxy.get()

        if (err) {
            ctx.body = JSON.stringify({
                status: 'FAIL',
                data: err
            })
        } else {
            ctx.body = JSON.stringify({
                status: 'OK',
                data: JSON.parse(res)
            })
        }
    }
}