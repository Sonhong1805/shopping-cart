var queryString = window.location.search;
var url_param = new URLSearchParams(queryString);
const loginStorage = JSON.parse(localStorage.getItem("login"));
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const addressInput = document.querySelector("#address");

const showInfoPayment = () => {
  const infoUser = loginStorage.find(
    (item) => item.id + "" === url_param.get("id")
  );

  if (infoUser) {
    const { username, email, address } = infoUser;
    usernameInput.value = username;
    emailInput.value = email;
    addressInput.value = address ?? "";
  }
};

showInfoPayment();

let data = JSON.parse(localStorage.getItem("dataProduct")) ?? [];
const showInfoProduct = () => {
  const infoUser = loginStorage.find(
    (item) => item.id + "" === url_param.get("id")
  );

  if (infoUser) {
    let row = ``;
    data.map((value, index) => {
      if (value.choose) {
        const priceFormat = new Intl.NumberFormat("vi-VN").format(
          Number(value.price) * value.quantity
        );
        row += `
                    <div
                    class="d-flex justify-content-between align-items-center mb-2 border border-success p-3">
                    <div>${index + 1}</div>
                    <div>${value.name}</div>
                    <div style="width: 90px; height: 90px">
                      <img src=${value.image} class="w-100 h-100" />
                    </div>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                      <div>x${value.quantity}</div>
                    </div>
                    <div>price: ${priceFormat} vnd</div>
                  </div>
                          `;
      }
    });
    document.getElementById("rootProducts").innerHTML = row;
    document.querySelector("span.name").innerHTML = infoUser.username;
  }
  const avatar = document.querySelector(".avatar");
  const idAvatar = url_param.get("avatar");
  avatar.src =
    idAvatar ??
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdNp-DQsC6XUBeCvMcDBwF84Yr9MGm1qde2Uxf-8otJ1W4Hz5n";
};

showInfoProduct();

function sumTotal() {
  const infoUser = loginStorage.find(
    (item) => item.id + "" === url_param.get("id")
  );

  if (infoUser) {
    const total = data.reduce(
      (sum, item) =>
        item.choose ? (sum += item.quantity * Number(item.price)) : sum,
      0
    );
    const totalFormat = new Intl.NumberFormat("vi-VN").format(total) ?? 0;
    document.querySelector("#total").innerHTML = totalFormat + " vnd";
  }
}
sumTotal();

function sumQuantity() {
  const infoUser = loginStorage.find(
    (item) => item.id + "" === url_param.get("id")
  );

  if (infoUser) {
    const quantity = data.reduce(
      (sum, item) => (item.choose ? (sum += item.quantity) : sum),
      0
    );
    document.querySelector("#quantity").innerHTML = quantity;
  }
}
sumQuantity();

const btnHome = document.querySelector(".btnHome");

btnHome.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/index.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});

const cardPage = document.querySelector(".cardPage");
cardPage.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/cart.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});

const btnSubmit = document.querySelector(".btnSubmit");
const address = document.querySelector("#address");
const term = document.querySelector("#term");
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (data.length === 0) {
    alert("Vui lòng mua ít nhất 1 sản phẩm");
  } else {
    if (address.value === "") {
      alert("Không bỏ trống địa chỉ");
    } else if (term.checked === false) {
      alert("Agree to terms and conditions");
    } else {
      alert("Thanh toán thành công! ");
      const idLogin = url_param.get("id");
      const idAvatar = url_param.get("avatar");
      window.location.href = `/cart.html?${
        idLogin === null ? "/" : "id=" + idLogin
      }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
      console.log(data);
      const paymentData = data.filter((item) => !item.choose);
      localStorage.setItem("dataProduct", JSON.stringify(paymentData));
    }
  }
});

const userBtn = document.querySelector("#user-btn");
userBtn.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/profile.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});
