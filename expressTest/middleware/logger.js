module.exports = function logger4(app, logger) {
    console.log('e')
    app.use((err,req, res, next) => {
        try {
            next()
        } catch (err) {
            logger.error(err);
            res.send('error')
        }
        // switch (res.status) {
        //     case 404:
        //         res.send(`<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`);
        //         break;
        //     case 401:
        //         res.send('友好的401页面')
        //         break;
        // }
    })
}