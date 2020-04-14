const EventEmitter = require('events').EventEmitter
const event = new EventEmitter()

function registerEventListener (eventName, handler = () => { }) {
    event.on(eventName, handler)
}

module.exports = {
    event,
    registerEventListener,
    proxyGetterEmit: {
        error (message) {
            return event.emit('proxy-getter', {
                status: 'ERROR',
                message: `${message}`
            })
        },
        insert (message) {
            return event.emit('proxy-getter', {
                status: 'INSERT',
                message: `${message}`
            })
        },
        done (message) {
            return event.emit('proxy-getter', {
                status: 'DONE',
                message: `t${message}`
            })
        }
    },
    proxyCheckerEmit: {
        error (message) {
            return event.emit('proxy-checker', {
                status: 'ERROR',
                message: `${message}`
            })
        },
        insert (message) {
            return event.emit('proxy-checker', {
                status: 'INSERT',
                message: `${message}`
            })
        },
        delete (message) {
            return event.emit('proxy-checker', {
                status: 'DELETE',
                message: `${message}`
            })
        },
        done (message) {
            return event.emit('proxy-checker', {
                status: 'DONE',
                message: `${message}`
            })
        }
    },
}