var queryString = window.location.search;
var url_param = new URLSearchParams(queryString);

const btnHome = document.querySelector(".btnHome");

btnHome.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/index.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});

const avatarFile = document.querySelector("#avatar-file");
const avatarImg = document.querySelector(".avatarImg");

avatarFile.addEventListener("change", (e) => {
  const file = URL.createObjectURL(e.target.files[0]);
  avatarImg.src = file;
});

let loginStorage = JSON.parse(localStorage.getItem("login"));

const userInput = document.querySelector("#InputUsername");
const inputUser = document.querySelector("#inputUser");
const emailInput = document.querySelector("#InputEmail");
const phoneInput = document.querySelector("#InputPhone");
const genderInput = document.querySelectorAll("input[name='gender']");
const dateInput = document.querySelector("#InputDate");
const renderProfile = () => {
  const infoUser = loginStorage.find(
    (item) => item.id + "" === url_param.get("id")
  );

  const { username, email, phone, date, avatar, gender } = infoUser;
  userInput.value = username;
  inputUser.value = username;
  emailInput.value = email;
  phoneInput.value = phone || "";
  dateInput.value = date || "";
  genderInput.forEach((item) => {
    if (item.value === gender) {
      console.log(item);
      return (item.checked = true);
    }
  });
  avatarImg.src =
    avatar ??
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdNp-DQsC6XUBeCvMcDBwF84Yr9MGm1qde2Uxf-8otJ1W4Hz5n";
};

renderProfile();

const btnLuu = document.querySelector(".btnLuu");

console.log(loginStorage);

btnLuu.addEventListener("click", () => {
  let gender;
  genderInput.forEach((item) => {
    if (item.checked) {
      gender = item.value;
    }
  });
  const newInfoUser = {
    email: emailInput.value,
    avatar: avatarImg.src,
    phone: phoneInput.value,
    gender: gender,
    date: dateInput.value,
  };
  loginStorage = loginStorage.map((item) => {
    if (item.id + "" === url_param.get("id")) {
      return { ...item, ...newInfoUser };
    } else {
      return item;
    }
  });
  console.log(loginStorage);
  alert("Lưu thành công");
  const infoUser = loginStorage.find(
    (item) => item.id + "" === url_param.get("id")
  );
  console.log(infoUser);
  const { avatar } = infoUser;
  const idLogin = url_param.get("id");
  window.location.href = `/profile.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&avatar=${avatar}`;
  localStorage.setItem("login", JSON.stringify(loginStorage));
});

const sections = document.querySelectorAll("section");
const btnNavs = document.querySelectorAll("button.btnNav.btn");

const tabUI = () => {
  btnNavs.forEach((item, index) => {
    const section = sections[index];
    item.addEventListener("click", () => {
      btnNavs.forEach((item) =>
        item.setAttribute("class", "btnNav btn btn-outline-danger")
      );
      sections.forEach((item) =>
        item.setAttribute("class", "d-none flex-grow-1")
      );
      item.setAttribute("class", "btnNav btn btn-danger");
      section.setAttribute("class", "flex-grow-1");
    });
  });
};

tabUI();

const inputNewPassword = document.querySelector("#inputNewPassword");
const inputRepeatPassword = document.querySelector("#inputRepeatPassword");
const btnUpdate = document.querySelector(".btnUpdate");

btnUpdate.addEventListener("click", () => {
  if (inputNewPassword.value === "" && inputRepeatPassword.value === "") {
    alert("ô mật khẩu không bỏ trống");
  } else if (inputRepeatPassword.value !== inputNewPassword.value) {
    alert("Nhập lại mật khẩu");
  } else {
    let findUser = loginStorage.find(
      (item) => item.username === inputUser.value
    );
    findUser.password = inputNewPassword.value;
    alert("update success");
  }
  localStorage.setItem("login", JSON.stringify(loginStorage));
  inputNewPassword.value === "";
  inputRepeatPassword.value === "";
});

const inputAddress = document.querySelector("#inputAddress");
const btnAddress = document.querySelector(".btnAddress");

btnAddress.addEventListener("click", () => {
  if (inputAddress.value === "") {
    alert("Không bỏ trống địa chỉ");
  } else {
    let findUser = loginStorage.find(
      (item) => item.username === inputUser.value
    );
    findUser.address = inputAddress.value;
    alert("Thêm địa chỉ thành công");
  }
  localStorage.setItem("login", JSON.stringify(loginStorage));
  inputAddress.value === "";
});
