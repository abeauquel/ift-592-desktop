var isLeftMenuActive = true;
window.addEventListener("DOMContentLoaded", () => {
    //const menuButton = document.getElementById("menu-btn");
    const minimizeButton = document.getElementById("minimize-btn");
    const maxUnmaxButton = document.getElementById("max-unmax-btn");
    const closeButton = document.getElementById("close-btn");
    const mySideBar = document.getElementById("menu-btn");

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
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});

// ----------------------------------------------------

// Status connection
function updateOnlineStatus () {
    document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
  }
  
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  
  updateOnlineStatus()
