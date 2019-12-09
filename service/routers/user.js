const Router = require('koa-router')
const router = new Router({ prefix: '/user' });

// register

router.get('/register', async ctx => {
  throw ({ code: 10003, msg: '参数错误' })
})



module.exports = router