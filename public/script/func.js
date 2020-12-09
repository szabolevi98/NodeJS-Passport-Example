document.getElementById("year").innerText = new Date().getFullYear();

function responsive() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } 
    else {
      x.className = "topnav";
    }
}
