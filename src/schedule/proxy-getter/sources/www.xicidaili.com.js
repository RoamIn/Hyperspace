const getFullUrl = require('../../../utils/get-full-url')

const url = 'https://www.xicidaili.com/nn/1'

module.exports = {
    name: '国内高匿代理IP',
    url,
    schedule: '*/3 * * * *',
    handler: ($) => {
        const $proxies = $('#ip_list tbody tr').slice(1)
        const $next = $('.pagination .next_page')
        const proxies = []

        $proxies.each(function () {
            const $this = $(this)
            const $tds = $this.find('td')

            proxies.push({
                protocol: $tds.eq(5).text().trim().toLowerCase(),
                hostname: $tds.eq(1).text().trim(),
                port: $tds.eq(2).text().trim()
            })
        })

        return {
            // next: $next.hasClass('disabled') ? false : getFullUrl(url, $next.attr('href')), // 没有意义，更新太慢，一页就行
            next: false,
            proxies
        }
    }
}