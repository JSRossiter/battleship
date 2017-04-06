// battleship to be played human vs computer on 10 x 10 board
// ships are: 5-C, 4-B, 3-R, 3-S, 2-D

// create boards - coordinates are [row][col] from top left
var boards = {
  player: [
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
  computer: [
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

// if a ship === 0, log message and reset compTargetting
var ships = {
  player: {
    c: 5,
    b: 4,
    r: 3,
    s: 3,
    d: 2,
    total: function() {
      return this.c + this.b + this.r + this.s + this.d;
    }
  },
  computer: {
    c: 5,
    b: 4,
    r: 3,
    s: 3,
    d: 2
  }
}

// place ship
function placeShip (row, col, board, ship, orientation) {
  var size = ships[board][ship];
  // if (ship === 'c') var size = 5;
  // if (ship === 'b') var size = 4;
  // if (ship === 'r' || ship === 's') var size = 3;
  // if (ship === 'd') var size = 2;

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
  // computer placement
  do {
    var check = placeShip(random(), random(), "computer", 'c', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "computer", 'b', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "computer", 'r', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "computer", 's', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "computer", 'd', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
}

function random() {
  return Math.floor(Math.random()*10);
}

// AI targetting
function aiTarget () {
  // if previousHit === []
  // continue firing while !check
  fire (random(), random(), "player");

  // if previousHit !== [], fire one of four connectors
}

// player targetting
function playerTarget () {
  // take input
}
// take shot with coords and
function fire (row, col, board) {
  if (row > 9 || row < 0 || col > 9 || col < 0 || boards[board][row][col] === 'x' || boards[board][row][col] === 'o') return;
  if (boards[board][row][col] === ' ') {
    boards[board][row][col] = 'o';
    return "miss";
  } else {
    var status = hit(board, boards[board][row][col]);
    boards[board][row][col] = 'x'
    return status;
  }
}

// function input (prompt) {
//   var stdin = process.stdin, stdout = process.stdout;
//   stdin.resume();
//   stdout.write(prompt);
//   stdin.once('data', function (data) {
//     return data;
//     // process.exit();
//   })
// }

// var test = input("test", placeShip);
// console.log(test);

//callback????
function hit (player, ship) {
  // update ship status, return ship type if sunk (or all)
  ships[player][ship]--
  if (ships[player].total() === 0) return player + " win";
  if (ships[player][ship] === 0) return ship;
  return "hit"
}

// run turn - win condition?
function runTurn() {
  // player inputs shot, update display, print result, computer shot, update display, print result
}

function setBoard() {
  // placeShip(8, 8, "player", "s", "vertical");
  // console.log(fire (2, 40, "player"));
}
// run game
function runGame() {
  // set ship count
  // setBoard etc
  // DOMdisplay(document.body, "player");
}
// runGame();
// console.log(boards.player);











//stretch: add variations
