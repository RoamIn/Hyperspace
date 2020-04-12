const url = require('url')
const http = require('http')
const https = require('https')
const cheerio = require('cheerio')

const uaList = [
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71',
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
    'Mozilla/5.0 (Windows NT 5.1; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.50',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0',
]

function httpGet (uri) {
    return new Promise(resolve => {
        const { protocol } = url.parse(uri)
        let get = null

        if (protocol === 'http:') {
            get = http.get
        } else {
            get = https.get
        }

        get(uri, {
            headers: {
                'User-Agent': uaList[Math.parseInt(uaList.length * Math.random())],
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Accept-Language': 'zh-CN,zh;q=0.8'
            }
        }, (res) => {
            const { statusCode } = res

            let error
            if (statusCode !== 200) {
                error = new Error(`HTTP_ERROR: ${statusCode}`)
            }

            if (error) {
                // 消费响应数据来释放内存。
                res.resume()
                return resolve([error])
            }

            res.setEncoding('utf8')

            let rawData = ''
            res.on('data', (chunk) => { rawData += chunk })
            res.on('end', () => {
                const $ = cheerio.load(rawData)

                resolve([null, $, rawData])
            })
        }).on('error', (e) => {
            resolve([e])
        })
    })
}


module.exports = httpGet
