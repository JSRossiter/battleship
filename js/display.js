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
var scale = 30;

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
  // doStuff
  var coords = [];
  coords[0] = target.which.getAttribute("data-row");
  coords[1] = target.which.getAttribute("data-col");
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

window.onload = function() {
  var compBoard = new DOMdisplay(document.getElementById("compBoard"), boards.computer, "computer");
  var humanBoard = new DOMdisplay(document.getElementById("humanBoard"), boards.human, "human");
  var cells = document.querySelectorAll(".computer.cell")
  cells.addEventListener("click", onClick(event));
}

