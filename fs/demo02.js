const fs = require('fs');
const data = '我是kaka';
//创建写入流
let writeFileStream = fs.createWriteStream('../test/output.txt');
//使用utf8格式写入文件
writeFileStream.write(data, 'UTF8');

writeFileStream.end()

writeFileStream.on('finish', function() {
    console.log('写入完成');
});

writeFileStream.on('error', function(err) {
    console.log(err);
});

console.log("程序执行完毕");