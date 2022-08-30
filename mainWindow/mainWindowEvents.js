const { ipcMain } = require("electron");

const openAddItemWindow = require("../addItemsWindow/addItemsWindow");

ipcMain.on("open_addItemModal", (event, args) => {
  openAddItemWindow();
});
