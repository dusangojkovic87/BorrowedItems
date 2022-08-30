// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./items.sqlite",
  },
  useNullAsDefault: true,
});

try {
  require("electron-reloader")(module);
} catch (_) {}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.setMenu(null);
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createTableOfItemsIfNotExists();

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

//sqlite
function createTableOfItemsIfNotExists() {
  knex.schema.hasTable("items").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("items", function (t) {
        t.increments("id").primary();
        t.string("name", 100);
        t.string("surname", 100);
        t.string("item", 100);
        t.string("dateBorrowed", 100);
        t.string("dateReturned", 100);
        t.string("location", 100);
        t.string("contact", 100);
        t.string("itemImage").notNullable().defaultTo("default.jpg");
        t.boolean("isReturned").notNullable().defaultTo(false);
      });
    }
  });
}

function openAddItemWindow() {
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
}

ipcMain.on("open_addItem", (event, args) => {
  openAddItemWindow();
});
