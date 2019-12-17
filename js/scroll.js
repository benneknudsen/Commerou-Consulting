// Due to our header, we have to do this manually for it to look good;
// it scrolls to an element, with the height of the header taken into account.
// Element ID is defined either by the location hash (if argument is empty) or by a given ID
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
