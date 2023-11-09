const socket = io()

const onLoadData = (data) => {
  allComponents = data
  reloadListbox(data)
}
socket.on("s2c_loadData", onLoadData)

const loadAllData = () => {socket.emit("c2s_loadData")}

