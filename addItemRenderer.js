const { ipcRenderer } = require("electron");
const addItemWindowEvents = require("./presentationEvents/addItemsPresentationEvents");
const SharedPresentationEvents = require("./presentationEvents/SharedEvents");

document.addEventListener("DOMContentLoaded", (event) => {
  const addItemBtn = document.querySelector(".addItem__btn");
  if (addItemBtn) {
    console.log(addItemBtn);
    addItemBtn.addEventListener("click", (event) => {
      event.preventDefault();
      addItemWindowEvents.addItemWindowCommands.addItemToDb();
      //reload items
      SharedPresentationEvents.SharedCommands.GetItems();
    });
  }
});
