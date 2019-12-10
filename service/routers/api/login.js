const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken');
const { alg, key, iv } = require('../../config/index').desConfig
const Des = require('rz-des')
const $util = new Des({ alg, key, iv });
const client = require('../../utils/redis')({ db: '1' })


module.exports = {
  path: '/login',
  method: 'post',
  schema: {
    phone: Joi.string().pattern(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/),
    password: Joi.string().required()
  },
  function: async (ctx, next) => {
    const data = ctx.request.body
    // 查重
    const selectData = await ctx.db('select phone,name,slot_code,password from user where phone = ?', [data.phone])
    if (selectData.length === 0) {
      return ctx.throw({
        code: 10002,
        body: '用户不存在！'
      })
    }
    const slot_code = selectData[0].slot_code,
      password = $util.encrypt(data.password + slot_code)

    // 校验用户名密码
    const selectUser = await ctx.db('select id,phone,name,slot_code,password,create_time from user where phone = ? and password = ?', [data.phone, password])
    if (selectUser.length === 0) {
      return ctx.throw({
        code: 10003,
        body: '用户名或密码不正确!'
      })
    }
    // 生成token
    const token = jwt.sign({
      data: selectUser[0]
    }, slot_code, {
      expiresIn: 180
    });

    // 存储redis
    client.set(selectUser[0].phone, token, 'EX', 60 * 60, (err, res) => {
      if (err) {
        console.log(err);
        return ctx.throw()
      }
      console.log('token写入成功');
    })

    return ctx.throw({
      code: 200,
      body: token
    })


  },
}