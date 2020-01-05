const fs = require('fs');
let data = '';

/**
 * 流的读取是将读取的数据放在一个缓冲区，这个缓冲区默认大小为16k，读取数据默认格式为buffer 二进制类型
 * 创建读取流的时候，可以设置数据格式和缓冲区大小 
 * 每一个stream都是EventEmitter的实例对象
 */

//创建可读流
// let readFileStream = fs.createReadStream('../test/02.txt', {
//     // encoding: 'utf8',
//     // highWaterMark: 4 //单位 byte  此时应该读取9次
// });

// readFileStream.on('open', function() {
//     console.log('文件打开');

// });

// //每次读取的时候，都会触发data事件
// //可读流有两种方式：自动流动flowing模式  手动流动paused模式 stream.read()

// //自动流动
// // readFileStream.on('data', function(chunk) {
// //     console.log(chunk, 'chunk');
// //     data += chunk;
// // });

// //手动流动
// readFileStream.on('readable', function() {
//     while ((chunk = readFileStream.read()) !== null) {
//         data += chunk;
//     }
// })

// readFileStream.on('end', function() {
//     console.log(data);
// });

// readFileStream.on('error', function(err) {
//     console.log(err);
// });

// readFileStream.on('close', function() {
//     console.log('文件关闭');

// })

// console.log('程序执行完毕');

//Transform
const stream = require('stream');
const transform = stream.Transform({
    transform(chunk, encoding, cb) {
        //this.push()node中向缓冲区写入数据
        this.push(chunk.toString().toLowerCase());
        cb()
    }
});

transform.write('ABDD');
console.log(transform.read().toString());