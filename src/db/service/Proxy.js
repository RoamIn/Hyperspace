const BaseHashService = require('./BaseHash')

class ProxyService extends BaseHashService {
    constructor() {
        super('proxy')
    }
}
module.exports = new ProxyService()
