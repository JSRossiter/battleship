function elt (name, className) {
  var elt = document.createElement(name);
  if (className && className !== " ") elt.className = className;
  return elt;
}

function DOMdisplay (parent, board) {
  this.wrap = parent.appendChild(elt("div"));
  this.board = board;

  this.wrap.appendChild(this.drawBoard(board));
}
var scale = 30;

DOMdisplay.prototype.drawBoard = function (board) {
  var table = elt("table", "board");
  table.style.width = 10 * scale + "px";
  board.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(cell) {
      rowElt.appendChild(elt("td", cell));
    });
  });
  return table;
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
  var compBoard = new DOMdisplay(document.getElementById("compBoard"), boards.computer);
  var playerBoard = new DOMdisplay(document.getElementById("playerBoard"), testBoard);
}