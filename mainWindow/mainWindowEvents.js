const { ipcMain } = require("electron");
const knex = require("../dbConnection/db");

const openAddItemWindow = require("../addItemsWindow/addItemsWindow");

ipcMain.on("open_addItemModal", (event, args) => {
  openAddItemWindow();
});

ipcMain.on("getItems", (event, args) => {
  getItemsFromDb().then((data) => {
    console.log(data);
    event.reply("itemsRecived", data);
  });
});

function getItemsFromDb() {
  return knex.select().table("items");
}
