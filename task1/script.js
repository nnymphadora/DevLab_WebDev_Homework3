const cells = document.querySelectorAll(".cell");
const reloadBtns = document.querySelectorAll("i");
const gameStatus = document.querySelector("#game-status");
const winningAlert = document.querySelector("#winning-alert");
const winningAlertText = document.querySelector("#winning-alert-text");
const playerOne = "X";
const playerTwo = "O";
const winCombos = [
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
let filledCells = ["", "", "", "", "", "", "", "", ""];

startGame();
function startGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClick);
    cell.addEventListener("mouseover", mouseIn);
    cell.addEventListener("mouseout", mouseOut);
  });
  reloadBtns.forEach((button) => {
    button.addEventListener("click", restartGame);
  });
  gameOn = true;
  gameStatus.textContent = `It's game on! ${currentPlayer}'s turn!`;
}

function cellClick() {
  const cellId = this.getAttribute("id").at(-1);
  if (filledCells[cellId] != "" || !gameOn) {
    return;
  }

  fillCell(this, cellId);

  checkWinOrTie();
}

function checkWinOrTie() {
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
    gameStatus.textContent = "It's a tie!  Game will restart soon";
    gameOn = false;
    setTimeout(restartTimer(), 2500);
  } else {
    switchPlayer();
  }
}

function fillCell(cell, index) {
  filledCells[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.remove("empty-hovered");
}

function switchPlayer() {
  if (currentPlayer == playerOne) {
    currentPlayer = playerTwo;
  } else currentPlayer = playerOne;
  gameStatus.textContent = `It's ${currentPlayer}'s turn!`;
}

function restartGame() {
  currentPlayer = playerOne;
  filledCells = ["", "", "", "", "", "", "", "", ""];
  gameStatus.textContent = `It's game on! ${currentPlayer}'s turn!`;
  cells.forEach((cell) => (cell.textContent = ""));
  winningAlert.classList.remove("show");
  gameOn = true;
}

function restartTimer() {
  let count = 5;
  const countdown = setInterval(function () {
    gameStatus.textContent = `The game starts in ${count} seconds.`;
    count--;
    if (count === 0) {
      clearInterval(countdown);
      restartGame();
    }
  }, 1000);
}

function mouseIn() {
  const cellId = this.getAttribute("id");

  if (filledCells[cellId.at(-1)] == "") {
    this.textContent = `${currentPlayer}`;
    this.classList.add("empty-hovered");
  }
}

function mouseOut() {
  const cellId = this.getAttribute("id");

  if (filledCells[cellId.at(-1)] == "") {
    this.textContent = "";
  }
}
