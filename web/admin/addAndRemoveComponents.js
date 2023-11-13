const addComponentButton = document.getElementById("addcomponentbutton")
const removeComponentButton = document.getElementById("removecomponentbutton")

addComponentButton.onclick = () => {
  // Get data to add
  let name = window.prompt("Enter component name")
  if (!name) return
  let description = window.prompt("Enter description")
  if (!description) return
  let amount = window.prompt("Enter stock") * 1
  if (!amount) return
  let locations = window.prompt("Enter locations (separate by pipe)")
  if (!location) return

  // Parse the locations
  locations = locations.split("|")
  for (let index in locations) locations[index] *= 1

  // Call the socket.js function to add the component
  addNewComponent({name: name, desc: description, stock: amount, locations: locations})
}

removeComponentButton.onclick = () => {
  // Get component name
  let component = getSelectedItem()

  if (!component) return

  // Call the socket.js function to remove the component
  if (confirm(`Are you sure you want to delete the component: "${component.name}"`)) removeComponent(component)
}