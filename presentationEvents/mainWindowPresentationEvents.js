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

  data.forEach((item) => {
    itemWrp = `
      <div class="item-container">
      <div class="item-img-wrp">
        <img src=${item.itemImage} alt=${item.itemImage} />
      </div>
      <div class="item-details-wrp">
        <ul>
          <li class="item__name">${item.item}</li>
          <li class="details__label">Borrowed to:</li>
          <li class="borrower__name">${item.name} ${item.surname}</li>
          <li class="details__label">Date borrowed:</li>
          <li class="date__borrowed">${item.dateBorrowed}</li>
        </ul>
      </div>
      <div class="item-nav-btn-wrp">
        <button class="details__btn">details</button>
        <button class="delete__btn">delete</button>
      </div>
    </div>

      `;
    itemsContainer.innerHTML += itemWrp;
  });
}
