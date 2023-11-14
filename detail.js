var queryString = window.location.search;
var url_param = new URLSearchParams(queryString);

const cardImgTop = document.querySelectorAll(".card-img-top");
const cardTitle = document.querySelector(".card-title");
const cardPrice = document.querySelector(".card-price");

const storage = JSON.parse(localStorage.getItem("products"));

const renderDetails = () => {
  const render = storage.find(
    (item) => item.id + "" === url_param.get("detail")
  );
  const { name, image, price, size } = render;
  cardImgTop.forEach((img) => {
    img.src = image;
  });
  cardTitle.innerHTML = name;
  const priceFormat = new Intl.NumberFormat("vi-VN").format(price);
  cardPrice.innerHTML = priceFormat + "vnd";
  let row = size.map(
    (value) => `
    <input type="radio"
          class="btn-check"
          name="btnradio"
          id="btnSize${value}"
          autocomplete="off"
          value="${value}" />
    <label class="btn btn-outline-info" for="btnSize${value}">${value}</label>
  `
  );
  document.querySelector(".rootSize").innerHTML = row.join("");
  const avatar = document.querySelector(".avatar");
  const idAvatar = url_param.get("avatar");
  avatar.src =
    idAvatar ??
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdNp-DQsC6XUBeCvMcDBwF84Yr9MGm1qde2Uxf-8otJ1W4Hz5n";
};

renderDetails();
const btnAdd = document.querySelector(".btnAdd");

let data = JSON.parse(localStorage.getItem("dataProduct")) ?? [];

const totalStorage = () => {
  const sumQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#total").innerHTML = sumQuantity;
};
totalStorage();

const mount = document.querySelector(".mount");
const plus = document.querySelector(".plusMount");
const minus = document.querySelector(".minusMount");
const btnAddInput = document.querySelector(".btnAddInput");

plus.addEventListener("click", () => {
  ++mount.value;
  if (isNaN(mount.value)) {
    mount.value = 1;
  }
});

minus.addEventListener("click", () => {
  --mount.value;
  if (mount.value < 1) {
    mount.value = 1;
  }
});

btnAddInput.addEventListener("click", (e) => {
  try {
    const radios = document.querySelector('input[type="radio"]:checked');
    const checkSize = data.some((item) => {
      if (item.id + "" === url_param.get("detail")) {
        return item.size === radios.value;
      }
    });
    if (checkSize) {
      if (isNaN(mount.value)) {
        mount.value = 1;
      } else {
        let checkProduct = data.some(
          (item) => item.id + "" === url_param.get("detail")
        );
        if (!checkProduct) {
          const dataProduct = storage.find(
            (item) => item.id + "" === url_param.get("detail")
          );
          data.unshift({
            ...dataProduct,
            quantity: Number(mount.value),
            size: radios.value,
            choose: false,
          });
        } else {
          const dataChangeSize = data.find((item) => {
            if (
              item.id + "" === url_param.get("detail") &&
              item.size === radios.value
            ) {
              return item;
            }
          });
          data = data.map((item) => {
            if (
              item.id + "" === url_param.get("detail") &&
              item.size === radios.value
            ) {
              return {
                ...dataChangeSize,
                quantity: item.quantity + Number(mount.value),
              };
            } else {
              return item;
            }
          });
        }
      }
    } else {
      const dataProduct = storage.find(
        (item) => item.id + "" === url_param.get("detail")
      );
      data.unshift({
        ...dataProduct,
        quantity: Number(mount.value),
        size: radios.value,
        choose: false,
      });
    }
    localStorage.setItem("dataProduct", JSON.stringify(data));

    //------ animation
    const card = e.target.parentNode.parentNode.parentNode;
    const imgTmp = card.querySelector("img");
    const img_fly = imgTmp.cloneNode();
    card.appendChild(img_fly);
    const img_fly_pos = img_fly.getBoundingClientRect();
    const card_page_pos = cardPage.getBoundingClientRect();
    let pos = {
      left:
        card_page_pos.right -
        img_fly_pos.left -
        (card_page_pos.width / 2 + img_fly_pos.width / 2),
      top:
        card_page_pos.bottom -
        img_fly_pos.top +
        (img_fly_pos.height + card_page_pos.height),
    };

    img_fly.style.cssText = `
    --left: ${pos.left.toFixed(2)}px;
    --top: ${pos.top.toFixed(2)}px;
  `;

    img_fly.classList.add("animated");
    setTimeout(() => {
      card.removeChild(img_fly);
      img_fly.classList.remove("animated");
      totalStorage();
    }, 1000);
  } catch (error) {
    alert("Error: Vui lòng chọn Size mong muốn ⚠⚠⚠");
  }
});

const cardPage = document.querySelector(".cardPage");
cardPage.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/cart.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});

const btnLogoutDetail = document.querySelector(".btnLogoutDetail");

btnLogoutDetail.addEventListener("click", () => {
  const idDetail = url_param.get("detail");
  window.location.href = `/detail.html?detail=${idDetail}`;
});

const btnHome = document.querySelector(".btnHome");

btnHome.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/index.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});

const userBtn = document.querySelector("#user-btn");
userBtn.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/profile.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});
