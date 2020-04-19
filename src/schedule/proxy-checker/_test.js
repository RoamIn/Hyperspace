const checkProxyUseful = require('./check-proxy-useful')
const proxies = [{ "protocol": "http", "hostname": "179.51.94.43", "port": "8080" }, { "protocol": "http", "hostname": "134.35.65.31", "port": "8080" }, { "protocol": "http", "hostname": "170.83.168.234", "port": "8080" }, { "protocol": "http", "hostname": "5.164.214.154", "port": "8080" }, { "protocol": "http", "hostname": "58.220.95.79", "port": "10000" }, { "protocol": "http", "hostname": "222.95.144.23", "port": "3000" }, { "protocol": "http", "hostname": "167.250.65.246", "port": "8080" }, { "protocol": "http", "hostname": "205.185.116.235", "port": "8080" }, { "protocol": "http", "hostname": "163.204.243.60", "port": "9999" }, { "protocol": "http", "hostname": "60.52.11.239", "port": "8080" }, { "protocol": "http", "hostname": "221.122.91.60", "port": "80" }, { "protocol": "http", "hostname": "221.122.91.34", "port": "80" }, { "protocol": "http", "hostname": "202.115.142.147", "port": "9200" }, { "protocol": "http", "hostname": "58.220.95.86", "port": "9401" }, { "protocol": "http", "hostname": "106.242.165.141", "port": "3128" }, { "protocol": "http", "hostname": "121.237.149.232", "port": "3000" }, { "protocol": "http", "hostname": "94.155.119.105", "port": "3128" }, { "protocol": "http", "hostname": "37.48.92.231", "port": "3129" }, { "protocol": "http", "hostname": "221.122.91.61", "port": "80" }, { "protocol": "http", "hostname": "89.169.57.99", "port": "8080" }]

async function test () {
    const result = []
    for (var i = 0; i < proxies.length; i++) {
        const proxy = proxies[i]

        const [err, res] = await checkProxyUseful(proxy)

        if (err) {
            console.log('error:', err)
        } else {
            console.log('get', proxy)
            result.push(proxy)
        }
    }

    console.log(result)
}

test()