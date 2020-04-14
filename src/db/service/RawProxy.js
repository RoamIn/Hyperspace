const BaseService = require('./Base')

class RawProxyService extends BaseService {
    constructor() {
        super('raw_proxy')
    }
}
module.exports = new RawProxyService()
