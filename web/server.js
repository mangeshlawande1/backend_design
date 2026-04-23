// node server.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain')
        res.end("jack sparrow calling...")
    } else if (req.url === '/ice-tea') {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain')
        res.end("brewing ice tea ...")
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain')
        res.end("404 Not found ")
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is listening on port http://${hostname}:${port}`);
});
