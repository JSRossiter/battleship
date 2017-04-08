var scale = 25;

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

function newGameButton () {
  var button = elt("button", "new-game-button");
  button.type = "button";
  button.innerHTML = "New game";
  button.addEventListener("click", runGame);
  var parent = document.getElementById("interaction");
  parent.appendChild(button);
}

function placementSelectors () {
  var vertical = elt("input", "orientation");
  vertical.type = "radio";
  vertical.name = "orientation";
  vertical.innerHTML = "Vertical";
  vertical.value = "vertical";
  vertical.checked = true;
  var horizontal = elt("input", "orientation");
  horizontal.type = "radio";
  horizontal.name = "orientation";
  horizontal.innerHTML = "Horizontal";
  horizontal.value = "horizontal";
  var parent = document.getElementById("interaction");
  parent.appendChild(vertical);
  parent.appendChild(horizontal);

}

function removePlacementSelectors () {
  var parent = document.getElementById("interaction");
  var radios = document.getElementsByTagName("orientation");
  for (var i = 0; i < radios.length; i++) {
    parent.removeChild(radios[i]);
  }
}

function addPlacement () {
  var cells = document.getElementsByTagName("td");
  for (var i = 100; i < 200; i++) {
    cells[i].addEventListener("click", placeHuman);
  }
}

function addTargeting () {
  var cells = document.getElementsByTagName("td")
  for (var i = 0; i < 100; i++) {
    cells[i].addEventListener("click", aim);
  }
}

function aim (target) {
  var row = Number(target.currentTarget.getAttribute("data-row"));
  var col = Number(target.currentTarget.getAttribute("data-col"));
  if (testFire(row, col, "computer")) {
    runTurn(row, col);
  }
}

window.onload = function() {
  var compContainer = document.getElementById("compBoard");
  var humanContainer = document.getElementById("humanBoard");
  var compBoard = new DOMdisplay(compContainer, boardTemplate, "computer");
  var humanBoard = new DOMdisplay(humanContainer, boardTemplate, "human");
  newGameButton();
}

function updateBoard () {
  var compContainer = document.getElementById("compBoard");
  var humanContainer = document.getElementById("humanBoard");
  compContainer.removeChild(compContainer.childNodes[0]);
  humanContainer.removeChild(humanContainer.childNodes[0]);
  var compBoard = new DOMdisplay(compContainer, boards.computer, "computer");
  var humanBoard = new DOMdisplay(humanContainer, boards.human, "human");
}

function logMessage (message) {
  // push something to text box
  var output = document.getElementById("message-box");
  output.value += "\n" + turns + ": " + message;
  output.scrollTop = output.scrollHeight;
}
