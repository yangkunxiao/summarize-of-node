module.exports = async(ctx, next) => {
    console.log(1)
    const start = new Date().getTime();
    await next();
    console.log(2)
    const ms = new Date().getTime() - start;
    ctx.set('X-response-time', `${ms}ms`);
}