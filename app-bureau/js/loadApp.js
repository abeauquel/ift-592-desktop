const path = require('path');
const {Tray, Menu} = require('electron')

let progressInterval;

function loadApp(load, win) {

    win.setIcon('icons/Athlimage-logo.png')
    win.reload()
    win.loadFile('index.html')
    // win.maximize()
   
    win.webContents.on('did-finish-load', () => {
      if (load) {
        load.close();
      }
      // win.webContents.openDevTools()
      win.show();
    });
    
}





module.exports = {
    loadApp
}