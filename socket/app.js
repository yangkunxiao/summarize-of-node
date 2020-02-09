const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data, 'utf-8')
    })
}).listen(3000, () => {
    console.log('服务端已启动')
});
const IO = require('socket.io')(server);
let count = 0;

IO.sockets.on('connection', socket => {
    count++;
    socket.emit('users', { number: count });
    socket.broadcast.emit('users', { number: count });
    socket.on('disconnect', () => {
        count--;
        socket.emit('users', { number: count });
        socket.broadcast.emit('users', { number: count })
    })
    socket.on('msg',data => {
        // console.log(data)
        if(data && data.type === 'all'){
            socket.broadcast.emit('users',data.data)
        }
    })
})