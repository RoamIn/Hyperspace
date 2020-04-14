const Router = require('koa-router')
const router = new Router()

const routes = {
    ...require('./proxy')
}

module.exports = (app) => {
    Object.keys(routes).forEach((route) => {
        const [method, path] = route.split(':')

        router[method.toLowerCase()](path, routes[route])
    })

    app.use(router.routes()).use(router.allowedMethods())
}