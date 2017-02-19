var element = document.getElementById("kanye");
element.open;

element.addEventListener("click",function(){
    console.log('CLICKED')
    if(element.open !== true) {
      openNav();
    } else if(element.open === true) {
      closeNav();
    }
})

function openNav() {
  console.log('OPEN!')
  document.getElementById("mySidenav").style.width = "260px";
  element.open = true;
}

function closeNav() {
  console.log('CLOSED')
  document.getElementById("mySidenav").style.width = "0";
  element.open = false;
}
