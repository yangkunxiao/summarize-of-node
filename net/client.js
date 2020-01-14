const net = require('net');

const socket = net.connect(3000);

socket.on("connect", () => {
    console.log('和服务端建立连接');
    socket.write('你好 我是客户端。');
    socket.on("data", data => {
        console.log('收到服务端消息：' + data.toString());
        socket.end();
    });
})

socket.on('end', () => {
    console.log('客户端关闭连接')
});

socket.on("error", () => {
    console.log("连接失败")
})