import http from "node:http";
const server = http.createServer();
const PORT = 3000;
server.on('request', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, CIS 3308!\n');
});
server.on('listening', function () {
    console.log(`Server running! (http://localhost:${PORT})`);
});
server.listen(3000);
//# sourceMappingURL=main.js.map