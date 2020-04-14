const BaseService = require('./Base')

class ProxyService extends BaseService {
    constructor() {
        super('proxy')
    }
}
module.exports = new ProxyService()
