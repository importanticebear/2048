function Board() {
    this.twoFourRatio = 0.8; // 80% of new tiles are 2s
    this.gridSquare = 4;
    this.grid = $("td").toArray(); // Collection of all cells on the game board
    this.gridKeys = [
        "#row1col1",
        "#row1col2",
        "#row1col3",
        "#row1col4",

        "#row2col1",
        "#row2col2",
        "#row2col3",
        "#row2col4",

        "#row3col1",
        "#row3col2",
        "#row3col3",
        "#row3col4",

        "#row4col1",
        "#row4col2",
        "#row4col3",
        "#row4col4"
    ];
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
        this.ReplaceCellContents(gridKey, "");
    }
}

/*
 * Empties the contents of a specified cell on the game board based
 * on its zero-based index.
 */
Board.prototype.EmptyCellContents = function(cellIndex) {
    $(this.gridKeys[cellIndex]).empty();
}

/*
 * Returns the contents of a cell on the game board based on the cell's
 * zero-based index.
 */
Board.prototype.GetCellContents = function(cellIndex) {
    return $(this.gridKeys[cellIndex]).contents();
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
    return Math.floor(Math.random() * Math.pow(this.gridSquare, 2));
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

/*
 * Randomly selects two cells on the game board and spawns either a 2 or 4
 * in them based on the twoFourRatio.
 */
Board.prototype.RandomStart = function() {
    var cell1 = this.RandomCell();
    var cell2 = this.RandomCellExcluding(cell1);
    var num1 = this.NextNumber();
    var num2 = this.NextNumber();
}

/*
 * Replaces the contents of the game board cell identified by cellIndex with
 * the value of the contents argument.
 */
Board.prototype.ReplaceCellContents = function(cellIndex, contents) {
    this.EmptyCellContents(cellIndex);
    $(this.gridKeys[cellIndex]).append(contents);
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
});
