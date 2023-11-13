// HTML element for our listbox
const listbox = document.getElementById("listbox")

// An integer for the latest selected element
let lastSelected

// The currently displayed listbox elements and their respective components
let listboxElements = {}

// Reloads the listbox to only show the data passed in
const reloadListbox = (data) => {
  // Remove all children of the listbox element
  while (listbox.firstChild) listbox.firstChild.remove()

  listboxElements = {}

  for (let component of data) {
    let element = document.createElement("option")
    element.classList.add("listboxOption")
    element.innerHTML = `${component.name} - ${component.stock} left`

    let UUID = generateUUID()
    element.id = UUID

    listbox.appendChild(element)

    listboxElements[UUID] = {element: element, component: component}
  }

  if (lastSelected) {
    listbox.selectedIndex = lastSelected
    onListboxChanged()
  }
}

// Selects an element in the listbox
const selectElement = (UUID) => {
  let component = listboxElements[UUID].component

  // Finally check if e is a valid component
  if (!component.name || !component.desc || !component) return

  showComponentOnSidebar(component)
}

// Call for the listbox 'change' event and will call select element (which in turn will update the sidebar)
const onListboxChanged = () => {
  let selectedOption = listbox.options[listbox.selectedIndex]
  let selected
  for (let id of Object.keys(listboxElements)) {
    if (listboxElements[id].element == selectedOption) selected = id
  }
  lastSelected = listbox.selectedIndex

  if (selected) selectElement(selected)
}

// Add an event listener for the "change" event
listbox.addEventListener("change", onListboxChanged)