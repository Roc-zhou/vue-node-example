const Router = require('koa-router')
const router = new Router({ prefix: '/api' })

const user = require('./user')



router.use(user.routes())



module.exports = router