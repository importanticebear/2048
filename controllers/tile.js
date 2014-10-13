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
Tile.prototype.AnimateMove = function(left, top) {
    this.$me.animate({
        top: top + "px",
        left: left + "px"
    });
}

Tile.prototype.Merge = function(left, top, destination) {
    this.HasMerged = true;
    this.Number = this.Number * 2;
    $("#" + destination + ".tile").remove();
    this.Move(left, top, destination);
}

Tile.prototype.Move = function(left, top, destination) {
    this.AnimateMove(left, top);
    this.Position = destination;
    this.$me.removeAttr("id");
    this.$me.attr("id", destination);
    this.$me = $("#" + destination + ".tile")
    this.$me.text(this.Number);
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
