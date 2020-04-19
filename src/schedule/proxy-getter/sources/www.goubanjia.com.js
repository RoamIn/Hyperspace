const url = 'http://www.goubanjia.com/'

function getIp ($, $ip) {
    let ip = ''

    $ip.children().each(function () {
        const $this = $(this)

        if ($this.css('display') !== 'none' && !$this.hasClass('port'))

            ip += $this.text()
    })

    return ip
}

function getPort (str) {
    let n = 0

    str = str.replace(/\s*port\s*/, '')
    str.split('').forEach(s => {
        n *= 10
        n += s.charCodeAt(0) - 'A'.charCodeAt(0)
    })

    return n / 8

}

module.exports = {
    name: '全网代理IP',
    url,
    schedule: '*/3 * * * *',
    handler: ($) => {
        const $proxies = $('.table tbody tr')
        const proxies = []

        $proxies.each(function () {
            const $this = $(this)
            const $tds = $this.find('td')

            proxies.push({
                protocol: $tds.eq(2).find('a').text().trim().toLowerCase(),
                hostname: getIp($, $tds.eq(0)),
                port: getPort($tds.eq(0).find('.port').attr('class'))
            })
        })

        return {
            next: false, // 就只有一页
            proxies
        }
    }
}