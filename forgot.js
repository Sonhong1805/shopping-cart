const email = document.getElementById("email");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeatPassword");
const updatebtn = document.querySelector(".updatebtn");

let loginStorage = JSON.parse(localStorage.getItem("login"));

updatebtn.addEventListener("click", () => {
  let checkEmail = loginStorage.some((item) => item.email === email.value);
  if (!checkEmail) {
    alert("Email not found");
  } else if (repeatPassword.value !== password.value) {
    alert("repeat password");
  } else {
    let findEmail = loginStorage.find((item) => item.email === email.value);
    findEmail.password = password.value;
    alert("update success");
    window.location.href = "/login.html";
  }
  localStorage.setItem("login", JSON.stringify(loginStorage));
  email.value = "";
  password.value = "";
  repeatPassword.value = "";
});
