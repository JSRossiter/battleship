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
      var cell = elt("td", type + " " + player + " cell")
      cell.setAttribute("data-row", rowIdx);
      cell.setAttribute("data-col", colIdx);
      rowElt.appendChild(cell);
    });
  });
  return table;
}

function aim (target) {
  var row = target.currentTarget.getAttribute("data-row");
  var col = target.currentTarget.getAttribute("data-col");
  runTurn(row, col);
}

var scale = 30;

window.onload = function() {
  var compBoard = new DOMdisplay(document.getElementById("compBoard"), boards.computer, "computer");
  var humanBoard = new DOMdisplay(document.getElementById("humanBoard"), boards.human, "human");
  var cells = document.getElementsByTagName("td")
  console.log(typeof cells);
  console.log(cells[10]);
  for (var i = 0; i < 100; i++) {
    cells[i].addEventListener("click", aim);
  }
}

