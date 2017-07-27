let express = require('express')
let path = require('path')
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let docker = require('./dockerapi')

// Use the environment port
let port = process.env.PORT || 3000

// Serve static files from /public
app.use(express.static('public'))

// Create an endpoint which returns the index.html page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

// Start the server
server.listen(port, () => console.log(`Server startedd on port ${port}`))

// Listen for connections
io.on('connection', socket => {
    socket.on('containers.list', () => {
        refreshContainers()
    })
})

function refreshContainers() {
    docker.listContainers({ all: true }, (err, containers) => {
        io.emit('containers.list', containers)
    })
}