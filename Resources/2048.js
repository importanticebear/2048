function Board() {
    this.emptyCell = ""; // Value to put in an empty cell
    this.gridSquare = 4; // Number of cells on a side
    this.piece = "<div id=piece>{0}</div>"
    this.twoFourRatio = 0.8; // 80% of new tiles are 2s
}

Board.prototype.BuildBoard = function() {

}

/*
 * Moves the contents from cell A to cell B. Erases the contents of cell A and
 * replaces those in cell B in the process.
 */
Board.prototype.CellAToB = function(indexA, indexB) {
    this.ReplaceCellContents(indexB, this.GetCellContents(indexA));
    this.EmptyCellContents(indexA);
}

/*
 * Replaces the contents of all cells on the game board with an empty string.
 */
Board.prototype.EmptyAllCells = function() {
    for(gridKey in this.gridKeys) {
        this.ReplaceCellContents(gridKey, this.emptyCell);
    }
}

/*
 * Empties the contents of a specified cell on the game board based
 * on its zero-based index.
 */
Board.prototype.EmptyCellContents = function(cellIndex) {
    $(this.gridKeys[cellIndex]).empty();
}

Board.prototype.GetAllCells = function() {
    return $("div.cell");
}

/*
 * Returns the contents of a cell on the game board based on the cell's
 * zero-based index.
 */
Board.prototype.GetCellContents = function(cellIndex) {
    return $(this.gridKeys[cellIndex]).contents();
}

Board.prototype.GetEmptyCells = function() {
    return $("div.cell:empty");
}

Board.prototype.GetNonEmptyCells = function() {
    return $("div.cell:not(:empty)");
}

Board.prototype.GetRandomEmptyCell = function() {
    var emptyCells = this.GetEmptyCells();
    var index = this.RandomZeroToNExclusive(emptyCells.size());
    return emptyCells[index];
}

/*
 * Randomly selects the next number to spawn based on the twoFourRatio.
 */
Board.prototype.NextNumber = function() {
    var next;
    if (Math.random() <= this.twoFourRatio){
        next = 2;
    } else {
        next = 4;
    }
    return next;
}

/*
 * Returns the index of a random <td> on the game board. Use this as
 * the index for grid to choose a random cell.
 */
Board.prototype.RandomCell = function() {
    return this.RandomZeroToNExclusive(Math.pow(this.gridSquare, 2));
}

/*
 * Returns the index of a random <td> on the game board excluding the
 * value passed to the function.
 */
Board.prototype.RandomCellExcluding = function(excluding) {
    var cell = this.RandomCell();
    while (cell === excluding) {
        cell = this.RandomCell();
    }
    return cell;
}

Board.prototype.RandomSpawn = function() {
    this.GetRandomEmptyCell().innerText = this.NextNumber();
}

/*
 * Randomly selects two cells on the game board and spawns either a 2 or 4
 * in them based on the twoFourRatio.
 */
Board.prototype.RandomStart = function() {
    this.RandomSpawn();
    this.RandomSpawn();
}

/*
 * Select a random number from 0 to n, exclusive. For example, an n of 16
 * will select from each whole number starting at and including 0 and going
 * up to and including 15.
 */
Board.prototype.RandomZeroToNExclusive = function(n) {
    return Math.floor(Math.random() * n);
}

/*
 * Replaces the contents of the game board cell identified by cellIndex with
 * the value of the contents argument.
 */
Board.prototype.ReplaceCellContents = function(cellIndex, contents) {
    this.EmptyCellContents(cellIndex);
    $(this.gridKeys[cellIndex]).append(this.WrapContentsInDiv(contents));
}

Board.prototype.WrapContentsInDiv = function(contents) {
    var div = "";
    if (contents !== "") {
        div = this.piece.format(contents);
    }
    return div;
}

/*
 * Testing keybindings
 */
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
            alert('left');
            break;
        case 38:
            alert('up');
            break;
        case 39:
            alert('right');
            break;
        case 40:
            alert('down');
            break;
    }
});

$(document).ready(function() {
    var board = new Board();
    board.EmptyAllCells();
    board.RandomStart();
});

/*
 * Found this method here: http://stackoverflow.com/questions/18405736/is-there-a-c-sharp-string-format-equivalent-in-javascript
 * It essentially behaves like C#'s string.Format().
 */
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
