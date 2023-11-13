// The script for the right sidebar with all the info on it
const currentlySelectedName = document.getElementById("infoname")
const currentlySelectedDescription = document.getElementById("infodesc")
const currentlySelectedImage = document.getElementById("infoimage")
const currentlySelectedSymbol = document.getElementById("infosymbol")

// Takes a component and shows it on the sidebar. The table is handled in 'table.js'
const showComponentOnSidebar = (component) => {
  // Update the selected info with the new info
  currentlySelectedName.innerHTML = component.name
  currentlySelectedDescription.innerHTML = component.desc

  setTable(component)
}