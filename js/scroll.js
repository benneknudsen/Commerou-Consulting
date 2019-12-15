function scrollToHash(destination) {
  if (destination != "") {
    location.hash = destination;
  }

  let tabID = location.hash.slice(1);

  if (tabID != "") {
    console.log(tabID);
    let target = document.querySelector(`#${tabID}_a`);
    window.scrollTo(0, target.offsetTop - 100);
  }
}
