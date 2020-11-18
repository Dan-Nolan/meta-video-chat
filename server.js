//to run 3001 server: peerjs --port 3001   





const express = require('express')
const app = express()
//const server = require('http').Server(app)
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
//const { Socket } = require('socket.io')
const Web3 = require("web3");
const ethers = require('ethers');
var web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.set('view engine', 'ejs')
app.use(express.static('public'))




app.get('/', (req, res) => {
    console.log("HELLO333")
    res.redirect(`/${uuidV4()}`)
});


app.get('/:room', (req, res) => {
    res.render('room', {
        roomId: req.params.room
    })
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/room.ejs'));
});


var options = {
    debug: true
}


app.use('/peerjs', ExpressPeerServer(server, options));

//server.listen(9000);





io.on('connection', socket => {
    console.log("HELLO333")
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
    })
})






server.listen(process.env.PORT || 3000);