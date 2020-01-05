const http = require('http');
const url = require('url');
const router = require('./route/route');

let app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    let pathname = url.parse(req.url).pathname;
    router(pathname, res)
});

app.listen(8888, () => {
    console.log('serve in running at locaohost:8888');
})