var http = require('http');
http.createServer(function (req, res) {
    res.json({
        saludo: 'hola mundo!!'
    })
}).listen(8080);
console.log('Server running at http://APP_PRIVATE_IP_ADDRESS:8080/');

