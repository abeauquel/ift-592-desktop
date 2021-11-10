// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { remote, ipcRenderer } = require("electron");
const {
  getCurrentWindow,
  openMenu,
  minimizeWindow,
  maximizeWindow,
  unmaximizeWindow,
  maxUnmaxWindow,
  isWindowMaximized,
  closeWindow
} = require("./js/menu-title");

window.addEventListener("DOMContentLoaded", () => {
  window.getCurrentWindow = getCurrentWindow;
  window.openMenu = openMenu;
  window.minimizeWindow = minimizeWindow;
  window.maximizeWindow = maximizeWindow;
  window.unmaximizeWindow = unmaximizeWindow;
  window.maxUnmaxWindow = maxUnmaxWindow;
  window.isWindowMaximized = isWindowMaximized;
  window.closeWindow = closeWindow;
});

ipcRenderer.on('listener-command', function (evt, message) {
  console.log(message); // Returns: {'SAVED': 'File Saved'}
  alert(message);
});

ipcRenderer.on('listener-connection', function (evt, message) {
  console.log(message); // Returns: {'SAVED': 'File Saved'}
  alert(message);
});

//console.log(ipcRenderer.sendSync('test-connection', 'ping')) // prints "pong"
