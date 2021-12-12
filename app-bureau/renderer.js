const { ipcRenderer } = require("electron");
const { filter, closeNav } = require("./js/details");

let replyDiv = document.querySelector('#reply');
var isLeftMenuActive = true;
var isRightMenuActive = false;
window.addEventListener("DOMContentLoaded", () => {
    //const menuButton = document.getElementById("menu-btn");
    const minimizeButton = document.getElementById("minimize-btn");
    const maxUnmaxButton = document.getElementById("max-unmax-btn");
    const closeButton = document.getElementById("close-btn");
    const mySideBar = document.getElementById("menu-btn");
    const details = document.getElementById("forfait-id");

    //pages
    const pageButton = document.getElementById("packages-tab");
    const settingsButton = document.getElementById("setting-link-id");
    const packagesPage = document.getElementById("packages-template");
    const settingsPage = document.getElementById("settings-template");
    if(packagesPage)
        packagesPage.hidden=false;
    if(settingsPage)
        settingsPage.hidden=true;


    settingsButton.addEventListener("click", e => {
        packagesPage.hidden=true;
        settingsPage.hidden=false;
        document.getElementById("settings").classList.remove('inactivePage');
        // closeNav();
        closeNavOnSetting();
    })

    pageButton.addEventListener("click", e => {
        packagesPage.hidden=false;
        settingsPage.hidden=true;
    })

    showHideMenus.addEventListener("click", e => {

        //window.openMenu(e.x, e.y);
        if(isLeftMenuActive) {
            mySideBar.style.width = '50px'
            isLeftMenuActive = false
        } else {
            mySideBar.style.width = '200px'
            isLeftMenuActive = true
        }   
        
    });


    minimizeButton.addEventListener("click", e => {
        window.minimizeWindow();
    })

    maxUnmaxButton.addEventListener("click", e => {
        const buttonIcon = maxUnmaxButton.querySelector("i.far");

        window.maxUnmaxWindow();
        if (window.isWindowMaximized()) {
            buttonIcon.classList.remove("fa-square");
            buttonIcon.classList.add("fa-clone");  
        } else {
            buttonIcon.classList.add("fa-square");
            buttonIcon.classList.remove("fa-clone");
        }
    });

    closeButton.addEventListener("click", e => {
        window.closeWindow();
    });


    // simulation backend
    const simulerConnectionBtn  = document.getElementById("#test-connection");
    simulerConnectionBtn.addEventListener("click", () => {
        estSimulaterConnection = simulerConnectionBtn.value.includes("true");
        // alert("connection " + estSimulaterConnection);
        if(estSimulaterConnection){
            simulerConnectionBtn.value = "Simuler connexion : false";
            ipcRenderer.send('test-connection', true);
        }
        else {
            simulerConnectionBtn.value = "Simuler connexion : true";
            ipcRenderer.send('test-connection', false);
        }
    });

    const simulerCommandBtn  = document.getElementById("#test-command");
    simulerCommandBtn.addEventListener("click", () => {
        let command = {
            sender: "phone",
            receiver: "desktop",
            action: "create",
            id: 1,
            forfait: generateRandomString(),
            photos: [
                "photo"+generateRandomString(),
                generateRandomString()
            ],
            status: false,
            prenom: generateRandomString(),
            nom: generateRandomString(),
            adresse: generateRandomString(),
            ville: generateRandomString(),
            pays: generateRandomString(),
            province: generateRandomString(),
            codePostale: generateRandomString(),
            telephone: generateRandomString(),
            format: generateRandomString()
        }
        ipcRenderer.send('test-command', command);
    });

    const reloadCommandsBtn  = document.getElementById("#reload-commands");
    reloadCommandsBtn.addEventListener("click", () => {
        ipcRenderer.send('getcommands', null);
    });

    const deleteAllCommands  = document.getElementById("#delete-commands");
    deleteAllCommands.addEventListener("click", () => {
        ipcRenderer.send('delete-commands', null);
    });

    //first load off command
    ipcRenderer.send('getcommands', null);
})

let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e)=>{
    let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
//console.log(sidebarBtn);
// sidebarBtn.addEventListener("click", ()=>{
//   sidebar.classList.toggle("close");
// });

// ----------------------------------------------------

// Status connection
// function updateOnlineStatus () {
//     document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
//   }
//
//   window.addEventListener('online', updateOnlineStatus)
//   window.addEventListener('offline', updateOnlineStatus)
//
//   updateOnlineStatus()

let makeStatus = function (idCommand){
    ipcRenderer.send('status-command', idCommand);
}

let getCommand = function (idCommand){
    ipcRenderer.send('getcommand', idCommand);
}
let generateRandomString = function (){
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

let closeNavOnSetting = () => {
    document.getElementById("mySidenav").classList.remove('sidenav');
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("packages-template").style.marginRight= "0";
    document.getElementById("mySidenav").classList.add('sidenav');
    
}
