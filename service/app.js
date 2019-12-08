const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')



// use DB mysql
const db = require('./DB/index')
db && (app.context.db = db)


// use logger
app.use(logger())

// use bodyparser
app.use(bodyparser())

// router

app
  .use(require('./routers/index').routes())
  .use(router.allowedMethods())


const app = new Koa()

app.listen(3005, () => console.log('server run 3005'))