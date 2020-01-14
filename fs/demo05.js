//文件系统
const fs = require('fs');
const path = require('path');
/* 

//读取文件

//异步
fs.readFile('../test/01.txt', function(err, data) {
    if (err) {
        return console.log(err);
    };
    console.log('异步读取文件：' + data.toString());
});
//同步
let data = fs.readFileSync('../test/01.txt');
console.log('同步读取文件：' + data.toString());


//打开文件 

//异步
fs.open('../test/01.txt', 'r+', function(err, fd) {
    if (err) {
        return console.log(err);
    }
    console.log('文件打开成功，fd=' + fd);
});
//同步
let fd = fs.openSync('../test/01.txt', 'r+');
console.log('文件打开成功，fd=' + fd); */


//获取文件信息  
/**
 * stats的方法：
 * isFile()
 * isDirectory()
 * isBlockDevice() 是否是块设备
 * isCharacterDevice() 是否是字符设备
 * isSymbolicLink() 是否是软连接
 * isFIFO() 如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
 * isSocket()
 */

//异步
/* fs.stat('../test/01.txt', function(err, stats) {
    if (err) throw err;
    console.log(stats);
});

//同步
let stats = fs.statSync('../test/01.txt');
console.log(stats); */


//写入文件

//异步

/* console.log("准备写入文件");
fs.writeFile('../test/01.txt', '我是通 过fs.writeFile 写入文件的内容', function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------")
    console.log("读取写入的数据！");
    fs.readFile('../test/01.txt', function(err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("异步读取文件数据: " + data.toString());
        console.log("准备删除文件！");
        fs.unlink('../test/01.txt', function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("文件删除成功！");
        });
    });
}); */

//readline 按行读取
const readline = require('readline');
const dir = path.resolve(__dirname, 'note.txt');
const readStream = fs.createReadStream(dir);
const readL = readline.createInterface({
    input: readStream
});
readL.on('line', data => {
    console.log(data)
})