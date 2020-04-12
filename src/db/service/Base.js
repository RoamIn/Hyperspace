const client = require('../index')
const typeOf = require('../../utils/type-of')

// {
//     protocol: 'http',
//     hostname: '167.71.183.113',
//     port: '8888'
// }
function getProxyKey ({ hostname, port }) {
    return `${hostname}:${port}`
}

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

    get (proxy) {
        const proxyKey = getProxyKey(proxy)

        return this.promise('hget', proxyKey)
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

    delete (proxy) {
        const proxyKey = getProxyKey(proxy)

        return this.promise('hdel', proxyKey)
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
