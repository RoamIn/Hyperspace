const BaseHashService = require('./BaseHash')

class RawProxyService extends BaseHashService {
    constructor() {
        super('raw_proxy')
    }
}
module.exports = new RawProxyService()
