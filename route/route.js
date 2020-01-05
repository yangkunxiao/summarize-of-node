function route(pathname, response) {
    if (pathname === '/') {
        response.write('/');
    } else if (pathname === '/index/home') {
        response.write('index');
    } else {
        response.write('404');
    }
    response.end()
};

module.exports = route;