const Store = require('electron-store');

const store = new Store();
const COMMANDS = "COMMANDS";

function getStore(){
    return store;
}

//Get or initialize command
function getCommands(){
    let result =store.get(COMMANDS);
    if(!result)
        result = [];
    return result;
}

function createCommand(value){
    let commands = getCommands();
    //todo set ID
    let newId = commands.length + 1;
    value.id = newId;
    if(!value.hasOwnProperty('date')){
        value.date = Date.now();
    }
    commands.push(value);
    store.set(COMMANDS, commands);
    return commands;
}

function updateCommand(id, value){
    let commands = getCommands();
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        if(command.id){
            commands[i]=value;
        }
        break;
    }
    store.set(COMMANDS, commands);
    return commands;
}

function deleteAllCommand(){
    store.delete(COMMANDS);
}

module.exports = {
    createCommand,
    updateCommand,
    deleteAllCommand,
    getCommands
}