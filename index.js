var port = 80
var http = require('http');
http.createServer(function (req, res) {
    console.log('peticion GET /');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('a dormir!');
}).listen(port);
console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:'+port);

