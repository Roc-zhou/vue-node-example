// https://github.com/hapijs/joi
const Joi = require('@hapi/joi');

module.exports = (schemaObj = {}) => {
  return async (ctx, next) => {
    const { method } = ctx.request
    method === 'GET' ? schemaObj.ts = Joi.number().integer().required() : ''
    const schema = Joi.object().keys(schemaObj)
    const record = ctx.request[method === 'POST' ? 'body' : 'query']
    const result = schema.validate(schemaObj ? record : {});
    // console.log(result);
    if (result.error) {
      console.log(result.error);
      return ctx.throw({ body: '参数错误', code: 501 })
    }
    return next()
  }
}