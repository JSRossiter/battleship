// battleship to be played human vs computer on 10 x 10 board
// ships are: 5-C, 4-B, 3-R, 3-S, 2-D

// create boards - coordinates are [row][col] from top left
var boards = {};

var boardTemplate = [
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
  ];

// used to assign size and track life
var ships = {
  human: {
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
    d: 2,
    total: function() {
      return this.c + this.b + this.r + this.s + this.d;
    }
  }
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

  addPlacement();

  // // temporary code to place human ships
  // do {
  //   var check = placeShip(random(), random(), "human", 'c', Math.random() < 0.5 ? "vertical" : "horizontal");
  // } while (!check);
  // do {
  //   var check = placeShip(random(), random(), "human", 'b', Math.random() < 0.5 ? "vertical" : "horizontal");
  // } while (!check);
  // do {
  //   var check = placeShip(random(), random(), "human", 'r', Math.random() < 0.5 ? "vertical" : "horizontal");
  // } while (!check);
  // do {
  //   var check = placeShip(random(), random(), "human", 's', Math.random() < 0.5 ? "vertical" : "horizontal");
  // } while (!check);
  // do {
  //   var check = placeShip(random(), random(), "human", 'd', Math.random() < 0.5 ? "vertical" : "horizontal");
  // } while (!check);
}

function addPlacement () {
  var cells = document.getElementsByTagName("td")
  for (var i = 100; i < 200; i++) {
    cells[i].addEventListener("click", placeHuman);
  }
}

function placeHuman (target) {
  var row = Number(target.currentTarget.getAttribute("data-row"));
  var col = Number(target.currentTarget.getAttribute("data-col"));
  // var ship = getElementById("ship-selector"); // future code
  var shipTranslate = ['c', 'b', 'r', 's', 'd'];
  // var orientation = orientationSelector ? "vertical" : "horizontal"; // future code
  var orientation = "vertical"; // temp test
  placeShip (row, col, "human", shipTranslate[shipsPlaced], orientation) ? shipsPlaced++ : false;
  updateBoard();
  if (shipsPlaced === 5) {
    // start the game?
    addTargeting();
  } else addPlacement();

}

// place ship, return true if successful
function placeShip (row, col, player, ship, orientation) {
  var size = ships[player][ship];
  // check for valid placement
  for (var i = 0; i < size; i++) {
    if (orientation === "vertical") {
      if (row + size > 9 || boards[player][row + i][col] !== " ") return;
    }
    if (orientation === "horizontal") {
      if (boards[player][row][col + i] !== " ") return;
    }
  }

  // update board
  for (var i = 0; i < size; i++) {
    boards[player][row][col] = ship;
    if (orientation === "vertical") row++;
    if (orientation === "horizontal") col++;
  }

  return true;
}

function random () {
  return Math.floor(Math.random()*10);
}

function testFire (row, col, player) {
  if (row > 9 || row < 0 || col > 9 || col < 0 || boards[player][row][col] === 'x' || boards[player][row][col] === 'o') return false;
  return true;
}

// take shot with coords and
function fire (row, col, player) {
  if (row > 9 || row < 0 || col > 9 || col < 0 || boards[player][row][col] === 'x' || boards[player][row][col] === 'o') return;
  if (boards[player][row][col] === ' ') {
    boards[player][row][col] = 'o';
    return "miss";
  } else {
    var status = hit(player, boards[player][row][col]);
    boards[player][row][col] = 'x'
    return status;

  }
}

//callback????
function hit (player, ship) {
  // update ship status, return ship type if sunk, players loses if game over
  ships[player][ship]--
  if (ships[player].total() === 0) return player + " loses";
  if (ships[player][ship] === 0) return ship;
  return "hit"
}

// run turn - win condition?
function runTurn (row, col) {
  // player inputs shot, update display, print result, computer shot, update display, print result
  var result = fire(row, col, "computer")
  updateBoard();
  console.log(turns++);
  feedback (result, "Player")
  if (result === "computer loses") {
    gameOver();
    return;
  }
  var result = aiTarget();
  updateBoard();
  feedback (result, "Computer")
  if (result === "human loses") {
    gameOver();
    return;
  }
  addTargeting();
}

function feedback (result, player) {
  if (result === "miss") logMessage(player + " misses");
  if (result === "hit") logMessage(player + " hits!");
  if (result === "c") logMessage(player + " sunk a carrier!");
  if (result === "b") logMessage(player + " sunk a battleship!");
  if (result === "r") logMessage(player + " sunk a cruiser!");
  if (result === "s") logMessage(player + " sunk a submarine!");
  if (result === "d") logMessage(player + " sunk a destroyer!");
  if (/loses/.test(result)) logMessage(player + " wins!");
}

// run game
function runGame () {
  // need to reset ship tracking object
  boards.computer = [
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
  ];
  boards.human = [
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
  ];
  setBoard();
}

function gameOver () {
  // reset some shit
}

var shipsPlaced = 0;
var previousHits = [];
var turns = 0;




//stretch: add variations
