const request = require('request')
const ips = [
    {
        "protocol": "http",
        "hostname": "195.122.17.123",
        "port": "3128"
    },
    {
        "protocol": "http",
        "hostname": "85.98.118.245",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "78.46.81.7",
        "port": "1080"
    },
    {
        "protocol": "http",
        "hostname": "91.200.101.203",
        "port": "3128"
    },
    {
        "protocol": "http",
        "hostname": "18.229.103.144",
        "port": "8888"
    },
    {
        "protocol": "http",
        "hostname": "162.243.108.141",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "51.79.159.47",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "60.251.33.224",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.183.121.43",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "94.23.253.212",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "138.68.161.14",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "159.203.91.6",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "91.205.174.26",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "217.72.5.30",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "80.241.222.138",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "217.72.5.30",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "52.179.231.206",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "58.176.150.177",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "116.206.197.207",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "188.40.183.185",
        "port": "1080"
    },
    {
        "protocol": "http",
        "hostname": "139.59.169.246",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "139.59.53.106",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "61.135.186.80",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.252.181.2",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.90",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "80.241.222.137",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.147.210.159",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "61.135.186.243",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.92",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.147.210.159",
        "port": "2020"
    },
    {
        "protocol": "http",
        "hostname": "61.135.186.80",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.147.210.159",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "218.49.231.186",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.78",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.20",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.68",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.69",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.176",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.38",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.153",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.160",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.118",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.172",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.112",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.152",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.152",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.118",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.112",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.111",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "61.135.185.103",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "202.108.23.174",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "183.232.231.76",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "221.122.91.59",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "221.122.91.60",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "182.61.62.74",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "221.122.91.66",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "183.232.231.239",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "140.82.60.35",
        "port": "3128"
    },
    {
        "protocol": "http",
        "hostname": "182.61.62.23",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "183.232.232.69",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.33.94",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "118.163.83.21",
        "port": "3128"
    },
    {
        "protocol": "http",
        "hostname": "180.97.33.93",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.33.92",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.33.78",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.33.66",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.33.249",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "116.196.85.150",
        "port": "3128"
    },
    {
        "protocol": "http",
        "hostname": "180.97.33.218",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.33.212",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.33.144",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.149.145.139",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.104.97",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.104.170",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.149.144.199",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "180.97.104.97",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "138.197.32.120",
        "port": "3128"
    },
    {
        "protocol": "http",
        "hostname": "195.154.67.61",
        "port": "3128"
    },
    {
        "protocol": "http",
        "hostname": "180.149.144.176",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "163.177.151.76",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "14.29.2.39",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "178.32.6.105",
        "port": "3128"
    },
    {
        "protocol": "http",
        "hostname": "14.29.2.38",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "14.29.2.37",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "163.177.151.224",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "51.79.52.62",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "123.125.115.74",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "123.125.115.249",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "123.125.115.242",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "123.125.115.219",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "123.125.115.183",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "123.125.115.219",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "123.125.115.242",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "123.125.115.249",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "123.125.115.74",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "111.206.37.68",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "112.80.248.18",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "112.80.248.95",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "112.80.255.29",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "112.80.255.51",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "112.80.255.77",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "117.185.16.253",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "202.5.221.69",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "111.206.37.100",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "111.206.37.161",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "111.206.37.161",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "111.206.37.244",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "111.206.37.248",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "157.245.93.150",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "202.5.221.66",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "121.237.149.96",
        "port": "3000"
    },
    {
        "protocol": "http",
        "hostname": "51.158.186.242",
        "port": "8811"
    },
    {
        "protocol": "http",
        "hostname": "160.202.146.50",
        "port": "80"
    },
    {
        "protocol": "http",
        "hostname": "163.172.189.32",
        "port": "8811"
    },
    {
        "protocol": "http",
        "hostname": "163.204.243.157",
        "port": "9999"
    },
    {
        "protocol": "http",
        "hostname": "58.220.95.79",
        "port": "10000"
    },
    {
        "protocol": "http",
        "hostname": "14.140.131.82",
        "port": "3128"
    },
    {
        "protocol": "http",
        "hostname": "213.247.64.40",
        "port": "8080"
    },
    {
        "protocol": "http",
        "hostname": "171.35.170.84",
        "port": "9999"
    },
    {
        "protocol": "http",
        "hostname": "51.158.123.250",
        "port": "8811"
    }
].slice(0, 30)


function proxy ({ hostname, port, protocol }) {
    const proxy = `${protocol}://${hostname}:${port}`

    return new Promise(resolve => {
        request({
            url: 'https://www.badidu.com',
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

            return resolve([null, true])

            return resolve([new Error('Invalid')])
        })
    })
}

async function test () {
    const results = []


    for (let i = 0; i < ips.length; i++) {
        console.log('test', i)

        try {
            const [error, res] = await proxy(ips[i])

            if (!error) {
                const { hostname, port, protocol } = ips[i]
                const proxy = `${protocol}://${hostname}:${port}`
                console.log('get', proxy)
                results.push(ips[i])
            }
        } catch (err) {
            console.error(err)
        }
    }

    console.log(results)
}

test()