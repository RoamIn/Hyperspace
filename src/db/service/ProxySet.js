const BaseSetService = require('./BaseSet')

class ProxyService extends BaseSetService {
    constructor() {
        super('proxy_set')
    }
}
module.exports = new ProxyService()
