const getFullUrl = require('../../../utils/get-full-url')

const url = 'http://www.ip3366.net/?stype=1&page=1'

module.exports = {
    name: '云代理',
    url,
    schedule: '*/30 * * * *', // every 30 minutes
    handler: ($) => {
        const $proxies = $('#list tbody tr')
        const $next = $('#listnav font').next()
        const next = $next.is('a') ? getFullUrl(url, $next.attr('href')) : false
        const proxies = []

        $proxies.each(function () {
            const $this = $(this)
            const $tds = $this.find('td')

            proxies.push({
                protocol: $tds.eq(3).text().trim().toLowerCase(),
                hostname: $tds.eq(0).text().trim(),
                port: $tds.eq(1).text().trim()
            })
        })

        return {
            next,
            proxies
        }
    }
}