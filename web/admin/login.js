const loginButton = document.getElementById("loginbutton")
let admin = false

loginbutton.onclick = () => {
  let password = window.prompt("Enter admin password")
  if (password) verifyPassword(password)
}