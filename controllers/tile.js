/*
 * Represents a playable tile on the board. It needs to know
 * its position on the board to initialize correctly.
 */
function Tile(position) {
    this.HasMerged = false; // Tiles can merge only one time per arrow click
    this.Number = Math.random() <= Tile.TWO_FOUR_RATIO ? 2 : 4; // Initialize the tile's value randomly
    this.Position = position; // Position is determined by the board

    this.Markup = $("<div/>", {
        class: "tile",
        id: position
    });

    $(".board").append(this.Markup); // Have to add the tile to the board

    // TODO This may need to be updated every time the tile moves
    this.$me = $("#" + position + ".tile"); // Alias for this tile in the DOM

    this.$me.css("left", Board.GetLeft(position) + "px")
            .css("top", Board.GetTop(position) + "px")
            .text(this.Number);

    this.GenerateBackgroundColor();
    this.GenerateBorderColor();
    this.GenerateTextColor();
    return this;
}

/**************** Instance Methods ****************/
/*
 * Moves the tile in direction indicated by the
 * provided argument.
 *
 * TODO: Add validation to ensure that the 'direction'
 * argument is equal to one of the constants in the
 * directions enum.
 */
Tile.prototype.AnimateMove = function(direction) {
    /*
     * TODO
     * This only moves the tile one space in the given direction.
     * There needs to be a method which gets the destination
     * position of the tile and animates its move to it. Such
     * a method would have to determine if the tile is going
     * to merge with another at its destination or if it's going
     * to be moving to an open spot.
     */
    var nextPos = this.GetNextPosInDirection(direction);
    this.$me.animate({
        top: Board.GetTop(nextPos) + "px",
        left: Board.GetLeft(nextPos) + "px"
    });
}

/*
 * Determines if a tile is able to move in the given direction. The direction
 * argument should come from the Directions.js enum. A tile is able to move if
 * the cell it wants to move into is not occupied by another tile or the tile in
 * that cell has the same number as this.Number.
 */
Tile.prototype.CanMove = function(direction) {
    var canMove = Tile.NO;
    if (this.IsNextPosLegal(direction)) {
        var nextPos = this.GetNextPosInDirection(direction);
        var nextValue = Board.GetValueAtPosition(nextPos);

        if (nextValue === this.Number) {
            canMove = Tile.MERGE;
        } else if (nextValue === "") {
            canMove = Tile.MOVE;
        }
    }
    return canMove;
}

/*
 * Sets this tile's background color.
 *
 * This method can be expanded to selectively generate colors randomly
 * or change the color to a static value based on the tile's number.
 */
Tile.prototype.GenerateBackgroundColor = function() {
    this.$me.css("background-color", "#090909");
}

/*
 * Sets this tile's border color.
 *
 * This method can be expanded to selectively generate colors randomly
 * or change the color to a static value based on the tile's number.
 */
Tile.prototype.GenerateBorderColor = function() {
    this.$me.css("border-color", "#D5D5D5");
}

/*
 * Sets this tile's text color.
 *
 * This method can be expanded to selectively generate colors randomly
 * or change the color to a static value based on the tile's number.
 */
Tile.prototype.GenerateTextColor = function() {
    this.$me.css("color", "#4E7A5A")
}

/*
 * Determines the position of the cell immediately adjacent to this tile in the
 * direction specified. This function can return values which are out of bounds
 * so be sure to use this.IsNextPosLegal to determine if the value is in bounds.
 */
Tile.prototype.GetNextPosInDirection = function(direction) {
    var next = NaN;
    switch (direction) {
        case Directions.UP:
            next = this.Position - Board.GRID_SQUARE;
            break;
        case Directions.DOWN:
            next = this.Position + Board.GRID_SQUARE;
            break;
        case Directions.LEFT:
            next = this.Position = 1;
            break;
        case Directions.RIGHT:
            next = this.Position + 1;
            break;
    }
    return next;
}

/*
 * Determines if there is a cell in the direction indicated. The formulas to figure
 * this are abstracted based on Board.GRID_SQUARE which determines how many cells
 * are on a single side of the board. A false from this method means an attempt
 * to move in that direction will place the tile out of bounds. This method's
 * accuracy is predicated on a square board (i.e. four sides, each with an equal
 * number of cells).
 */
Tile.prototype.IsNextPosLegal = function(direction) {
    var legal = false;
    var next = this.GetNextPosInDirection(direction);
    switch (direction) {
        case Directions.UP:
            legal = next > (Board.GRID_SQUARE - 1);
            break;
        case Directions.DOWN:
            legal = next < (Math.pow(Board.GRID_SQUARE, 2) - Board.GRID_SQUARE);
            break;
        case Directions.LEFT:
            legal = next != Math.floor(next / Board.GRID_SQUARE) * Board.GRID_SQUARE
            break;
        case Directions.RIGHT:
            legal = next % Board.GRID_SQUARE != Board.GRID_SQUARE - 1;
            break;
    }
    return legal
}

/*
 * Performs all the logic necessary to merge this tile into another tile. Tiles
 * can merge only if they have the same this.Number
 */
Tile.prototype.Merge = function(direction) {
    // TODO: implement this based on the comments below
    // I am going to merge into the cell at direction
    // Set my z-index higher than the tile in direction (so I appear on top of it)
    // Move onto the other tile's spot
    // Double my number
    // Change HasMerged to true to keep me from merging again this round
    // The board will have to get rid of otherTile by removing it from the DOM
    this.HasMerged = true;
}

/*
 * Moves the tile in the given direction. The direction argument should come from
 * the Directions.js enum.
 *
 * TODO: Add validations to determine that direction actually comes from the
 * Directions.js enum
 */
Tile.prototype.Move = function(direction, callback) {
    switch (this.CanMove(direction)) {
        case Tile.MOVE:
            this.AnimateMove(direction); // Figure out how to move to that spot

            var old = this.Position;
            this.Position = this.GetNextPosInDirection(direction);
            callback(old, this.Position);
            break;
        case Tile.MERGE:
            if (!this.HasMerged) {
                var old = this.Position;
                var next = this.GetNextPosInDirection(direction);

                this.Merge(Board.GetCellAtPosition(next));
                this.Position = next;
                callback(old, this.Position);
            }
            break;
    }
}

/*
 * This is meant as a sort of callback the board makes to each of the tiles on it
 * when all tiles have finished moving. It's meant to let the tiles set their
 * internal state to be prepared for the next round which, as of now, means that
 * it sets its HasMerged flag to false.
 */
Tile.prototype.RoundOver = function() {
    this.HasMerged = false;
}
/**************** End Instance Methods ****************/

Tile.MERGE = "merge"; // Indicates a tile is eligible to merge
Tile.MOVE = "move"; // Indicates a tile is eligible to move
Tile.NO = "no"; // Indicates a tile may not merge or move
Tile.TWO_FOUR_RATIO = 0.9; // 90% of new tiles are twos
