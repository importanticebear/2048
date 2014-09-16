/*
 * Ties in to the document's ready event to start driving the game.
 */
$(document).ready(function() {
    var board = new Board();
    board.EmptyAllCells();
    board.RandomStart();
});

/*
 * Testing keybindings. This method will wire up which functions to call when one
 * of the arrow keys is pressed.
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
