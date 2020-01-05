const fs = require('fs');

//管道流

//创建可读流
let readFileStream = fs.createReadStream('../test/01.txt');

//创建可写流
let writeFileStream = fs.createWriteStream('../test/02.txt');

readFileStream.pipe(writeFileStream);

console.log('over');