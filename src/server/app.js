const Koa = require('koa')

const app = new Koa()

const routes = require('./routes')

const log = require('./middlewares/log')

app.use(log)


routes(app)

app.listen(8321, () => {
    console.log('starting at port 8321')
})