const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// set static folder
app.use(express.static(path.join(__dirname,'public')))

// connection to web socket
io.on('connection', socket => {

console.log("New WS connected....");

// single client
socket.emit('message', 'Hello World')

// all clients except the user
socket.broadcast.emit();

// all in general
// io.emit();
})

// connection to port
const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
