const fs = require('fs');
const zlib = require('zlib'); //压缩文件

//链式流

// fs.createReadStream('../test/01.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('../test/03.txt.gz'));


// console.log('文件压缩完毕');


//解压缩
fs.createReadStream('../test/03.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('../test/04.txt'));