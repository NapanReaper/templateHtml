const http = require("http");
const fs = require("fs");
const RESOURCE_PORT = 8080
http.createServer((req, res) => {
    fs.readFile('./template/lab_content.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
    console.log("Server start at:" + RESOURCE_PORT);
}).listen(RESOURCE_PORT);
