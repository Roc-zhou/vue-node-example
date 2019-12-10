module.exports = {
  dbConfig: {
    host: '127.0.0.1', // 主机地址
    port: 3306, // 端口
    user: "root", // 数据库访问账号
    password: "", // 数据库访问密码
    database: "app" // 要访问的数据库
  },
  desConfig: {
    alg: 'aes-128-cbc',
    key: 'asd123adaqwex123',
    iv: 'asd123adaqwex123'
  },
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
  },
  privateKey:'asd12casd12dasdtfdsfhb2afsad234fsd'
}