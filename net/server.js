const net = require("net");

const server = net.createServer();

server.on("connection", socket => {
    socket.on("data", chunk => {
        console.log('获取请求数据 ：' + chunk.toString());
        socket.write('hello  我的服务端');
        server.close()
    });
    socket.on('close', () => {
        console.log('关闭连接')
    });
});

server.on('listening', () => {
    console.log('listening')
})

server.on("close", () => {
    console.log("服务端关闭连接")
})

server.listen(3000, () => {
    console.log('服务端运行于3000端口')
});

server.on('error', (err) => {
    console.log("连接失败")
})