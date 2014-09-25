/*
 * This class represents the game board. It holds a few pieces of static data. All of its
 * methods have been defined in the class' prototype as demonstrated here:
 * http://www.phpied.com/3-ways-to-define-a-javascript-class/
 */
function Board() {
/**************** Data Members ****************/
Board.GRID_SQUARE = 4; // Number of cells on a side

Board.Cells = Board.CreateCells();
Board.TileBuffer = [];
Board.Tiles = [];
/**************** End Data Members ****************/
}

/**************** Event Handlers ****************/
Board.HandleMove = function(direction) {
    for (i = 0; i < Board.Tiles.length; i++) {
        if (Board.Tiles[i]) {
            Board.Tiles[i].Move(direction, Board.UpdateTiles);
        }
    }
    Board.Tiles = Board.TileBuffer;
    Board.TileBuffer = [];
}
/**************** End Event Handlers ****************/

Board.UpdateTiles = function(oldPos, newPos) {
    Board.TileBuffer[newPos] = Board.Tiles[oldPos];
}

/**************** Static Methods ****************/
/*
 * Creates the empty cells on the game board. These are static elements meant to
 * indicate where the playable spots on the board are. They don't move or do
 * anything special.
 */
Board.CreateCells = function() {
    var cells = [];
    for (i = 0; i < Math.pow(Board.GRID_SQUARE, 2); i++) {
        cells[i] = new Cell(i);
        $(".board").append(cells[i]);
    }
    return cells;
}

Board.GetLeft = function(pos) {
    return Board.GetOffset(Board.GetX(pos));
}

Board.GetOffset = function(coord) {
    var offset;
    switch (coord) {
        case 0:
            offset = 10;
            break;
        case 1:
            offset = 124;
            break;
        case 2:
            offset = 237;
            break;
        case 3:
            offset = 350;
            break;
    }
    return offset;
}

Board.GetTop = function(pos) {
    return Board.GetOffset(Board.GetY(pos));
}

Board.GetValueAtPosition = function(pos) {
    return Board.Tiles[pos] ? Board.Tiles[pos].Number : "";
}

Board.GetX = function(pos) {
    return pos % Board.GRID_SQUARE;
}

Board.GetY = function(pos) {
    return Math.floor(pos / Board.GRID_SQUARE);
}
/**************** End Static Methods ****************/

/**************** Instance Methods ****************/
/*
 * Gets all cell elements without any contents.
 */
Board.GetEmptyCells = function() {
    var indices = [];
    var indicesPtr = 0;
    for (i = 0; i < Math.pow(Board.GRID_SQUARE, 2); i++) {
        if (!Board.Tiles[i]) {
            indices[indicesPtr++] = i;
        }
    }
    return indices;
}

/*
 * Returns a single, randomly chosen empty cell from the game board. This is intended
 * for use in selecting a random cell to spawn a new tile in.
 */
Board.GetRandomEmptyCell = function() {
    var emptyCells = Board.GetEmptyCells();
    var index = Board.RandomZeroToNExclusive(emptyCells.length);
    return emptyCells[index];
}

/*
 * Selects a random empty cell and sets its contents to the next random number
 * based on the twoFourRatio.
 */
Board.RandomSpawn = function() {
    var index = Board.GetRandomEmptyCell();
    Board.Tiles[index] = new Tile(index); // The new tile will add itself to the DOM
}

/*
 * Select a random number from 0 to n, exclusive. For example, an n of 16
 * will select from each whole number starting at and including 0 and going
 * up to and including 15.
 */
Board.RandomZeroToNExclusive = function(n) {
    return Math.floor(Math.random() * n);
}

/*
 * Randomly selects two cells on the game board and spawns either a 2 or 4
 * in them based on the twoFourRatio.
 */
Board.Start = function() {
    Board.RandomSpawn();
    Board.RandomSpawn();
}
/**************** End Instance Methods ****************/
