const jwt = require('jsonwebtoken');
const privateKey = require('../config/index').privateKey

module.exports.formatDate = (date, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (!date) return '';
  date = new Date(date);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let m1 = date.getMinutes();
  let s = date.getSeconds();
  m = m < 10 ? ("0" + m) : m;
  d = d < 10 ? ("0" + d) : d;
  h = h < 10 ? ("0" + h) : h;
  m1 = m1 < 10 ? ("0" + m1) : m1;
  s = s < 10 ? ('0' + s) : s;

  return format = format.replace('yyyy', y).replace('MM', m).replace('dd', d).replace('hh', h).replace('mm', m1).replace('ss', s)
}
module.exports.randomString = (len = 10) => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  return pwd
}


module.exports.setToken = (data, ex) => {
  return jwt.sign({
    data
  }, privateKey, {
    expiresIn: ex
  })
}
module.exports.getTokenInfo = (data) => {
  try {
    return jwt.verify(data, privateKey).data
  } catch (error) {
    return null
  }
}