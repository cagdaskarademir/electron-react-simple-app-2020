const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow;
let updateFormWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("updateForm:show", (event, userId) => {
  console.log("updateForm:show", userId);

  updateFormWindow = new BrowserWindow({
    width: 600,
    height: 350,
    parent: mainWindow,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: false,
  });

  updateFormWindow.loadURL(
    isDev
      ? "http://localhost:3000/update"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  updateFormWindow.webContents.on("did-finish-load", function () {
    updateFormWindow.webContents.send("updateForm:send-user-id", { userId });

    updateFormWindow.show();
  });
});

ipcMain.on("updateForm:close", () => {
  updateFormWindow.close();
  updateFormWindow = null;
});
