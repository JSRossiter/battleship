var boards = {};
var shipsPlaced = 0;
var previousHits = [];
var turns = 0;
var ships = {};
// used to assign size and track life
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
var orientationSelector = true;

function random () {
  return Math.floor(Math.random() * 10);
}

// place ship, return true if successful
function placeShip (row, col, player, ship, orientation) {
  var size = ships[player][ship];
  // check for valid placement
  for (var i = 0; i < size; i++) {
    if (orientation === "vertical") {
      if (row + size > 10 || boards[player][row + i][col] !== " ") return;
    }
    if (orientation === "horizontal") {
      if (boards[player][row][col + i] !== " ") return;
    }
  }

  // update board
  for (var i = 0; i < size; i++) {
    if (orientation === "vertical") {
      boards[player][row + i][col] = ship;
    }
    if (orientation === "horizontal") {
      boards[player][row][col + i] = ship;
    }
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

  var placement = document.getElementById('placement')
  placement.style.display = 'block'
  replaceShipSelectors();
  addPlacement();
}

function placeHuman (target) {
  var row = Number(target.currentTarget.getAttribute("data-row"));
  var col = Number(target.currentTarget.getAttribute("data-col"));
  var ship = document.getElementById("ship");
  var orientation = document.querySelector('[name=orientation]:checked').value;
  if (placeShip(row, col, "human", ship.value, orientation)) {
    shipsPlaced++;
    // remove ship from select
    var shipSelector = document.getElementById("ship");
    for (var i = 0; i < shipSelector.length; i++) {
      if (shipSelector.options[i].value === ship.value) shipSelector.remove(i);
    }
  }
  updateBoard();
  if (shipsPlaced === 5) {
    addTargeting();
    var placement = document.getElementById('placement')
    placement.style.display = 'none'
    logMessage("Fire when ready!");
  } else addPlacement();
}

function testFire (row, col, player) {
  if (row > 9 || row < 0 || col > 9 || col < 0 || boards[player][row][col] === 'x' || boards[player][row][col] === 'o') return false;
  return true;
}

// update ship status, return ship type if sunk, players loses if game over
function hit (player, ship) {
  ships[player][ship]--;
  if (ships[player].total() === 0) return player + " loses";
  if (ships[player][ship] === 0) return ship;
  return "hit";
}

// take shot with coords and player
function fire (row, col, player) {
  if (row > 9 || row < 0 || col > 9 || col < 0 || boards[player][row][col] === 'x' || boards[player][row][col] === 'o') return;
  if (boards[player][row][col] === ' ') {
    boards[player][row][col] = 'o';
    return "miss";
  } else {
    var status = hit(player, boards[player][row][col]);
    boards[player][row][col] = 'x';
    return status;

  }
}

// this could be turned into an object eg feedback.human.miss = "Human misses"
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

function gameOver () {
  newGameButton();
}

// takes coords from click event, fires, runs AI targeting, and prints results
function runTurn (row, col) {
  var result = fire(row, col, "computer");
  updateBoard();
  console.log(turns++);
  feedback(result, "Player");
  if (result === "computer loses") {
    gameOver();
    return;
  }
  var result = aiTarget();
  updateBoard();
  feedback(result, "Computer");
  if (result === "human loses") {
    gameOver();
    return;
  }
  addTargeting();
}

// run game
function runGame () {
  ships.human = {
    c: 5,
    b: 4,
    r: 3,
    s: 3,
    d: 2,
    total: function() {
      return this.c + this.b + this.r + this.s + this.d;
    }
  }
  ships.computer = {
    c: 5,
    b: 4,
    r: 3,
    s: 3,
    d: 2,
    total: function() {
      return this.c + this.b + this.r + this.s + this.d;
    }
  }
  shipsPlaced = 0;
  turns = 0;
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
  var NGB = document.getElementsByTagName("button");
  var interact = document.getElementById("interaction");
  interact.removeChild(NGB[0]);
  updateBoard();
  setBoard();
}