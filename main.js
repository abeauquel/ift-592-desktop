// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const { menu } = require('./js/menu');
const bluetooth = require('./src/bluetooth.js');
const storeCommand = require('./src/persistenceCommand.js');
const command = require('./src/command');

let win;
const isWindows = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const isMac = process.platform === 'mac';

function processVersion() {
  
  if(isWindows || isLinux || isMac) {
   return false
  } else {
    return true
  }
}

// Create the browser window.
function createWindow () {

  win = new BrowserWindow({
    width: 1024,
    height: 600,
    minWidth: 800,
    webPreferences: {
      nodeIntegration: true, //to activate require()
      enableRemoteModule: true, //to disable require
      preload: path.join(__dirname, "preload.js"),
      // contextIsolation: true,
      devTools: true,
    },
    frame: processVersion()
    // frame: isWindows ? false : true
  })

  win.reload()

  let progress = 0.01
 

  let progressInterval = setInterval(() => {

    win.setProgressBar(progress)

    if (progress <= 1) {
      progress += 0.02
    } else {
      win.setProgressBar(-1)
      clearInterval(progress)
    }
  }, 75)

  win.loadFile('index.html')
  //win.maximize()
  //win.show()
  //win.webContents.openDevTools()

  win.on("closed", function() {
    win = null;
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.

}

app.on('ready', createWindow);


// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.


// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. Sur macOS, il est courant
// pour les applications et leur barre de menu de rester actives jusqu’à ce que l’utilisateur quitte
// explicitement avec Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') 
    app.quit()
});

app.on("activate", function() {
  if (win === null) 
    createWindow()
});


ipcMain.on('test-command', (event, arg) => {
  win.webContents.send('listener-command', val);
})

ipcMain.on('test-connection', (event, arg) => {
  win.webContents.send('listener-connection', val);
})

listenerRFCOMM = function(val) {
  //console.log("The command is : "+ val);

  let newAction = command.serializeAction(val);

  if(newAction){
    if(newAction.action === 'create'){
      let newCommand = command.serializeCommand(val);
      win.webContents.send('listener-command', newCommand);
      console.log(storeCommand.createCommand(newCommand));
    }

    if(newAction.action === 'update'){
      let newCommand = command.serializeCommand(val);
      win.webContents.send('listener-command-update', newCommand);
      storeCommand.updateCommand(newCommand);
    }

    if(newAction.action === 'getcommands'){
      let listeCommands = storeCommand.getCommands();
      console.log('send : '+listeCommands.length+ ' commands');
      let obj = command.deserializeAction('sendCommands', 'desktop', 'phone', listeCommands)
      bluetooth.sendMessage(obj);
    }
  }

}

listenerConnection = function(val) {
  //storeCommand.deleteAllCommand();
  win.webContents.send('listener-connection', val);
};


bluetooth.startALL(listenerRFCOMM, listenerConnection);

