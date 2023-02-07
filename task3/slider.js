const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
const closeBtn = document.querySelector(".close");
const imgContainer = document.querySelector(".img-container");

const imgs = document.querySelectorAll(".slider-img");

const numberOfImgs = imgs.length;

let currentImg = 0;
//we will use this to iterate through images
let maximiseImg = false;
//we will use this to check if we need to apply 'max' css classes, for max view. We change the value of this variable and then call the maximiseMinimise function which then adds or removes classes from elements based on the value of the maximiseImg variable.

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
  //event listener for keydown event on which is added and removed from img elements on mouseover and mouseleave events
  if (event.key === "ArrowRight") {
    nextImg();
  } else if (event.key === "ArrowLeft") {
    previousImg();
  }
}

function changeImg() {
  //this function hides all the images and then only shows the one that is located on the currentImg index of the imgs nodelist.
  for (let img of imgs) {
    img.classList.remove("show");
    img.classList.add("hide");
  }
  imgs[currentImg].classList.remove("hide");
  imgs[currentImg].classList.add("show");
}

function nextImg() {
  //this function updates the currentImg variable
  if (currentImg === numberOfImgs - 1) {
    currentImg = 0;
  } else {
    currentImg++;
  }
  changeImg();
}

function previousImg() {
  //this function updates the currentImg variable
  if (currentImg === 0) {
    currentImg = numberOfImgs - 1;
  } else currentImg--;
  changeImg();
}

function maximiseMinimise() {
  //this function checks the value of the maximiseImg variable and based on that adds or removes css classes in order to either create max view or min view of the slider
  if (maximiseImg) {
    imgs.forEach((img) => {
      img.classList.add("max-img");
    });
    closeBtn.classList.add("max-close");
    previousBtn.classList.add("max-btn");
    nextBtn.classList.add("max-btn");
    imgContainer.classList.add("max-container");
  } else {
    simgs.forEach((img) => {
      img.classList.remove("max-img");
    });
    closeBtn.classList.remove("max-close");
    previousBtn.classList.remove("max-btn");
    nextBtn.classList.remove("max-btn");
    imgContainer.classList.remove("max-container");
  }
}
