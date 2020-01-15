module.exports = async(ctx, next) => {
    console.log(3);
    console.log(ctx.cookies.get('name'))
    ctx.cookies.set('name', 'kaka', {
            expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
        })
        // ctx.body = 'hello world'
}