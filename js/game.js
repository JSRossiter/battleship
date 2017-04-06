// battleship to be played human vs computer on 10 x 10 board
// ships are: 5-C, 4-B, 3-R, 3-S, 2-D

// create boards - coordinates are [row][col] from top left
var boards = {
  human: [
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

// place ship
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

  // test code
  do {
    var check = placeShip(random(), random(), "human", 'c', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "human", 'b', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "human", 'r', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "human", 's', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
  do {
    var check = placeShip(random(), random(), "human", 'd', Math.random() < 0.5 ? "vertical" : "horizontal");
  } while (!check);
}

function random () {
  return Math.floor(Math.random()*10);
}

// AI targeting
function aiTarget () {
  // test if targeting is boxed in
  if (targeting) {
    var row = previousHit[0];
    var col = previousHit[1];
    if (!(
    testFire(row + 1, col, "human") ||
    testFire(row - 1, col, "human") ||
    testFire(row, col + 1, "human") ||
    testFire(row, col - 1, "human"))) {
      targeting = false;
    }
  }
  // randomly select cell adjacent to previousHit
  if (targeting) {
    var position = Math.floor(Math.random()*4);
    if (position === 0) {
      var row = previousHit[0] + 1;
      var col = previousHit[1];
    } else if (position === 1) {
      var row = previousHit[0] - 1;
      var col = previousHit[1];
    } else if (position === 2) {
      var row = previousHit[0];
      var col = previousHit[1] + 1;
    } else if (position === 3) {
      var row = previousHit[0];
      var col = previousHit[1] - 1;
    }
    // fire and return results
    var result = fire(row, col, "human");
    if (result === undefined) return aiTarget();
    if (result === "hit") {
      targeting = true;
      previousHit = [row, col];
    } else if (result === "miss") {
      targeting = true;
    } else {
    targeting = false;
    }
    return result;
  } else {
    //targeting = false
    var row = random();
    var col = random();
    var result = fire(row, col, "human");
    if (result === undefined) return aiTarget();
    if (result === "hit") {
      targeting = true;
      previousHit = [row, col];
    }
    return result;
  }
}

// human targeting
function humanTarget () {

}

function testFire (row, col, player) {
  if (row > 9 || row < 0 || col > 9 || col < 0 || boards[player][row][col] === 'x' || boards[player][row][col] === 'o') return false;
  return true;
}

// take shot with coords and
function fire (row, col, player) {
  console.log(row, col);
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
  console.log(ship, "hit, remaining squares:", ships[player][ship])
  console.log("total remaining squares:", ships[player].total())
  if (ships[player].total() === 0) return player + " loses";
  if (ships[player][ship] === 0) return ship;
  return "hit"
}

// run turn - win condition?
function runTurn (row, col) {
  // player inputs shot, update display, print result, computer shot, update display, print result
  fire(row, col, "computer")
  console.log(turns++);
  console.log(boards.human);
  var result = humanTarget();
  if (result === "computer loses") return result;
  var finalResult = aiTarget();
  if (finalResult === "human loses") return finalResult;
  return runTurn();
}

// run game
function runGame () {
  // set ship count
  // setBoard etc
  // DOMdisplay(document.body, "human");
  gameOver(runTurn());
}

function gameOver (winner) {
  console.log(winner);
  console.log(boards);
}

setBoard();

var previousHit = [];
var targeting = false;
var turns = 0;
// runGame();





//stretch: add variations
