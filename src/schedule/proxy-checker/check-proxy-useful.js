const request = require('request')

function checkProxyUseful ({ hostname, port, protocol }) {
    const proxy = `${protocol}://${hostname}:${port}`

    return new Promise(resolve => {
        request({
            url: 'https://www.douban.com/group/510976/discussion?start=0',
            timeout: 5000,
            method: 'GET',
            proxy,
            headers: {
                'Content-Type': `application/x-www-form-urlencoded`,
                'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
            }
        }, (error, response, body) => {
            if (error) {
                return resolve([error])
            }

            if (body.indexOf('杭州相亲小组') !== -1) {
                return resolve([null, true])
            }

            return resolve([new Error('Forbidden')])
        })
    })
}

module.exports = checkProxyUseful