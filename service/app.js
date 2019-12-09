const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const Moment = require("moment")
const json = require('koa-json');

// use json
app.use(json())

// use DB mysql
const db = require('./DB/index')
db && (app.context.db = db)

// use logger
app.use(logger(str => console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str)))

// use bodyparser
app.use(bodyparser())
app.use(async (ctx, next) => {
  await next().catch(err => {
    const { status } = err
    ctx.body = {
      code: err.code || 10000,
      body: err.body || '服务异常',
      status: 'fail'
    }
  })
})
app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.header['content-type'].indexOf('application/json') === -1) {
    throw ({ code: 10001, body: '服务异常' })
  }
  await next();
});


// router
app
  .use(require('./routers/index').routes())
  .use(router.allowedMethods())

app.listen(3005, () => console.log('server run 3005'))