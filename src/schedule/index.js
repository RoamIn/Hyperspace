const schedule = require('node-schedule')

const proxyChecker = require('./proxy-checker')
const proxyGetter = require('./proxy-getter')

const { event, registerEventListener } = require('../utils/event')

function init () {
    // every 10 minutes
    schedule.scheduleJob('*/10 * * * *', () => {
        console.log('Schedule Proxy Getter:' + new Date())
        proxyGetter()
    })

    // every 5 minutes
    schedule.scheduleJob('*/3 * * * *', () => {
        console.log('Schedule Raw Proxy Checker:' + new Date())
        proxyChecker('RawProxy')
    })

    // every 10 minutes
    schedule.scheduleJob('*/10 * * * *', () => {
        console.log('Schedule Proxy Checker:' + new Date())
        proxyChecker('Proxy')
    })

    function handlePageWorkerEvent ({ status, message }) {
        log.page.info(`${status}\t${message}`)

        if (status === 'NO_MORE_PAGE') {
            workerNum--
        }
    }

    registerEventListener('category-worker-message', handleCategoryWorkerEvent)

    registerEventListener('page-worker-message', handlePageWorkerEvent)
}

module.exports = init