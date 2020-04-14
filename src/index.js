const schedule = require('./schedule')
const log = require('./utils/log')

function init () {
    schedule()
}

init()

//监听未捕获的异常
process.on('uncaughtException', function (err) {
    log.exception.error(err.message)
})

//监听Promise没有被捕获的失败函数
process.on('unhandledRejection', function (err) {
    log.exception.error(err.message)
})