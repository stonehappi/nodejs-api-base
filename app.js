const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./route')
const config = require('./util/constant')
const conversation = require('./controller/conversation.controller');

app.use(bodyParser.json({ limit: "20mb" }));

app.use(function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');
    next();
});

app.use('/images', express.static('files'));
app.use('/api', routes)

var http = require('http').createServer(app);
const io = require('socket.io').listen(http);

io.sockets.on('connection', function (socket) {
    socket.on(config.getConv, function (id) {
        console.log('get conversation :' + id);
        conversation.list(id).then(res =>{
            io.sockets.emit(`${config.getConv} ${id}`, res.recordset)
        });
    });

    socket.on(config.newConv, function (_data) {
        console.log('emit message');
        conversation.insert(_data).then(res1 =>
            conversation.list(_data.HotspotId).then(res => {
                io.sockets.emit(`${config.getConv} ${_data.HotspotId}`, res.recordset)
            })
        );
    });
});
http.listen(config.port);