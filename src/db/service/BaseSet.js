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

    put (proxies) {
        const values = []

        if (typeOf(proxies) === 'Array') {
            values.push(...proxies.map(proxy => getProxyKey(proxy)))
        } else {
            values.push(getProxyKey(proxies))
        }

        return this.promise('sadd', ...values)
    }

    pop () {
        return this.promise('spop')
    }
}

module.exports = BaseService
