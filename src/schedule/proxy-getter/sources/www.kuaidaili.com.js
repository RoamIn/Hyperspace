const getFullUrl = require('../../../utils/get-full-url')

const url = 'https://www.kuaidaili.com/free/inha/1/'

module.exports = {
    name: '快代理',
    url,
    schedule: '*/3 * * * *',
    handler: ($) => {
        const $proxies = $('.table tbody tr')
        const $next = $('#listnav .active').parent().next().find('a')
        const next = $next.length > 0 ? getFullUrl(url, $next.attr('href')) : false
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
            next: $('#listnav .active').text() === '2' ? false : next, // 没有意义，更新太慢，2页就行
            proxies
        }
    }
}