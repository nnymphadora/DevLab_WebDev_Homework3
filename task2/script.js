const confirmChartBtn = document.querySelector("#confirm-chars-btn");
const addCharsBtn = document.querySelector("#add-chars-btn");

const inputContainer = document.querySelector("#input-container");
const boxContainer = document.querySelector("#box-container");
const boxDiv = document.querySelector("#box-div");

confirmChartBtn.addEventListener("click", charactersConfirmed);
addCharsBtn.addEventListener("click", addCharBox);

function charactersConfirmed() {
  inputContainer.style.display = "none";
  boxContainer.style.display = "flex";
  let numberOfChars = document.querySelector("#num-of-chars").value;
  createCharBoxes(numberOfChars);
}

function createCharBoxes(repeatTimes) {
  if (repeatTimes === 0) {
    return;
  } else {
    let charBox = document.createElement("input");
    charBox.type = "text";
    charBox.maxLength = "1";
    charBox.classList.add("char-box");
    boxDiv.appendChild(charBox);
    boxContainer.addEventListener("click", setTarget);

    charBox.focus();
    createCharBoxes(repeatTimes - 1);
  }
}

function addCharBox() {
  createCharBoxes(1);
}

function setTarget() {
  let charBoxes = document.querySelectorAll(".char-box");
  charBoxes.forEach((box) => {
    if (box.value === "") {
      charBoxes[0].focus();
    }
  });
}
