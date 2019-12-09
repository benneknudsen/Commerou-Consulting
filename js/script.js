let carouselCounter = 0;
const FADE_DURATION = 200;
const FADE_RATE = 10;

function initCarousels() {
  let carouselList = document.querySelectorAll(".carousel-container");
  for (let carousel of carouselList) {
    let carouselElements = carousel.children[0].children;
    for (let element of carouselElements) {
      element.classList.add("hidden");
    }

    carouselElements[carouselCounter].classList.remove("hidden");

    carousel.setAttribute("counter", 0);
  }
}

function cycleCarouselLeft(element) {
  let carouselCounter = Number(element.attributes.counter.value);
  let carouselElements = element.children[0].children;
  fadeOut(carouselElements[carouselCounter]);
  carouselCounter--;

  if (carouselCounter < 0) {
    carouselCounter += carouselElements.length;
  }

  show(carouselElements[carouselCounter]);

  element.setAttribute("counter", carouselCounter);
}

function cycleCarouselRight(element) {
  let carouselCounter = Number(element.attributes.counter.value);
  let carouselElements = element.children[0].children;
  fadeOut(carouselElements[carouselCounter]);
  carouselCounter++;

  if (carouselCounter > carouselElements.length - 1) {
    carouselCounter -= carouselElements.length;
  }

  show(carouselElements[carouselCounter]);

  element.setAttribute("counter", carouselCounter);
}

function fadeOut(element) {
  let opacity = 1;
  let fader = setInterval(function() {
    if (opacity <= 0) {
      clearInterval(fader);
      hide(element);
      element.style.opacity = "1";
    } else {
      opacity -= FADE_RATE/FADE_DURATION;
      element.style.opacity = opacity.toString();
    }
  }, FADE_RATE);
}

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}
