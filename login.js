const username = document.querySelector("#uname");
const password = document.querySelector("#psw");
const login = document.querySelector("#login");

let loginStorage = JSON.parse(localStorage.getItem("login"));

login.addEventListener("click", () => {
  if (login.value === "" && password.value === "") {
    alert("Không được bỏ trống");
  } else {
    const checkUser = loginStorage.some(
      (item) => item.username === username.value
    );
    const checkPsw = loginStorage.some(
      (item) => item.password === password.value
    );
    const user = loginStorage.filter(
      (item) => item.username === username.value
    );
    try {
      const id = user[0].id;
      if (!checkUser) {
        alert("user not found");
      } else if (!checkPsw) {
        alert("password not found");
      } else {
        const checkLogin = loginStorage.some(
          (item) =>
            item.username === username.value && item.password === password.value
        );
        if (checkLogin) {
          username.value = "";
          window.location.href = `/?id=${id}`;
        }
      }
    } catch {
      alert("user not found");
    }
  }
});

const eyeOpen = document.querySelector(".fa-eye-slash");
function togglePassword() {
  const password = document.getElementById("psw");
  if (eyeOpen.getAttribute("class") === "fa-regular fa-eye-slash") {
    eyeOpen.setAttribute("class", "fa-regular fa-eye");
  } else {
    eyeOpen.setAttribute("class", "fa-regular fa-eye-slash");
  }
  password.type = password.type === "password" ? "text" : "password";
}
