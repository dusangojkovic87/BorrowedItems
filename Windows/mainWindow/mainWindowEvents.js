const { ipcMain } = require("electron");
const DbCommands = require("../../DbCommands/DbCommands");
const DbQuery = require("../../DbQuery/DbQuery");
const openAddItemWindow = require("../addItemsWindow/addItemsWindow");
const { dialog } = require("electron");

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
      if (data == 1) {
        dialog.showMessageBox({
          title: "Deleted item status",
          message: "Success",
        });
      }
    });
  }
});

ipcMain.on("isReturnedValueChanged", (event, args) => {
  if (args) {
    DbQuery.updateReturnedStatusInDb(args.id, args.isReturned).then((data) => {
      console.log("update", data);
    });
  }
});
