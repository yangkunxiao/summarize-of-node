module.exports = async(ctx, next) => {
    ctx.state.commondata = '我是应用级中间件';
    console.log("应用级中间件");
    await next()
}