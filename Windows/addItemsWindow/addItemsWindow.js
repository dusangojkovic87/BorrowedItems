const { BrowserWindow } = require("electron");
const path = require("path");

module.exports = function openAddItemWindow() {
  let addItemModal = new BrowserWindow({
    width: 400,
    height: 400,
    minHeight: 400,
    minWidth: 500,
    backgroundColor: "#b9d9f5",
    fullscreenable: false,
    minimizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  addItemModal.loadFile("addItem.html");
  addItemModal.setMenu(null);
  addItemModal.focus();

  addItemModal.on("closed", () => {
    addItemModal = null;
  });
};
