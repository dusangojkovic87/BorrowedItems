// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const knex = require("./dbConnection/db");
const createMainWindow = require("./Windows/mainWindow/mainWindow");
const createTableOfItemsIfNotExists = require("./schema/schema");
const reloader = require("./electron-reloader/reloader");
//events for main window
require("./Windows/mainWindow/mainWindowEvents");

reloader();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createTableOfItemsIfNotExists();
  createMainWindow();

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
