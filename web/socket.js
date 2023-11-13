const socket = io()

// Called when the server sends data initially
const onLoadData = (data) => {
  allComponents = data
  reloadListbox(data)
}
socket.on("s2c_loadData", onLoadData)

// Anonymous function so no hackas (even tho it wouldn't be verified but oh well)
socket.on("s2c_veifyPassword", () => {
  admin = true
  loginButton.disabled = true
  loginButton.innerHTML = "Admin"
  addComponentButton.disabled = false
  removeComponentButton.disabled = false
  downloadButton.disabled = false
})

socket.on("s2c_revokeAdmin", () => {
  admin = false
  loginButton.disabled = false
  loginButton.innerHTML = "Staff Login"
  addComponentButton.disabled = true
  removeComponentButton.disabled = true
  downloadButton.disabled = true
})

const verifyPassword = (password) => {
  socket.emit("c2s_verifyPassword", password)
}

// Function called from 'script.js' to load the data
const loadAllData = () => { socket.emit("c2s_loadData") }

// Don't call this function unless you're me
const setData = (component, name, desc, stock) => {
  if (!name) name = component.name
  if (!desc) desc = component.desc
  if (!stock) stock = component.stock

  if (admin) socket.emit("c2s_setData", { component: component, name: name, desc: desc, stock: stock })
}

// Add a new component
const addNewComponent = (comp) => {
  if (admin) socket.emit("c2s_addComponent", comp)
}

// Remove a component
const removeComponent = (comp) => {
  if (admin) socket.emit("c2s_removeComponent", comp)
}

