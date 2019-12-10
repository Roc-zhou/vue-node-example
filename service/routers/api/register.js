const Joi = require('@hapi/joi')
const { alg, key, iv } = require('../../config/index').desConfig
const Des = require('rz-des')
const $util = new Des({ alg, key, iv });
const { formatDate, randomString } = require('../../utils/methods')


module.exports = {
  path: '/register',
  method: 'post',
  schema: {
    name: Joi.string().required(),
    phone: Joi.string().pattern(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/),
    password: Joi.string().required()
  },
  function: async (ctx, next) => {
    const data = ctx.request.body,
      slot_code = randomString(20),
      password = $util.encrypt(data.password + slot_code)
    // 查重
    const selectData = await ctx.db('select phone,name from user where phone = ?', [data.phone])
    if (selectData.length !== 0) {
      return ctx.throw({
        code: 10002,
        body: '用户已存在！'
      })
    }

    try {
      await ctx.db('insert into user (name,phone,slot_code,password,create_time) values (?,?,?,?,?)', [data.name, data.phone, slot_code, password, formatDate(new Date())])
      console.log([data.name, data.phone, slot_code, password, formatDate(new Date())]);

      return ctx.throw({ body: true, code: 200 })
    } catch (error) {
      console.log(error);
      return ctx.throw()
    }

  },
}