let menu = document.querySelector(".header-buttons-container");

function toggleMenu() {
  if (menu.style.transform === "translateX(0px)") {
    menu.style.transform = "translateX(100%)";
  } else {
    menu.style.transform = "translateX(0)";
  }
}
