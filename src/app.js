let express = require('express');
let fs = require('fs');
//
let app = express();
//
let privateKey = fs.readFileSync(__dirname + '/sslcert/selfsigned.key', 'utf8');
let certificate = fs.readFileSync(__dirname + '/sslcert/selfsigned.crt', 'utf8');

let credentials = { key: privateKey, cert: certificate };
//
let server = require('https').Server(credentials, app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.of('/stream').on('connection', stream);

server.listen(8443);
