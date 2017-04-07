function elt (name, className) {
  var elt = document.createElement(name);
  if (className && className !== " ") elt.className = className;
  return elt;
}

function DOMdisplay (parent, board, player) {
  this.wrap = parent.appendChild(elt("div"));
  this.board = board;

  this.wrap.appendChild(this.drawBoard(board, player));

  // THERE IS SOME BULLSHIT HAPPENING IN HERE - HUMAN BOARD DRAWS THE COMPUTER BOARD
}

DOMdisplay.prototype.drawBoard = function (board, player) {
  var table = elt("table", "board");
  table.style.width = 10 * scale + "px";
  board.forEach(function(row, rowIdx) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type, colIdx) {
      var cell = elt("td", type + " " + player + " cell")
      cell.setAttribute("data-row", rowIdx);
      cell.setAttribute("data-col", colIdx);
      rowElt.appendChild(cell);
    });
  });
  return table;
}

function aim (target) {
  var row = Number(target.currentTarget.getAttribute("data-row"));
  var col = Number(target.currentTarget.getAttribute("data-col"));
  if (testFire(row, col, "computer")) {
    runTurn(row, col);
  }
}

function addTargeting () {
  var cells = document.getElementsByTagName("td")
  for (var i = 0; i < 100; i++) {
    cells[i].addEventListener("click", aim);
  }
}

var scale = 30;



window.onload = function() {
  var compContainer = document.getElementById("compBoard");
  var humanContainer = document.getElementById("humanBoard");
  var compBoard = new DOMdisplay(compContainer, boardTemplate, "computer");
  var humanBoard = new DOMdisplay(humanContainer, boardTemplate, "human");
  runGame();

}

function updateBoard () {
  var compContainer = document.getElementById("compBoard");
  var humanContainer = document.getElementById("humanBoard");
  compContainer.removeChild(compContainer.childNodes[0]);
  humanContainer.removeChild(humanContainer.childNodes[0]);
  var compBoard = new DOMdisplay(document.getElementById("compBoard"), boards.computer, "computer");
  var humanBoard = new DOMdisplay(document.getElementById("humanBoard"), boards.human, "human");
}

function logMessage (message) {
  // push something to text box
  console.log(message);
}