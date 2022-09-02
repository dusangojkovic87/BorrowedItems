const { ipcMain } = require("electron");
const DbCommands = require("../DbCommands/DbCommands");
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
