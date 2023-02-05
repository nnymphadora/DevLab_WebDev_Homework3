const cells = document.querySelectorAll(".cell");
// we have a total of 9 cell
const reloadBtns = document.querySelectorAll("i");
//icon for instan reload
const gameStatus = document.querySelector("#game-status");
//useful game status messages
const countdownText = document.querySelector("#countdown-text");
//if there's a tie, the game reloads on its own, after the timer runs out
const winningAlert = document.querySelector("#winning-alert");
//when theres in a winner, the 'winningAlert' el takes up the entire screen and manual reload is needed
const winningAlertText = document.querySelector("#winning-alert-text");

const playerOne = "X";
const playerTwo = "O";

const winCombos = [
  //we will use this to check if 'filledCells' values on these indices are all the same char (x or o). For ex if filledCells[0], filledCells[1], filledCells[2] are all the same char, that char wins, if not, we continue to check
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = playerOne;
let gameOn = false;
//we will use this to know when to check for winner or tie and when not
let filledCells = ["", "", "", "", "", "", "", "", ""];
//this array is the core of the gameplay, this is where th board state is save at all times

startGame();
function startGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClick);
    cell.addEventListener("mouseover", mouseIn);
    cell.addEventListener("mouseout", mouseOut);
    //we add click event listener for gameplay, and mouseover and mouseout event listeners for UI purposes
  });
  reloadBtns.forEach((button) => {
    button.addEventListener("click", restartGame);
    //we have 2 reload buttons which trigger the restartGame function when clicked
  });
  gameOn = true;
  //we use this
  gameStatus.textContent = `It's game on! ${currentPlayer}'s turn!`;
}

function cellClick() {
  //when an empty cell is clicked, we save its id to get the last char which will be the corresponding index in the filledCells array. We call the fillCell and checkWinOrTie functions, after each move, only if the cell is empty.
  const cellId = this.getAttribute("id").at(-1);
  if (filledCells[cellId] != "" || !gameOn) {
    return;
  }

  fillCell(this, cellId);

  checkWinOrTie();
}

function checkWinOrTie() {
  //this function loops through the winCombos array. Each item is an array which is a combination of winning positions(indices). If all elements at those posations are the same(and not empty strings), someone won. We use  the filledCells  array to keep track of the current state of the  board. If there is a winner, gamemWon switches to true and theere is an appropriate status message shown, gameOn switches to false. If there is no winner, the function checks for a tie(if the entire board is filled - there is no empty strings in filledCells). If it's a tie, there is an appropriate status message shown and gameOn switches to false. Finally if there is no winner, an no tie, the game continues, the switchPlayer function is calles.
  let gameWon = false;

  for (let i = 0; i < winCombos.length; i++) {
    const combo = winCombos[i];
    const cellA = filledCells[combo[0]];
    const cellB = filledCells[combo[1]];
    const cellC = filledCells[combo[2]];

    if (cellA != "" && cellA == cellB && cellB == cellC) {
      gameWon = true;
      break;
    }
  }

  if (gameWon) {
    gameStatus.textContent = "Game over.";
    winningAlertText.textContent = `${currentPlayer} wins!`;
    winningAlert.classList.add("show");
    gameOn = false;
  } else if (!filledCells.includes("")) {
    gameStatus.textContent = "It's a tie!";
    gameOn = false;
    setTimeout(restartTimer(), 2500);
  } else {
    switchPlayer();
  }
}

function fillCell(cell, index) {
  //this function changes the value of the filledCells at the index correspodning to the cellId. Then it applies the changes needed to visually reflect the state of the game.
  filledCells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.remove("empty-hovered");
}

function switchPlayer() {
  //this function is used to switch between the players and show the appropriate message while the gameOn is true, after each move.
  if (currentPlayer == playerOne) {
    currentPlayer = playerTwo;
  } else currentPlayer = playerOne;
  gameStatus.textContent = `It's ${currentPlayer}'s turn!`;
}

function restartGame() {
  //this function reassigns the appropriate variables, and applies the visal changes needed to accurately reflect the state of the game. It also switches the gameOn to true.
  currentPlayer = playerOne;
  filledCells = ["", "", "", "", "", "", "", "", ""];
  gameStatus.textContent = `It's game on! ${currentPlayer}'s turn!`;
  cells.forEach((cell) => (cell.textContent = ""));
  winningAlert.classList.remove("show");
  gameOn = true;
}

function restartTimer() {
  //we use an iteration to show the countdown to game restart, we itearte 5 times with 1second intervals.
  let count = 5;
  const countdown = setInterval(function () {
    countdownText.textContent = `The game will restart in ${count} seconds.`;
    count--;
    if (count === 0) {
      clearInterval(countdown);
      countdownText.textContent = "";
      restartGame();
    }
  }, 1000);
}

function mouseIn() {
  //event handler for cells. it is used to purely for UI purposes. mouseIn and mouseOut functions manipulate css classes in order to add and remove hover effecs depending on the cell being alredy filled or not.
  const cellId = this.getAttribute("id");
  if (filledCells[cellId.at(-1)] == "") {
    this.textContent = `${currentPlayer}`;
    this.classList.add("empty-hovered");
  }
}

function mouseOut() {
  //event handler for cells. it is used to purely for UI purposes. mouseIn and mouseOut functions manipulate css classes in order to add and remove hover effecs depending on the cell being alredy filled or not.
  const cellId = this.getAttribute("id");

  if (filledCells[cellId.at(-1)] == "") {
    this.textContent = "";
  }
}
