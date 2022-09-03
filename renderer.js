const { ipcRenderer } = require("electron");
const mainWindowPresentationEvents = require("./presentationEvents/mainWindowPresentationEvents");
const SharedPresentationEvents = require("./presentationEvents/SharedEvents");

document.addEventListener("DOMContentLoaded", (event) => {
  //get items event
  SharedPresentationEvents.SharedCommands.GetItems();
  mainWindowPresentationEvents.mainWindowCommands.loadItemsWhenRecived();
  //opens add item window
  mainWindowPresentationEvents.mainWindowCommands.openAddItemModal();
  //delete item event
  mainWindowPresentationEvents.mainWindowCommands.deleteItem();
});
