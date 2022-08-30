const { ipcMain } = require("electron");

const openAddItemWindow = require("../addItemsWindow/addItemsWindow");

ipcMain.on("open_addItem", (event, args) => {
  openAddItemWindow();
});
