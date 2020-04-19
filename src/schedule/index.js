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
    proxyGetter().forEach(({ source, task }) => {
        // immediate execute
        task()
        log.schedule.info(`Schedule Proxy Getter [${source.name}]: ${new Date()}`)

        // register schedule
        schedule.scheduleJob(source.schedule || '*/10 * * * *', () => {
            log.schedule.info(`Schedule Proxy Getter [${source.name}]: ${new Date()}`)
            task()
        })
    })

    // every 10 minutes
    schedule.scheduleJob('*/5 * * * *', () => {
        log.schedule.info('Schedule Proxy Checker:' + new Date())
        proxyChecker('Proxy')
    })

    registerEventListener('proxy-getter', handleProxyGetterEvent)

    registerEventListener('proxy-checker', handleProxyCheckerEvent)
}

module.exports = init