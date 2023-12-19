var http = require("http");
var url = require("url")



http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    response.end('FPT APTECH HI\n')
}).listen(8081);
console.log('Server at http://localhost:8081')




http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.end(txt)
}).listen(8082);
console.log('Server at http://localhost:8082')





http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var q = url.parse(req.url, true).query;
    if (q.name && q.title) {
        var greeting = `Hello ${q.title} ${q.name}`;
        res.end(greeting);
    } else {
        res.end('Missing parameters. Please provide both "name" and "title" in the query.');
    }

}).listen(8083);
console.log('Server at http://localhost:8083')





http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    var q = url.parse(req.url, true).query;

    if (q.name && q.year) {
        var Year = new Date().getFullYear();
        var age = Year - parseInt(q.year);
        var txt = `${q.name} is ${age} tui`;
        res.end(txt);
    } else {
        res.end('Missing parameters. Please provide both "name" and "year" in the query.');
    }

}).listen(8084);
console.log('Server at http://localhost:8084')






