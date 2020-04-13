// {
//     protocol: 'http',
//     hostname: '167.71.183.113',
//     port: '8888'
// }
function getProxyKey ({ hostname, port }) {
    return `${hostname}:${port}`
}

module.exports = getProxyKey