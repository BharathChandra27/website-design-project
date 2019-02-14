// Navbar responsive function for moblile viewport
function myNavbarResponsiveFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

// Active link heighlight in navbar
for (var i = 0; i < document.links.length; i++) {
    if (document.links[i].href == document.URL) {
        document.links[i].className = 'navbar-active';
    }
}