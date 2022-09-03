const { ipcRenderer } = require("electron");

exports.mainWindowCommands = {
  openAddItemModal: () => {
    let openAddItemWinBtn = document.querySelector(".open__addItem__btn");
    openAddItemWinBtn.addEventListener("click", (e) => {
      ipcRenderer.send("open_addItemModal", "");
    });
  },
  loadItemsWhenRecived: () => {
    ipcRenderer.on("itemsRecived", (event, args) => {
      if (args) {
        //load item to DOM
        loadItemsIntoDOM(args);
      }
    });
  },
};

function loadItemsIntoDOM(data) {
  let itemsContainer = document.querySelector(".items");
  let itemWrp = ``;
  let nextBtn = document.querySelector(".next__btn");
  let previousBtn = document.querySelector(".previous__btn");

  //test
  let page = 0;
  for (let i = 0; i < page + 3; i++) {
    itemWrp += `
    <div class="item-container">
    <div class="item-img-wrp">
      <img src=${data[i].itemImage} alt=${data[i].itemImage} />
    </div>
    <div class="item-details-wrp">
      <ul>
        <li class="item__name">${data[i].item}</li>
        <li class="details__label">Borrowed to:</li>
        <li class="borrower__name">${data[i].name} ${data[i].surname}</li>
        <li class="details__label">Date borrowed:</li>
        <li class="date__borrowed">${data[i].dateBorrowed}</li>
      </ul>
    </div>
    <div class="item-nav-btn-wrp">
      <button class="details__btn">details</button>
      <button class="delete__btn">delete</button>
    </div>
  </div>`;
  }

  itemsContainer.innerHTML += itemWrp;

  //next pagination
  nextBtn.addEventListener("click", (event) => {
    let len = data.length;
    if (page == len - 3) {
      page = 0;
    } else {
      page += 3;
    }
    itemWrp = "";
    for (let i = page; i < page + 3; i++) {
      console.log("index", i);
      itemsContainer.innerHTML = "";
      itemWrp += `
      <div class="item-container">
      <div class="item-img-wrp">
        <img src=${data[i].itemImage} alt=${data[i].itemImage} />
      </div>
      <div class="item-details-wrp">
        <ul>
          <li class="item__name">${data[i].item}</li>
          <li class="details__label">Borrowed to:</li>
          <li class="borrower__name">${data[i].name} ${data[i].surname}</li>
          <li class="details__label">Date borrowed:</li>
          <li class="date__borrowed">${data[i].dateBorrowed}</li>
        </ul>
      </div>
      <div class="item-nav-btn-wrp">
        <button class="details__btn">details</button>
        <button class="delete__btn">delete</button>
      </div>
    </div>`;
    }
    itemsContainer.innerHTML += itemWrp;
  });

  //previous pagination
  itemWrp = "";
  previousBtn.addEventListener("click", (event) => {
    let len = data.length;
    if (page == len - 3 || page == 0) {
      page = 0;
    } else {
      page -= 3;
    }
    itemWrp = "";
    for (let i = page; i < page + 3; i++) {
      console.log("index", i);
      itemsContainer.innerHTML = "";
      itemWrp += `
      <div class="item-container">
      <div class="item-img-wrp">
        <img src=${data[i].itemImage} alt=${data[i].itemImage} />
      </div>
      <div class="item-details-wrp">
        <ul>
          <li class="item__name">${data[i].item}</li>
          <li class="details__label">Borrowed to:</li>
          <li class="borrower__name">${data[i].name} ${data[i].surname}</li>
          <li class="details__label">Date borrowed:</li>
          <li class="date__borrowed">${data[i].dateBorrowed}</li>
        </ul>
      </div>
      <div class="item-nav-btn-wrp">
        <button class="details__btn">details</button>
        <button class="delete__btn">delete</button>
      </div>
    </div>`;
    }
    itemsContainer.innerHTML += itemWrp;
  });
}
