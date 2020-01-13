const redis = require('redis');
const configRedis = require('./config.js');

const host = configRedis.host;
const port = configRedis.port;
const options = {
    auth_pass: configRedis.pass,
}

const redisClient = redis.createClient(port, host);

redisClient.on('error', function(err) {
    console.log('error', err);
});

// redisClient.set('color', 'yellow', redis.print);

// redisClient.get('color', function(err, value) {
//     if (err) throw err;
//     console.log('Got: ' + value)
//     redisClient.quit();
// })

//哈希表
// redisClient.hmset('person', {
//     name: 'kaka',
//     age: 25
// });

// redisClient.hmget('person', 'age', function(err, data) {
//     if (err) throw err;
//     console.log(data);
//     redisClient.quit();
// });

// redisClient.hkeys('person', function(err, keys) {
//     if (err) throw err;
//     keys.forEach((k, i) => {
//         console.log(k, i);
//     });
//     redisClient.quit()
// })

/**
 * 链表
 * Redis链表类似数组，使用lpush向链表中添加数据，
 * lrange获取参数start和end之间的元素，-1代表链表最后一个元素。
 * 随着链表长度的增长，数据获取也会逐渐变慢（大O表示法中的O(n)）
 * */
// redisClient.lpush('tasks', 'one', redis.print);
// redisClient.lpush('tasks', 'two', redis.print);
// redisClient.lrange('tasks', 0, -1, function(err, data) {
//     if (err) throw err;
//     data.forEach((item, i) => {
//         console.log(item)
//     });
//     redisClient.quit()
// })


//集合
// redisClient.sadd('ip', '127.0.0.1', redis.print);
// redisClient.sadd('ip', '127.0.0.2', redis.print);
// redisClient.smembers('ip', function(err, data) {
//     if (err) throw err;
//     console.log(data);
//     redisClient.quit()
// })

//Redis超越了数据存储的传统职责，它还提供了信道，信道是数据传递机制，提供了发布/预定功能
const clientA = redis.createClient(6379, '127.0.0.1')
const clientB = redis.createClient(6379, '127.0.0.1')

clientA.on('message', function(channel, message) {
    console.log('Client A got message from channel %s: %s', channel, message);
});
clientA.on('subscribe', function(channel, count) {
    clientB.publish('main_chat_room', 'Hello world!');
});
clientA.subscribe('main_chat_room');