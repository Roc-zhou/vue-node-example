// https://github.com/hapijs/joi
const Joi = require('@hapi/joi');

module.exports = (schemaObj = {}, status = 400) => {
  return (ctx, next) => {
    const { method } = ctx.request
    method === 'GET' ? schemaObj.ts = Joi.number().integer().required() : ''
    const schema = Joi.object().keys(schemaObj)
    const record = ctx.request[method === 'POST' ? 'body' : 'query']
    const result = schema.validate(schemaObj ? record : {});
    if (result.error !== null) {
      console.log(result.error);
      return ctx.throw(status, { message: '参数错误' })
    }
    return next()
  }
}