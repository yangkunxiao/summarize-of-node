const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
/**
 * WebSocket协议是建立在HTTP协议之上，因此创建websocket服务时需要调用http模块的createServer方法。
 * 将生成的server作为参数传入socket.io的方法中。
 */
const IO = require('socket.io')(server);

// 保存所有用户的信息
var users = [];
let usersNum = 0;

//将socket和用户名匹配
const _sockets = [];

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/', (req, res) => {
    fs.readFile('./views/index.html', (err, data) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data, 'utf-8')
    })
})

IO.on("connection", socket => {
    usersNum++;
    console.log(`当前有${usersNum}个用户连接上服务器了`);
    //断开连接
    socket.on('disconnect', () => {
        usersNum--;
        console.log(`当前有${usersNum}个用户连接上服务器了`);
        console.log('someone is disconnect');
        //触发用户离开的监听
        socket.broadcast.emit("oneLeave", { username: socket.username });
        //删除用户
        users.forEach(function (user, index) {
            if (user.username === socket.username) {
                users.splice(index, 1);       //找到该用户，删除
            }
        });
    });
    //登录
    socket.on('login', data => {
        console.log(data, 'login');
        socket.username = data.username;
        for (const item of users) {
            if (item.username === data.usename) {
                socket.emit('usernameErr', { err: "用户名重复" });
                socket.username = null;
                break
            }
        }
        if (socket.username) {
            users.push({
                username: data.username,
                message: [],
                imgUrls: []
            });
            //保存socket
            _sockets[socket.username] = socket;

            // 将所有用户数组传过去
            data.userGroup = users;
            // 触发loginSuccess 登录成功的事件, 广播形式触发
            IO.emit('loginSuccess', data);
        }
    });
    //发送消息
    socket.on('client message', data => {
        // 广播给除自己以外的客户端
        data.userGroup = users;
        socket.broadcast.emit('server message', data);
    });
    //发送图片
    socket.on('sendImg', (data) => {
        for (let user of users) {
            if (user.username === data.username) {
                user.imgUrls.push(data.imgUrl);
                //存储后将图片广播给所有浏览器
                console.log('img')
                IO.emit("receiveImg", data);
                break;
            }
        }
    });
    // 监听私聊事件
    socket.on('sendToOne', (data) => {
        // console.log(data);
        // console.log(2233);
        // console.log(users);
        // 判断该用户是否存在，如果存在就触发receiveToOne事件
        for (let user of users) {
            if (user.username === data.to) {
                _sockets[data.to].emit('receiveToOne', data);
            }
        }
    });
})

server.listen(7777, () => {
    console.log("your server is running at 7777")
})