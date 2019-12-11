let carouselCounter = 0;
const FADE_DURATION = 200;
const FADE_RATE = 10;

function initCarousels() {
  let carouselList = document.querySelectorAll(".carousel-container");
  for (let carousel of carouselList) {
    let carouselElements = carousel.children[0].children;

    carousel.setAttribute("counter", 0);

    // Not really necessary if you remember to add "hidden" class to all but the first of the carousel elements, but it's here as a failsafe
    for (let element of carouselElements) {
      element.classList.add("hidden");
    }

    carouselElements[carouselCounter].classList.remove("hidden");
    //

    // We could also define the pip container in the HTML, doesn't really make a big difference
    let pipContainer = document.createElement("DIV");
    pipContainer.classList.add("carousel-pip-container");
    carousel.appendChild(pipContainer)

    // Fill the container with as many pips as there are elements in the carousel
    for (let i = 0; i < carouselElements.length; i++) {
      let pip = document.createElement("DIV");
      pip.classList.add("carousel-pip");

      if (i == 0) {
        pip.classList.add("carousel-pip-highlight");
      }

      pip.onclick = function() {
        setCarousel(carousel, i);
      };

      pipContainer.appendChild(pip);
    }
  }
}

function cycleCarouselLeft(element) {
  let carouselCounter = Number(element.attributes.counter.value) - 1;
  let carouselLength = element.querySelector(".carousel-content").children.length; //element.children[0].children.length;

  if (carouselCounter < 0) {
    carouselCounter += carouselLength;
  }

  setCarousel(element, carouselCounter);
}

function cycleCarouselRight(element) {
  let carouselCounter = Number(element.attributes.counter.value) + 1;
  let carouselLength = element.querySelector(".carousel-content").children.length;

  if (carouselCounter > carouselLength - 1) {
    carouselCounter -= carouselLength;
  }

  setCarousel(element, carouselCounter);
}

function setCarousel(element, index) {
  let carouselCounter = Number(element.attributes.counter.value);
  let carouselElements = element.querySelector(".carousel-content").children;
  fadeOut(carouselElements[carouselCounter]);
  carouselCounter = index;

  fadeIn(carouselElements[carouselCounter]);

  element.setAttribute("counter", carouselCounter);
  updatePips(element);
}

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

function scrollDown() {
  console.log("scrollolol");
  let target = document.querySelector(".carousel-container");
  window.scrollTo(0, window.innerHeight);
}

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

document.addEventListener("scroll", function() {
  let header = document.querySelector(".page-header");
  if (header.offsetTop > 20) {
    header.classList.add("page-header-scrolled");
  } else {
    header.classList.remove("page-header-scrolled");
  }
})
