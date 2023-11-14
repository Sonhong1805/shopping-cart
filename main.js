const products = [
  {
    id: 1,
    name: "New Balance 237 Classic",
    image:
      "https://cdn.shopify.com/s/files/1/0456/5070/6581/products/WS237VB-1_360x.jpg?v=1667460153",
    price: "3400000",
    size: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "New Balance Nb Fw 327",
    image:
      "https://cdn.shopify.com/s/files/1/0456/5070/6581/products/MS327DT-1_360x.jpg?v=1679998777",
    price: "2500000",
    size: ["M", "L", "XL"],
  },
  {
    id: 3,
    name: "New Balance Roav Fresh",
    image:
      "https://cdn.shopify.com/s/files/1/0456/5070/6581/products/WROVXCW2-1_360x.jpg?v=1667460148",
    price: "1600000",
    size: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 4,
    name: "New Balance 200 Lifestyle",
    image:
      "https://cdn.shopify.com/s/files/1/0456/5070/6581/products/SMF200N1-1_540x.jpg?v=1678435029",
    price: "470000",
    size: ["S", "M"],
  },
];

localStorage.setItem("products", JSON.stringify(products));

var queryString = window.location.search;
var url_param = new URLSearchParams(queryString);

// window.onload = () => {
//   const infoUser = loginStorage.find(
//     (item) => item.id + "" === url_param.get("id")
//   );
//   const { username } = infoUser;
//   let utterance = new SpeechSynthesisUtterance(
//     `Hello ${username}, Welcome to the shopping cart website created by Nguyễn Hồng Sơn`
//   );
//   speechSynthesis.speak(utterance);
// };

function renderProducts(array) {
  array.sort(() => Math.random() - 0.5);
  let data = ``;
  array.map((value) => {
    const price = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value.price);
    data += `
        <div class='col-3'>
          <div class='card'>
            <img src='${value.image}' class='card-img-top' alt=''>
            <div class='card-body'>
              <h5 class='card-title'>${value.name}</h5>
              <p class='card-text'>${price}</p>
              <button onclick='detailsProducts(${value.id})' class='btn btn-primary w-100'>Detail</button>
            </div>
          </div>
        </div>
      `;
  });
  document.getElementById("products").innerHTML = data;
  const avatar = document.querySelector(".avatar");
  const idAvatar = url_param.get("avatar");
  avatar.src =
    idAvatar ??
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdNp-DQsC6XUBeCvMcDBwF84Yr9MGm1qde2Uxf-8otJ1W4Hz5n";
}
renderProducts(products);

const detailsProducts = (idDetail) => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/detail.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&detail=${idDetail}&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
};

let data = JSON.parse(localStorage.getItem("dataProduct")) ?? [];
const totalStorage = () => {
  const sumQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#total").innerHTML = sumQuantity;
};
totalStorage();

const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".btnSearch");

let storage = JSON.parse(localStorage.getItem("products"));
searchBtn.addEventListener("click", () => {
  const searchStorage = storage.filter((item) =>
    item.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderProducts(searchStorage);
});

const cardPage = document.querySelector(".cardPage");
cardPage.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/cart.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});

const btnLogout = document.querySelector(".btnLogout");
btnLogout.addEventListener("click", () => {
  let data = [];
  localStorage.setItem("dataProduct", JSON.stringify(data));
  location.reload();
});

const filterPrice = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selectedArr = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const min = parseInt(checkbox.getAttribute("data-min"));
      const max = checkbox.getAttribute("data-max")
        ? parseInt(checkbox.getAttribute("data-max"))
        : null;
      selectedArr.push({ min: min, max: max });
    }
  });
  let priceArr = [];
  if (selectedArr.length > 0) {
    priceArr = products.filter((item) => {
      return selectedArr.some((range) => {
        if (range.max !== null) {
          return (
            Number(item.price) >= range.min && Number(item.price) <= range.max
          );
        } else {
          return Number(item.price) >= range.min;
        }
      });
    });
  }
  if (priceArr.length === 0) {
    renderProducts(products);
  } else {
    renderProducts(priceArr);
  }
};

const userBtn = document.querySelector("#user-btn");
userBtn.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/profile.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});
