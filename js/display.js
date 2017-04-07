function elt (name, className) {
  var elt = document.createElement(name);
  if (className && className !== " ") elt.className = className;
  return elt;
}

function DOMdisplay (parent, board, player) {
  this.wrap = parent.appendChild(elt("div"));
  this.board = board;

  this.wrap.appendChild(this.drawBoard(board, player));
}

DOMdisplay.prototype.drawBoard = function (board, player) {
  var table = elt("table", "board");
  table.style.width = 10 * scale + "px";
  board.forEach(function(row, rowIdx) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type, colIdx) {
      var cell = elt("td", type + player + " cell")
      cell.setAttribute("data-row", rowIdx);
      cell.setAttribute("data-col", colIdx);
      rowElt.appendChild(cell);
    });
  });
  return table;
}

function onClick (target) {
  var coords = [];
  // coords[0] = target.currentTarget.getAttribute("data-row");
  coords[1] = target.currentTarget;
  console.log(target.currentTarget);
  return coords;
}



var testBoard = [
  [" ", "c", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", "c", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", "c", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", "x", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", "o", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
  ];

var scale = 30;

window.onload = function() {
  setBoard();
  var compBoard = new DOMdisplay(document.getElementById("compBoard"), boards.computer, "computer");
  var humanBoard = new DOMdisplay(document.getElementById("humanBoard"), boards.human, "human");
  var cells = document.querySelectorAll(".computer.cell")
  cells.forEach(function(cell) {
    cell.addEventListener("click", onClick(event));
  })
}

