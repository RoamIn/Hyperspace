const schedule = require('node-schedule')

const { rawProxyChecker, proxyChecker } = require('./proxy-checker')
const proxyGetter = require('./proxy-getter')

const log = require('../utils/log')
const { registerEventListener } = require('../utils/event')

function handleProxyGetterEvent ({ status, message }) {
    log.proxyGetter.info(`${status}\t${message}`)

    if (status === 'INSERT') {
        rawProxyChecker()
    }
}

function handleProxyCheckerEvent ({ status, message }) {
    log.proxyChecker.info(`${status}\t${message}`)
}

function init () {
    // every 10 minutes
    schedule.scheduleJob('*/10 * * * *', () => {
        log.schedule.info('Schedule Proxy Getter:' + new Date())
        proxyGetter()
    })

    // every 10 minutes
    schedule.scheduleJob('*/15 * * * *', () => {
        log.schedule.info('Schedule Proxy Checker:' + new Date())
        proxyChecker('Proxy')
    })

    registerEventListener('proxy-getter', handleProxyGetterEvent)

    registerEventListener('proxy-checker', handleProxyCheckerEvent)
}

module.exports = init