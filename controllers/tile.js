function Tile(position) {
    this.hasMerged = false; // Tiles can merge only one time per arrow click
    this.number = this.Randomize(); // All new tiles get a randomized two or four
    this.pos = position; // Position is determined by the board
    this.tileColor; // Dependent on value of this.number
}

Tile.TWO_FOUR_RATIO = 0.9; // 90% of new tiles are twos

/*
 * Determines if a tile is able to move in the given direction. The direction
 * argument should come from the Directions.js enum. A tile is able to move if
 * the cell it wants to move into is not occupied by another tile or the tile in
 * that cell has the same number as this.number.
 */
Tile.prototype.CanMove = function(direction) {
    // Ask the board if there is a tile already in the spot I want to move to
    // If there is, ask the board for the value of the tile at that position
    // If there isn't, return NaN
}

/*
 * Performs all the logic necessary to merge this tile into another tile. Tiles
 * can merge only if they have the same this.number
 */
Tile.prototype.Merge = function(otherTile) {
    // I am going to merge into otherTile
    // Set my z-index lower than otherTile (so I appear on top of it)
    // Move onto otherTile's spot
    // Double my number
    // Change hasMerged to true to keep me from merging again this round
    // The board will have to get rid of otherTile by removing it from the DOM
}

/*
 * Moves the tile in the given direction. The direction argument should come from
 * the Direction.js enum.
 */
Tile.prototype.Move = function(direction) {
    // Figure out if I can move (use this.CanMove(direction))
    // If the returned value is NaN, move to that spot and try to move again
    // If the returned value is equal to my number, merge if !hasMerged and try to move again
    // If the returned value is not equal to my number, stop trying to move
}

/*
 * Randomly selects the starting value of the tile, either a two or a four. This
 * method does NOT assign the chosen number to the tile, it's here just to generate
 * the randomly selected starting value.
 */
Tile.prototype.Randomize = function() {
    return Math.random() <= Tile.TWO_FOUR_RATIO ? 2 : 4;
}

/*
 * This is meant as a sort of callback the board makes to each of the tiles on it
 * when all tiles have finished moving. It's meant to let the tiles set their
 * internal state to be prepared for the next round which, as of now, means that
 * it sets its hasMerged flag to false.
 */
Tile.prototype.RoundOver = function() {
    this.hasMerged = false;
}
