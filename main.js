// battleship to be played human vs computer on 10 x 10 board
// ships are: 5-C, 4-B, 3-R, 3-S, 2-D

// create boards - coordinates are [row][col] from top left
var boards = {
  playerBoard: [
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ],
  compBoard: [
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ]
}

// place ship
function placeShip (row, col, board, ship, orientation) {
  if (ship === 'c') var size = 5;
  if (ship === 'b') var size = 4;
  if (ship === 'r' || ship === 's') var size = 3;
  if (ship === 'd') var size = 2;

// check for valid placement
  for (var i = 0; i < size; i++) {
    if (orientation === "vertical") {
      if (row + size > 9 || boards[board][row + i][col] !== " ") return;
    }
    if (orientation === "horizontal") {
      if (boards[board][row][col + i] !== " ") return;
    }
  }

// update board
  for (var i = 0; i < size; i++) {
    boards[board][row][col] = ship;
    if (orientation === "vertical") row++;
    if (orientation === "horizontal") col++;
  }
  return true;
}

function setBoard () {
  //computer placement
  do {
    var check = placeShip(random(), random(), "compBoard", 'c', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "compBoard", 'b', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "compBoard", 'r', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "compBoard", 's', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "compBoard", 'd', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
}

function random() {
  return Math.floor(Math.random()*10);
}

// AI targetting
function aiTarget () {
  fire (random(), random(), "playerBoard");
}

// player targetting

// take shot
function fire (row, col, board) {
  if (row > 9 || row < 0 || col > 9 || col < 0 || boards[board][row][col] === 'x' || boards[board][row][col] === 'o') return;
  if (boards[board][row][col] === ' ') {
    boards[board][row][col] = 'o';
    return "miss";
  } else {
    boards[board][row][col] = 'x'
    return "hit";
  }
}

// run turn - win condition?



setBoard();
// placeShip(8, 8, "playerBoard", "s", "vertical");
// console.log(fire (2, 40, "playerBoard"));

console.log(boards.compBoard);
