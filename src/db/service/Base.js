const client = require('../index')
const typeOf = require('../../utils/type-of')

/**
 * Set
 */
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
        if (typeOf(proxies) !== 'Array') {
            proxies = [proxies]
        }

        return this.promise('sadd', ...proxies)
    }

    pop () {
        return this.promise('spop')
    }

    get () {
        return this.promise('srandmember')
    }

    getAll () {
        return this.promise('smembers')
    }
}

module.exports = BaseService
