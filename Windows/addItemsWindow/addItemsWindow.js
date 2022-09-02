const { BrowserWindow } = require("electron");
const path = require("path");

module.exports = function openAddItemWindow() {
  let addItemModal = new BrowserWindow({
    width: 600,
    height: 500,
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

  //dev tools
  addItemModal.webContents.openDevTools();

  addItemModal.on("closed", () => {
    addItemModal = null;
  });
};
