let filter = () => {
  const trs = document.querySelectorAll('#package tr:not(.header)')
  const filterInput = document.querySelector('#myInput').value
  const regex = new RegExp(filterInput, 'i')
  const isFoundInTds = td => regex.test(td.innerHTML)
  const isFound = childrenArr => childrenArr.some(isFoundInTds)
  const setTrStyleDisplay = ({ style, children }) => {
    style.display = isFound([
      ...children // <-- All columns
    ]) ? '' : 'none' 
  }
  
  trs.forEach(setTrStyleDisplay)
}

function openNav(command) {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("packages-template").style.marginRight = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("packages-template").style.marginRight= "0";
}

module.exports = {
  filter, 
  openNav,
  closeNav
}