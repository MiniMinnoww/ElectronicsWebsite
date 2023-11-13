// A list of every component client side.
let allComponents = {}

let downloadButton = document.getElementById("downloadButton")
downloadButton.onclick = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedDate = dd + '-' + mm + '-' + yyyy;
  
  let data = ""
  for (let component of allComponents) {
    data += `${component.name},${component.desc},${component.stock},${component.locations.join("|")}\n`
  }
  data = data.slice(0, -1)

  let blob = new Blob([data], { type: "text/plain" });

  var downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(blob)
  downloadLink.download = `${formattedDate} Electronics Stock.csv`;

  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);
}

// Tell the server to send us the data
loadAllData()