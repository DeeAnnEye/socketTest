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

// single client welcome 
socket.emit('message', 'Hello World')

// all clients except the user
socket.broadcast.emit('message','A user joined the conversation');

// all in general
socket.on('disconnect',() => {
    io.emit('message','A user left the conversation')
})

// submit msg to server
socket.on('chatMsg', (msg) => {
    io.emit('message',msg)
})
})

// connection to port
const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
