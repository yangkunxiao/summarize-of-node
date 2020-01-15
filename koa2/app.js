const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const logger = require('./middleware/logger');
const static = require('koa-static');
// const router = new Router();
const router = require('./router/index');

const app = new Koa();

app.use(views('views', {
    extension: 'ejs'
}));
app.use(bodyParser());
app.use(static(__dirname + '/static'));

//应用级中间件
app.use(logger)

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('koa服务器已启动')
});

app.on('error', (err) => {
    console.log(err)
})

// app.listen() 是下面的语法糖
/* const http = require('http');
http.createServer(app.callback()).listen(3000); */