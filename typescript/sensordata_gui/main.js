const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "MyApp",
    width: 1000,
    height: 600,
    frame: false,
  });
  mainWindow.maximize();

  const startURL = url.format({
    pathname: path.join(__dirname, "./app/build/index.html"),
    protocol: "file",
  });

  // mainWindow.loadURL("http://localhost:3000");
  mainWindow.loadURL(startURL);
}

app.whenReady().then(createMainWindow);
