const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", (event) => {
  let openAddItemWinBtn = document.querySelector(".open__addItem__btn");
  openAddItemWinBtn.addEventListener("click", (e) => {
    ipcRenderer.send("open_addItemModal", "");
  });
});
