const searchbar = document.getElementById("searchbar")

const BLANK_OPTIONS = ["", " "]

searchbar.addEventListener("input", () => {
  // If the bar is blank, then show every components
  if (BLANK_OPTIONS.includes(searchbar.value.toLowerCase())) {
    reloadListbox(allComponents)
    return
  }

  // Otherwise look through all components and find the ones that are searched for
  let filteredComponents = []
  for (let component of allComponents) {
    if (component.name.toLowerCase().includes(searchbar.value.toLowerCase())) filteredComponents.push(component)
  }

  reloadListbox(filteredComponents)
})