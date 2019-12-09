
const Router = require('koa-router')
const { resolve, getFiles } = require('../utils/common')
const validator = require('../utils/validator')

const serverFile = getFiles(resolve('routers', 'api'))
const directory = serverFile.map(path => require(path))
// console.log(directory);
const user = new Router()
directory.forEach(({ path, method, schema, function: func }) => user[method](path, validator(schema), func))


const router = new Router({ prefix: '/api' })
router.use('/user', user.routes())

module.exports = router