const searchbar = document.getElementById("searchbar")
const filterList = document.getElementById("filterElement")

const BLANK_OPTIONS = ["", " "]

const filterType = {alphabetical: 0, stock: 1, stockDescending: 2}
let filter = filterType.alphabetical;

const search = () => {
  // If the bar is blank, then show every components
  if (BLANK_OPTIONS.includes(searchbar.value.toLowerCase())) {
    let filteredComponents = [...allComponents]
    filteredComponents = sortWithFilter(filteredComponents, filter)
    reloadListbox(filteredComponents)
    return
  }

  // Otherwise look through all components and find the ones that are searched for
  let filteredComponents = []
  for (let component of allComponents) {
    if (component.name.toLowerCase().includes(searchbar.value.toLowerCase())) filteredComponents.push(component)
  }

  // Sort components
  filteredComponents = sortWithFilter(filteredComponents, filter)
  reloadListbox(filteredComponents)
}

searchbar.addEventListener("input", search)
filterList.addEventListener("change", () => {
  filter = filterList.value * 1;
  console.log(filter)
  search()
})

const sortWithFilter = (arr, _filterType) => {
  arr = [...arr]
  switch (_filterType) {
    case filterType.alphabetical:
      arr.sort((a, b) => (a.name > b.name) ? 1: -1)
      break
    case filterType.stock:
      arr.sort((a, b) => (a.stock*1 < b.stock*1) ? 1: -1)
      break
    case filterType.stockDescending:
      arr.sort((a, b) => (a.stock*1 > b.stock*1) ? 1: -1)
      break
  }
  return arr
}

