const path = require('path')
const fs = require('fs');
const { exec } = require("child_process");
const { spawn } = require('child_process');
const execSetupRFCOMM0 = spawn('sh', ['setupRFCOMM.sh']);

var events = require('events');
//create an object of EventEmitter class by using above reference
var em = new events.EventEmitter();

const input = "/dev/rfcomm0";
let callBackCommand = function (val){};
let callBackDeviceIsConnected = function (val){};
let readStream;

function execSysCall(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                reject(stderr);
            }

            resolve(stdout);
        });
    });

}

//Subscribe Listen connection event
em.addListener('listenRFCOMM', function (value) {
    console.log('event ' + value);
    if(readStream)
        readStream.destroy();
    startALL();
});

async function setupRFCOMM(){
    console.log("setupRFCOMM ...");
    console.log("Restart BlueZ in compatibility mode ...");
    let i = 0;
    try {

        execSetupRFCOMM0.stdout.on('data', (data) => {
            //console.log(`stdout: ${data}`);

            console.log("Waiting device connection ...");
            let startRFCOMM0 = spawn('sudo', ['stdbuf','-i0', '-o0', '-e0', 'rfcomm', 'watch', '/dev/rfcomm0', '0']);
            startRFCOMM0.stdout.on('data', (data) => {
                if(data.includes('Connection')){
                    waitingCommand();
                    callBackDeviceIsConnected(true);
                }
                if(data.includes('Disconnected')){
                    callBackDeviceIsConnected(false);
                    readStream.close();
                }
                //console.log(`stdout: ${data}`);
            });
        });

    } catch(error) {
        console.error( error);
    }

}

function checkExistsWithTimeout(filePath, timeout) {
    return new Promise(function (resolve, reject) {

        const timer = setTimeout(function () {
            watcher.close();
            reject(new Error('File did not exists and was not created during the timeout.'));
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });

        const dir = path.dirname(filePath);
        const basename = path.basename(filePath);
        var watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });
    });
}

async function waitingCommand(){
    // console.log("check file exist");
    // await checkExistsWithTimeout("/dev/rfcomm0", 100000);
    console.log("chmod device file");
    await execSysCall("sudo chmod 777 /dev/rfcomm0");
    //callBackDeviceIsConnected(true);
    console.log("waitingCommand ...");

    readStream = fs.createReadStream(input);
    readStream.on('data', function (data) {
        isConnected = true;
        let str = data.toString().trim();
        //console.log('readStream : ' + str);
        callBackCommand(str);
    });
}

function sendMessage(value){
    //console.log('sendMessage("'+value+'")');
    let text = '\n'+value;
    fs.appendFile(input, text, function (err) {
        if (err) throw err;
    });
    //console.log('end()');
}



async function startALL(listenerCommand, listenerConnection){
    callBackCommand = listenerCommand;
    callBackDeviceIsConnected = listenerConnection;

    await setupRFCOMM();
}

module.exports = {
    startALL : function (listenerCommand, listenerConnection){ startALL(listenerCommand, listenerConnection);},
    sendMessage
};
