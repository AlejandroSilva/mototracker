var http = require('http');
http.createServer(function (req, res) {
    console.log('peticion GET /');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('push to deploy funcionando la raja!!  directo a la app ');
}).listen(8080);
console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:8080/');

