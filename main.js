/* Node.js static file web server */

// Importing necessary modules 
const http = require('http');
const fs = require('fs');
const { httpListener } = require('./utils/httpListener');
const LabDAO = require('./template/model/LabDAO')
const gitHandler = require('./utils/gitHandler')
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
            // console.log(data);
            res.end(JSON.stringify(data));
        }
    }
    if (req.url.indexOf('/getLabPdf') != -1) {
        if (req.method == 'GET') {
            var labId = LabDAO.getLabId(req.url.replace('/', ''));
            var lab = LabDAO.getLabInfoById(labId);
            var labObj = LabDAO.getLabInfo(lab)
            // console.log(labObj);
            res.write('abc-');
            res.end(JSON.stringify(labObj));
        }
    }
    //req.url has the pathname, check if it conatins './Java'
    if (req.url.indexOf('viewLab?') != -1) {

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
    if (req.url.indexOf('createSnapShot') != -1) { //req.url has the pathname, check if it conatins '.pdf'
        res.setHeader('Refresh', '1');
        res.end();
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
    // gitHandler.createGitDirectory('Lab321');
    let ipv4Prefix = '::ffff:'
    var ip = sock.remoteAddress.replace(ipv4Prefix, '')
    console.log('Client connected from: ' + ip);
    // console.log(request.connection.remoteAddress);
    // Client address at time of connection ----^
    // httpListener(ip);
});
console.log(`Server listening on port ${PORT}`);