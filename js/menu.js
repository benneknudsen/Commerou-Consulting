let menu = document.querySelector(".header-buttons-container");

// Slides the menu in from the right if it's hidden, otherwise slide it back out
function toggleMenu() {
  if (menu.style.transform === "translateX(0px)") {
    menu.style.transform = "translateX(100%)";
  } else {
    menu.style.transform = "translateX(0px)";
  }
}

// Note that this currently gives problems if you hide the menu and go back to desktop size!
