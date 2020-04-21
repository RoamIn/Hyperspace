const getFullUrl = require('../../../utils/get-full-url')

const url = 'http://www.89ip.cn/index_1.html'

module.exports = {
    name: '89免费代理',
    url,
    schedule: '*/3 * * * *',
    handler: ($) => {
        const $proxies = $('.layui-table tbody tr')
        const $next = $('.layui-laypage-next')
        const proxies = []

        $proxies.each(function () {
            const $this = $(this)
            const $tds = $this.find('td')

            proxies.push({
                protocol: 'http',
                hostname: $tds.eq(0).text().trim(),
                port: $tds.eq(1).text().trim()
            })
        })

        const next = (proxies.length > 0 && $next.length > 0) ? getFullUrl(url, $next.attr('href')) : false

        return {
            next,
            proxies
        }
    }
}