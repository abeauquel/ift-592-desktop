// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { remote, ipcRenderer } = require("electron");
const storeCommand = require('./src/persistenceCommand.js');
const details = require('./js/details');
const {
  getCurrentWindow,
  openMenu,
  minimizeWindow,
  maximizeWindow,
  unmaximizeWindow,
  maxUnmaxWindow,
  isWindowMaximized,
  closeWindow,
} = require("./js/menu-title");
const { getCommand } = require("./src/persistenceCommand");

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

ipcRenderer.on('logo', function (evt, message) {
  console.log(message); // Returns: {''}

})

ipcRenderer.on('listener-command', function (evt, message) {
  let tbody = document.getElementById("#tbody-commands");
  tbody.innerHTML += getTrCommand(message);
  document.getElementById("#nb-commands").innerText= parseInt(document.getElementById("#nb-commands").innerText) + 1;
});


ipcRenderer.on('listener-connection', function (evt, message) {
  let tag = document.getElementById("status-connection");
  if(message)
    tag.style.background = 'green';
  else
    tag.style.background = 'red';
});

ipcRenderer.on('sendcommands', function (evt, commands) {
  let tbody = document.getElementById("#tbody-commands");
  let tbody2 = document.querySelectorAll('#package tr:not(.header)')
  tbody.innerHTML = "";
  console.log(commands);
  for (let command of commands) {
    if(command)
      tbody.innerHTML += getTrCommand(command);

  }

  document.getElementById("#nb-commands").innerText=commands.length;

});

ipcRenderer.on('sendcommand', function (evt, command) {
  let detailsDatas = document.getElementById("details-data");
  let status = document.getElementById("statusId");
  let validateButton = document.getElementsByClassName("ValidateButton") 
  details.openNav()
  detailsDatas.innerHTML = displayCommand(command);

  document.getElementsByClassName("ValidateButton").onclick = function() {myFunction()};

  function myFunction() {
    details.closeNav();
  }

});

function getTrCommand(command){
  let result = "<tr onclick='getCommand("+command.id+")' class=\"navbar-toggler\" data-toggle=\"collapse\" data-target=\"#navbarNavAltMarkup\" aria-controls=\"navbarNavAltMarkup\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n" +
      "                <a class=\"accordion-link\" href=\"\">\n" +
      "                    <td data-label=\"Forfeit\">"+command.id+"</td>\n" +
      "                    <td data-label=\"Forfeit\">"+command.forfait+"</td>\n" +
      "                    <td data-label=\"Format\">"+command.format+"</td>\n" +
      "                    <td data-label=\"Photos\">"+ command.photos + "</td>\n" +
      "                    <td data-label=\"Client\">"+command.prenom  +" " + command.nom + "</td>\n";
  if(command.status)
    result+="<td id=\"statusId\" data-label=\"Status\">Traité</td>\n";
    
  else
    result+="<td id=\"statusId\" data-label=\"Status\">Non Traité</td>\n";

  result+= "<td  onclick='makeStatus("+command.id+");' data-label=\"&nbsp;\" style='navbutton_home_hovered: ' " +
      "onmouseover=\"this.style.color='blue';\" \n" +
      "onmouseout=\"this.style.color='black';\">\n" +
      "                        <i style='font-size: 20px' class=\"fas fa-angle-right\" ></i>    \n" +
      "                    </td>\n" +
      "                </a>   \n" +
      "              </tr>";

  return result;
}


function displayCommand(command) {

  let result = "<tr><th>Id</th><td>"+ command.id +"</td><td><i class=\"fas fa-edit\"></i></td></tr>\n" +
  "<tr><th>Forfait</th><td>"+command.forfait +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Photos</th><td>"+command.photos +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Client</th><td>"+command.prenom +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Pays</th><td>"+command.pays +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Ville</th><td>"+command.ville +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Sender</th><td>"+command.sender +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Receiver</th><td>"+command.receiver +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>C.P</th><td>"+command.codePostale +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Telephone</th><td>"+command.telephone +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Format</th><td>"+command.format +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Action</th><td>"+command.action +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><th>Livraison</th><td>"+command.livraison +"</td><td><i class=\"fas fa-edit\"></td></tr>\n" +
  "<tr><div id=\"controlId\" class=\"DetailsButtons\" onclick='closeNav()'>" +
  "<button id=\"#reload-commands\" class=\"UpdateButton\">Modifier</button>" +
  "<button id = \"#reload-commands\" onclick='makeStatus("+command.id+");' class=\"ValidateButton\">Valider</button></div></tr>"
  return result;
}