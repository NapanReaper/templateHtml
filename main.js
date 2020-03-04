/* Node.js static file web server */

// Importing necessary modules 
const http = require('http');
const fs = require('fs');
const json2File = require('./utils/jsonObject2File');

// Port on which the server will create 
const PORT = 1800;

// Maps file extension to MIME types which 
// helps browser to understand what to do 
// with the file 
// Creating a server and listening at port 1800 
http.createServer((req, res) => {
    console.log(`${req.method} : ${req.url}`)
    if (req.url.indexOf('.html') != -1) { //req.url has the pathname, check if it conatins '.html'
        fs.readFile(__dirname + '/template/views' + req.url, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    if (req.url.indexOf('/Java') == 0 && req.url.indexOf('.pdf') == -1) { //req.url has the pathname, check if it conatins '.html'
        fs.readFile(__dirname + '/data' + `${req.url}.json`, (err, data) => {
            if (err) console.log(err);
            let excercise = ""
            excercise = JSON.parse(data);
            fs.readFile(__dirname + '/template/views/viewLab.html', function (err, data) {
                if (err) console.log(err);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.write(`<script>loadExceriseDetail("${excercise.Name}","${excercise.LOC}");`)
                res.write(`\n loadPdfAndPaging("${excercise.Contents}")</script></body></html>`)
                res.end();
            });
        });
    }
    if (req.url.indexOf('.js') != -1 && req.url.indexOf('node_modules') == -1 && req.url.indexOf('.json') == -1) { //req.url has the pathname, check if it conatins '.js'
        fs.readFile(__dirname + '/template/js' + req.url, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    }
    if (req.url.indexOf('.js') != -1 && req.url.indexOf('node_modules') != -1 && req.url.indexOf('.json') == -1) { //req.url has the pathname, check if it conatins '.js'
        fs.readFile(__dirname + '/' + req.url, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    }
    if (req.url.indexOf('.css') != -1) { //req.url has the pathname, check if it conatins '.css'
        fs.readFile(__dirname + '/template/css' + req.url, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(data);
            res.end();
        });
    }
    if (req.url.indexOf('.png') != -1) { //req.url has the pathname, check if it conatins '.png'
        fs.readFile(__dirname + '/template/images' + req.url, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.write(data);
            res.end();
        });
    }
    if (req.url.indexOf('.pdf') != -1 && req.url.indexOf('.json') == -1) { //req.url has the pathname, check if it conatins '.pdf'
        fs.readFile(__dirname + '/data' + req.url, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'application/pdf' });
            res.write(data);
            res.end();
        });
    }
    if (req.url.indexOf('.json') != -1) { //req.url has the pathname, check if it conatins '.json'
        var pattern = /\?(.*)/g;
        var sanitizePath = req.url.replace(pattern, '');
        fs.readFile(__dirname + '/data' + sanitizePath, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(data);
            res.end();
        });
    }
}).listen(PORT);

console.log(`Server listening on port ${PORT}`); 