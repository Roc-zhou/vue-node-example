const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const Moment = require("moment")
const json = require('koa-json');
const { getTokenInfo } = require('./utils/methods')
// const errModule = require('./utils/errorModule')


// 排除的路由
const apiUrl = ['/api/user/register', '/api/user/login']

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
    const { code } = err
    ctx.body = {
      code: err.code || 500,
      body: err.body || '服务异常',
    }
  })
})
app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.header['content-type'].indexOf('application/json') === -1) {
    ctx.throw({
      code: 400,
      body: '错误的请求!'
    })
  }
  await next();
}).use(async (ctx, next) => {
  // 排除token校验
  const token = ctx.header.token,
    url = ctx.url
  if (apiUrl.indexOf(url) === -1) {
    if (token && !getTokenInfo(token)) {
      return ctx.throw({
        code: 301,
        body: 'token过期，请重新登录！'
      })
    } else {
      return ctx.throw({
        code: 400,
        body: 'token不存在，请求错误！'
      })
    }
  }



  await next()
})

// router
app
  .use(require('./routers/index').routes())
  .use(router.allowedMethods())

app.listen(3005, () => console.log('server run 3005'))