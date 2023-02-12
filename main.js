let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "creat";
let test;

//get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
//create
let dataPro;
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    count: count.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
  };
  if (mood === "creat") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[test] = newPro;
    mood = "creat";
    submit.innerHTML = "creat";
    count.style.display = "block";
  }

  //save local storage
  localStorage.setItem("products", JSON.stringify(dataPro));
  clearData();
  showData();
};

//clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  ads.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "";
}
//read

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += ` <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button id="update" onclick="updateData(${i})" >update</button></td>
    <td><button onclick="deletData(${i})" id="delete">delet</button></td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelet = document.getElementById("deletAll");
  if (dataPro.length > 0) {
    btnDelet.innerHTML =
      '<button onclick="deletAll()" >delet All (' +
      dataPro.length +
      ")</button>";
  } else {
    btnDelet.innerHTML = "";
  }
}
showData();
//count

//delet
function deletData(i) {
  dataPro.splice(i, 1);
  localStorage.products = JSON.stringify(dataPro);
  showData();
}
function deletAll() {
  dataPro.splice(0);
  localStorage.clear();
  showData();
}
//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  count.style.display = "none";
  getTotal();
  category.value = dataPro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  test = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
let search = document.getElementById("search");
let searchMood = "title";
function getId(id) {
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "search by title";
  } else {
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += ` <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})" >update</button></td>
                <td><button onclick="deletData(${i})" id="delete">delet</button></td>
              </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += ` <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})" >update</button></td>
                <td><button onclick="deletData(${i})" id="delete">delet</button></td>
              </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
//clean data
