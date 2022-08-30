const { BrowserWindow } = require("electron");

module.exports = function openAddItemWindow() {
  let addItemModal = new BrowserWindow({
    width: 600,
    height: 400,
    fullscreenable: false,
    minimizable: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  addItemModal.loadFile("addItem.html");
  addItemModal.setMenu(null);
  addItemModal.focus();

  addItemModal.on("closed", () => {
    addItemModal = null;
  });
};
