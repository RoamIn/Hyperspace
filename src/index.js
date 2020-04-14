const path = require('path')
const schedule = require('node-schedule')
const { execFile } = require('child_process')

function scheduleJob () {
    const workerProcess = execFile('node', [path.join(__dirname, './task/index.js')])

    workerProcess.stdout.on('data', (data) => {
        console.log('stdout: ' + data)
    })

    workerProcess.stderr.on('data', (data) => {
        console.log('stderr: ' + data)
    })

    workerProcess.on('close', (code) => {
        console.log('process closed: ' + code)
    })
}

function init () {
    // 每天凌晨 2 点执行一次:
    schedule.scheduleJob('0 0 2 * * *', scheduleJob)
}

init()