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
/*
 * Performs the moves for all tiles on the board.
 */
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

/*
 * Once all tiles have been moved, this will push the changes
 * to the collection of tiles to the main Tile array.
 */
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

/*
 * Gets the left offset for a tile based on its column position.
 */
Board.GetLeft = function(pos) {
    return Board.GetOffset(Board.GetX(pos));
}

/*
 * Abstracts the means of getting left and top offsets since the
 * logic is identical, the only difference is in whether the
 * function needs to know about the column position or row position.
 */
Board.GetOffset = function(coord) {
    /* 
     * FIXME
     * This method is really broken since my changes to how cells are spawned.
     */
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

/*
 * Gets the top offset for a tile based on its row position
 */
Board.GetTop = function(pos) {
    return Board.GetOffset(Board.GetY(pos));
}

/*
 * Gets a tile's number based on the position of the tile on the board
 */
Board.GetValueAtPosition = function(pos) {
    return Board.Tiles[pos] ? Board.Tiles[pos].Number : "";
}

/*
 * Gets the column position of a tile based on its absolute position
 */
Board.GetX = function(pos) {
    return pos % Board.GRID_SQUARE;
}

/*
 * Gets the row position of a tile based on its absolute position
 */
Board.GetY = function(pos) {
    return Math.floor(pos / Board.GRID_SQUARE);
}
/**************** End Static Methods ****************/

/**************** Instance Methods ****************/
/*
 * Gets all cell elements without any contents.
 */
Board.GetEmptyCells = function() {
    /* 
     * FIXME
     * First, this is inappropriately named since "cells"
     * are the background elements on the board on which tiles
     * are placed. This should be called "GetUnoccupiedCells"
     * or "GetOpenCells"
     */
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
    /*
     * FIXME
     * This probably has no use for GetEmptyCells anymore.
     * This could be more clearly named (i.e. "GetRandomOpenCell"
     * or "GetRandomUnoccupiedCell".
     */
    var emptyCells = Board.GetEmptyCells();
    var index = Board.RandomZeroToNExclusive(emptyCells.length);
    return emptyCells[index];
}

/*
 * Selects a random empty cell and sets its contents to the next random number
 * based on the twoFourRatio.
 */
Board.RandomSpawn = function() {
    /*
     * Have to save the result of GetRandomEmptyCell in a variable
     * since that value is used more than once in actually spawning
     * a tile. Need to make sure the same value gets used for each
     * atomic spawning cycle.
     */
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
