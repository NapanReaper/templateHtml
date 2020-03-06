/* Node.js static file web server */

// Importing necessary modules 
const http = require('http');
const fs = require('fs');
const { httpListener } = require('./utils/httpListener');
const LabDAO = require('./template/model/LabDAO')

// Port on which the server will create 
const PORT = 1800;

// Maps file extension to MIME types which 
// helps browser to understand what to do 
// with the file 
// Creating a server and listening at port 1800 
var server = http.createServer((req, res) => {
    console.log(`${req.method} : ${req.url}`)
    if (req.url === '/') { //req.url has the pathname, check if it conatins '.html'
        fs.readFile(__dirname + '/template/views/lab_content.html', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    if (req.url === '/getLab') {
        if (req.method == 'GET') {
            let subjectId = LabDAO.readSubject();
            data = LabDAO.readAssignmentBySubject(subjectId);
            console.log(data);
            res.end(JSON.stringify(data));
        }
    }
    if (req.url === '/getLabPdf') {
        if (req.method == 'GET') {
            res.end('/Data/LAB321/Lab1/lab1.pdf');
        }
    }
    //req.url has the pathname, check if it conatins './Java'
    if (req.url.indexOf('viewLab?') != -1) {
        var labId = LabDAO.getLabById(req.url.replace('/', ''));
        LabDAO.geLabPdfById(labId);
        fs.readFile(__dirname + '/template/views/viewLab.html', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    if (req.url.indexOf('.js') != -1 && req.url.indexOf('node_modules') == -1
        && req.url.indexOf('.json') == -1) { //req.url has the pathname, check if it conatins '.js'
        fs.readFile(__dirname + '/template/js' + req.url, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    }
    if (req.url.indexOf('.js') != -1 && req.url.indexOf('node_modules') != -1
        && req.url.indexOf('.json') == -1) { //req.url has the pathname, check if it conatins '.js'
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
        fs.readFile(__dirname + req.url, function (err, data) {
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
server.on('connection', function (sock) {
    let ipv4Prefix = '::ffff:'
    var ip = sock.remoteAddress.replace(ipv4Prefix, '')
    // console.log('Client connected from: ' + ip);

    // Client address at time of connection ----^
    // httpListener(ip);
});
console.log(`Server listening on port ${PORT}`);