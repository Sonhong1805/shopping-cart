const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeatPassword");
const signupbtn = document.querySelector(".signupbtn");

let storage = JSON.parse(localStorage.getItem("login"));
if (storage === null) {
  storage = [];
}
console.log(storage);

signupbtn.addEventListener("click", () => {
  const checkUser = storage.some((item) => item.username === username.value);
  const checkEmail = storage.some((item) => item.email === email.value);
  if (
    username.value === "" &&
    email.value === "" &&
    repeatPassword.value === "" &&
    password.value === ""
  ) {
    alert("Please nhap day du thong tin");
  } else {
    if (checkUser) {
      alert("Username da ton tai");
    } else if (checkEmail) {
      alert("Email da ton tai");
    } else if (repeatPassword.value !== password.value) {
      alert("mat khau nhap khong dung");
    } else {
      storage.push({
        id: Date.now(),
        username: username.value,
        email: email.value,
        password: password.value,
      });
      alert("signup success");
      window.location.href = "/login.html";
    }
    localStorage.setItem("login", JSON.stringify(storage));
    username.value = "";
    email.value = "";
    password.value = "";
    repeatPassword.value = "";
  }
});
