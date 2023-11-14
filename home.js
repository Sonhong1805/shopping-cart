const userName = document.querySelector(".name");
const showLogin = document.querySelector(".showLogin");
const showLogout = document.querySelector(".showLogout");
var queryString = window.location.search;
var url_param = new URLSearchParams(queryString);
let loginStorage = JSON.parse(localStorage.getItem("login"));
if (url_param.get("id") === null) {
  showLogout.setAttribute("class", "d-none");
} else {
  showLogin.style.display = "none";
  const userInfo = loginStorage.filter(
    (item) => item.id + "" === url_param.get("id")
  );
  const { username } = userInfo[0];
  userName.innerHTML = username;
}
