var element = document.getElementById("headrow");
element.addEventListener("click", function(){
    if(element.open !== true) {
      openNav();
    } else if(element.open === true) {
      closeNav();
    }
})


function openNav() {
  document.getElementById("mySidenav").style.width = "260px";
  element.open = true;
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  element.open = false;
}
