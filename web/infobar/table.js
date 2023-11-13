const table = {}

table.name = document.getElementById("tableName")
table.desc = document.getElementById("tableDesc")
table.stock = document.getElementById("tableStock")
table.location = document.getElementById("tableLocation")

table.stock.addEventListener("mousedown", () => {
    if (admin) {
      let amount = window.prompt("Enter new stock amount")
      let component = getSelectedItem()
      setData(component, undefined, undefined, amount)
    }
})
table.name.addEventListener("mousedown", () => {
    if (admin) {
      let name = window.prompt("Enter new name")
      let component = getSelectedItem()
      setData(component, name)
    }
})
table.desc.addEventListener("mousedown", () => {
    if (admin) {
      let desc = window.prompt("Enter new description")
      let component = getSelectedItem()
      setData(component, undefined, desc)
    }
})


const setTable = (component) => {
  table.name.innerHTML = component.name
  table.desc.innerHTML = component.desc
  table.stock.innerHTML = component.stock

  let locString = ""
  for (let loc of component.locations) locString += `${loc}, `
  locString = locString.slice(0, -2);
  table.location.innerHTML = locString
}