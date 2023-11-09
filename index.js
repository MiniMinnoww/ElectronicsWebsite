const socketio = require('socket.io')
const express = require('express')
const fs = require('fs')

const data = []

class Component {
  constructor(name, desc, stock) {
    this.name = name
    this.desc = desc
    this.stock = stock
  }
}

// Serve webpages from the 'web' folder
const exp = express();
exp.use(express.static('web'))

var web = exp.listen(3000, function() {
 console.log("Running...")
})

// Get socketio to listen to the webserver's connection
io = socketio(web)

io.on('connection', (socket) => {
  console.log("Connected: " + socket.id)
  socket.on("c2s_loadData", () => {
    socket.emit("s2c_loadData", data)
  })
})

function loadAll() {
  // Load CSV data
  const content = fs.readFileSync("data.csv").toString()

  for (let line of content.split('\n')) {
    let items = line.split(',')
    data.push({name: items[0], desc: items[1], stock: items[2]})
  }
}

loadAll()