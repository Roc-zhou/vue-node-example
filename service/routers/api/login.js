const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken');
const { alg, key, iv } = require('../../config/index').desConfig
const Des = require('rz-des')
const $util = new Des({ alg, key, iv });
const client = require('../../utils/redis')({ db: '1' })
const privateKey = require('../../config/index').privateKey
const { setToken } = require('../../utils/methods')


module.exports = {
  path: '/login',
  method: 'post',
  schema: {
    phone: Joi.string().pattern(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).rule({ message: '手机号输入不正确！' }),
    password: Joi.string().min(6).rule({ message: '密码输入不正确' })
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

    const TOKEN_EX = 60 * 60 * 2

    // 生成token
    const token = setToken(selectUser[0], TOKEN_EX)

    /* jwt.verify(token, privateKey, function (err, decoded) {
      console.log('----------------');
      console.log(decoded)
    }); */


    // 存储redis
    client.set(selectUser[0].phone, token, 'EX', TOKEN_EX, (err, res) => {
      if (err) {
        console.log(err);
        return ctx.throw()
      }
      console.log('token写入成功');
    })

    client.get(selectData[0].phone, (err, val) => {
      if (err) {
        console.log('获取token 失败！');
        console.log(r);
        return false;
      }
      console.log(val);
    })

    return ctx.throw({
      code: 200,
      body: token
    })


  },
}