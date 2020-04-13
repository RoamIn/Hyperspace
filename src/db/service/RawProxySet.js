const BaseSetService = require('./BaseSet')

class RawProxyService extends BaseSetService {
    constructor() {
        super('raw_proxy_set')
    }
}
module.exports = new RawProxyService()
