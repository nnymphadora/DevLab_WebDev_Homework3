const confirmChartBtn = document.querySelector("#confirm-chars-btn");
const addCharsBtn = document.querySelector("#add-chars-btn");

const inputContainer = document.querySelector("#input-container");
const boxContainer = document.querySelector("#box-container");
const boxDiv = document.querySelector("#box-div");
const statusDiv = document.querySelector("#status-div");

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
    let box = document.createElement("div");
    boxDiv.appendChild(box);
    let charBox = document.createElement("input");
    charBox.type = "text";
    charBox.maxLength = "1";
    charBox.classList.add("char-box", "hover-remove-button");
    box.appendChild(charBox);
    charBox.addEventListener("input", checkInput);

    let removeCharBoxBtn = document.createElement("span");
    removeCharBoxBtn.classList.add("remove-chars-btn");
    removeCharBoxBtn.textContent = " x ";

    removeCharBoxBtn.addEventListener("click", removeCharBox);

    box.appendChild(removeCharBoxBtn);

    createCharBoxes(repeatTimes - 1);
  }
}

function addCharBox() {
  createCharBoxes(1);
}

function removeCharBox() {
  this.parentNode.remove();
}

function checkInput() {
  let charBoxes = document.querySelectorAll(".char-box");
  inputString = "";
  charBoxes.forEach((box) => {
    inputString += box.value;
  });
  if (isAlpha(inputString)) {
    if (isPalindrome(inputString)) {
      statusDiv.textContent = `Wow! '${inputString}' is a palindrome!`;
    } else {
      statusDiv.textContent = `It looks like '${inputString}' is not a palindrome!`;
    }
  } else {
    statusDiv.textContent =
      "Oh no! Invalid input. Only letters and spaces are accepted.";
  }
}

function isAlpha(input) {
  return /^[a-zA-Z\s]+$/.test(input);
}

function isPalindrome(input) {
  let inputString = input.toLowerCase().replace(/\s/g, "");
  return inputString === inputString.split("").reverse().join("");
}
