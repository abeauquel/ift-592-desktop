const arrayfolderRoot = ['home' , 'abeauquel', 'Pictures', 'Tournoi1']; //todo save dans la bd et le modifier
let arrayCurrentFolder =  JSON.parse(JSON.stringify(arrayfolderRoot));

const { spawn } = require('child_process');
const { exec } = require("child_process");
const fs = require('fs');

// let cdBack = spawn('cd', ['..']);
// let cd = spawn('cd', []);


let getLs = function (callback){
    const ls = spawn('ls', [ getCurrentFolder() ]);
    ls.stdout.on('data', (data) => {
        var array = data.toString().split('\n');
        var result = array.filter(value => {return value !== null && value !== ''});
        callback(createData(result));
    });
}

let doCd = function (directory, callback){
    if(directory === '..')
        doCdBack(callback);
    else {
        arrayCurrentFolder.push(directory);
        let path = getCurrentFolder();
        if (fs.existsSync(path)) {
            getLs(callback);
        }else {
            arrayCurrentFolder.pop();
            callback(createData('error directory not exist'));
        }
    }
}

let doCdBack = function (callback){
    let dir = arrayCurrentFolder.pop();
    if(arrayCurrentFolder.length < arrayfolderRoot.length){
        arrayCurrentFolder.push(dir);
        callback(createData('error directory outside root folder'));
    }
    else if (fs.existsSync(getCurrentFolder())) {
        getLs(callback);
    }else {
        arrayCurrentFolder.push(dir);
        callback(createData('error directory not exist'));
    }
}

let createData = function (value){
    let data = {};
    data.action = 'sendls';
    data.value = value;
    data.sender = 'desktop';
    data.receiver = 'phone';
    return JSON.stringify(data);
}

let getCurrentFolder = function (){
    let result = '/';
    arrayCurrentFolder.forEach(value =>{ result+=value+'/'})
    return result;
}

let getImage = function (value, callback){
    let path = getCurrentFolder()+value;
    let pathOuput = getCurrentFolder()+'output.png';

    //check image existe
    fs.stat(path, function (err, stats) {
        //console.log(stats);//here we got all information of file in stats variable
        if (err)
            return console.error(err);

        //resize Image
        let cmd = 'magick convert -resize 5% '+ path+' ' + pathOuput
        execSysCall(cmd);

        //readImage resize Image
        fs.readFile(pathOuput, function(err, dataFile) {
            if (err)
                callback(createData(err));

            //let image =  new Buffer(dataFile, 'binary').toString('base64');
            let image = Buffer.from( dataFile, 'binary').toString('base64');
            let result = createData(image);
            result.action= 'sendimage';

            //delete Image resize
            fs.unlink(pathOuput,function(err){
                if(err) console.log(err);
                //console.log('file deleted successfully');
                callback(result);
            });

        });

    });


}

function execSysCall(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            //todo comment, because error on magice resize image
            // if (error) {
            //     console.log(`error: ${error.message}`);
            //     reject(error);
            // }
            // if (stderr) {
            //     console.log(`stderr: ${stderr}`);
            //     reject(stderr);
            // }

            resolve(stdout);
        });
    });

}
module.exports = {
    getLs : getLs,
    doCd : doCd,
    getImage : getImage
}