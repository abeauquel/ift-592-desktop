// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, webContents, nativeImage, screen, Tray, Menu} = require('electron');
const stateKeeper = require('electron-window-state');
const path = require('path');
const url = require('url');
const fs = require('fs');

const bluetooth = require('./src/bluetooth.js');
const storeCommand = require('./src/persistenceCommand.js');
const load = require('./js/loadApp')
const command = require('./src/command');
const fileManager = require('./src/fileManager');
// const { menu } = require('./js/sidebar');


let win;
let loadingScreen;
let progressInterval;
const isWindows = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const isMac = process.platform === 'darwin';

function processVersion() {
  if(isWindows || isLinux || isMac) {
    return false
  } else {
    return true
  }
}

let dev = false

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === (isWindows || isLinux || isMac)) {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}


const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow(
    Object.assign({
      width: 200,
      height: 200,
      frame: processVersion(),
      transparent: true,
      // blinkFeatures: 'CSSStickyPosition',
      nodeIntegration: true,
      icon: true,
      Show: false
    })
  );
  loadingScreen.setResizable(false);
  loadingScreen.loadURL(__dirname + '/load/load.html');
  loadingScreen.on('closed', () => (loadingScreen = null));
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
  loadingScreen.setIcon('icons/Athlimage-logo.png')
};

// Create the browser window.
function createWindow () {

  let tray
  let state = stateKeeper({
    defaultHeight: 700, defaultWidth: 1024
  })

  if (process.platform === (isWindows | isMac | isLinux)) {
    tray.on('click', tray.popUpContextMenu);
  }

  trayModules(tray)

  win = new BrowserWindow({
    width: state.width,
    height: state.height,
    minWidth: 900,
    webPreferences: {
      nodeIntegration: true, //to activate require()
      enableRemoteModule: true, //to disable require
      preload: path.join(__dirname, "preload.js"),
      // contextIsolation: true,
      devTools: true,
      show: false,
      blinkFeatures: 'CSSStickyPosition',
      // experimentalFeatures: true,

    },
    frame: processVersion()
  })

  let progress = 0.01
  progressInterval = setInterval(() => {
    win.setProgressBar(progress)
    if (progress <= 1) {
      progress += 0.02
    } else {
      win.setProgressBar(-1)
      clearInterval(progress)
    }
  }, 75)


  //win.webContents.openDevTools();

  load.loadApp(loadingScreen, win)
  state.manage(win)

  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    if (deviceList && deviceList.length > 0) {
      callback(deviceList[0].deviceId)
    } 
  })

  win.on("closed", function() {
    win = null;
    progressInterval = null;
  });
}


app.on('ready', () => {
  createLoadingScreen();
  setTimeout(() =>{
    createWindow();
  }, 100)
})

app.on('before-quit', () => {
  clearInterval(progressInterval)
})

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.


// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. Sur macOS, il est courant
// pour les applications et leur barre de menu de rester actives jusqu’à ce que l’utilisateur quitte
// explicitement avec Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== ('darwin' | 'win32' | 'linux'))
    app.quit()
});

app.on("activate", function() {
  if (win === null)
    createWindow()
});

// app.commandLine.appendSwitch('enable-web-bluetooth', true);

ipcMain.on('test-command', (event, arg) => {
  let listCommands = storeCommand.createCommand(arg);
  event.sender.send('listener-command', listCommands[listCommands.length - 1]);
})

ipcMain.on('test-connection', (event, arg) => {
  event.sender.send('listener-connection', arg);
})

ipcMain.on('getcommands', (event, arg) => {
  let listeCommands = storeCommand.getCommands();
  event.sender.send('sendcommands', listeCommands);
})

ipcMain.on('getcommand', (event, idCommand) => {
  let command = storeCommand.getCommand(idCommand);
  event.sender.send('sendcommand', command);
})


ipcMain.on('status-command', (event, idCommand) => {
  event.sender.send('sendcommands', storeCommand.updateStatusCommand(idCommand));
})

ipcMain.on('delete-commands', (event, idCommand) => {
  storeCommand.deleteAllCommand();
  event.sender.send('sendcommands', storeCommand.updateStatusCommand(idCommand));
})

listenerRFCOMM = function(val) {
  let messages = command.parseMessages(val);

  for (let message of messages) {
    console.log(message);
    let newAction = command.deserializeAction(message);

    if(newAction) {
      if (newAction.action === 'create') {
        console.log("create");
        let newCommand = command.serializeCommand(message);
        let listCommands = storeCommand.createCommand(newCommand);
        win.webContents.send('listener-command', listCommands[listCommands.length - 1]);
        console.log("send");
      }

      if (newAction.action === 'update') {
        console.log("update");
        let newCommand = command.serializeCommand(message);
        win.webContents.send('listener-command-update', newCommand);
        storeCommand.updateCommand(newCommand);
      }

      if (newAction.action === 'getcommands') {
        let listeCommands = storeCommand.getCommands();
        console.log('send : ' + listeCommands.length + ' commands '+ new Date());
        let obj = command.serializeAction('sendcommands', 'desktop', 'phone', listeCommands);
        bluetooth.sendMessage(obj);
      }

      if (newAction.action === 'ls') {
        fileManager.getLs(sendBluetoothMessage);
      }

      if (newAction.action === 'cd') {
        console.log('action cd');
        if(newAction.value)
          fileManager.doCd(newAction.value, sendBluetoothMessage);
      }

      if (newAction.action === 'getimage') {
        if(newAction.value)
          fileManager.getImage(newAction.value, sendBluetoothMessage);
      }
    }
  }
}

let sendBluetoothMessage = function (data){
  bluetooth.sendMessage(data);
}

listenerConnection = function(val) {
  win.webContents.send('listener-connection', val);
};


bluetooth.startALL(listenerRFCOMM, listenerConnection);



function trayModules(tray) {

  const clippings = [];
  const iconPath = path.join(__dirname, './icons/Athlimage-logo.png');
  const iconPath32 = path.join(__dirname, './icons/Athlimage-logo-16x16.png');
  tray = new Tray(iconPath)


  const menu = Menu.buildFromTemplate([
    {
      label: 'Athlimage',
      type: 'normal',
      icon: iconPath32,
      enabled: false
    },
    { type: 'separator' },
    ...clippings.map((clipping, index) => ({ label: clipping })),
    { type: 'separator' },
    {
      label: 'Add new device',
      click() { null; }
    },
    {
      label: 'Show/Hide',
      click() { win.isVisible() ? win.hide() : win.show(); }
    },
    {
      label: 'Toggle DevTools',
      accelerator: 'Alt+Command+I',
      click: function() {
        win.show();
        win.toggleDevTools();
      }
    },
    {
      label: 'Reload',
      accelerator: 'Alt+r',
      click: function() {
        win.reload();
      }
    },
    { type: 'separator' },
    ...clippings.map((clipping, index) => ({ label: clipping })),
    { type: 'separator' },
    {
      label: 'Quit Athlimage',
      click() { app.quit(); },
    }
  ]);

  tray.setTitle('Athlimage 1.0')
  tray.setToolTip('Athlimage');
  tray.setContextMenu(menu);
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
}


