/*
 * This class represents the game board. It holds a few pieces of static data. All of its
 * methods have been defined in the class' prototype as demonstrated here:
 * http://www.phpied.com/3-ways-to-define-a-javascript-class/
 */
function Board() {
    this.gridSquare = 4; // Number of cells on a side
    this.twoFourRatio = 0.85; // 80% of new tiles are 2s
}

/*
 * Event handler for the keypress - down.
 * Moves all non-empty tiles as far down as they can go without letting them
 * overlap or move off the screen. Will also merge two tiles of the same value
 * into a single tile of twice the value.
 */
Board.prototype.ArrowPressDown = function() {
    alert('down');
    // For each row starting with the second from the bottom and moving up
    // For each cell starting from the left and moving right (arbitrary)
    // If the cell has contents and no lower neighbor, move it down recursively
    // until it can't move any further.
    // If the cell detects a lower neighbor, determine if the neighbor has the
    // same value as the cell.
    // If they are the same, move the cell into its neighbor's spot and double
    // the numerical value of the cell. This is how two cells are merged into one.
}

/*
 * Event handler for the keypress - left.
 * Moves all non-empty tiles as far left as they can go without letting them
 * overlap or move off the screen. Will also merge two tiles of the same value
 * into a single tile of twice the value.
 */
Board.prototype.ArrowPressLeft = function() {
    alert('left');
    // For each column starting with the second from the left and moving right
    // For each cell starting from the top and moving down (arbitrary)
    // If the cell has contents and no left neighbor, move it left recursively
    // until it can't move any further.
    // If the cell detects a left neighbor, determine if the neighbor has the
    // same value as the cell.
    // If they are the same, move the cell into its neighbor's spot and double
    // the numerical value of the cell. This is how two cells are merged into one.
}

/*
 * Event handler for the keypress - right.
 * Moves all non-empty tiles as far right as they can go without letting them
 * overlap or move off the screen. Will also merge two tiles of the same value
 * into a single tile of twice the value.
 */
Board.prototype.ArrowPressRight = function() {
    alert('right');
    // For each column starting with the second from the right and moving right
    // For each cell starting from the top and moving down (arbitrary)
    // If the cell has contents and no right neighbor, move it right recursively
    // until it can't move any further.
    // If the cell detects a right neighbor, determine if the neighbor has the
    // same value as the cell.
    // If they are the same, move the cell into its neighbor's spot and double
    // the numerical value of the cell. This is how two cells are merged into one.
}

/*
 * Event handler for the keypress - up.
 * Moves all non-empty tiles as far up as they can go without letting them
 * overlap or move off the screen. Will also merge two tiles of the same value
 * into a single tile of twice the value.
 */
Board.prototype.ArrowPressUp = function() {
    alert('up');
    // For each row starting with the second from the top and moving down
    // For each cell starting from the left and moving right (arbitrary)
    // If the cell has contents and no upper neighbor, move it up recursively
    // until it can't move any further.
    // If the cell detects an upper neighbor, determine if the neighbor has the
    // same value as the cell.
    // If they are the same, move the cell into its neighbor's spot and double
    // the numerical value of the cell. This is how two cells are merged into one.
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
 * Returns a single, randomly chosen empty cell from the game board. This is intended
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
