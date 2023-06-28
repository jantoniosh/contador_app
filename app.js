const mqtt = require('mqtt');
const http = require('http');
const express = require('express');
const PORT = process.env.PORT || 8000

const app = express();
app.use(express.static('public'));

app.set('port', PORT);

const server = http.createServer(app);
server.on('listening', () => {
    console.log('Listening on port ' + PORT);
});

const io = require('socket.io')(server);

io.sockets.on('connection', (socket) => {
    console.log('Client connectado: ' + socket.id);
})

server.listen(PORT);

const client = mqtt.connect('mqtt://peridotlynx959.cloud.shiftr.io', {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'peridotlynx959',
    password: 'RxLIj3AvVRRhbcBn',
    clean: true
})

client.on('connect', function () {
    client.subscribe('contador', function (err) {
        if (!err) {
            console.log("Subscribe Correct");
        }
    })
});

client.on('message', function (topic, message) {
    if (topic == "contador") {
        let cont = message.toString();
        console.log(cont);
        io.sockets.emit('contador', cont);
    }
});
