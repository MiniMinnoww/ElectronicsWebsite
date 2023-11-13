// Generates a unique identifier (unless you get really unlucky)
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  })
}

// Gets the component for the currently selected listbox item
const getSelectedItem = () => {
  let selectedOption = listbox.options[listbox.selectedIndex]
  let selected
  for (let id of Object.keys(listboxElements)) {
    if (listboxElements[id].element == selectedOption) selected = id
  }

  if (selected) {
    let component = listboxElements[selected].component
    return component
  }
}