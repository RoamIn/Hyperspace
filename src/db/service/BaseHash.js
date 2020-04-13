const client = require('../index')
const typeOf = require('../../utils/type-of')
const getProxyKey = require('../../helper/get-proxy-key')

class BaseService {
    constructor(table) {
        this.table = table
    }

    promise (command, ...args) {
        return new Promise(resolve => {
            client[command](this.table, ...args, (err, res) => {
                if (err) {
                    resolve([err])
                } else {
                    resolve([null, res])
                }
            })
        })
    }

    get (...args) {
        return this.promise('hget', ...args)
    }

    put (proxies) {
        if (typeOf(proxies) === 'Array') {
            const proxiesMap = {}

            proxies.forEach(proxy => {
                proxiesMap[getProxyKey(proxy)] = JSON.stringify(proxy)
            })

            return this.promise('hmset', proxiesMap)
        } else {
            const proxyKey = getProxyKey(proxies)

            return this.promise('hset', proxyKey, JSON.stringify(proxies))
        }
    }

    delete (...args) {
        return this.promise('hdel', ...args)
    }

    pop (...args) {
        return new Promise(async resolve => {
            const [getErr, res] = await this.get(...args)

            if (getErr) return resolve([getErr])

            const [delErr] = await this.delete(...args)

            if (delErr) return resolve([delErr])

            resolve([null, res])
        })
    }

    exists (proxy) {
        const proxyKey = getProxyKey(proxy)

        return this.promise('hexists', proxyKey)
    }

    update (proxy) {
        const proxyKey = getProxyKey(proxy)

        return this.promise('hmset', proxyKey, JSON.stringify(proxy))
    }

    // pop () {
    //     return this.promise('spop')
    // }

    getAll () {
        return this.promise('hgetall')
    }

    getNumber () {
        return this.promise('hlen')
    }

    clear () {
        return this.promise('del')
    }
}

module.exports = BaseService
