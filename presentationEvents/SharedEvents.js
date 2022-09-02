const { ipcRenderer } = require("electron");

exports.SharedCommands = {
  GetItems: () => {
    ipcRenderer.send("getItems", "");
  },
};
