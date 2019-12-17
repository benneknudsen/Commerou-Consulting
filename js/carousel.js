// Define fade in/out duration for the carousel in milliseconds; fade rate is how many milliseconds per step
const FADE_DURATION = 200;
const FADE_RATE = 10;

function initCarousels() {
  // Find all carousels and loop through them
  let carouselList = document.querySelectorAll(".carousel-container");
  for (let carousel of carouselList) {
    let carouselElements = carousel.querySelector(".carousel-content").children;

    carousel.setAttribute("counter", 0);
    let carouselCounter = 0;

    // Not really necessary if you remember to add "hidden" class to all but the first of the carousel elements, but it's here as a failsafe
    for (let element of carouselElements) {
      element.classList.add("hidden");
    }

    carouselElements[carouselCounter].classList.remove("hidden");

    // We could also define the pip container in the HTML, doesn't really make a big difference
    let pipContainer = document.createElement("DIV");
    pipContainer.classList.add("carousel-pip-container");
    carousel.appendChild(pipContainer)

    // Fill the container with as many pips as there are elements in the carousel
    for (let i = 0; i < carouselElements.length; i++) {
      let pip = document.createElement("DIV");
      pip.classList.add("carousel-pip");

      // Highlight the initial pip
      if (i === carouselCounter) {
        pip.classList.add("carousel-pip-highlight");
      }

      // Go to the relevant element when a pip is clicked
      pip.onclick = function() {
        setCarousel(carousel, i);
      };

      // Append pips to the container
      pipContainer.appendChild(pip);
    }
  }
}

// Cycles the carousel left, wraps on underflow
function cycleCarouselLeft(element) {
  let carouselCounter = Number(element.attributes.counter.value) - 1;
  let carouselLength = element.querySelector(".carousel-content").children.length;

  if (carouselCounter < 0) {
    carouselCounter += carouselLength;
  }

  setCarousel(element, carouselCounter);
}

// Cycles the carousel right, wraps on overflow
function cycleCarouselRight(element) {
  let carouselCounter = Number(element.attributes.counter.value) + 1;
  let carouselLength = element.querySelector(".carousel-content").children.length;

  if (carouselCounter > carouselLength - 1) {
    carouselCounter -= carouselLength;
  }

  setCarousel(element, carouselCounter);
}

// Displays a given index on a given carousel, fading between the two and updating the carousels counter and pips
function setCarousel(element, index) {
  let carouselCounter = Number(element.attributes.counter.value);
  let carouselElements = element.querySelector(".carousel-content").children;
  fadeOut(carouselElements[carouselCounter]);
  carouselCounter = index;

  fadeIn(carouselElements[carouselCounter]);

  element.setAttribute("counter", carouselCounter);
  updatePips(element);
}

// Removes highlights from inactive pips and adds it to the active one; targets a specific carousel
function updatePips(element) {
  let carouselCounter = Number(element.attributes.counter.value);
  let pipList = element.querySelector(".carousel-pip-container").children;

  for (let i = 0; i < pipList.length; i++) {
    if (i == carouselCounter) {
      pipList[i].classList.add("carousel-pip-highlight");
    } else {
      pipList[i].classList.remove("carousel-pip-highlight");
    }
  }
}

// Fades an element out over a time given by FADE_DURATION
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

// Fades an element in over a time given by FADE_DURATION
function fadeIn(element) {
  let opacity = 0;
  element.style.opacity = "0";
  let fader = setInterval(function() {
    if (opacity >= 1) {
      clearInterval(fader);
      element.style.opacity = "1";
    } else {
      opacity += FADE_RATE/FADE_DURATION;
      element.style.opacity = opacity.toString();
    }
  }, FADE_RATE);
  show(element);
}

// Hides an element via a CSS class
function hide(element) {
  element.classList.add("hidden");
}

// Removes the above CSS class
function show(element) {
  element.classList.remove("hidden");
}
