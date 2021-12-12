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

ipcRenderer.on('listener-command', function (evt, command) {

  let tag=
      "                  <tr class=\"view\">\n" +
      "                        <a class=\"accordion-link\" href=\"\">\n" +
      "                            <td data-label=\"Id\">"+command.id+"</td>\n" +
      "                            <td data-label=\"Forfait\">"+command.forfait + "</td>\n" +
      "                            <td data-label=\"Format\">"+ command.format +"</td>\n" +
      "                            <td data-label=\"Photos\">"+command.photos.join(', ')+"</td>\n" +
      "                            <td data-label=\"Client\">"+ command.prenom +" " + command.nom +"</td>\n" +
      "                            <td data-label=\"&nbsp;\" >\n" +
      "                                <i class=\"fas fa-angle-right\" onclick=handleClick()></i>    \n" +
      "                            </td>\n" +
      "                        \n" +
      "                        </a>   \n" +
      "                  </tr>";
  document.getElementById('#tbody-commands').innerHTML += tag;

});

ipcRenderer.on('listener-connection', function (evt, message) {
  //console.log(message); // Returns: {'SAVED': 'File Saved'}
  document.getElementById('#status-connection').innerHTML = message ? 'Connecté' : 'Non connecté';
  document.getElementById('#status-connection').style.color = message ? 'green' : 'red';

  //alert(message);
});

//console.log(ipcRenderer.sendSync('test-connection', 'ping')) // prints "pong"
