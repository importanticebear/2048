/*
 * This class represents the game board. It holds a few pieces of static data. All of its
 * methods have been defined in the class' prototype as demonstrated here:
 * http://www.phpied.com/3-ways-to-define-a-javascript-class/
 */
function Board() {
    this.emptyCell = ""; // Value to put in an empty cell
    this.gridSquare = 4; // Number of cells on a side
    this.piece = "<div id=piece>{0}</div>"
    this.twoFourRatio = 0.85; // 80% of new tiles are 2s
}

/*
 * Replaces the contents of all cells on the game board with an empty string.
 */
Board.prototype.EmptyAllCells = function() {

}

/*
 * Gets all cell elements on the board. In this implementation, cells are
 * divs with a class of "cell".
 */
Board.prototype.GetAllCells = function() {
    return $("div.cell");
}

/*
 * Gets all cell elements without any contents.
 */
Board.prototype.GetEmptyCells = function() {
    return $("div.cell:empty");
}

/*
 * Gets all non-empty cell elements. This will be those divs with a class
 * of "cell" which have some text in them (a power of 2, to be exact).
 */
Board.prototype.GetNonEmptyCells = function() {
    return $("div.cell:not(:empty)");
}

/*
 * Returns a single, randomly chosen empty cell from the game board. This is inteded
 * for use in selecting a random cell to spawn a new tile in.
 */
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
 * Selects a random empty cell and sets its contents to the next random number
 * based on the twoFourRatio.
 */
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

/*
 * Ties in to the document's ready event to start driving the game.
 * TODO - Move to a separate JS file since this doesn't really belong in the Board class.
 */
$(document).ready(function() {
    var board = new Board();
    board.EmptyAllCells();
    board.RandomStart();
});

/*
 * Found this method here: http://stackoverflow.com/questions/18405736/is-there-a-c-sharp-string-format-equivalent-in-javascript
 * It essentially behaves like C#'s string.Format().
 * TODO - Move to some global method definitions file. This doesn't belong to the Board class.
 */
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
