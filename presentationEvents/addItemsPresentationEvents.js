const { ipcRenderer } = require("electron");
const { insertItemToDb } = require("../DbQuery/DbQuery");

exports.addItemWindowCommands = {
  addItemToDb: () => {
    let addItemForm = document.querySelector("#addItemForm");
    let formData = new FormData(addItemForm);
    let data = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      item: formData.get("item"),
      location: formData.get("location"),
      dateBorrowed: formData.get("dateBorrowed"),
      contact: formData.get("contact"),
    };
    insertItemToDb(data).then((data) => {
      console.log("insert");
      console.log(data);
    });
  },
  closeAddItemWindow: () => {
    ipcRenderer.send("closeAddItemWin", "");
  },
};
