//阻塞和非阻塞  =》 同步和异步

//引入fs模块
const fs = require('fs');

//阻塞方式  同步
//使用readFileSync以同步的方式读取文件
const dataSync = fs.readFileSync('../test/01.txt');
//data内部保存的是十六进制的ASCII码  可以使用tostring转换为字符串
console.log('我是同步方式读取的数据：' + dataSync.toString());

//非阻塞方式 异步 回调函数
fs.readFile('../test/01.txt', function(err, data) {
    if (err) throw err;
    const dataAsync = data;
    console.log('我是异步方式读取的数据：' + dataAsync.toString());
});

console.log('同步调用时 我会最后打印。异步调用时 我会提前打印。');