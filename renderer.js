const { ipcRenderer } = require("electron");
const mainWindowPresentationEvents = require("./presentationEvents/mainWindowPresentationEvents");

document.addEventListener("DOMContentLoaded", (event) => {
  //get items event
  ipcRenderer.send("getItems", "");
  ipcRenderer.on("itemsRecived", (event, args) => {
    if (args) {
      //load item to DOM
      mainWindowPresentationEvents.mainWindowCommands.loadItems(args);
    }
  });

  //opens add item window
  mainWindowPresentationEvents.mainWindowCommands.openAddItemModal();
});
