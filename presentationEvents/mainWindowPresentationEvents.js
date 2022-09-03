const { ipcRenderer } = require("electron");
const SharedPresentacionEvents = require("../presentationEvents/SharedEvents");

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
  deleteItem: () => {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete__btn")) {
        let id = e.target.getAttribute("data-id");
        if (id) {
          ipcRenderer.send("deleteItemById", id);
          SharedPresentacionEvents.SharedCommands.GetItems();
        }
      }
    });
  },
};

function loadItemsIntoDOM(data) {
  let itemsContainer = document.querySelector(".items");
  let itemWrp = ``;
  let nextBtn = document.querySelector(".next__btn");
  let previousBtn = document.querySelector(".previous__btn");
  let firstBtn = document.querySelector(".first__btn");
  let lastBtn = document.querySelector(".last__btn");
  let paginationControls = document.querySelector(".pagination-controls");

  console.log(data);

  //init load
  let page = 0;

  //if no data hide pagination
  if (data.length == 0) {
    itemsContainer.innerHTML = "No items in database";
    paginationControls.style.display = "none";
    return;
  }

  //if only one item
  if (data.length < 2) {
    itemsContainer.innerHTML = itemHtmlTemplate(data[0]);
    return;
  }

  for (let i = 0; i < page + 2; i++) {
    itemWrp += itemHtmlTemplate(data[i]);
  }

  itemsContainer.innerHTML += itemWrp;

  //next pagination
  nextBtn.addEventListener("click", (event) => {
    //if only one item display it
    if (data.length - 2 < 2) {
      itemsContainer.innerHTML = itemHtmlTemplate(data[0]);
      return;
    }
    let len = data.length;
    if (page == len - 2 || page > len - 2) {
      page = 0;
    } else {
      page += 2;
    }
    itemWrp = "";
    for (let i = page; i < page + 2; i++) {
      itemsContainer.innerHTML = "";
      itemWrp += itemHtmlTemplate(data[i]);
    }
    itemsContainer.innerHTML += itemWrp;
  });

  //previous pagination
  itemWrp = "";
  previousBtn.addEventListener("click", (event) => {
    let len = data.length;
    if (page == len - 2 || page == 0) {
      page = 0;
    } else {
      page -= 2;
    }
    itemWrp = "";
    for (let i = page; i < page + 2; i++) {
      console.log("index", i);
      itemsContainer.innerHTML = "";
      itemWrp += itemHtmlTemplate(data[i]);
    }
    itemsContainer.innerHTML += itemWrp;
  });

  //first pagination
  firstBtn.addEventListener("click", (event) => {
    page = 0;
    itemWrp = "";
    for (let i = page; i < page + 2; i++) {
      itemsContainer.innerHTML = "";
      itemWrp += itemHtmlTemplate(data[i]);
    }
    itemsContainer.innerHTML += itemWrp;
  });

  //last pagination
  lastBtn.addEventListener("click", (event) => {
    page = data.length - 2;
    itemWrp = "";
    for (let i = page; i < page + 2; i++) {
      itemsContainer.innerHTML = "";
      itemWrp += itemHtmlTemplate(data[i]);
    }
    itemsContainer.innerHTML += itemWrp;
  });
}

function itemHtmlTemplate(data) {
  if (data) {
    return `
    <div class="item-container">
    <div class="item-img-wrp">
      <img src=${data.itemImage} alt=${data.itemImage} />
    </div>
    <div class="item-details-wrp">
      <ul>
        <li class="item__name">${data.item}</li>
        <li class="details__label">Borrowed to:</li>
        <li class="borrower__name">${data.name} ${data.surname}</li>
        <li class="details__label">Date borrowed:</li>
        <li class="date__borrowed">${data.dateBorrowed}</li>
      </ul>
    </div>
    <div class="item-nav-btn-wrp">
      <div class="isReturned-wrp">
      <label>Item returned:</label>
          <input type="checkbox" id="isReturned" name="isReturned" value="true">
      </div>
      <button class="delete__btn" data-id=${data.id}>delete</button>
    </div>
  </div>`;
  }
}
