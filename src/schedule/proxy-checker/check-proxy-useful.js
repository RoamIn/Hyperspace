const request = require('request')

function getCookie () {
    const str = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)

    const bid = str.slice(0, 11)

    return `bid=${bid}`
}

function checkProxyUseful ({ hostname, port, protocol }, url = 'https://www.douban.com/group/510976/discussion?start=0') {
    const proxy = `${protocol}://${hostname}:${port}`

    return new Promise(resolve => {
        request({
            url,
            proxy, // http only
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
                'Cookie': getCookie()
            }
        }, (error, response, body) => {
            if (error) {
                return resolve([error])
            }

            if (response && response.statusCode === 200) {
                if (body.indexOf('杭州') !== -1) {
                    return resolve([null, true])
                } else {
                    return resolve([new Error('PROXY_ERROR')])
                }
            } else {
                return resolve([new Error(`STATUS_CODE: ${response.statusCode || 'UNKNOWN_CODE'}`)])
            }
        })
    })
}

module.exports = checkProxyUseful 