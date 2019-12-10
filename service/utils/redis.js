const redis = require("redis")
const redisConfig = require('../config/index').redisConfig



module.exports = redisClient = (config) => {
  redisConfig.db = config.db || '0'
  let client = redis.createClient(redisConfig)

  client.on('ready', function (res) {
    console.log('ready');
  });

  client.on('end', function (err) {
    console.log('end');
  });

  client.on('error', function (err) {
    console.log(err);
  });

  client.on('connect', function () {
    console.log('redis connect success');
  });
  return client
}