function Board() {
/**************** Data Members ****************/
Board.GRID_SQUARE = 4; // Number of cells on a side

Board.Cells = Board.CreateCells();
Board.Tiles = [];
/**************** End Data Members ****************/
}

/*
 * Performs the moves for all tiles on the board.
 */
Board.HandleMove = function(direction) {
    for (i = 0; i < Board.Tiles.length; i++) {
        if (Board.Tiles[i]) {
            var neighborIndex = Board.FindNextNeighborIndex(direction, i);
            var canMerge = neighborIndex != -1 && Board.CanMerge(Board.Tiles[i], Board.Tiles[neighborIndex]);
            var destination = canMerge ? neighborIndex : Board.FindNextOpenCell(direction, i);
            var left = Board.GetLeft(destination);
            var top = Board.GetTop(destination);

            if (canMerge) {
                Board.Tiles[i].Merge(left, top, destination);
            } else {
                Board.Tiles[i].Move(left, top, destination);
            }

            Board.Tiles[destination] = Board.Tiles[i];
            Board.Tiles[i] = null;
        }
    }

    Board.RandomSpawn();
}

Board.CanMerge = function(tile, neighbor) {
    return tile.Number == neighbor.Number && !tile.HasMerged && !neighbor.HasMerged;
}

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
 * Locates the nearest neighbor to a tile at startingPos based on a direction.
 */
Board.FindNextNeighborIndex = function(direction, startingPos) {
    var rowPos = Board.GetY(startingPos);
    var currentPos = startingPos;
    var neighbor = -1;
    switch (direction) {
        case Directions.UP:
            while (rowPos > 0) {
                var nextPos = currentPos - Board.GRID_SQUARE;
                rowPos = Board.GetY(currentPos);
                if (Board.Tiles[nextPos]) {
                    neighbor = nextPos;
                    break;
                } else {
                    currentPos = nextPos;
                }
            }
        case Directions.DOWN:
        case Directions.LEFT:
        case Directions.RIGHT:
    }
    return neighbor;
}

/*
 * Locates the destination for a tile based on its direction and starting position.
 */
Board.FindNextOpenCell = function(direction, startingPos) {
    var rowPos = Board.GetY(startingPos);
    var colPos = Board.GetX(startingPos);
    var currentPos = startingPos;

    switch (direction) {
        case Directions.UP:
            while (rowPos > 0) { // Else already in top row
                var nextPos = currentPos - Board.GRID_SQUARE;
                if (!Board.Tiles[nextPos]) {
                    currentPos = nextPos;
                    rowPos = Board.GetY(currentPos);
                } else {
                    break;
                }
            }
            break;
        case Directions.DOWN:
            while (rowPos < Board.GRID_SQUARE - 1) { // Else already in bottom row

            }
            break;
        case Directions.LEFT:
            while (colPos > 0) { // Else already in left column

            }
            break;
        case Directions.RIGHT:
            while (colPos < Board.GRID_SQUARE - 1) { // Else already in right column

            }
            break;
    }

    return currentPos;
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
    return 10 * (coord + 1) + 100 * coord;
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
