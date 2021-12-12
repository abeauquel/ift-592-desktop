function changeStatus(){

    const setStatus = status => {
        let colorChange = document.getElementById('status-connection')
        if (status) {
            setTimeout(() =>{
                colorChange.style.backgroundColor = "green";
              }, 2000)
            colorChange.style.backgroundColor = "orange";
        } else {
            colorChange.style.backgroundColor = "red";
        }
    }

    setStatus(navigator.online)

    window.addEventListener('online', e => {
        setStatus(true)
    })
    
    window.addEventListener('offline', e => {
        setStatus(false)
    })
   
}

const pages = document.querySelectorAll('link[rel="import"]');
pages.forEach((page) => {
    let template = page.import.querySelector('template');
    var Pages = document.getElementsByClassName("tab-pane");
    let clone = document.importNode(template.content, true);
    let target = clone.querySelector(".template").dataset.tab;
    document.getElementById(target).appendChild(clone);

    let links = document.getElementsByClassName("nav-item");
    var currentLink = document.getElementsByClassName("active");
    var currentPage = document.getElementsByClassName("tab-pane");
    
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function() {

        currentLink[0].className = currentLink[0].className.replace(" active", "");
        this.className += " active";
        // document.getElementById(target).innerHTML = currentPage[i].innerHTML;
        })
    }
    
});

window.$ = window.jquery = require("jquery");
window.popper = require("popper.js");
require('./renderer.js');