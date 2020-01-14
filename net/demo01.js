const net = require("net");

const server = net.createServer(() => {
    server.maxConnections = 3;
    server.getConnections((err, count) => {
        if (err) throw err;
        console.log('已经连接：' + count);
    })
});

server.listen("8000", () => {
    console.log('服务端已启动');
});

server.on("listening", () => {
    console.log('监听端口8000')
});

server.on('connection', () => {
    console.log('有人连接进来了')
});

server.on('close', () => {
    console.log('关闭连接');
});

server.on('error', (err) => {
    console.log('连接错误：' + err);
});