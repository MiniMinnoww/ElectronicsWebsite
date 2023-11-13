const socketio = require('socket.io')
const express = require('express')
const fs = require('fs')
const bcrypt = require('bcrypt')
const saltRounds = 10;
let hashedPassword
const data = []

// Serve webpages from the 'web' folder
const exp = express();
exp.use(express.static('web'))

// Mark584

hashedPassword = "$2b$10$6z91ZtSQbvSTNMITdzwSFO6SRWKAKuXRzEsRxkeiAB38LEolor9.."

var web = exp.listen(3000, function() {
 console.log("Running...")
})

// Get socketio to listen to the webserver's connection
io = socketio(web)

io.on('connection', (socket) => {
  let admin = false
  
  console.log("Connected: " + socket.id)
  socket.on("c2s_loadData", () => {
    socket.emit("s2c_loadData", data)
  })

  socket.on("c2s_setData", (d) => {
    if (!admin) {
      socket.emit("s2c_revokeAdmin")
      return
    }
    let component = d.component
    if (!component || !component.name || !component.desc || !component.stock) return

    for (let index in data) {
      if (data[index].name == component.name) {
        component.name = d.name
        component.desc = d.desc
        component.stock = d.stock

        data[index] = component
      }
    }

    saveAll()

    // Reload their data
    io.emit("s2c_loadData", data)
  })

  socket.on("c2s_addComponent", (component) => {
    if (!admin) {
      socket.emit("s2c_revokeAdmin")
      return
    }
    for (let index in data) {
      if (data[index].name == component.name) return // Already exists!
    }
    if (!component || !component.name || !component.desc || !component.stock) return
    
    data.push(component)
    saveAll()

    io.emit("s2c_loadData", data)
  })

  socket.on("c2s_removeComponent", (component) => {
    if (!admin) {
      socket.emit("s2c_revokeAdmin")
      return
    }
    if (!component || !component.name || !component.desc || !component.stock) return
    
    for (let index in data) {
      if (data[index].name == component.name) {
        data.splice(index, 1)
        break
      }
    }
    saveAll()

    io.emit("s2c_loadData", data)
  })

  socket.on("c2s_verifyPassword", (e) => {
    console.log('Input Password:', e);
    console.log('Stored Hashed Password:', hashedPassword);
    
    bcrypt.compare(e, hashedPassword, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err)
        socket.emit("s2c_revokeAdmin")
      } else {
        if (result) {
          console.log('Password is correct')
          admin = true
          socket.emit("s2c_veifyPassword")
          
        } else {
          console.log('Password is incorrect')
          socket.emit("s2c_revokeAdmin")
          admin = false
        }
      }
    });
  })
})

function loadAll() {
  // Load CSV data
  const content = fs.readFileSync("data.csv").toString()

  for (let line of content.split('\n')) {
    let items = line.split(',')
    console.log(items)
    let locations = items[3].split("|")
    for (let index in locations) locations[index] *= 1
    data.push({name: items[0], desc: items[1], stock: items[2], locations: locations})
  }
}

function saveAll() {
  let saveString = ""
  for (let component of data) {
    if (!component) continue
    let loc = ""
    for (let l in component.locations) loc += `${l}|`
    loc = loc.slice(0, -1)
    
    saveString += `${component.name},${component.desc},${component.stock},${loc}\n`
  }
  saveString = saveString.slice(0, -1)

  fs.writeFile('data.csv', saveString, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}


loadAll()