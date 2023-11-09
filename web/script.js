const listbox = document.getElementById("listbox")

let allComponents = {}

let listboxElements = {}

const reloadListbox = (data) => {
  // Remove all children of the listbox element
  while (listbox.firstChild) listbox.firstChild.remove()

  listboxElements = {}

  for (let component of data) {
    let element = document.createElement("option")
    element.classList.add("listboxOption")
    element.innerHTML = `${component.name} - ${component.stock} left`
    listbox.appendChild(element)
    
    listboxElements[element] = component
  }
}



// Tell the server to send us the data
loadAllData()