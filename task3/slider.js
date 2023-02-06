const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
const closeBtn = document.querySelector(".close");
const imgContainer = document.querySelector(".img-container");

const imgs = document.querySelectorAll(".slider-img");

const numberOfImgs = imgs.length;

let currentImg = 0;
let maximiseImg = false;

nextBtn.addEventListener("click", nextImg);
previousBtn.addEventListener("click", previousImg);
closeBtn.addEventListener("click", function () {
  maximiseImg = false;
  maximiseMinimise();
});

imgs.forEach((img) => {
  img.addEventListener("mouseover", function () {
    document.addEventListener("keydown", enableKeys);
  });
  img.addEventListener("mouseleave", function () {
    document.removeEventListener("keydown", enableKeys);
  });
  img.addEventListener("click", function () {
    maximiseImg = true;
    maximiseMinimise();
  });
});

function enableKeys(event) {
  if (event.key === "ArrowRight") {
    nextImg();
  } else if (event.key === "ArrowLeft") {
    previousImg();
  }
}

function changeImg() {
  for (let img of imgs) {
    img.classList.remove("show");
    img.classList.add("hide");
  }
  imgs[currentImg].classList.remove("hide");
  imgs[currentImg].classList.add("show");
}

function nextImg() {
  if (currentImg === numberOfImgs - 1) {
    currentImg = 0;
  } else {
    currentImg++;
  }
  changeImg();
}

function previousImg() {
  if (currentImg === 0) {
    currentImg = numberOfImgs - 1;
  } else currentImg--;
  changeImg();
}

function maximiseMinimise() {
  if (maximiseImg) {
    imgs.forEach((img) => {
      img.classList.add("max-img");
    });
    closeBtn.classList.add("max-close");
    previousBtn.classList.add("max-btn");
    nextBtn.classList.add("max-btn");
    imgContainer.classList.add("max-container");
  } else {
    imgs.forEach((img) => {
      img.classList.remove("max-img");
    });
    closeBtn.classList.remove("max-close");
    previousBtn.classList.remove("max-btn");
    nextBtn.classList.remove("max-btn");
    imgContainer.classList.remove("max-container");
  }
}
