const sender="sender";
const receiver="receiver";
const action ="action" ;
const id ="id"; 
const forfait ="forfait" ;
const photos ="photos" ;
const livraison ="livraison" ; 
const prenom ="prenom" ; 
const nom ="nom" ; 
const adresse ="adresse" ; 
const ville ="ville" ; 
const pays ="pays" ; 
const province ="province" ; 
const codePostale ="codePostale" ; 
const telephone ="telephone" ; 
const format ="format";


function deserializeAction(paction, psender, preceiver, value){
    let result= null;
    try {
        if(!paction){
            throw 'error, no property in action for sender';
        }
        if(!psender){
            throw 'error, no property in action for receiver';
        };
        if(!preceiver){
            throw 'error, no property in action for action';
        };

        result = {action:paction, sender:psender, receiver:preceiver, values: value};
        result = JSON.stringify(result);

    } catch (e) {
        console.log('error in deserialize action');
        console.log(e);
        return null;
    }
    return result;
}

function serializeAction(string){
    let cmdaction= null;
    try {
        cmdaction = JSON.parse(string);
        if(!cmdaction.hasOwnProperty(sender)){
            throw 'error, no property in action for sender';
        }
        if(!cmdaction.hasOwnProperty(receiver)){
            throw 'error, no property in action for receiver';
        };
        if(!cmdaction.hasOwnProperty(action)){
            throw 'error, no property in action for action';
        };

    } catch (e) {
        console.log('error in serialize action');
        console.log(e);
        return null;
    }
    return cmdaction;
}

function serializeCommand(string){
    let command= null;
    try {
        command = JSON.parse(string);
        if(!command.hasOwnProperty(sender)){
            throw 'error, no property in command for sender';
        }
        if(!command.hasOwnProperty(receiver)){
            throw 'error, no property in command for receiver';
        };
        if(!command.hasOwnProperty(action)){
            throw 'error, no property in command for action';
        };
        if(!command.hasOwnProperty(id)){
            throw 'error, no property in command for id';
        };
        if(!command.hasOwnProperty(forfait)){
            throw 'error, no property in command for forfait';
        };
        if(!command.hasOwnProperty(photos)){
            throw 'error, no property in command for photos';
        };
        if(!command.hasOwnProperty(livraison)){
            throw 'error, no property in command for livraison';
        };
        if(!command.hasOwnProperty(prenom)){
            throw 'error, no property in command for prenom';
        };
        if(!command.hasOwnProperty(nom)){
            throw 'error, no property in command for nom';
        };
        if(!command.hasOwnProperty(adresse)){
            throw 'error, no property in command for adresse';
        };
        if(!command.hasOwnProperty(ville)){
            throw 'error, no property in command for ville';
        };
        if(!command.hasOwnProperty(pays)){
            throw 'error, no property in command for pays';
        };
        if(!command.hasOwnProperty(province)){
            throw 'error, no property in command for province';
        };
        if(!command.hasOwnProperty(codePostale)){
            throw 'error, no property in command for codePostale';
        };
        if(!command.hasOwnProperty(telephone)){
            throw 'error, no property in command for telephone';
        };
        if(!command.hasOwnProperty(format)){
            throw 'error, no property in command for format';
        };
    } catch (e) {
        console.log('error in serialize command');
        console.log(e);
        return null;
    }
    return command;
}

module.exports = {
    serializeCommand,
    serializeAction,
    deserializeAction
}