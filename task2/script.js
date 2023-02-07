const confirmChartBtn = document.querySelector("#confirm-chars-btn");
const addCharsBtn = document.querySelector("#add-chars-btn");

const inputContainer = document.querySelector("#input-container");
const boxContainer = document.querySelector("#box-container");
const boxDiv = document.querySelector("#box-div");
const statusDiv = document.querySelector("#status-div");

document.addEventListener("keydown", previousInput)
//we add this to the entire document so the user doesnt have to click on each individual box to delete input

confirmChartBtn.addEventListener("click", charactersConfirmed);
//the button used to confirm the input for desired number 'of charBox' elements

addCharsBtn.addEventListener("click", addCharBox);
//the butt which can be used to add more 'charBox' elements manually

function charactersConfirmed() {
  //after the user confirms the number of charboxes they want, this function hides this input and calls the function that creates the appropriate number of of 'charBox' elements (single-character input fields)
  inputContainer.style.display = "none";
  boxContainer.style.display = "flex";
  let numberOfChars = document.querySelector("#num-of-chars").value;
  createCharBoxes(numberOfChars);
}

function createCharBoxes(repeatTimes) {
  //this function uses reccursion to repeat a certain number of times based on the input given by the user and therefore create an appropriate number of 'charBox' elements
  if (repeatTimes === 0) {
    setFocusToFirstBox();
    return;
  } else {
    let box = document.createElement("div");
    boxDiv.appendChild(box);
    //we create a simple 'box' element - a div that will containt the 'charBox' and the 'removeCharBoxBtn'
    let charBox = document.createElement("input");
    charBox.type = "text";
    charBox.maxLength = "1";
    charBox.classList.add("char-box", "hover-remove-button");
    box.appendChild(charBox);
    charBox.addEventListener("input", checkInput);
    //we create the 'charBox' element appendt it to the containing div, add the classes and finally add an event listener for input

    let removeCharBoxBtn = document.createElement("span");
    removeCharBoxBtn.classList.add("remove-chars-btn");
    removeCharBoxBtn.textContent = " x ";
    removeCharBoxBtn.addEventListener("click", removeCharBox);
    box.appendChild(removeCharBoxBtn);
    //we create 'removeCharBoxBtn' which only shows on hover of the sibling 'charBox' or itself, we add the event listener for click, and append it to the appropriate containing div.

    createCharBoxes(repeatTimes - 1);
  }
}

function addCharBox() {
  //the event handler for click event of the 'addCharsBtn' element which is use to manually add more 'charBox' elements
  createCharBoxes(1);
}

function setFocusToFirstBox() {
  //we call this fucntion to initally set focus to the first 'charBox' element, we call it with the createCharBoxes function, right before we break the reccursion
  inputs = document.querySelectorAll(".char-box");
  inputs[0].focus();
}

function removeCharBox() {
  //the event handler for the click of 'removeCharBox' element which removes the appropriate parent node and therefore the appropriate 'charBox' element
  this.parentNode.remove();
}

function checkInput(event) {
  //the event handler for the input event of all the 'charBox' elements. It is used to call isAlpha and isPalindrome functions which validate the input(only letters and spaces allowed) and check if the current string is a palindrome, and then displays the appropriate message to the user. If the input passes the validation, we call the 'nextInput' function, which is used to automatically switch focus to the next 'charBox' element(but only if the current charBox is not empty).
  let charBoxes = document.querySelectorAll(".char-box");
  inputString = "";
  charBoxes.forEach((box) => {
    inputString += box.value;
  });
  if (isAlpha(inputString)) {
    if (isPalindrome(inputString)) {
      nextInput(event.target);
      statusDiv.textContent = `Wow! '${inputString}' is a palindrome!`;
    } else {
      nextInput(event.target);
      statusDiv.textContent = `It looks like '${inputString}' is not a palindrome!`;
    }
  } else {
    statusDiv.textContent =
      "Oh no! Invalid input. Only letters and spaces are accepted.";
  }
}

function isAlpha(input) {
  //input validation(only letters and spaces allowed)
  return /^[a-zA-Z\s]+$/.test(input);
}

function isPalindrome(input) {
  //checking if the input is a palindrome by spliting the string into an array, reversing it and then creating a new string with reverse() and join().
  let inputString = input.toLowerCase().replace(/\s/g, "");
  return inputString === inputString.split("").reverse().join("");
}

function nextInput(currentInput) {
  //we use this function to skip to the next 'charBox' element after the user inputs data. This function is only called if the input passed the validation and the current 'charBox' is not empty - when the user deletes data instead of inputing.
  let inputs = document.querySelectorAll(".char-box");

  let currentIndex = [...inputs].indexOf(currentInput);

  if (currentInput.value !== "" && inputs[currentIndex + 1]) {
    inputs[currentIndex + 1].focus();
  }
}



function previousInput(event) {
  let inputs = document.querySelectorAll(".char-box");

  let currentIndex = [...inputs].indexOf(event.target);

  if(event.key === "Backspace") {
    event.target.value = ""
    inputs[currentIndex-1].focus()
  }


}
