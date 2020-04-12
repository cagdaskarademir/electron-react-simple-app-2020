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

  updateFormWindow = new BrowserWindow({
    width: 300,
    height: 300,
    parent: mainWindow,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  updateFormWindow.loadURL(
    isDev
      ? "http://localhost:3000/update"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => (mainWindow = null));

  updateFormWindow.on("close", (e) => {
    e.preventDefault();
    updateFormWindow.hide();
  });
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

ipcMain.on("show-update-form-with-id", (event, args) => {
  console.log("show-update-form-with-id", args);
  updateFormWindow.show();

  updateFormWindow.webContents.send("user", args);
});
