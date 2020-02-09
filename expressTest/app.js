const express = require('express');
const router = express.Router();
const app = express();
const log4js = require('log4js');
// const logger4 = require('./middleware/logger.js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger();

app.set('views', './views')

router.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
});

app.get('/', (req, res, next) => {
    res.send('hello kaka');
});
app.use(function (err, req, res, next) {
    console.error(err,res.statusCode)
    res.status(500).send('Something broke!')
  })
app.get('*',(req,res,next) => {
    res.send(`<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" ></script>`);
})

app.use('/', router);

app.listen(3000, () => {
    console.log("server is running at 3000")
})