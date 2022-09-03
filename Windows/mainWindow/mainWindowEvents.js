const { ipcMain } = require("electron");
const DbCommands = require("../../DbCommands/DbCommands");
const DbQuery = require("../../DbQuery/DbQuery");
const openAddItemWindow = require("../addItemsWindow/addItemsWindow");

ipcMain.on("open_addItemModal", (event, args) => {
  openAddItemWindow();
});

ipcMain.on("getItems", (event, args) => {
  DbCommands.getItemsFromDb().then((data) => {
    if (data) {
      event.reply("itemsRecived", data);
    }
  });
});

ipcMain.on("deleteItemById", (event, args) => {
  if (args) {
    DbQuery.deleteItemFromDb(args).then((data) => {
      console.log("izbrisan");
    });
  }
});
