let data = JSON.parse(localStorage.getItem("dataProduct")) ?? [];
let storage = JSON.parse(localStorage.getItem("products"));
var queryString = window.location.search;
var url_param = new URLSearchParams(queryString);

function renderProductsCart(array) {
  let row = ``;
  array.map((value, index) => {
    const priceFormat = new Intl.NumberFormat("vi-VN").format(
      Number(value.price) * value.quantity
    );
    const choose = array[index].choose ?? false;
    row += `
    <div class="d-flex justify-content-between align-items-center mb-2 border border-success p-3">
    <input type="checkbox" ${
      choose ? "checked" : ""
    } onchange="chooseItem(this, ${index})" style="width:20px;height:20px" />
    <div>stt:${index + 1}</div>
    <div>name: ${value.name}</div>
    <div style="width: 90px; height: 90px">
      <img
        src=${value.image}
        class="w-100 h-100"
        />
    </div>
    <div class="d-flex justify-content-center align-items-center gap-2">
      quantity: 
      <button class="btn btn-secondary" onclick="minusQuantity('${
        value.id
      }', '${value.size}')">-</button>
      <input type='number' min=1 class="w-25 mount text-center" onchange="mountChange(this, ${index})" value=${
      value.quantity ?? 1
    }  />
      <button class="btn btn-secondary" onclick="plusQuantity('${value.id}', '${
      value.size
    }')">+</button>
    </div>
    <div>size: ${value.size}</div>
    <div>price: ${priceFormat ?? 0}vnd</div>
    <button class="btn btn-danger" onclick="deleteProduct('${value.id}', '${
      value.size
    }')">remove</button>
  </div>
        `;
  });
  document.getElementById("productsCart").innerHTML = row;
}

const renderAvatar = () => {
  const avatar = document.querySelector(".avatar");
  const idAvatar = url_param.get("avatar");
  avatar.src =
    idAvatar ??
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdNp-DQsC6XUBeCvMcDBwF84Yr9MGm1qde2Uxf-8otJ1W4Hz5n";
};

renderProductsCart(data);
renderAvatar();

const chooseItem = (input, index) => {
  let newArr = [];
  if (input.checked) {
    data[index].choose = true;
    newArr = [...newArr, ...data];
    checkBtnAll();
  } else {
    data[index].choose = false;
    newArr = [...newArr, ...data];
    checkBtnAll();
  }
  localStorage.setItem("dataProduct", JSON.stringify(newArr));
  sumTotal();
  sumQuantity();
};

const mountChange = (input, index) => {
  if (input.value === "") {
    input.value = 1;
  }
  data[index].quantity = Number(input.value);
  renderProductsCart(data);
  localStorage.setItem("dataProduct", JSON.stringify(data));
  sumTotal();
  sumQuantity();
};

const deleteProduct = (id, size) => {
  const userConfirmed = confirm(
    "Bạn có chắc chắn muốn xoá sản phẩm này không?"
  );
  if (userConfirmed) {
    data = data.filter((item) => {
      if (item.id + "" !== id || item.size !== size) {
        return item;
      }
    });
    renderProductsCart(data);
    localStorage.setItem("dataProduct", JSON.stringify(data));
    sumTotal();
    sumQuantity();
    checkBtnAll();
  }
};

const plusQuantity = (id, size) => {
  const newQuantity = data.find(
    (item) => item.id + "" === id && item.size === size
  );
  data = data.map((item) => {
    if (item.id + "" === id && item.size === size) {
      return {
        ...newQuantity,
        quantity: isNaN(item.quantity) ? 1 : ++item.quantity,
      };
    } else {
      return item;
    }
  });
  renderProductsCart(data);
  localStorage.setItem("dataProduct", JSON.stringify(data));
  sumTotal();
  sumQuantity();
};

const minusQuantity = (id, size) => {
  const itemIndex = data.findIndex(
    (item) => item.id + "" === id && item.size === size
  );

  if (itemIndex !== -1) {
    const currentItem = data[itemIndex];
    if (currentItem.quantity <= 1) {
      deleteProduct(id, size);
      sumTotal();
      sumQuantity();
      checkBtnAll();
    } else {
      data[itemIndex] = {
        ...currentItem,
        quantity: currentItem.quantity - 1,
      };
      renderProductsCart(data);
      localStorage.setItem("dataProduct", JSON.stringify(data));
      sumTotal();
      sumQuantity();
      checkBtnAll();
    }
  }
};

const btnHome = document.querySelector(".btnHome");

btnHome.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  window.location.href = `/index.html?${
    idLogin === null ? "/" : "id=" + idLogin
  }&${idAvatar === null ? "/" : "avatar=" + idAvatar}`;
});

const btnLogout = document.querySelector(".btnLogout");
btnLogout.addEventListener("click", () => {
  data = [];
  renderProductsCart(data);
  localStorage.setItem("dataProduct", JSON.stringify(data));
  sumTotal();
  sumQuantity();
});

const btnPayments = document.querySelector(".btnPayments");

btnPayments.addEventListener("click", () => {
  const idLogin = url_param.get("id");
  const idAvatar = url_param.get("avatar");
  if (idLogin === null) {
    window.location.href = `/login.html`;
  } else {
    window.location.href = `/payment.html?id=${idLogin}&avatar=${idAvatar}`;
  }
});

function sumTotal() {
  const total = data.reduce(
    (sum, item) =>
      item.choose ? (sum += item.quantity * Number(item.price)) : sum,
    0
  );
  const totalFormat = new Intl.NumberFormat("vi-VN").format(total) ?? 0;
  document.querySelector("#total").innerHTML = totalFormat + " vnd";
}
sumTotal();

function sumQuantity() {
  const quantity = data.reduce(
    (sum, item) => (item.choose ? (sum += item.quantity) : sum),
    0
  );
  document.querySelector("#quantity").innerHTML = quantity;
}
sumQuantity();

const btnRemoveAll = document.querySelector(".btnRemoveAll");

btnRemoveAll.addEventListener("click", () => {
  const userConfirmed = confirm(
    "Bạn có chắc chắn muốn xoá tất cả sản phẩm không?"
  );
  if (userConfirmed) {
    data = [];
    renderProductsCart(data);
    localStorage.setItem("dataProduct", JSON.stringify(data));
    sumTotal();
    sumQuantity();
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

const checkBtnAll = () => {
  const btnChooseAll = document.querySelector("#btnChooseAll");
  const allSelected = data.every((item) => item.choose);
  btnChooseAll.checked = allSelected;
};
checkBtnAll();

const btnChooseAll = document.querySelector("#btnChooseAll");
btnChooseAll.addEventListener("change", (e) => {
  data = data.map((item) => {
    return { ...item, choose: e.target.checked };
  });
  renderProductsCart(data);
  localStorage.setItem("dataProduct", JSON.stringify(data));
  sumTotal();
  sumQuantity();
});
