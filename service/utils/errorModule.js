module.exports = (ctx, next) => {
  return next().catch(error => {
    const { status } = error
    console.log(error);
    switch (status) {
      case 200:
        ctx.body = {
          body: error.body || error.message || {},
          code: status,
          status: 'success'
        }
        break
      case 400:
        ctx.body = {
          body: error.body || error.message || '参数错误',
          code: status,
          status: 'fail'
        }
        break
      case 401:
        ctx.body = {
          body: error.body || error.message || '无权访问/获取',
          code: status,
          status: 'fail'
        }
        break
      case 406:
        ctx.body = {
          body: error.body || error.message || '数据冲突/重复',
          code: status,
          status: 'fail'
        }
        break
      case 500:
        ctx.body = {
          body: error.body || error.message || '服务异常',
          code: status,
          status: 'fail'
        }
        break
      default:
        throw error
    }
  })
}