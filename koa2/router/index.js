const Router = require('koa-router');
const router = new Router();

//路由级中间件
router.get('/', async(ctx) => {
    // console.log(ctx.request.query) //{ m: '10', a: 'kaka' }
    // console.log(ctx.request.querystring) //m=10&a=kaka
    // console.log(ctx.query)
    console.log("路由级中间件");
    // ctx.body = '路由页面/'
    let title = 'hello koa2';
    let username = 'kaka';
    await ctx.render('index', {
        title,
        username
    })
});

router.post('/add', async ctx => {
    const body = ctx.request.body;
    console.log(body);
    ctx.body = body;
})

router.get('/about', ctx => {
    console.log("路由级中间件");
    ctx.body = '路由页面/about'
});

router.get('/detail/:id', ctx => {
    // console.log(ctx.params.id)
    console.log("路由级中间件");
    ctx.body = '路由页面/detail'
});

module.exports = router;