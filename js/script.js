// ===== Menu ===== //
document.addEventListener("DOMContentLoaded", () => {
  const navIcon = document.querySelector(".nav-icon");
  const icon = navIcon.querySelector("i");
  const menu = document.querySelector(".menu");

  navIcon.addEventListener("click", () => {
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
    menu.classList.toggle("show-menu");
  });
});

// ===== Comments Sliders ===== //
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = document.querySelector(".coments-card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () => {
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2000);
};

autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

const dots = document.querySelectorAll(".dot");

const updateDots = () => {
  const activeIndex =
    Math.round(carousel.scrollLeft / firstCardWidth) % dots.length;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
};

carousel.addEventListener("scroll", updateDots);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    carousel.scrollLeft = firstCardWidth * index;
  });
});

// ===== Questions ===== //
const questionsCards = document.querySelectorAll(".question-card-top");

questionsCards.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".question-card");
    const isAlreadyActive = card.classList.contains("card-height");

    questionsCards.forEach((card) => {
      const parenCard = card.closest(".question-card");
      parenCard.classList.remove("card-height");
      const icon = card.querySelector("#question-icon");
      icon.classList.remove("fa-minus");
      icon.classList.add("fa-plus");
    });

    if (!isAlreadyActive) {
      card.classList.add("card-height");
      const icon = button.querySelector("#question-icon");
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
    }
  });
});
