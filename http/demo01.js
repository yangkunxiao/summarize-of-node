//新建一个http服务器
const http = require('http');

let app = http.createServer((req, res) => {
    /**
     * 定义HTTP头
     * 状态值：200
     * 类型：text/plain
     */
    res.writeHead(200, { 'Content-type': 'text/plain' });
    //发送响应数据
    res.end('hello world!\n');
});
//设置监听端口号
app.listen(3000, () => {
    console.log('your server os running at localhost:3000');
});