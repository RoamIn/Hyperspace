const url = 'https://ip.jiangxianli.com/?page=1'

module.exports = {
    name: '高可用全球免费代理IP库',
    url,
    handler: ($) => {
        const $proxies = $('.layui-table tbody tr')
        const scriptText = $('script').last().html() // script should use html() but not text()
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

        const count = parseInt(scriptText.match(/count:\s*"(\d+)"/)[1])
        const limit = parseInt(scriptText.match(/limit:\s*"(\d+)"/)[1])
        const page = parseInt(scriptText.match(/page:\s*"(\d+)"/)[1])
        const pageLength = Math.ceil(count / limit)

        return {
            next: page < pageLength ? url.replace(/(\d+)$/, page + 1) : false,
            proxies
        }
    }
}